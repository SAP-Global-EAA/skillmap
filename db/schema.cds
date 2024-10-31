using { cuid } from '@sap/cds/common';
namespace my.skillmap;

entity EAs: cuid {
  empId : String(15);
  name  : String;
  email  : String;
  region : String;
  country: String;
  experience : Association to many Experience on experience.ea = $self;
  assignments: Association to many Customers on assignments.ea = $self;
}

entity Experience: cuid{
  ea: Association to EAs;
  skills : String;
  level : Integer;
}

entity Skills: cuid {
  skillType: String;
  skillDescription: String;
  //exp : Association to many Experience on exp.skills = $self;
}

entity Customers: cuid {
  CRMId: String;
  CustomerName: String;
  isActive: Boolean;
  isLead: Boolean;
  leadEA: String;
  comment: String;
  ea : Association to EAs;
}