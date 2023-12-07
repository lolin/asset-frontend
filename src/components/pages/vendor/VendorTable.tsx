import { Vendor } from "@/types/vendor";
import List from "./VendorList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";

interface VendorProps {
  categories: Vendor[];
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

const VendorTable: React.FC<VendorProps> = ({
  token,
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
                <THead>Vendor</THead>
                <THead>Phone</THead>
                <THead>Website</THead>
                <THead>Address</THead>
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
              ) : categories.length > 0 ? (
                categories.map((vendor: any) => (
                  <List
                    key={vendor.id}
                    vendor={vendor}
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
export default VendorTable;
