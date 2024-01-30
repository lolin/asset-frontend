import Button from "@/components/elements/Button";
import SelectOption from "@/components/fragments/SelectOption";
import TextField from "@/components/fragments/TextField";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Puff } from "react-loading-icons";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";

type Props = {
  [key: string]: any;
};
const FormEdit = (props: { params: string }) => {
  const session = useSession();
  const router = useRouter();
  const param = props.params;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [keyword, setKeyword] = useState("");
  const [assetModel, setAssetModel] = useState([]);
  const [categories, setCategory] = useState([]);
  const [manufacturers, setManufacturer] = useState([]);
  const [fieldSets, setFieldSet] = useState([]);
  const [depreciations, setDepreciation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelName, setModelName] = useState<string>("");
  const [modelCategoryId, setModelCategoryId] = useState<number>();
  const [modelManufacturerId, setModelManufacturerId] = useState<number>();
  const [modelNumber, setModelNumber] = useState<string>("");
  const [modelDepreciationId, setModelDepreciationId] = useState<number>();
  const [modelFieldSetId, setModelFieldSetId] = useState<number>();
  const [modelNote, setModelNote] = useState<string>("");
  const [modelImageUrl, setModelImageUrl] = useState<string>("");

  const getAssetModel = useCallback(async () => {
    const url = `asset-models/${param}`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      if (res.payload.data !== null) {
        setAssetModel(res.payload.data);
        setModelName(res.payload.data.name);
        setModelCategoryId(res.payload.data.categoryId);
        setModelManufacturerId(res.payload.data.manufacturerId);
        setModelNumber(res.payload.data.modelNumber);
        setModelDepreciationId(res.payload.data.depreciationId);
        setModelFieldSetId(res.payload.data.fieldSetId);
        setModelNote(res.payload.data.notes);
        setModelImageUrl(res.payload.data.imageUrl);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [param]);
  const getCategories = useCallback(async () => {
    const url = `category/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setCategory(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getManufacturers = useCallback(async () => {
    const url = `manufacturers/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setManufacturer(res.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getFieldSet = useCallback(async () => {
    const url = `field-sets/all`;
    const method = "GET";
    const body = "";
    try {
      const res = await fetchData({ url, method, body });
      setFieldSet(res.payload.data);
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
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-models/${param}`;
    const method = "PATCH";
    const body = {
      name: modelName,
      imageUrl: modelImageUrl,
      modelNumber: modelNumber,
      manufacturerId: modelManufacturerId,
      categoryId: modelCategoryId,
      fieldSetId: modelFieldSetId,
      depreciationId: modelDepreciationId,
      notes: modelNote,
    };
    if (modelName !== "") {
      await fetchData({ url, method, body });
      toast.success("Asset edit successfully");
      router.push("/asset-models");
    }
  };

  useEffect(() => {
    getAssetModel();
    getCategories();
    getManufacturers();
    getFieldSet();
    getDepreciation();
  }, [
    getAssetModel,
    getCategories,
    getManufacturers,
    getFieldSet,
    getDepreciation,
  ]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border-t-2">
          <div className="m-5 text-gray-600">
            {loading ? (
              <table>
                <tbody>
                  <tr>
                    <td colSpan={5} className=" p-4">
                      <Puff
                        stroke="#1C64F2"
                        fill="#1C64F2"
                        width={70}
                        height={70}
                        className="m-0 p-0 content-center w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : modelName.length > 0 ? (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                autoComplete="off"
              >
                <h3 className="font-bold text-lg">Add Asset</h3>
                <div className="mt-4">
                  <div className="w-1/2">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <TextField
                        name={"model_name"}
                        label={"Model Name"}
                        inputValue={modelName}
                        setValue={setModelName}
                        required={true}
                        type="text"
                        placeholder="Model name"
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <SelectOption
                        name={"category"}
                        label={"Category"}
                        required={true}
                        inputValue={modelCategoryId}
                        setValue={setModelCategoryId}
                        valueType={"number"}
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
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
                        name={"manufacturer"}
                        label={"Manufacturer"}
                        required={true}
                        inputValue={modelManufacturerId}
                        setValue={setModelManufacturerId}
                        valueType={"number"}
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
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
                      <TextField
                        name={"model_name"}
                        label={"Model No."}
                        inputValue={modelNumber}
                        setValue={setModelNumber}
                        required={true}
                        type="text"
                        placeholder=""
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <SelectOption
                        name={"depreciation"}
                        label={"Depreciation"}
                        required={true}
                        inputValue={modelDepreciationId}
                        setValue={setModelDepreciationId}
                        valueType={"number"}
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {depreciations.map((item: any) => (
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
                        name={"fieldSet"}
                        label={"Field Set"}
                        required={true}
                        inputValue={modelFieldSetId}
                        setValue={setModelFieldSetId}
                        valueType={"number"}
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
                      >
                        <option className="mb-2 pb-2">&nbsp;</option>
                        {fieldSets.map((item: any) => (
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
                        name={"note"}
                        label={"Note"}
                        inputValue={modelNote}
                        setValue={setModelNote}
                        required={false}
                        type="text"
                        placeholder=""
                        style={""}
                        divStyle="md:w-full mb-6 md:mb-0"
                      />
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                  <div className="flex flex-wrap -mx-3 mb-0">
                    <div className="w-full px-3">
                      <Button
                        text={"Submit"}
                        type={"submit"}
                        style={"float-right"}
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div>data kosong</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormEdit;
