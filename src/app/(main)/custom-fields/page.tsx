"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ButtonCreate from "@/components/pages/custom-field/ButtonCreate";
import CustomFieldTable from "@/components/pages/custom-field/CustomFieldTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import SearchComponent from "@/components/utility/SearchComponent";

export default function CustomField() {
  const session = useSession();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [customfields, setCustomField] = useState([]);
  const [fieldSets, setFieldSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState("");
  const accessToken = session.data?.user.accessToken || "";
  const url = process.env.NEXT_PUBLIC_API_URL;

  const getCustomField = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/custom-fields?key=${keyword}&page=${page}&limit=${limit}`,
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
      setCustomField(data.data);
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, keyword, limit, page, url]);
  async function searchCustomField(e: any) {
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
      setLimit(data.limit);
      setTotalPage(data.totalPage);
      setTotalData(data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, setFieldSet, keyword, page, url]);

  useEffect(() => {
    setCustomField([]);
    if (accessToken) {
      setToken(accessToken);
      getCustomField();
      getFieldSet();
      setRefresh(false);
    }
  }, [page, keyword, getCustomField, getFieldSet, refresh, accessToken]);

  return (
    <div className="bg-white p-8 rounded-md w-full shadow-xl">
      <div className=" mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderCompnent
          title="Custom Fields"
          subTitle="All custom fields item"
        />
        <div className=" mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <SearchComponent
            searchData={searchCustomField}
            placeholder={"Search custom field"}
          />
          <ButtonCreate
            setRefresh={setRefresh}
            token={token}
            fieldSets={fieldSets}
          />
        </div>
      </div>
      <CustomFieldTable
        token={token}
        customfields={customfields}
        fieldsets={fieldSets}
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
