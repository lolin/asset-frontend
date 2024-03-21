"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonCreate from "@/components/pages/remote-access/ButtonCreate";
import RemoteAccessTable from "@/components/pages/remote-access/RemoteAccessTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";
import fetchData from "@/util/fetchWrapper";
export default function RemoteAccess() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [remoteAccessList, setRemoteAccessList] = useState([]);
  const [asset, setAsset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getRemoteAccess = useCallback(async () => {
    const url = `remote-access?key=${keyword}&page=${page}&limit=${limit}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setRemoteAccessList(res.payload.data);
      setLimit(res.pagination.limit);
      setTotalPage(res.pagination.total_page);
      setTotalData(res.pagination.total_rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [keyword, limit, page]);

  const getAsset = useCallback(async () => {
    const url = `assets/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAsset(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  async function searchRemoteAccess(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setRemoteAccessList([]);
    getRemoteAccess();
    setRefresh(false);
  }, [getRemoteAccess, refresh]);

  useEffect(() => {
    getAsset();
  }, [getAsset]);
  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent
          title="RemoteAccess"
          subTitle="All RemoteAccesss item"
        />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchRemoteAccess}
            placeholder="Search RemoteAccess"
          />
          <ButtonCreate setRefresh={setRefresh} asset={asset} />
        </div>
      </div>
      <RemoteAccessTable
        remoteAccessList={remoteAccessList}
        page={page}
        setPage={setPage}
        limit={limit}
        totalPage={totalPage}
        totalData={totalData}
        loading={loading}
        setLoading={setLoading}
        setRefresh={setRefresh}
        asset={asset}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
