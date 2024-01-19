import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { AssetStatus } from "@/types/asset-status";
import fetchData from "@/util/fetchWrapper";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
interface AssetStatusProps {
  assetStatus: AssetStatus;
  setRefresh: any;
}
const List: React.FC<AssetStatusProps> = ({ assetStatus, setRefresh }) => {
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
      const url = `asset-status/${assetStatus.id}`;
      const method = "PATCH";
      const body = {
        name: assetStatusEdit,
        description: assetDescriptionEdit,
      };
      await fetchData({ url, method, body });
    }
    setAssetStatusEdit("");
    setOpenModalEdit(false);
    toast.success("AssetStatus updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-status/${assetStatus.id}`;
    const method = "DELETE";
    const body = "";
    console.log(url);
    await fetchData({ url, method, body });
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
