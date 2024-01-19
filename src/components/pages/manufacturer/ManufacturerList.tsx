import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Manufacturer } from "@/types/manufacturer";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface BrandProps {
  manufacturer: Manufacturer;
  setRefresh: any;
}
const List: React.FC<BrandProps> = ({ manufacturer, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [brandEdit, setBrandEdit] = useState<string>(manufacturer.name);
  const [brandDelete, setBrandDelete] = useState<string>(manufacturer.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `manufacturers/${manufacturer.id}`;
    const method = "PATCH";
    const body = { name: brandEdit };
    if (brandEdit !== "") {
      await fetchData({ url, method, body });
    }
    setBrandEdit("");
    setOpenModalEdit(false);
    toast.success("Manufacturer updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `manufacturers/${manufacturer.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setBrandDelete("");
    setOpenModalDelete(false);
    toast.success("Manufacturer deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={manufacturer.id}>
      <Col style={"w-full"}>{manufacturer.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-900 hover:text-slate-500 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Manufacturer"}>
            <TextInput
              label={"Name"}
              name={"name"}
              required={true}
              inputValue={brandEdit}
              setValue={setBrandEdit}
              style={""}
            />
            <Button
              text={"Update"}
              type={"submit"}
              style={"bg-blue-950 text-white"}
            />
          </ModalForm>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-900 transition-all hover:text-slate-500"
          cursor="pointer"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <ModalFormDelete
            label={"manufacturer"}
            handleDelete={handleDelete}
            title={"Delete Manufacturer"}
            itemDelete={brandDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
