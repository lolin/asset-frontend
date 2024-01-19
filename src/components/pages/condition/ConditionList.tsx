import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Condition } from "@/types/condition";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";

interface ConditionProps {
  condition: Condition;
  setRefresh: any;
}
const List: React.FC<ConditionProps> = ({ condition, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [conditionEdit, setConditionEdit] = useState<string>(condition.name);
  const [descriptionEdit, setDescriptionEdit] = useState<string>(
    condition.description
  );
  const [conditionDelete, setConditionDelete] = useState<string>(
    condition.name
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (conditionEdit !== "") {
      const url = `conditions/${condition.id}`;
      const method = "PATCH";
      const body = {
        name: conditionEdit,
        description: descriptionEdit,
      };
      await fetchData({ url, method, body });
    }
    setConditionEdit("");
    setOpenModalEdit(false);
    toast.success("Condition updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `conditions/${condition.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setConditionDelete("");
    setOpenModalDelete(false);
    toast.success("Condition deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={condition.id}>
      <Col style={"w-1/2"}>{condition.name}</Col>
      <Col style={"w-1/2"}>{condition.description}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Condition"}>
            <div className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <Label htmlFor={"nameEdit"} label={"Name"} />
                  <TextInput
                    label={""}
                    name={"nameEdit"}
                    required={true}
                    inputValue={conditionEdit}
                    setValue={setConditionEdit}
                    style={""}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <Label htmlFor={"descriptionEdit"} label={"Description"} />
                  <TextInput
                    label={""}
                    name={"descriptionEdit"}
                    required={true}
                    inputValue={descriptionEdit}
                    setValue={setDescriptionEdit}
                    style={""}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-0 mx-2 float-right">
                <Button text={"Update"} type={"submit"} style={""} />
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
            label={"condition"}
            handleDelete={handleDelete}
            title={"Delete Condition"}
            itemDelete={conditionDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
