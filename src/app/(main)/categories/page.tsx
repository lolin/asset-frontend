"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonCreate from "@/components/pages/category/ButtonCreate";
import CategoryTable from "@/components/pages/category/CategoryTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";
import fetchData from "@/util/fetchWrapper";

export default function Category() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [categories, setCategory] = useState([]);
  const [assetTypes, setAssetType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getCategory = useCallback(async () => {
    const url = `category?key=${keyword}&page=${page}&limit=${limit}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setCategory(res.payload.data);
      setLimit(res.pagination.limit);
      setTotalPage(res.pagination.total_page);
      setTotalData(res.pagination.total_rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [keyword, limit, page]);

  const getAssetType = useCallback(async () => {
    const url = `asset-type/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetType(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  async function searchCategory(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }

  useEffect(() => {
    setCategory([]);
    getCategory();
    getAssetType();
    setRefresh(false);
  }, [getCategory, getAssetType, refresh]);

  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent title="Categories" subTitle="All categories item" />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchCategory}
            placeholder={"Search category"}
          />
          <ButtonCreate setRefresh={setRefresh} assetTypes={assetTypes} />
        </div>
      </div>
      <CategoryTable
        categories={categories}
        assetTypes={assetTypes}
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
