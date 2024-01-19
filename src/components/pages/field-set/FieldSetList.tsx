import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { FieldSet } from "@/types/field-set";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";

interface FieldSetProps {
  fieldset: FieldSet;
  setRefresh: any;
}
const List: React.FC<FieldSetProps> = ({ fieldset, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [fieldsetEdit, setFieldSetEdit] = useState<string>(fieldset.name);
  const [fieldsetDelete, setFieldSetDelete] = useState<string>(fieldset.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fieldsetEdit !== "") {
      const url = `field-sets/${fieldset.id}`;
      const method = "PATCH";
      const body = { name: fieldsetEdit };
      await fetchData({ url, method, body });
    }
    setFieldSetEdit("");
    setOpenModalEdit(false);
    toast.success("FieldSet updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `field-sets/${fieldset.id}`;
    const method = "DELETE";
    const body = { name: fieldsetEdit };
    await fetchData({ url, method, body });
    setFieldSetDelete("");
    setOpenModalDelete(false);
    toast.success("FieldSet deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={fieldset.id}>
      <Col style={"w-full"}>{fieldset.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit FieldSet"}>
            <TextInput
              label={"Name"}
              name={"name"}
              required={true}
              inputValue={fieldsetEdit}
              setValue={setFieldSetEdit}
              style={""}
            />
            <Button text={"Update"} type={"submit"} style={""} />
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
            label={"field-set"}
            handleDelete={handleDelete}
            title={"Delete FieldSet"}
            itemDelete={fieldsetDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
