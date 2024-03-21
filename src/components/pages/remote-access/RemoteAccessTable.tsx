import { RemoteAccess } from "@/types/remote-access";
import List from "./RemoteAccessList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";

interface RemoteAccessProps {
  remoteAccessList: RemoteAccess[];
  asset: any;
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
}

const RemoteAccessTable: React.FC<RemoteAccessProps> = ({
  remoteAccessList,
  asset,
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
    if (remoteAccessList.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, remoteAccessList.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>RemoteAccess</THead>
                <THead>Remote ID</THead>
                <THead>User</THead>
                <THead>Password</THead>
                <THead>Source</THead>
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
              ) : remoteAccessList.length > 0 ? (
                remoteAccessList.map((remoteAccess: any) => (
                  <List
                    key={remoteAccess.id}
                    remoteAccess={remoteAccess}
                    asset={asset}
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
export default RemoteAccessTable;
