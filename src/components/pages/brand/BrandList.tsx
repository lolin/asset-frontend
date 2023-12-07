import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Brand } from "@/types/brand";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
interface BrandProps {
  brand: Brand;
  setRefresh: any;
  token: string;
}
const List: React.FC<BrandProps> = ({ brand, setRefresh, token }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [brandEdit, setBrandEdit] = useState<string>(brand.name);
  const [brandDelete, setBrandDelete] = useState<string>(brand.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (brandEdit !== "") {
      const res = await fetch(`${url}/brands/${brand.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: brandEdit }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
    }
    setBrandEdit("");
    setOpenModalEdit(false);
    toast.success("Brand updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/brands/${brand.id}`, {
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
    setBrandDelete("");
    setOpenModalDelete(false);
    toast.success("Brand deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={brand.id}>
      <Col style={"w-full"}>{brand.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-900 hover:text-slate-500 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Brand"}>
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
            label={"brand"}
            handleDelete={handleDelete}
            title={"Delete Brand"}
            itemDelete={brandDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
