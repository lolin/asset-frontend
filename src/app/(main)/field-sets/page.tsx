"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/field-set/ButtonCreate";
import FieldSetTable from "@/components/pages/field-set/FieldSetTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";
import fetchData from "@/util/fetchWrapper";
export default function FieldSet() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [fieldsets, setFieldSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getFieldSet = useCallback(async () => {
    const url = `field-sets?key=${keyword}&page=${page}&limit=${limit}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setFieldSet(res.payload.data);
      setLimit(res.pagination.limit);
      setTotalPage(res.pagination.total_page);
      setTotalData(res.pagination.total_rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [keyword, limit, page]);
  async function searchFieldSet(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setFieldSet([]);
    getFieldSet();
    setRefresh(false);
  }, [getFieldSet, refresh]);
  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent title="Field Set" subTitle="All field setie item" />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchFieldSet}
            placeholder="Search field-set"
          />
          <ButtonCreate setRefresh={setRefresh} />
        </div>
      </div>
      <FieldSetTable
        fieldsets={fieldsets}
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
