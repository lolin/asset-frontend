"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/asset-model/ButtonCreate";
import AssetModelTable from "@/components/pages/asset-model/AssetModelTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

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
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";
  const url = process.env.NEXT_PUBLIC_API_URL;

  const getAssetModel = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/asset-models?key=${keyword}&page=${page}&limit=${limit}`,
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
        setLoading(false);
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setAssetModel(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);
  async function searchAssetModel(e: any) {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    setKeyword(e.target.value);
  }
  const getFieldSet = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/field-sets?key=${keyword}&page=${page}&limit=1000`,
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
      setFieldSet(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, setFieldSet, keyword, page, url]);

  const getManufacturer = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/manufacturers?key=${keyword}&page=${page}&limit=1000`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        setLoading(false);
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setManufacturer(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, page, url]);

  const getCategory = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/category?key=${keyword}&page=${page}&limit=1000`,
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
      setCategory(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, page, url]);

  const getDepreciation = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/depreciations?key=${keyword}&page=${page}&limit=1000`,
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
        setLoading(false);
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setDepreciation(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, page, url]);

  useEffect(() => {
    setAssetModel([]);
    if (accessToken) {
      setToken(accessToken);
      getAssetModel();
      getFieldSet();
      getManufacturer();
      getCategory();
      getDepreciation();
      setRefresh(false);
    }
  }, [
    page,
    keyword,
    getAssetModel,
    getFieldSet,
    getManufacturer,
    getCategory,
    getDepreciation,
    refresh,
    accessToken,
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
            token={token}
            fieldSets={fieldSets}
          />
        </div>
      </div>
      <AssetModelTable
        token={token}
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
