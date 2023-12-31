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
import CurrencyInput from "react-currency-input-field";
import { id } from "date-fns/locale";
type Props = {
  [key: string]: any;
};
const FormCreate: React.FC = ({ ...props }: Props) => {
  const session = useSession();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = session.data?.user.accessToken || "";
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategory] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [manufacturers, setBrand] = useState([]);
  const [vendors, setVendor] = useState([]);
  const [assetStatusList, setAssetStatusList] = useState([]);
  const [assetModels, setAssetModels] = useState([]);
  const [assetName, setAssetName] = useState<string>("");
  const [assetCategoryId, setAssetCategoryId] = useState<number>();
  const [assetDepartmentId, setAssetDepartmentId] = useState<number>();
  const [assetBrandId, setAssetBrandId] = useState<number>();
  const [assetVendorId, setAssetVendorId] = useState<number>();
  const [assetStatusId, setAssetStatusId] = useState<number>();
  const [assetModel, setAssetModel] = useState<string>("");
  const [assetSerialNumber, setAssetSerialNumber] = useState<string>("");
  const [assetMacAddress, setAssetMacAddress] = useState<string>("");
  const [assetIpAddress, setAssetIpAddress] = useState<string>("");
  const [assetDetail, setAssetDetail] = useState<string>("");
  const [assetPrice, setAssetPrice] = useState<number>(0);
  const [assetPurchaseDate, setAssetPurchaseDate] = useState<any>();
  const [assetWarantyPeriod, setAssetWarantyPeriod] = useState<any>();
  const [lastId, setLastId] = useState<string>("");
  const [customFields, setCustomFields] = useState([]);
  const initialDataArray = [
    {
      id: "1",
      fieldId: "",
      fieldName: "",
      fieldType: "",
      fieldValue: "",
      fieldFormat: "",
      helperText: "",
      inputValue: "",
    },
  ];
  const [inputFields, setInputFields] = useState(initialDataArray);

  const generateId = (num: number) => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return "INVIT" + year + month + num.toString().padStart(6, "0");
  };

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
        console.log(res);
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
  const getLastId = useCallback(async () => {
    console.log(accessToken);
    try {
      const res = await fetch(`${url}/assets/lastid`, {
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
      if (data.data.length > 0) {
        setAssetName(data.data.id + 1);
      } else {
        setAssetName(generateId(1));
      }
      // setLastId(data.data.id);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, url]);
  const getAssetModel = useCallback(async () => {
    try {
      const res = await fetch(`${url}/asset-models?key=&page1&limit=1000`, {
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
        toast.error("Failed to fetch data");
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setAssetModels(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, url]);
  const getAssetStatus = useCallback(async () => {
    try {
      const res = await fetch(`${url}/asset-status?key=&page=1&limit=1000`, {
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
      setAssetStatusList(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, url]);
  const getCustomField = useCallback(
    async (id: any) => {
      console.log(id);
      try {
        const res = await fetch(
          `${url}/custom-fields/get-by-model/data?id=${id}`,
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
        setCustomFields(data.data);
      } catch (error) {
        console.log(error);
      }
    },
    [accessToken, url]
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (assetName !== "" && accessToken) {
      const res = await fetch(`${url}/assets`, {
        cache: "no-store",
        method: "POST",
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
          conditionId: assetStatusId,
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
      console.log(res);
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
          console.log(res);
        }
        throw new Error("Failed to fetch data");
      }

      toast.success("Asset added successfully");
      router.push("/assets");
    }
  };
  useEffect(() => {
    if (accessToken) {
      getLastId();
      getDepartments();
      getVendors();
      getAssetStatus();
      getAssetModel();
    }
  }, [
    accessToken,
    getLastId,
    getDepartments,
    getVendors,
    getAssetStatus,
    getAssetModel,
  ]);

  useEffect(() => {
    if (assetModel !== "") {
      getCustomField(assetModel);
    } else {
      setCustomFields([]);
    }
  }, [assetModel, getCustomField]);

  useEffect(() => {
    const initialData: {
      id: string;
      fieldId: any;
      fieldName: any;
      fieldType: any;
      fieldValue: any;
      fieldFormat: any;
      helperText: any;
      inputValue: string;
    }[] = [];
    if (customFields.length > 0) {
      customFields.map((item: any, index) => {
        initialData.push({
          id: (index + 1).toString(),
          fieldId: item.id,
          fieldName: item.fieldName,
          fieldType: item.fieldType,
          fieldValue: item.fieldValue,
          fieldFormat: item.fieldFormat || "",
          helperText: item.helperText,
          inputValue: "",
        });
      });
    } else {
      initialData.push({
        id: "1",
        fieldId: "",
        fieldName: "",
        fieldType: "",
        fieldValue: "",
        fieldFormat: "",
        helperText: "",
        inputValue: "",
      });
    }
    setInputFields(initialData);
  }, [customFields]);

  console.log(customFields);
  console.log(inputFields);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-gray-50 border-t-2">
          <div className="m-5 ">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h3 className="font-bold text-lg">Add Asset</h3>
              <div className="mt-4 w-full flex gap-6">
                <div className="w-1/2">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <TextField
                      name={"name"}
                      label={"Barcode"}
                      inputValue={assetName}
                      setValue={setAssetName}
                      readOnly={true}
                      required={true}
                      type="text"
                      placeholder="Name"
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <SelectOption
                      name={"department"}
                      label={"Department"}
                      required={true}
                      inputValue={assetDepartmentId}
                      setValue={setAssetDepartmentId}
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
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
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <SelectOption
                      name={"model"}
                      label={"Model"}
                      required={true}
                      inputValue={assetModel}
                      setValue={setAssetModel}
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    >
                      <option className="mb-2 pb-2">&nbsp;</option>
                      {assetModels.map((item: any) => (
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
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <TextField
                      name={"serialNumber"}
                      label={"Seial Number"}
                      inputValue={assetSerialNumber}
                      setValue={setAssetSerialNumber}
                      required={false}
                      type="text"
                      placeholder="XX-XX-XX"
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <SelectOption
                      name={"vendor"}
                      label={"Vendor"}
                      required={true}
                      inputValue={assetVendorId}
                      setValue={setAssetVendorId}
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
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
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <SelectOption
                      name={"assetstatus"}
                      label={"Status"}
                      required={true}
                      inputValue={assetStatusId}
                      setValue={setAssetStatusId}
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    >
                      <option className="mb-2 pb-2">&nbsp;</option>
                      {assetStatusList.map((item: any) => (
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
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <TextField
                      name={"macAddress"}
                      label={"Mac Address"}
                      inputValue={assetMacAddress}
                      setValue={setAssetMacAddress}
                      required={true}
                      type="text"
                      placeholder="XX:XX:XX:XX:XX:XX"
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <TextField
                      name={"ipAddress"}
                      label={"IP Addres"}
                      inputValue={assetIpAddress}
                      setValue={setAssetIpAddress}
                      required={false}
                      type="text"
                      placeholder="192.x.x.x"
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <Label htmlFor={"price"} label={"Price"} />
                      <CurrencyInput
                        id="price"
                        name="price"
                        placeholder="Please enter a number"
                        defaultValue={assetPrice}
                        decimalsLimit={2}
                        onChange={(e) => {
                          return setAssetPrice(Number(e.target.value));
                        }}
                        className="input input-bordered w-full max-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <TextArea
                      name={"detail"}
                      row={6}
                      label={"Detail Specification"}
                      inputValue={assetDetail}
                      setValue={setAssetDetail}
                      required={false}
                      placeholder="Processor: Intel Core i7-"
                      style={"white-space: pre-wrap"}
                      divStyle="md:w-full mb-2 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className={`w-full px-3 md:w-full mb-2 md:mb-0`}>
                      <Label htmlFor={"purchaseDate"} label={"Purchase Date"} />
                      <DatePicker
                        name="purchaseDate"
                        selected={assetPurchaseDate}
                        onChange={(date) => setAssetPurchaseDate(date)}
                        className="input input-bordered w-full max-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className={`w-full px-3 md:w-full mb-2 md:mb-0`}>
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
                <div className="w-1/2 ">
                  {inputFields.map((item: any) => (
                    <div className="flex flex-wrap -mx-3 mb-2" key={item.id}>
                      {item.fieldType === "text" && (
                        <div className={`w-full px-3 md:w-full mb-2 md:mb-0`}>
                          <Label
                            htmlFor={item.fieldName}
                            label={item.fieldName}
                          />
                          <input
                            id={props.name}
                            name={item.fieldName}
                            required={true}
                            value={item.inputValue}
                            onChange={(e) =>
                              setInputFields(
                                inputFields.map((field: any) => {
                                  if (field.id === item.id) {
                                    return {
                                      ...field,
                                      inputValue: e.target.value,
                                    };
                                  }
                                  return field;
                                })
                              )
                            }
                            type={item.fieldType}
                            placeholder={item.helperText}
                            className={`input input-bordered w-full max-ful`}
                          />
                        </div>
                      )}
                      {item.fieldType === "list" && (
                        <div className={`w-full px-3 md:w-full mb-2 md:mb-0`}>
                          <Label
                            htmlFor={item.fieldName}
                            label={item.fieldName}
                          />
                          <select
                            id={item.id}
                            name={item.fieldName}
                            value={item.inputValue}
                            className={`select select-bordered w-full p-2.5`}
                            onChange={(e) =>
                              setInputFields(
                                inputFields.map((field: any) => {
                                  if (field.id === item.id) {
                                    return {
                                      ...field,
                                      inputValue: e.target.value,
                                    };
                                  }
                                  return field;
                                })
                              )
                            }
                          >
                            <option className="mb-2 pb-2">&nbsp;</option>

                            {item.fieldValue.split("\n").map((item: any) => (
                              <option
                                key={item}
                                value={item}
                                className="mb-2 pb-2"
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormCreate;
