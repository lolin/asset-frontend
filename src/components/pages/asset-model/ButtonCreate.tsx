"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalForm from "@/components/modal/ModalForm";
import TextInput from "@/components/elements/TextInput";
import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import { FieldSet } from "@/types/field-set";
import Select from "@/components/elements/Select";
import TxtArea from "@/components/elements/TxtArea";
import { Manufacturer } from "@/types/manufacturer";
import { Category } from "@/types/category";
import { Depreciation } from "@/types/depreciation";
import fetchData from "@/util/fetchWrapper";
import TextField from "@/components/fragments/TextField";
import SelectOption from "@/components/fragments/SelectOption";
interface RefreshProps {
  setRefresh: any;
  fieldSets: FieldSet[];
  manufacturers: Manufacturer[];
  categories: Category[];
  depreciations: Depreciation[];
}
const ButtonCreate: React.FC<RefreshProps> = (
  {
    setRefresh,
    fieldSets,
    manufacturers,
    categories,
    depreciations,
  }: RefreshProps,
  {}
) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>("");
  const [modelCategoryId, setModelCategoryId] = useState<string>("");
  const [modelManufacturerId, setModelManufacturerId] = useState<string>("");
  const [modelNumber, setModelNumber] = useState<string>("");
  const [modelDepreciationId, setModelDepreciationId] = useState<string>("");
  const [modelFieldSetId, setModelFieldSetId] = useState<string>("");
  const [modelNote, setModelNote] = useState<string>("");
  const [modelImageUrl, setModelImageUrl] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-models`;
    const method = "POST";
    const body = {
      name: modelName,
      imageUrl: modelImageUrl,
      modelNumber: modelNumber,
      manufacturerId: Number(modelManufacturerId),
      categoryId: Number(modelCategoryId),
      fieldSetId: Number(modelFieldSetId),
      depreciationId: Number(modelDepreciationId),
      notes: modelNote,
    };
    if (modelName !== "") {
      await fetchData({ url, method, body });
      toast.success("Asset added successfully");
      setRefresh(true);
    }
    setModelName("");
    setModelCategoryId("");
    setModelManufacturerId("");
    setModelNumber("");
    setModelDepreciationId("");
    setModelFieldSetId("");
    setModelNote("");
    setModelImageUrl("");
    setModalOpen(false);
  };
  // console.log(
  //   modelName,
  //   modelImageUrl,
  //   modelNumber,
  //   modelManufacturerId,
  //   modelCategoryId,
  //   modelFieldSetId,
  //   modelDepreciationId,
  //   modelNote
  // );
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setModelName("");
          setModelCategoryId("");
          setModelManufacturerId("");
          setModelNumber("");
          setModelDepreciationId("");
          setModelFieldSetId("");
          setModelNote("");
          setModelImageUrl("");
          setModalOpen(true);
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new Asset Model"}>
          <div className="w-full max-w-lg mx-4">
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
                  <option key={item.id} value={item.id} className="mb-2 pb-2">
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
                  <option key={item.id} value={item.id} className="mb-2 pb-2">
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
                  <option key={item.id} value={item.id} className="mb-2 pb-2">
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
                  <option key={item.id} value={item.id} className="mb-2 pb-2">
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
            <div className="flex flex-wrap -mx-3 mb-0 float-right">
              <Button text={"Submit"} type={"submit"} style={""} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};
export default ButtonCreate;
