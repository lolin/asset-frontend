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
import { AssetModel } from "@/types/asset-model";
import { Category } from "@/types/category";
import { Depreciation } from "@/types/depreciation";
import { FieldSet } from "@/types/field-set";
import { Manufacturer } from "@/types/manufacturer";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface AssetModelProps {
  assetModel: AssetModel;
  fieldSets: FieldSet[];
  manufacturers: Manufacturer[];
  categories: Category[];
  depreciations: Depreciation[];
  setRefresh: any;
}
const List: React.FC<AssetModelProps> = ({
  assetModel,
  fieldSets,
  setRefresh,
}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [fieldName, setFieldName] = useState<string>(assetModel.name);
  // const [fieldSetID, setFieldSetID] = useState<any>(assetModel.fieldSetId);
  // const [fieldType, setFieldType] = useState<string>(assetModel.fieldType);
  // const [fieldValue, setFieldValue] = useState<any>(assetModel.fieldValue);
  // const [helperText, sethelperText] = useState<string>(assetModel.helperText);
  const [modelNameDelete, setModelNameDelete] = useState<string>(
    assetModel.name
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (fieldName !== "") {
      const url = `asset-models/${assetModel.id}`;
      const method = "PATCH";
      const body = {
        fieldName: fieldName,
        // fieldSetId: fieldSetID,
        // fieldType: fieldType,
        // fieldValue: fieldValue,
        // helperText: helperText,
      };
      await fetchData({ url, method, body });
    }
    setOpenModalEdit(false);
    toast.success("AssetModel updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `asset-models/${assetModel.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setOpenModalDelete(false);
    toast.success("AssetModel deleted successfully");
    setRefresh(true);
  };
  // console.log(assetModel);
  return (
    <Row key={assetModel.id}>
      <Col style={"w-1/6"}>{assetModel.name}</Col>
      <Col style={"w-1/6"}>{assetModel.modelNumber}</Col>
      <Col style={"w-1/6"}>{assetModel.Manufacturer.name}</Col>
      <Col style={"w-1/6"}>{assetModel.Category.name}</Col>
      <Col style={"w-1/6"}>{assetModel.FieldSet.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => router.push(`/asset-models/${assetModel.id}`)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <ModalFormDelete
            label={"assetModel"}
            handleDelete={handleDelete}
            title={"Delete AssetModel"}
            itemDelete={modelNameDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
