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
interface AssetModelProps {
  assetModel: AssetModel;
  fieldSets: FieldSet[];
  manufacturers: Manufacturer[];
  categories: Category[];
  depreciations: Depreciation[];
  setRefresh: any;
  token: string;
}
const List: React.FC<AssetModelProps> = ({
  assetModel,
  fieldSets,
  setRefresh,
  token,
}) => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL;
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
      await fetch(`${url}/asset-models/${assetModel.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fieldName: fieldName,
          // fieldSetId: fieldSetID,
          // fieldType: fieldType,
          // fieldValue: fieldValue,
          // helperText: helperText,
        }),
      });
    }
    setOpenModalEdit(false);
    toast.success("AssetModel updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch(`${url}/asset-models/${assetModel.id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // setAssetModelDelete("");
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
      <Col style={"w-1/6"}>{assetModel.eol}</Col>
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
