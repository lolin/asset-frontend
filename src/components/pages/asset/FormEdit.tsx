import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import SelectOption from "@/components/fragments/SelectOption";
import TextArea from "@/components/fragments/TextArea";
import TextField from "@/components/fragments/TextField";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
// type Props = {
//   [key: string]: any;
// };
const FormEdit = (props: { params: string }) => {
  const session = useSession();
  const router = useRouter();
  const param = props.params;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = session.data?.user.accessToken || "";
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategory] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [manufacturers, setBrand] = useState([]);
  const [vendors, setVendor] = useState([]);
  const [conditions, setCondition] = useState([]);
  const [asset, setAsset] = useState([]);
  const [assetName, setAssetName] = useState<string>("");
  const [assetCategoryId, setAssetCategoryId] = useState<number>();
  const [assetDepartmentId, setAssetDepartmentId] = useState<number>();
  const [assetBrandId, setAssetBrandId] = useState<number>();
  const [assetVendorId, setAssetVendorId] = useState<number>();
  const [assetConditionId, setAssetConditionId] = useState<number>();
  const [assetModel, setAssetModel] = useState<string>("");
  const [assetSerialNumber, setAssetSerialNumber] = useState<string>("");
  const [assetMacAddress, setAssetMacAddress] = useState<string>("");
  const [assetIpAddress, setAssetIpAddress] = useState<string>("");
  const [assetDetail, setAssetDetail] = useState<string>("");
  const [assetPrice, setAssetPrice] = useState<number>();
  const [assetPurchaseDate, setAssetPurchaseDate] = useState<any>();
  const [assetWarantyPeriod, setAssetWarantyPeriod] = useState<any>();

  const getCategories = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/category?key=${keyword}&page=${page}&limit=${limit}`,
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
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);
  const getDepartments = useCallback(async () => {
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
        // console.log(res);
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setDepartment(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);
  const getVendors = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/vendors?key=${keyword}&page=${page}&limit=${limit}`,
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
      setVendor(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);
  const getBrands = useCallback(async () => {
    try {
      const res = await fetch(
        `${url}/manufacturers?key=${keyword}&page=${page}&limit=${limit}`,
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
      setBrand(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);
  const getConditions = useCallback(async () => {
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
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);

  const getAsset = useCallback(async () => {
    try {
      const res = await fetch(`${url}/assets/${param}`, {
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
      setAsset(data.data);
      setAssetName(data.data.name);
      setAssetCategoryId(Number(data.data.categoryId));
      setAssetDepartmentId(Number(data.data.departmentId));
      setAssetBrandId(Number(data.data.brandId));
      setAssetVendorId(Number(data.data.vendorId));
      setAssetConditionId(Number(data.data.conditionId));
      setAssetModel(data.data.model);
      setAssetSerialNumber(data.data.serialNumber);
      setAssetMacAddress(data.data.macAddress);
      setAssetIpAddress(data.data.ipAddress);
      setAssetPrice(data.data.price);
      setAssetDetail(data.data.assetDetails);
      setAssetPurchaseDate(new Date(data.data.purchaseDate));
      setAssetWarantyPeriod(new Date(data.data.warantyPeriod));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, param, url]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (assetName !== "" && accessToken) {
      const res = await fetch(`${url}/assets/${param}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: assetName,
          categoryId: assetCategoryId,
          departmentId: assetDepartmentId,
          brandId: assetBrandId,
          vendorId: assetVendorId,
          conditionId: assetConditionId,
          model: assetModel,
          serialNumber: assetSerialNumber,
          macAddress: assetMacAddress,
          ipAddress: assetIpAddress,
          price: assetPrice,
          assetDetails: assetDetail,
          purchaseDate: assetPurchaseDate,
          warantyPeriod: assetWarantyPeriod,
        }),
      });
      // console.log(res);
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
          // console.log(res);
        }
        throw new Error("Failed to fetch data");
      }

      toast.success("Asset added successfully");
      router.push("/assets");
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAsset();
      getCategories();
      getDepartments();
      getBrands();
      getVendors();
      getConditions();
    }
  }, [
    accessToken,
    getAsset,
    getCategories,
    getDepartments,
    getBrands,
    getVendors,
    getConditions,
  ]);

  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-gray-50 border-t-2">
          <div className="m-5 ">
            {asset ? (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h3 className="font-bold text-lg">Add Asset</h3>
                <div className="mt-4">
                  <div className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <TextField
                        name={"name"}
                        label={"Name"}
                        inputValue={assetName}
                        setValue={setAssetName}
                        required={true}
                        type="text"
                        placeholder="Name"
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                      <SelectOption
                        name={"category"}
                        label={"Category"}
                        required={true}
                        inputValue={assetCategoryId}
                        setValue={setAssetCategoryId}
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {categories.map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="mb-2 pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                      </SelectOption>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <SelectOption
                        name={"department"}
                        label={"Department"}
                        required={true}
                        inputValue={assetDepartmentId}
                        setValue={setAssetDepartmentId}
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {departments.map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="mb-2 pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                      </SelectOption>
                      <SelectOption
                        name={"manufacturer"}
                        label={"Manufacturer"}
                        required={true}
                        inputValue={assetBrandId}
                        setValue={setAssetBrandId}
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {manufacturers.map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="mb-2 pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                      </SelectOption>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <SelectOption
                        name={"vendor"}
                        label={"Vendor"}
                        required={true}
                        inputValue={assetVendorId}
                        setValue={setAssetVendorId}
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {vendors.map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="mb-2 pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                      </SelectOption>
                      <SelectOption
                        name={"condition"}
                        label={"Condition"}
                        required={true}
                        inputValue={assetConditionId}
                        setValue={setAssetConditionId}
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {conditions.map((item: any) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="mb-2 pb-2"
                          >
                            {item.name}
                          </option>
                        ))}
                      </SelectOption>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <TextField
                        name={"model"}
                        label={"Model"}
                        inputValue={assetModel}
                        setValue={setAssetModel}
                        required={true}
                        type="text"
                        placeholder="Model"
                        style={"Model"}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                      <TextField
                        name={"serialNumber"}
                        label={"Seial Number"}
                        inputValue={assetSerialNumber}
                        setValue={setAssetSerialNumber}
                        required={false}
                        type="text"
                        placeholder="XX-XX-XX"
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <TextField
                        name={"macAddress"}
                        label={"Mac Address"}
                        inputValue={assetMacAddress}
                        setValue={setAssetMacAddress}
                        required={true}
                        type="text"
                        placeholder="XX:XX:XX:XX:XX:XX"
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                      <TextField
                        name={"ipAddress"}
                        label={"IP Addres"}
                        inputValue={assetIpAddress}
                        setValue={setAssetIpAddress}
                        required={false}
                        type="text"
                        placeholder="192.168.1.1"
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <TextField
                        name={"price"}
                        label={"Price"}
                        inputValue={assetPrice}
                        setValue={setAssetPrice}
                        required={false}
                        type="number"
                        placeholder="10.000.000"
                        style={""}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                      <TextArea
                        name={"detail"}
                        row={6}
                        label={"Detail Specification"}
                        inputValue={assetDetail}
                        setValue={setAssetDetail}
                        required={false}
                        placeholder="Processor: Intel Core i7-"
                        style={"white-space: pre-wrap"}
                        divStyle="md:w-1/2 mb-6 md:mb-0"
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className={`w-full px-3 md:w-1/2 mb-6 md:mb-0`}>
                        <Label
                          htmlFor={"purchaseDate"}
                          label={"Purchase Date"}
                        />
                        <DatePicker
                          name="purchaseDate"
                          selected={assetPurchaseDate}
                          onChange={(date) => setAssetPurchaseDate(date)}
                          className="input input-bordered w-full max-full"
                        />
                      </div>
                      <div className={`w-full px-3 md:w-1/2 mb-6 md:mb-0`}>
                        <Label
                          htmlFor={"warrantyPeriod"}
                          label={"Warranty Expiry"}
                        />
                        <DatePicker
                          name="warrantyPeriod"
                          selected={assetWarantyPeriod}
                          onChange={(date) => setAssetWarantyPeriod(date)}
                          className="input input-bordered w-full max-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-0">
                      <div className="w-full px-3">
                        <Button
                          text={"Submit"}
                          type={"submit"}
                          style={"bg-indigo-600 float-right"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center">Data not found!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormEdit;
