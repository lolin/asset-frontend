import { Depreciation } from "@/types/depreciation";
import List from "./DepreciationList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";

interface DepreciationProps {
  depreciations: Depreciation[];
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

const DepreciationTable: React.FC<DepreciationProps> = ({
  token,
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
    if (depreciations.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, depreciations.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>Name</THead>
                <THead>Term</THead>
                <THead>Floor Value</THead>
                <THead>Action</THead>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className=" p-4">
                    <Puff
                      stroke="#1C64F2"
                      fill="#1C64F2"
                      width={70}
                      height={70}
                      className="m-0 p-0 content-center w-full"
                    />
                  </td>
                </tr>
              ) : depreciations.length > 0 ? (
                depreciations.map((depreciation: any) => (
                  <List
                    key={depreciation.id}
                    depreciation={depreciation}
                    setRefresh={setRefresh}
                    token={token}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center p-4">
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
export default DepreciationTable;
