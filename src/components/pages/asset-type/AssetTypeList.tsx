import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { AssetType } from "@/types/asset-type";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface AssetTypeProps {
  assetType: AssetType;
  setRefresh: any;
}
const List: React.FC<AssetTypeProps> = ({ assetType, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [assetTypeEdit, setAssetTypeEdit] = useState<string>(assetType.name);
  const [assetDescriptionEdit, setAssetDescriptionEdit] = useState<string>(
    assetType.description
  );
  const [assetTypeDelete, setAssetTypeDelete] = useState<string>(
    assetType.name
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-type/${assetType.id}`;
    const method = "PATCH";
    const body = {
      name: assetTypeEdit,
      description: assetDescriptionEdit,
    };
    await fetchData({ url, method, body });
    setAssetTypeEdit("");
    setOpenModalEdit(false);
    toast.success("AssetType updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-type/${assetType.id}`;
    const method = "DELETE";
    const body = "";
    console.log(url);
    await fetchData({ url, method, body });
    setAssetTypeDelete("");
    setOpenModalDelete(false);
    toast.success("AssetType deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={assetType.id}>
      <Col style={"w-1/2"}>{assetType.name}</Col>
      <Col style={"w-1/2"}>{assetType.description}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Asset Type"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"name"} label={"Name"} />
                <TextInput
                  label={"Name"}
                  name={"name"}
                  required={true}
                  inputValue={assetTypeEdit}
                  setValue={setAssetTypeEdit}
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
            label={"assetType"}
            handleDelete={handleDelete}
            title={"Delete Asset Type"}
            itemDelete={assetTypeDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
