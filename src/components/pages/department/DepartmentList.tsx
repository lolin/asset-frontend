import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import Select from "@/components/elements/Select";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Department } from "@/types/department";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface DepartmentProps {
  department: Department;
  company: any;
  setRefresh: any;
}
const List: React.FC<DepartmentProps> = ({
  department,
  company,
  setRefresh,
}) => {
  const url = `departments/${department.id}`;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [departmentEdit, setDepartmentEdit] = useState<string>(department.name);
  const [companyEdit, setCompanyEdit] = useState(department.Company.id);
  const [departmentDelete, setDepartmentDelete] = useState<string>(
    department.name
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (departmentEdit !== "") {
      const method = "PATCH";
      const body = { name: departmentEdit, companyId: companyEdit };
      await fetchData({ url, method, body });
    }
    setDepartmentEdit("");
    setCompanyEdit({} as number);
    setOpenModalEdit(false);
    toast.success("Department updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setDepartmentDelete("");
    setOpenModalDelete(false);
    toast.success("Department deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={department.id}>
      <Col style={"w-1/2"}>{department.name}</Col>
      <Col style={"w-1/2"}>{department.Company.name}</Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Department"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"departmentEdit"} label={"Department Name"} />
                <TextInput
                  label={""}
                  name={"departmentEdit"}
                  required={true}
                  inputValue={departmentEdit}
                  setValue={setDepartmentEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"companyEdit"} label={"Company"} />
                <Select
                  label={""}
                  name={"companyEdit"}
                  required={true}
                  inputValue={companyEdit}
                  setValue={setCompanyEdit}
                  style={""}
                >
                  <option>&nbsp;</option>
                  {company.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
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
            label={"department"}
            handleDelete={handleDelete}
            title={"Delete Department"}
            itemDelete={departmentDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
