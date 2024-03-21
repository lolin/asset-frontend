import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import Select from "@/components/elements/Select";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { EmailList } from "@/types/email-list";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface DepartmentProps {
  emailList: EmailList;
  department: any;
  setRefresh: any;
}
const List: React.FC<DepartmentProps> = ({
  emailList,
  department,
  setRefresh,
}) => {
  const url = `email-list/${emailList.id}`;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [employeeName, setAlias] = useState<string>(emailList.employeeName);
  const [departmentId, setDepartmentId] = useState<any>(emailList.departmentId);
  const [email, setEmail] = useState<string>(emailList.email);
  const [password, setPassword] = useState<string>(emailList.password);
  const [emailListDelete, setEmailListDelete] = useState<string>(
    emailList.email
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (employeeName !== "") {
      const method = "PATCH";
      const body = {
        employeeName: employeeName,
        departmentId: departmentId,
        email: email,
        password: password,
      };
      await fetchData({ url, method, body });
    }
    setAlias("");
    setDepartmentId("");
    setEmail("");
    setPassword("");
    setOpenModalEdit(false);
    toast.success("Remote Access updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setEmailListDelete("");
    setOpenModalDelete(false);
    toast.success("Remote Access deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={emailList.id}>
      <Col style={"w-1/4"}>{emailList.employeeName}</Col>
      <Col style={"w-1/4"}>{emailList?.Department?.name}</Col>
      <Col style={"w-1/4"}>{emailList.email}</Col>
      <Col style={"w-1/4"}>{emailList.password}</Col>
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
                <Label htmlFor={"Alias"} label={"Remote Access Name"} />
                <TextInput
                  label={""}
                  name={"employeeName"}
                  required={true}
                  inputValue={employeeName}
                  setValue={setAlias}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"departmentId"} label={"Asset"} />
                <Select
                  label={""}
                  name={"departmentId"}
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
                <Label htmlFor={"password"} label={"Remote User"} />
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
            label={"mailListDelete"}
            handleDelete={handleDelete}
            title={"Delete Remote Access"}
            itemDelete={emailListDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
