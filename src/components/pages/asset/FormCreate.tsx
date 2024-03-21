import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import SelectOption from "@/components/fragments/SelectOption";
import TextArea from "@/components/fragments/TextArea";
import TextField from "@/components/fragments/TextField";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import fetchData from "@/util/fetchWrapper";
type Props = {
  [key: string]: any;
};
const FormCreate: React.FC = ({ ...props }: Props) => {
  const router = useRouter();
  const [departments, setDepartment] = useState([]);
  const [vendors, setVendor] = useState([]);
  const [assetStatusList, setAssetStatusList] = useState([]);
  const [assetConditionList, setAssetConditionList] = useState([]);
  const [assetModels, setAssetModels] = useState([]);
  const [assetName, setAssetName] = useState<string>("");
  const [assetDepartmentId, setAssetDepartmentId] = useState<number>();
  const [assetVendorId, setAssetVendorId] = useState<number>();
  const [assetStatusId, setAssetStatusId] = useState<number>();
  const [assetConditionId, setAssetConditionId] = useState<number>();
  const [assetModel, setAssetModel] = useState<string>("");
  const [assetSerialNumber, setAssetSerialNumber] = useState<string>("");
  const [assetMacAddress, setAssetMacAddress] = useState<string>("");
  const [assetDetail, setAssetDetail] = useState<string>("");
  const [assetPrice, setAssetPrice] = useState<number>(0);
  const [assetPurchaseDate, setAssetPurchaseDate] = useState<any>();
  const [assetWarantyPeriod, setAssetWarantyPeriod] = useState<any>();
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
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return "INVIT" + year + month + num.toString().padStart(6, "0");
  };

  const getDepartments = useCallback(async () => {
    const url = `departments/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setDepartment(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [setDepartment]);
  const getVendors = useCallback(async () => {
    const url = `vendors/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setVendor(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [setVendor]);
  const getLastId = useCallback(async () => {
    const url = `assets/lastid`;
    const method = "GET";
    const body = "";
    try {
      const data = await fetchData({ url, method, body });
      if (data.payload.data.length > 0) {
        setAssetName(generateId(data.payload.data[0].id + 1));
      } else {
        setAssetName(generateId(1));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setAssetName]);
  const getAssetModel = useCallback(async () => {
    const url = `asset-models/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetModels(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAssetModels]);
  const getAssetStatus = useCallback(async () => {
    const url = `asset-status/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetStatusList(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAssetStatusList]);
  const getAssetCondition = useCallback(async () => {
    const url = `conditions/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setAssetConditionList(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAssetConditionList]);
  const getCustomField = useCallback(
    async (id: any) => {
      const url = `custom-fields/get-by-model/data?id=${id}`;
      const method = "GET";
      const body = "";
      try {
        const res = await fetchData({ url, method, body });
        setCustomFields(res.payload.data);
      } catch (error) {
        console.log(error);
      }
    },
    [setCustomFields]
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `assets`;
    const method = "POST";
    const body = {
      name: assetName,
      departmentId: assetDepartmentId,
      assetModelId: assetModel,
      assetStatusId: assetStatusId,
      assetConditionId: assetConditionId,
      serialNumber: assetSerialNumber,
      vendorId: assetVendorId,
      macAddress: assetMacAddress,
      price: assetPrice,
      assetDetails: assetDetail,
      purchaseDate: assetPurchaseDate,
      warantyPeriod: assetWarantyPeriod,
      customFields: inputFields,
    };
    if (assetName !== "") {
      await fetchData({ url, method, body });
      toast.success("Asset added successfully");
      router.push("/assets");
    }
  };
  useEffect(() => {
    getLastId();
    getDepartments();
    getVendors();
    getAssetStatus();
    getAssetCondition();
    getAssetModel();
  }, [
    getLastId,
    getDepartments,
    getVendors,
    getAssetStatus,
    getAssetCondition,
    getAssetModel,
  ]);

  useEffect(() => {
    if (Number(assetModel) > 0) {
      getCustomField(assetModel);
    } else {
      setCustomFields([]);
      setInputFields([]);
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
                    <div className="w-full px-3">
                      <Label htmlFor={"price"} label={"Price"} />
                      <CurrencyInput
                        id="price"
                        name="price"
                        placeholder="Please enter a number"
                        defaultValue={assetPrice}
                        decimalsLimit={2}
                        onChange={(e) => {
                          return setAssetPrice(
                            Number(e.target.value.replace(/,/g, ""))
                          );
                        }}
                        className="input input-bordered w-full max-full text-slate-800"
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
                    <SelectOption
                      name={"assetcondition"}
                      label={"Condition"}
                      required={true}
                      inputValue={assetConditionId}
                      setValue={setAssetConditionId}
                      style={""}
                      divStyle="md:w-full mb-2 md:mb-0"
                    >
                      <option className="mb-2 pb-2">&nbsp;</option>
                      {assetConditionList.map((item: any) => (
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
                    <div className={`w-full px-3 md:w-full mb-2 md:mb-0`}>
                      <Label htmlFor={"purchaseDate"} label={"Purchase Date"} />
                      <DatePicker
                        name="purchaseDate"
                        selected={assetPurchaseDate}
                        onChange={(date) => setAssetPurchaseDate(date)}
                        className="input input-bordered w-full max-full text-slate-800"
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
                        className="input input-bordered w-full max-full text-slate-800"
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
                  {inputFields.length > 0
                    ? inputFields.map((item: any) => (
                        <div
                          className="flex flex-wrap -mx-3 mb-2"
                          key={item.id}
                        >
                          {item.fieldType === "text" && (
                            <div
                              className={`w-full px-3 md:w-full mb-2 md:mb-0`}
                            >
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
                                className={`input input-bordered w-full max-ful text-slate-800`}
                              />
                            </div>
                          )}
                          {item.fieldType === "list" && (
                            <div
                              className={`w-full px-3 md:w-full mb-2 md:mb-0`}
                            >
                              <Label
                                htmlFor={item.fieldName}
                                label={item.fieldName}
                              />
                              <select
                                id={item.id}
                                name={item.fieldName}
                                value={item.inputValue}
                                className={`select select-bordered w-full p-2.5 text-slate-800`}
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

                                {item.fieldValue
                                  .split("\n")
                                  .map((item: any) => (
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
                      ))
                    : ""}
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
