"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/asset-status/ButtonCreate";
import AssetStatusTable from "@/components/pages/asset-status/AssetStatusTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

export default function AssetStatus() {
  const session = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [companies, setAssetStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";

  const getAssetStatus = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/asset-status?key=${keyword}&page=${page}&limit=${limit}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setAssetStatus(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);
  async function searchAssetStatus(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setAssetStatus([]);
    if (accessToken) {
      setToken(accessToken);
      getAssetStatus();
      setRefresh(false);
    }
  }, [page, keyword, getAssetStatus, refresh, accessToken]);
  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent title="Asset Status" subTitle="All companies item" />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchAssetStatus}
            placeholder="Search asset type"
          />
          <ButtonCreate setRefresh={setRefresh} token={token} />
        </div>
      </div>
      <AssetStatusTable
        token={token}
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
