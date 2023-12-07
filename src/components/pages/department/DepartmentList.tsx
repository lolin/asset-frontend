import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Company } from "@/types/company";
import { Department } from "@/types/department";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
interface DepartmentProps {
  department: Department;
  company: any;
  setRefresh: any;
  token: string;
}
const List: React.FC<DepartmentProps> = ({
  department,
  company,
  setRefresh,
  token,
}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
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
      const res = await fetch(`${url}/departments/${department.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: departmentEdit, companyId: companyEdit }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
    }
    setDepartmentEdit("");
    setCompanyEdit({} as number);
    setOpenModalEdit(false);
    toast.success("Department updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/departments/${department.id}`, {
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
    setDepartmentDelete("");
    setOpenModalDelete(false);
    toast.success("Department deleted successfully");
    setRefresh(true);
  };
  return (
    <tr
      key={department.id}
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
    >
      <td scope="row" className="px-5 py-5  text-sm w-1/2">
        {department.name}
      </td>
      <td scope="row" className="px-5 py-5  text-sm w-1/2">
        {department.Company.name}
      </td>
      <td className="flex gap-5 px-5 py-5  text-sm">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-500 hover:text-blue-300 transition-all"
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
                <Button
                  text={"Update"}
                  type={"submit"}
                  style={"bg-indigo-600 text-white"}
                />
              </div>
            </div>
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
            label={"department"}
            handleDelete={handleDelete}
            title={"Delete Department"}
            itemDelete={departmentDelete}
          />
        </Modal>
      </td>
    </tr>
  );
};
export default List;
