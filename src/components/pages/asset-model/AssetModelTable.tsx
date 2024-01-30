import { AssetModel } from "@/types/asset-model";
import List from "./AssetModelList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";
import { FieldSet } from "@/types/field-set";
import { Manufacturer } from "@/types/manufacturer";
import { Category } from "@/types/category";
import { Depreciation } from "@/types/depreciation";
interface AssetModelProps {
  assetmodels: AssetModel[];
  fieldsets: FieldSet[];
  manufacturers: Manufacturer[];
  categories: Category[];
  depreciations: Depreciation[];
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
}

const AssetModelTable: React.FC<AssetModelProps> = ({
  assetmodels,
  fieldsets,
  manufacturers,
  categories,
  depreciations,
  page,
  setPage,
  limit,
  totalPage,
  totalData,
  loading,
  setLoading,
  setRefresh,
}) => {
  useEffect(() => {
    if (assetmodels.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, assetmodels.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>Model Name</THead>
                <THead>Model No.</THead>
                <THead>Manufacturer</THead>
                <THead>Category</THead>
                <THead>Field Set</THead>
                <THead>Action</THead>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className=" p-4">
                    <Puff
                      stroke="#1C64F2"
                      fill="#1C64F2"
                      width={70}
                      height={70}
                      className="m-0 p-0 content-center w-full"
                    />
                  </td>
                </tr>
              ) : assetmodels.length > 0 ? (
                assetmodels.map((assetModel: any) => (
                  <List
                    key={assetModel.id}
                    assetModel={assetModel}
                    fieldSets={fieldsets}
                    manufacturers={manufacturers}
                    categories={categories}
                    depreciations={depreciations}
                    setRefresh={setRefresh}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PaginationComponent
            page={page}
            setPage={setPage}
            limit={limit}
            totalPage={totalPage}
            totalData={totalData}
          />
        </div>
      </div>
    </div>
  );
};
export default AssetModelTable;
