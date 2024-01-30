export interface CustomField {
  id: number;
  fieldSetId: number;
  fieldName: string;
  fieldType: string;
  fieldValue: string;
  fieldFormat: string;
  helperText: string;
  orderNumber: number;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
  FieldSet: {
    id: number;
    name: string;
  };
}
