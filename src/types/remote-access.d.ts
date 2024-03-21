export interface RemoteAccess {
  id: number;
  alias: string;
  assetId: number;
  remoteId: string;
  remoteUser: string;
  remotePassword: string;
  remoteSource: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
  Asset: {
    id: number;
    name: string;
  };
}
