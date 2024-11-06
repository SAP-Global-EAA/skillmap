using { cuid } from '@sap/cds/common';
namespace my.skillmap;

entity EAs: cuid {
  empId : String(15);
  name  : String;
  email  : String;
  region : String;
  country: String;
  experience : Association to  many Experience on experience.ea = $self;
  development: Association to  many SkillDevelopment on development.ea = $self;
  assignments: Association to  many Engagements on assignments.ea = $self;
}

entity Experience: cuid{
  ea: Association to EAs;
  skills : String;
  level : Integer;
}

entity SkillDevelopment: cuid{
  ea: Association to EAs;
  skills : String;
}

entity Skills: cuid {
  skillType: String;
  skillDescription: String;
  //exp : Association to many Experience on exp.skills = $self;
}

entity Engagements: cuid {
  CRMId: String;
  CustomerName: String;
  isActive: Boolean;
  isLead: Boolean;
  leadEA: String;
  comment: String;
  ea : Association to EAs;
}

/*
entity Orders: cuid { 
  Items : Composition of many OrderItems on Items.parent = $self;
}
entity OrderItems { // to be accessed through Orders only
  key parent : Association to Orders;
  key pos    : Integer;
  quantity   : Integer;
}
*/