import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Company } from "@/types/company";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface CompanyProps {
  company: Company;
  setRefresh: any;
}
const List: React.FC<CompanyProps> = ({ company, setRefresh }) => {
  // const accessToken = token;
  const url = `company/${company.id}`;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [companyEdit, setCompanyEdit] = useState<string>(company.name);
  const [companyDelete, setCompanyDelete] = useState<string>(company.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (companyEdit !== "") {
      const method = "PATCH";
      const body = { name: companyEdit };
      await fetchData({ url, method, body });
    }
    setCompanyEdit("");
    setOpenModalEdit(false);
    toast.success("Company updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setCompanyDelete("");
    setOpenModalDelete(false);
    toast.success("Company deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={company.id}>
      <Col style={"w-full"}>{company.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Company"}>
            <TextInput
              label={"Name"}
              name={"name"}
              required={true}
              inputValue={companyEdit}
              setValue={setCompanyEdit}
              style={""}
            />
            <Button text={"Update"} type={"submit"} style={""} />
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
            label={"company"}
            handleDelete={handleDelete}
            title={"Delete Company"}
            itemDelete={companyDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
