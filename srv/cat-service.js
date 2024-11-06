const cds = require ('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService {
    init() {
      // register your handlers ...

      //Get the entities
      const { SkillDevelopment, Experience, Engagements, EAs } = this.entities

      //Initiate Logs
      const LOG = cds.log('shibaji log')

      this.on ('INSERT', 'EAs', async function(req) {

        LOG.info ('req.data:'+JSON.stringify(req.data))

        const { empId, experience, assignments, development } = req.data
        
        //Check if any record is available for the employee
        let ea = await cds.tx(req).run (SELECT.from (EAs).where({empId:req.data.empId}))

        //if ea profile does not exist then create one
        if( !ea || ea.length == 0 ){

          await cds.tx(req).run (INSERT.into (EAs).entries(req.data))
          ea = await cds.tx(req).run (SELECT.from (EAs).where({empId:req.data.empId}))  

        }else{ //Update the profile

          LOG.info ('EA Update:'+JSON.stringify(ea))
          await cds.tx(req).run(
            UPDATE (EAs) .set ({      
              name: req.data.name,
              region: req.data.region,
              country: req.data.country,
              email: req.data.email
            }) .where({ID: ea[0].ID})
          )
          
        }

        LOG.info ('EA data:'+JSON.stringify(ea))
        LOG.info ('EA [0].Id]:'+ea[0].ID)
        
        LOG.info ('experience data:'+JSON.stringify(experience))

        //let db = await cds.connect.to('db')
        //let tx = db.tx()

        //Update Experience
        if ( experience && experience.length > 0 ){

          const exps = experience.map((exp) => {
            return {
              ea_ID: ea[0].ID, 
              level: exp.level,
              skills: exp.skills
            };
          });

          LOG.info ('exp data:'+JSON.stringify(exps));

          await cds.tx(req).run (INSERT.into (Experience).entries(exps));

          /*  experience.forEach(function insertExp(exp){
                LOG.info ('Exp data:'+JSON.stringify(exp))
                try{
                  tx(req).run(
                    INSERT.into (Experience) .columns (
                        'SKILLS', 'LEVEL', 'EA_ID'
                    ) .rows (
                        [exp.skills, exp.level, "5ac876ab-dc09-4ff0-b5aa-bb099f7e8152"]
                    ) )
                }catch(e){
                  tx.rollback(e)
                }
                tx.commit();
            }) */


        }


        //Update Development Needs
        if ( development && development.length > 0 ){

          const devs = development.map((dev) => {
            return {
              ea_ID: ea[0].ID, 
              skills: dev.skills
            };
          });

          LOG.info ('development data:'+JSON.stringify(devs));

          await cds.tx(req).run (INSERT.into (SkillDevelopment).entries(devs));

        }

        //Update Engagement assignments
        if ( assignments && assignments.length > 0 ){

          const engs = assignments.map((eng) => {
            return {
              ea_ID: ea[0].ID, 
              CRMId: eng.CRMId,
              CustomerName: eng.CustomerName,
              isActive: eng.isActive,
              isLead: eng.isLead,
              leadEA: eng.leadEA,
              comment: eng.comment
            };
          });

          LOG.info ('Engagement data:'+JSON.stringify(engs));

          await cds.tx(req).run (INSERT.into (Engagements).entries(engs));

        } 
      })
      return super.init()
    }
  }