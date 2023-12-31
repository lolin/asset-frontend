export interface Category {
  id: number;
  name: string;
  assetTypeId: number;
  AssetType: {
    id: number;
    name: string;
  };
  isActive: boolean;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
