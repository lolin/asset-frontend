import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import fetchData from "@/util/fetchWrapper";
import { format, parseISO } from "date-fns";
interface AssetProps {
  id: number;
  name: string;
  departmentId: number;
  assetModelId: number;
  vendorId: number;
  assetStatusId: number;
  conditionId: number;
  serialNumber: string;
  macAddress: string;
  assetDetails: string;
  price: number;
  purchaseDate: Date;
  warantyPeriod: Date;
  isDecomissioned: boolean;
  decommissionedDate: Date;
  decommissionedReason: string;
  decommissionedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  deletedBy: string;
  createdBy: string;
  modifiedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
const DetailAsset = (props: { params: string }) => {
  const param = props.params;
  const [asset, setAsset] = useState<any>({});
  const getAsset = useCallback(async () => {
    const url = `assets/${param}`;
    const method = "GET";
    const body = "";
    const result = await fetchData({ url, method, body });
    setAsset(result.payload.data);
  }, [param, setAsset]);

  useEffect(() => {
    getAsset();
  }, [getAsset]);
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white border-t-2">
        <div className="m-5 ">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-0 xl:px-2">
            <h3 className="font-bold text-lg text-slate-700">Detail Asset</h3>
          </div>
          <div className="mt-4 w-full flex gap-6 text-slate-600 mb-10">
            {asset ? (
              <>
                <div className="flex flex-col w-1/2">
                  <table className="w-full">
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Asset Code</td>
                      <td className="p-4 text-sm">: {asset.name}</td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Business Unit</td>
                      <td className="p-4 text-sm">
                        : {asset?.Department?.Company?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Department</td>
                      <td className="p-4 text-sm">
                        : {asset?.Department?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Category</td>
                      <td className="p-4 text-sm">
                        : {asset?.AssetModel?.Category?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Manufacturer</td>
                      <td className="p-4 text-sm">
                        : {asset?.AssetModel?.Manufacturer?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Model</td>
                      <td className="p-4 text-sm">
                        : {asset?.AssetModel?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Serial Number</td>
                      <td className="p-4 text-sm">: {asset?.serialNumber}</td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Mac Address</td>
                      <td className="p-4 text-sm">: {asset?.macAddress}</td>
                    </tr>
                  </table>
                  <div className="w-full mt-5">
                    <span className="text-slate-700 text-md font-bold">
                      Specification
                    </span>
                  </div>
                  <table className="w-full">
                    {asset?.AssetHasCustomFields &&
                      asset?.AssetHasCustomFields.map((item: any) => (
                        <tr
                          className="border-b border-stroke dark:border-strokedark"
                          key={item.id}
                        >
                          <td className="p-4 text-sm">
                            {item?.CustomField?.fieldName}
                          </td>
                          <td className="p-4 text-sm">
                            : {item?.customFieldValue}
                          </td>
                        </tr>
                      ))}
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Processor</td>
                      <td className="p-4 text-sm">: {asset.name}</td>
                    </tr>

                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Other</td>
                      <td className="p-4 text-sm">: {asset?.assetDetails}</td>
                    </tr>
                  </table>
                </div>
                <div className="flex flex-col w-1/2 gap-4">
                  <table className="w-full">
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Vendor</td>
                      <td className="p-4 text-sm">: {asset?.Vendor?.name}</td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Price</td>
                      <td className="p-4 text-sm">: {asset?.price}</td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Purchase Date</td>
                      <td className="p-4 text-sm">
                        :{" "}
                        {asset?.purchaseDate &&
                          format(
                            parseISO(asset?.purchaseDate?.toString()),
                            "dd-MMM-yyyy"
                          )}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Waranty Exp</td>
                      <td className="p-4 text-sm">
                        :{" "}
                        {asset?.warantyPeriod &&
                          format(
                            parseISO(asset?.warantyPeriod?.toString()),
                            "dd-MMM-yyyy"
                          )}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Status</td>
                      <td className="p-4 text-sm">
                        : {asset?.AssetStatus?.name}
                      </td>
                    </tr>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <td className="p-4 text-sm">Condition</td>
                      <td className="p-4 text-sm">
                        : {asset?.Condition?.name}
                      </td>
                    </tr>
                  </table>
                </div>
              </>
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailAsset;
