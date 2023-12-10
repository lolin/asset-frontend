import { Asset } from "@/types/asset";
import List from "./AssetList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import { Category } from "@/types/category";
import THead from "@/components/elements/THead";

interface AssetProps {
  assets: Asset[];
  categories: Category[];
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
  token: string;
}

const AssetTable: React.FC<AssetProps> = ({
  token,
  assets,
  categories,
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
    if (categories.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, categories.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>Asset</THead>
                <THead>Category</THead>
                <THead>Manufacturer</THead>
                <THead>Department</THead>
                <THead>Purchase Date</THead>
                <THead>Action</THead>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className=" p-4">
                    <Puff
                      stroke="#1C64F2"
                      fill="#1C64F2"
                      width={70}
                      height={70}
                      className="m-0 p-0 content-center w-full"
                    />
                  </td>
                </tr>
              ) : assets.length > 0 ? (
                assets.map((asset: any) => (
                  <List
                    key={asset.id}
                    asset={asset}
                    setRefresh={setRefresh}
                    token={token}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">
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
export default AssetTable;
