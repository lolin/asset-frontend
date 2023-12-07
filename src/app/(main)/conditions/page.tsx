"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/condition/ButtonCreate";
import ConditionTable from "@/components/pages/condition/ConditionTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

export default function Condition() {
  const session = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [categories, setCondition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";

  const getCondition = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/conditions?key=${keyword}&page=${page}&limit=${limit}`,
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
      setCondition(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);
  async function searchCondition(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setCondition([]);
    if (accessToken) {
      setToken(accessToken);
      getCondition();
      setRefresh(false);
    }
  }, [page, keyword, getCondition, refresh, accessToken]);
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Condition" subTitle="All conditions item" />
        <div className="flex items-center justify-between">
          <SearchComponent
            searchData={searchCondition}
            placeholder="Search condition"
          />
          <ButtonCreate setRefresh={setRefresh} token={token} />
        </div>
      </div>
      <ConditionTable
        token={token}
        categories={categories}
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
