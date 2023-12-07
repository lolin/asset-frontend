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
interface ConditionProps {
  condition: Condition;
  setRefresh: any;
  token: string;
}
const List: React.FC<ConditionProps> = ({ condition, setRefresh, token }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
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
      const res = await fetch(`${url}/conditions/${condition.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: conditionEdit,
          description: descriptionEdit,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
    }
    setConditionEdit("");
    setOpenModalEdit(false);
    toast.success("Condition updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/conditions/${condition.id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401) {
        signOut();
      }
      throw new Error("Failed to fetch data");
    }
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
          className="text-blue-500 hover:text-blue-300 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Category"}>
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
                <Button
                  text={"Update"}
                  type={"submit"}
                  style={"bg-indigo-600 text-white"}
                />
              </div>
            </div>
          </ModalForm>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-red-600 transition-all hover:text-red-300"
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
