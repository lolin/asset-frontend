export interface Department {
  id: number;
  companyId: number;
  name: string;
  isActive: boolean;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
  Company: {
    id: number;
    name: string;
    isActive: boolean;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
