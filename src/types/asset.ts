export interface Asset {
  id: number;
  name: string;
  departmentId: number;
  Department: {
    id: number;
    name: string;
  };
  AssetModel: {
    id: number;
    name: string;
    modelNumber: string;
    Category: {
      id: number;
      name: string;
    };
  };
  brandId: number;
  Manufacturer: {
    id: number;
    name: string;
  };
  vendorId: number;
  Vendor: {
    id: number;
    name: string;
  };
  conditionId: number;
  Condition: {
    id: number;
    name: string;
  };
  model: string;
  serialNumber: string;
  macAddress: string;
  ipAddress: string;
  assetDetails: string;
  price: number;
  purchaseDate: Date;
  warantyPeriod: Date;
  isDecommissioned: boolean;
  decommissionedDate: Date;
  decommissionedReason: string;
  decommissionedBy: number;
  isActive: boolean;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
