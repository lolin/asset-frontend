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
  asset: any;
}
const ButtonCreate = ({ setRefresh, asset }: RefreshProps, {}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>("");
  const [assetId, setAssetId] = useState<string>("");
  const [remoteId, setRemoteId] = useState<string>("");
  const [remoteUser, setRemoteUser] = useState<string>("");
  const [remotePassword, setRemotePassword] = useState<string>("");
  const [remoteSource, setRemoteSource] = useState<string>("");
  const initSource = [
    { name: "AnyDesk" },
    { name: "RDP" },
    { name: "TeamViewer" },
    { name: "VNC" },
    { name: "SSH" },
  ];
  const [remoteSourceList, setRemoteSourceList] = useState(initSource);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (alias !== "" && remoteId !== "") {
      const url = `remote-access`;
      const method = "POST";
      const body = {
        alias: alias,
        assetId: assetId,
        remoteId: remoteId,
        remoteUser: remoteUser,
        remotePassword: remotePassword,
        remoteSource: remoteSource,
      };
      await fetchData({ url, method, body });
      toast.success("RemoteAccess added successfully");
      setRefresh(true);
    }
    setAlias("");
    setAssetId("");
    setRemoteId("");
    setRemoteUser("");
    setRemotePassword("");
    setRemoteSource("");
    setModalOpen(false);
  };

  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setAlias("");
          setAssetId("");
          setRemoteId("");
          setRemoteUser("");
          setRemotePassword("");
          setRemoteSource("");
          setModalOpen(true);
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new department"}>
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
              <Label htmlFor={"remotePassword"} label={"Password"} />
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
              <Button text={"Submit"} type={"submit"} style={""} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
