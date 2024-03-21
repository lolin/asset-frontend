export interface EmailList {
  id: number;
  employeeName: string;
  departmentId: number;
  email: string;
  password: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
  Department: {
    id: number;
    name: string;
  };
}
