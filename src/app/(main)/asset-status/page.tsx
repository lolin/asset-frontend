"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonCreate from "@/components/pages/asset-status/ButtonCreate";
import AssetStatusTable from "@/components/pages/asset-status/AssetStatusTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";
import fetchData from "@/util/fetchWrapper";
export default function AssetStatus() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [companies, setAssetStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getAssetStatus = useCallback(async () => {
    const url = `asset-status?key=${keyword}&page=${page}&limit=${limit}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetStatus(res.payload.data);
      setLimit(res.pagination.limit);
      setTotalPage(res.pagination.total_page);
      setTotalData(res.pagination.total_rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [keyword, limit, page]);
  async function searchAssetStatus(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setAssetStatus([]);
    getAssetStatus();
    setRefresh(false);
  }, [getAssetStatus, refresh]);
  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent title="Asset Status" subTitle="All companies item" />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchAssetStatus}
            placeholder="Search asset type"
          />
          <ButtonCreate setRefresh={setRefresh} />
        </div>
      </div>
      <AssetStatusTable
        companies={companies}
        page={page}
        setPage={setPage}
        limit={limit}
        totalPage={totalPage}
        totalData={totalData}
        loading={loading}
        setLoading={setLoading}
        setRefresh={setRefresh}
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
