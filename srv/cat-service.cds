using my.skillmap as my from '../db/schema';

service CatalogService {
    
    //annotate EAs with @odata.draft.enabled;
    entity EAs as projection on my.EAs;

    annotate SkillsDraft with @odata.draft.enabled;
    entity SkillsDraft as projection on my.Skills;
    
    entity Skills as projection on my.Skills;

    
    annotate EngagementsDraft with @odata.draft.enabled;
    entity EngagementsDraft as projection on my.Engagements;

    @cds.redirection.target: true
    entity Engagements as projection on my.Engagements;

    //annotate Experience with @odata.draft.enabled;
    entity Experience as projection on my.Experience;

    //annotate SkillDevelopment with @odata.draft.enabled;
    entity SkillDevelopment as projection on my.SkillDevelopment;

}
