"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/depreciation/ButtonCreate";
import DepreciationTable from "@/components/pages/depreciation/DepreciationTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

export default function Depreciation() {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [depreciations, setDepreciation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";
  const url = process.env.NEXT_PUBLIC_API_URL;

  const getDepreciation = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/depreciations?key=${keyword}&page=${page}&limit=${limit}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(accessToken);
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        setLoading(false);
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setDepreciation(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);
  async function searchDepreciation(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setDepreciation([]);
    if (accessToken) {
      setToken(accessToken);
      getDepreciation();
      setRefresh(false);
    }
  }, [page, keyword, getDepreciation, refresh, accessToken]);

  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent
          title="Depreciations"
          subTitle="All depreciations item"
        />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchDepreciation}
            placeholder={"Search depreciation"}
          />
          <ButtonCreate setRefresh={setRefresh} token={token} />
        </div>
      </div>
      <DepreciationTable
        token={token}
        depreciations={depreciations}
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
