import { Department } from "@/types/department";
import List from "./DepartmentList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";

interface DepartmentProps {
  categories: Department[];
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
  token: string;
  company: any;
}

const DepartmentTable: React.FC<DepartmentProps> = ({
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
  company,
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
                <THead>Department</THead>
                <THead>Company</THead>
                <THead>Action</THead>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className=" p-4">
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
                categories.map((department: any) => (
                  <List
                    key={department.id}
                    department={department}
                    company={company}
                    setRefresh={setRefresh}
                    token={token}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4">
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
export default DepartmentTable;
