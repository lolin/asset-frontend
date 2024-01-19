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
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldSetID, setFieldSetID] = useState<any>();
  const [fieldType, setFieldType] = useState<string>("");
  const [fieldValue, setFieldValue] = useState<any>();
  const [helperText, sethelperText] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fieldName !== "") {
      const url = `custom-fields`;
      const method = "POST";
      const body = {
        fieldName: fieldName,
        fieldSetId: fieldSetID,
        fieldType: fieldType,
        fieldValue: fieldValue,
        helperText: helperText,
      };
      await fetchData({ url, method, body });
      setFieldName("");
      setFieldSetID("");
      setFieldType("");
      setFieldValue("");
      sethelperText("");
      toast.success("Custom Field added successfully");
      setRefresh(true);
    }
    setModalOpen(false);
  };

  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          router.push("/asset-models/create");
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
    </div>
  );
};
export default ButtonCreate;
