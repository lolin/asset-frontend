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
  const [manufacturers, setManufacturer] = useState([]);
  const [fieldSets, setFieldSet] = useState([]);
  const [depreciations, setDepreciation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelName, setModelName] = useState<string>("");
  const [modelCategoryId, setModelCategoryId] = useState<number>();
  const [modelManufacturerId, setModelManufacturerId] = useState<number>();
  const [modelNumber, setModelNumber] = useState<string>("");
  const [modelDepreciationId, setModelDepreciationId] = useState<number>();
  const [modelEol, setModelEol] = useState<number>();
  const [modelFieldSetId, setModelFieldSetId] = useState<number>();
  const [modelNote, setModelNote] = useState<string>("");
  const [modelImageUrl, setModelImageUrl] = useState<string>("");

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
  const getManufacturers = useCallback(async () => {
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
      setManufacturer(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, limit, page, url, keyword]);
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
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (modelName !== "" && accessToken) {
      const res = await fetch(`${url}/asset-models`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: modelName,
          imageUrl: modelImageUrl,
          modelNumber: modelNumber,
          manufacturerId: modelManufacturerId,
          categoryId: modelCategoryId,
          fieldSetId: modelFieldSetId,
          depreciationId: modelDepreciationId,
          eol: modelEol,
          notes: modelNote,
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
      router.push("/asset-models");
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCategories();
      getManufacturers();
      getFieldSet();
      getDepreciation();
    }
  }, [
    accessToken,
    getCategories,
    getManufacturers,
    getFieldSet,
    getDepreciation,
  ]);
  // console.log(assetPurchaseDate);

  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border-t-2">
          <div className="m-5 ">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
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
                    <TextField
                      name={"eol"}
                      label={"EOL"}
                      inputValue={modelEol}
                      setValue={setModelEol}
                      required={false}
                      type="number"
                      placeholder=""
                      style={""}
                      divStyle="md:w-full mb-6 md:mb-0"
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <SelectOption
                      name={"fieldSet"}
                      label={"Field Set"}
                      required={true}
                      inputValue={modelFieldSetId}
                      setValue={setModelFieldSetId}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormCreate;
