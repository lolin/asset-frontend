import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Label from "@/components/elements/Label";
import Row from "@/components/elements/Row";
import Select from "@/components/elements/Select";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { RemoteAccess } from "@/types/remote-access";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
interface DepartmentProps {
  remoteAccess: RemoteAccess;
  asset: any;
  setRefresh: any;
}
const List: React.FC<DepartmentProps> = ({
  remoteAccess,
  asset,
  setRefresh,
}) => {
  const url = `remote-access/${remoteAccess.id}`;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>(remoteAccess.alias);
  const [assetId, setAssetId] = useState<any>(remoteAccess.assetId);
  const [remoteId, setRemoteId] = useState<string>(remoteAccess.remoteId);
  const [remoteUser, setRemoteUser] = useState<string>(remoteAccess.remoteUser);
  const [remotePassword, setRemotePassword] = useState<string>(
    remoteAccess.remotePassword
  );
  const [remoteSource, setRemoteSource] = useState<string>(
    remoteAccess.remoteSource
  );
  const initSource = [
    { name: "AnyDesk" },
    { name: "RDP" },
    { name: "TeamViewer" },
    { name: "VNC" },
    { name: "SSH" },
  ];
  const [remoteSourceList, setRemoteSourceList] = useState(initSource);
  const [remoteAccessDelete, setremoteAccessDelete] = useState<string>(
    remoteAccess.alias
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (alias !== "") {
      const method = "PATCH";
      const body = {
        alias: alias,
        assetId: assetId,
        remoteId: remoteId,
        remoteUser: remoteUser,
        remotePassword: remotePassword,
        remoteSource: remoteSource,
      };
      await fetchData({ url, method, body });
    }
    setAlias("");
    setAssetId("");
    setRemoteId("");
    setRemoteUser("");
    setRemotePassword("");
    setRemoteSource("");
    setOpenModalEdit(false);
    toast.success("Remote Access updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setremoteAccessDelete("");
    setOpenModalDelete(false);
    toast.success("Remote Access deleted successfully");
    setRefresh(true);
  };
  return (
    <Row key={remoteAccess.id}>
      <Col style={"w-1/5"}>{remoteAccess.alias}</Col>
      <Col style={"w-1/5"}>{remoteAccess.remoteId}</Col>
      <Col style={"w-1/5"}>{remoteAccess.remoteUser}</Col>
      <Col style={"w-1/5"}>{remoteAccess.remotePassword}</Col>
      <Col style={"w-1/5"}>{remoteAccess.remoteSource}</Col>
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
                  name={"alias"}
                  required={true}
                  inputValue={alias}
                  setValue={setAlias}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"assetid"} label={"Asset"} />
                <Select
                  label={""}
                  name={"assetid"}
                  required={false}
                  inputValue={assetId}
                  setValue={setAssetId}
                  style={""}
                  valueType={"string"}
                >
                  <option>&nbsp;</option>
                  {asset.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"remoteid"} label={"Remote ID"} />
                <TextInput
                  label={""}
                  name={"remoteid"}
                  required={true}
                  inputValue={remoteId}
                  setValue={setRemoteId}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"remoteUser"} label={"Remote User"} />
                <TextInput
                  label={""}
                  name={"remoteUser"}
                  required={true}
                  inputValue={remoteUser}
                  setValue={setRemoteUser}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"remotePassword"} label={"Remote User"} />
                <TextInput
                  label={""}
                  name={"remotePassword"}
                  required={true}
                  inputValue={remotePassword}
                  setValue={setRemotePassword}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"remoteSource"} label={"Remote Source"} />
                <Select
                  label={""}
                  name={"remoteSource"}
                  required={false}
                  inputValue={remoteSource}
                  setValue={setRemoteSource}
                  style={""}
                  valueType={"string"}
                >
                  <option>&nbsp;</option>
                  {remoteSourceList.map((item: any) => (
                    <option key={item.name} value={item.name}>
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
            label={"remoteAccessDelete"}
            handleDelete={handleDelete}
            title={"Delete Remote Access"}
            itemDelete={remoteAccessDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
