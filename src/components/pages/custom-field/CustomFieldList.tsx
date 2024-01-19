import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import Select from "@/components/elements/Select";
import TextInput from "@/components/elements/TextInput";
import TxtArea from "@/components/elements/TxtArea";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { CustomField } from "@/types/custom-field";
import { FieldSet } from "@/types/field-set";
import fetchData from "@/util/fetchWrapper";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
interface CustomFieldProps {
  customField: CustomField;
  fieldSets: FieldSet[];
  setRefresh: any;
}
const List: React.FC<CustomFieldProps> = ({
  customField,
  fieldSets,
  setRefresh,
}) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [fieldName, setFieldName] = useState<string>(customField.fieldName);
  const [fieldSetID, setFieldSetID] = useState<any>(customField.fieldSetId);
  const [fieldType, setFieldType] = useState<string>(customField.fieldType);
  const [fieldValue, setFieldValue] = useState<any>(customField.fieldValue);
  const [helperText, sethelperText] = useState<string>(customField.helperText);
  const [fieldNameDelete, setFieldNameDelete] = useState<string>(
    customField.fieldName
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fieldName !== "") {
      const url = `custom-fields/${customField.id}`;
      const method = "PATCH";
      const body = {
        fieldName: fieldName,
        fieldSetId: fieldSetID,
        fieldType: fieldType,
        fieldValue: fieldValue,
        helperText: helperText,
      };
      await fetchData({ url, method, body });
    }
    setOpenModalEdit(false);
    toast.success("CustomField updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `custom-fields/${customField.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setOpenModalDelete(false);
    toast.success("CustomField deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={customField.id}>
      <Col style={"w-1/5"}>{customField.fieldName}</Col>
      <Col style={"w-1/5"}>{customField.FieldSet.name}</Col>
      <Col style={"w-1/5"}>{customField.fieldType}</Col>
      <Col style={"w-1/5"}>{customField.fieldValue}</Col>
      <Col style={"w-1/5"}>{customField.helperText}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit CustomField"}>
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
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <ModalFormDelete
            label={"customField"}
            handleDelete={handleDelete}
            title={"Delete CustomField"}
            itemDelete={fieldNameDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
