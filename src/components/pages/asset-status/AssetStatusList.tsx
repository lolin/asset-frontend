import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { AssetStatus } from "@/types/asset-status";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
interface AssetStatusProps {
  assetStatus: AssetStatus;
  setRefresh: any;
  token: string;
}
const List: React.FC<AssetStatusProps> = ({
  assetStatus,
  setRefresh,
  token,
}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [assetStatusEdit, setAssetStatusEdit] = useState<string>(
    assetStatus.name
  );
  const [assetDescriptionEdit, setAssetDescriptionEdit] = useState<string>(
    assetStatus.description
  );
  const [assetStatusDelete, setAssetStatusDelete] = useState<string>(
    assetStatus.name
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (assetStatusEdit !== "") {
      const res = await fetch(`${url}/asset-status/${assetStatus.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: assetStatusEdit,
          description: assetDescriptionEdit,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
    }
    setAssetStatusEdit("");
    setOpenModalEdit(false);
    toast.success("AssetStatus updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/asset-status/${assetStatus.id}`, {
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
    setAssetStatusDelete("");
    setOpenModalDelete(false);
    toast.success("AssetStatus deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={assetStatus.id}>
      <Col style={"w-1/2"}>{assetStatus.name}</Col>
      <Col style={"w-1/2"}>{assetStatus.description}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Asset Status"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"name"} label={"Name"} />
                <TextInput
                  label={"Name"}
                  name={"name"}
                  required={true}
                  inputValue={assetStatusEdit}
                  setValue={setAssetStatusEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"description"} label={"Description"} />
                <TextInput
                  label={"Description"}
                  name={"description"}
                  required={false}
                  inputValue={assetDescriptionEdit}
                  setValue={setAssetDescriptionEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-0 float-right">
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
            label={"assetStatus"}
            handleDelete={handleDelete}
            title={"Delete Asset Status"}
            itemDelete={assetStatusDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
