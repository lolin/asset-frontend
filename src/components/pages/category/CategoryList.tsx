import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Category } from "@/types/category";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
interface CategoryProps {
  category: Category;
  setRefresh: any;
  token: string;
}
const List: React.FC<CategoryProps> = ({ category, setRefresh, token }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = useState<string>(category.name);
  const [categoryDelete, setCategoryDelete] = useState<string>(category.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (categoryEdit !== "") {
      await fetch(`${url}/category/${category.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryEdit }),
      });
    }
    setCategoryEdit("");
    setOpenModalEdit(false);
    toast.success("Category updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch(`${url}/category/${category.id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setCategoryDelete("");
    setOpenModalDelete(false);
    toast.success("Category deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={category.id}>
      <Col style={"w-full"}>{category.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-500 hover:text-blue-300 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Category"}>
            <TextInput
              label={"Name"}
              name={"name"}
              required={true}
              inputValue={categoryEdit}
              setValue={setCategoryEdit}
              style={""}
            />
            <Button
              text={"Update"}
              type={"submit"}
              style={"bg-indigo-600 text-white"}
            />
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
            label={"category"}
            handleDelete={handleDelete}
            title={"Delete Category"}
            itemDelete={categoryDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
