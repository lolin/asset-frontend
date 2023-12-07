"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/department/ButtonCreate";
import DepartmentTable from "@/components/pages/department/DepartmentTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

export default function Department() {
  const session = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [categories, setDepartment] = useState([]);
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";

  const getDepartment = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/departments?key=${keyword}&page=${page}&limit=${limit}`,
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
      setDepartment(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);

  const getCompany = useCallback(async () => {
    try {
      const res = await fetch(`${url}/company?key=&page=&limit=0`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setCompany(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, url]);
  async function searchDepartment(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setDepartment([]);
    if (accessToken) {
      setToken(accessToken);
      getDepartment();
      setRefresh(false);
    }
  }, [page, keyword, getDepartment, refresh, accessToken]);

  useEffect(() => {
    if (accessToken) {
      getCompany();
    }
  }, [accessToken, getCompany]);
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Department" subTitle="All departments item" />
        <div className="flex items-center justify-between">
          <SearchComponent
            searchData={searchDepartment}
            placeholder="Search department"
          />
          <ButtonCreate
            setRefresh={setRefresh}
            token={token}
            company={company}
          />
        </div>
      </div>
      <DepartmentTable
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
        company={company}
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
