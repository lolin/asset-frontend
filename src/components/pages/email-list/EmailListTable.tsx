import { EmailList } from "@/types/email-list";
import List from "./EmailList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";

interface EmailListProps {
  emailListList: EmailList[];
  department: any;
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
}

const EmailListTable: React.FC<EmailListProps> = ({
  emailListList,
  department,
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
    if (emailListList.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, emailListList.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>EmailList</THead>
                <THead>Remote ID</THead>
                <THead>User</THead>
                <THead>Password</THead>
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
              ) : emailListList.length > 0 ? (
                emailListList.map((emailList: any) => (
                  <List
                    key={emailList.id}
                    emailList={emailList}
                    department={department}
                    setRefresh={setRefresh}
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
export default EmailListTable;
