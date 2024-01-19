"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import ModalForm from "@/components/modal/ModalForm";
import TextInput from "@/components/elements/TextInput";
import Button from "@/components/elements/Button";
import Label from "@/components/elements/Label";
import Select from "@/components/elements/Select";
import fetchData from "@/util/fetchWrapper";
interface RefreshProps {
  setRefresh: any;
  company: any;
}
const ButtonCreate = ({ setRefresh, company }: RefreshProps, {}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newDepartment, setNewDepartment] = useState<string>("");
  const [newCompany, setNewCompany] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newDepartment !== "" && newCompany !== "") {
      const url = `departments`;
      const method = "POST";
      const body = { name: newDepartment, companyId: newCompany };
      await fetchData({ url, method, body });
      toast.success("Department added successfully");
      setRefresh(true);
    }
    setNewDepartment("");
    setNewCompany("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setModalOpen(true);
          setNewCompany("");
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new department"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"departmentName"} label={"Department Name"} />
              <TextInput
                label={""}
                name={"departmentName"}
                required={true}
                inputValue={newDepartment}
                setValue={setNewDepartment}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"companyid"} label={"Company"} />
              <Select
                label={""}
                name={"companyid"}
                required={true}
                inputValue={newCompany}
                setValue={setNewCompany}
                style={""}
                valueType={"string"}
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
              <Button text={"Submit"} type={"submit"} style={""} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
