export interface AssetModel {
  id: number;
  name: string;
  imageUrl: string;
  modelNumber: string;
  manufaturerId: number;
  Manufacturer: {
    id: number;
    name: string;
  };
  categoryId: number;
  Category: {
    id: number;
    name: string;
  };
  fieldSetId: number;
  FieldSet: {
    id: number;
    name: string;
  };
  depreciationId: number;
  Depreciation: {
    id: number;
    name: string;
  };
  notes: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
