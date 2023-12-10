import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Depreciation } from "@/types/depreciation";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
interface DepreciationProps {
  depreciation: Depreciation;
  setRefresh: any;
  token: string;
}
const List: React.FC<DepreciationProps> = ({
  depreciation,
  setRefresh,
  token,
}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [depreciationEdit, setDepreciationEdit] = useState<string>(
    depreciation.name
  );
  const [depreciationTermEdit, setDepreciationTermEdit] = useState<number>(
    depreciation.term
  );
  const [depreciationFloorValueEdit, setDepreciationFloorValueEdit] =
    useState<number>(depreciation.floorValue);
  const [depreciationDelete, setDepreciationDelete] = useState<string>(
    depreciation.name
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (depreciationEdit !== "") {
      await fetch(`${url}/depreciations/${depreciation.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: depreciationEdit,
          term: depreciationTermEdit,
          floorValue: depreciationFloorValueEdit,
        }),
      });
    }
    setDepreciationEdit("");
    setOpenModalEdit(false);
    toast.success("Depreciation updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch(`${url}/depreciations/${depreciation.id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setDepreciationDelete("");
    setOpenModalDelete(false);
    toast.success("Depreciation deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={depreciation.id}>
      <Col style={"w-1/3"}>{depreciation.name}</Col>
      <Col style={"w-1/3"}>{depreciation.term}</Col>
      <Col style={"w-1/3"}>{depreciation.floorValue}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Depreciation"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"name"} label={"Name"} />
                <TextInput
                  label={"Name"}
                  name={"name"}
                  required={true}
                  inputValue={depreciationEdit}
                  setValue={setDepreciationEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"term"} label={"Number of Month"} />
                <TextInput
                  label={"Term"}
                  name={"term"}
                  type={"number"}
                  required={true}
                  inputValue={depreciationTermEdit}
                  setValue={setDepreciationTermEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label
                  htmlFor={"floorvalue"}
                  label={"Minimum Value after Depreciation"}
                />
                <TextInput
                  label={"Floor Value"}
                  name={"floorvalue"}
                  type={"number"}
                  required={false}
                  inputValue={depreciationFloorValueEdit}
                  setValue={setDepreciationFloorValueEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 float-right">
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
            label={"depreciation"}
            handleDelete={handleDelete}
            title={"Delete Depreciation"}
            itemDelete={depreciationDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
