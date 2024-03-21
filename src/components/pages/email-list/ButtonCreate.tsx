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
  department: any;
}
const ButtonCreate = ({ setRefresh, department }: RefreshProps, {}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [employeeName, setEmployeeName] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (employeeName !== "") {
      const url = `email-list`;
      const method = "POST";
      const body = {
        employeeName: employeeName,
        departmentId: departmentId,
        email: email,
        password: password,
      };
      await fetchData({ url, method, body });
      toast.success("Email List added successfully");
      setRefresh(true);
    }
    setEmployeeName("");
    setDepartmentId("");
    setEmail("");
    setPassword("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setEmployeeName("");
          setDepartmentId("");
          setEmail("");
          setPassword("");
          setModalOpen(true);
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new Email List"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"employeeName"} label={"Employee Name"} />
              <TextInput
                label={""}
                name={"employeeName"}
                required={true}
                inputValue={employeeName}
                setValue={setEmployeeName}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"departmentid"} label={"Department"} />
              <Select
                label={""}
                name={"departmentid"}
                required={false}
                inputValue={departmentId}
                setValue={setDepartmentId}
                style={""}
                valueType={"string"}
              >
                <option>&nbsp;</option>
                {department.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"email"} label={"Remote User"} />
              <TextInput
                label={""}
                name={"email"}
                required={true}
                inputValue={email}
                setValue={setEmail}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"password"} label={"Password"} />
              <TextInput
                label={""}
                name={"password"}
                required={true}
                inputValue={password}
                setValue={setPassword}
                style={""}
              />
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
