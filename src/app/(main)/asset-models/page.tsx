"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/asset-model/ButtonCreate";
import AssetModelTable from "@/components/pages/asset-model/AssetModelTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";
import fetchData from "@/util/fetchWrapper";
export default function AssetModel() {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [assetmodels, setAssetModel] = useState([]);
  const [manufacturers, setManufacturer] = useState([]);
  const [categories, setCategory] = useState([]);
  const [depreciations, setDepreciation] = useState([]);
  const [fieldSets, setFieldSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getAssetModel = useCallback(async () => {
    const url = `asset-models?key=${keyword}&page=${page}&limit=${limit}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetModel(res.payload.data);
      setLimit(res.pagination.limit);
      setTotalPage(res.pagination.total_page);
      setTotalData(res.pagination.total_rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [keyword, limit, page]);
  async function searchAssetModel(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }
  const getFieldSet = useCallback(async () => {
    const url = `field-sets/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setFieldSet(res.payload.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [setFieldSet]);

  const getManufacturer = useCallback(async () => {
    const url = `manufacturers/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setManufacturer(res.payload.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategory = useCallback(async () => {
    const url = `category/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setCategory(res.payload.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getDepreciation = useCallback(async () => {
    const url = `depreciations/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setDepreciation(res.payload.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setAssetModel([]);
    getAssetModel();
    getFieldSet();
    getManufacturer();
    getCategory();
    getDepreciation();
    setRefresh(false);
  }, [
    page,
    keyword,
    getAssetModel,
    getFieldSet,
    getManufacturer,
    getCategory,
    getDepreciation,
    refresh,
  ]);

  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent title="Asset Model" subTitle="All asset model item" />
        <div className=" mb-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchAssetModel}
            placeholder={"Search custom field"}
          />
          <ButtonCreate
            setRefresh={setRefresh}
            manufacturers={manufacturers}
            categories={categories}
            depreciations={depreciations}
            fieldSets={fieldSets}
          />
        </div>
      </div>
      <AssetModelTable
        assetmodels={assetmodels}
        fieldsets={fieldSets}
        manufacturers={manufacturers}
        categories={categories}
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
