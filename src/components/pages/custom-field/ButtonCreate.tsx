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
import fetchData from "@/util/fetchWrapper";
interface RefreshProps {
  setRefresh: any;
  fieldSets: FieldSet[];
}
const ButtonCreate: React.FC<RefreshProps> = (
  { setRefresh, fieldSets }: RefreshProps,
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
          setModalOpen(true);
          setFieldName("");
          setFieldSetID("");
          setFieldType("");
          setFieldValue("");
          sethelperText("");
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add New Custom Field"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"fieldset"} label={"Field Set"} />
              <Select
                label={""}
                name={"fieldset"}
                required={true}
                inputValue={fieldSetID}
                setValue={setFieldSetID}
                style={""}
              >
                <option>&nbsp;</option>
                {fieldSets.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"name"} label={"Element Name"} />
              <TextInput
                label={"Name"}
                name={"name"}
                required={true}
                inputValue={fieldName}
                setValue={setFieldName}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"fieldtype"} label={"Field Type"} />
              <Select
                label={""}
                name={"fieldtype"}
                required={true}
                inputValue={fieldType}
                setValue={setFieldType}
                valueType="string"
                style={""}
              >
                <option>&nbsp;</option>
                <option key={1} value={"text"}>
                  Text Box
                </option>
                <option key={2} value={"textarea"}>
                  Text Area (Multiline)
                </option>
                <option key={3} value={"list"}>
                  List Box
                </option>
                <option key={4} value={"checkbox"}>
                  Check Box
                </option>
                <option key={5} value={"radio"}>
                  Radio Button
                </option>
              </Select>
            </div>
            {(fieldType === "radio" ||
              fieldType === "list" ||
              fieldType === "checkbox") && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"value"} label={"Field Type Value"} />
                <TxtArea
                  label={"Value"}
                  name={"value"}
                  type={"text"}
                  required={true}
                  placeholder={"Add selectable options, one per line."}
                  inputValue={fieldValue}
                  setValue={setFieldValue}
                  style={""}
                />
              </div>
            )}
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"helpText"} label={"Helper Text"} />
              <TextInput
                label={"Helper Text"}
                name={"helpText"}
                type={"text"}
                required={true}
                inputValue={helperText}
                setValue={sethelperText}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 float-right">
              <Button text={"Submit"} type={"submit"} style={""} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};
export default ButtonCreate;
