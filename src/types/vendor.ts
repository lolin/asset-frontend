export interface Vendor {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  onlineShop: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedBy: number;
  deletedAt: Date;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
