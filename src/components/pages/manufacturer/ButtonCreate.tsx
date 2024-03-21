"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/TextInput";
import ModalForm from "@/components/modal/ModalForm";
import fetchData from "@/util/fetchWrapper";
import Label from "@/components/elements/Label";
import TxtArea from "@/components/elements/TxtArea";

interface RefreshProps {
  setRefresh: any;
}
const ButtonCreate = ({ setRefresh }: RefreshProps, {}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [supportUrl, setSupportUrl] = useState<string>("");
  const [supportEmail, setSupportEmail] = useState<string>("");
  const [supportPhone, setSupportPhone] = useState<string>("");
  const [supportAddress, setSupportAddress] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `manufacturers`;
    const method = "POST";
    const body = {
      name: newTaskValue,
      image: image,
      url: url,
      supportUrl: supportUrl,
      supportEmail: supportEmail,
      supportPhone: supportPhone,
      supportAddress: supportAddress,
    };
    if (newTaskValue !== "") {
      await fetchData({ url, method, body });
      toast.success("Manufacturer added successfully");
      setRefresh(true);
    }
    setNewTaskValue("");
    setImage("");
    setUrl("");
    setSupportUrl("");
    setSupportEmail("");
    setSupportPhone("");
    setSupportAddress("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => setModalOpen(true)}
        className="btn w-full bg-blue-950 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-slate-600"
      >
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add New Manufacturer"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"name"} label={"Name"} />
              <TextInput
                label={"Name"}
                name={"name"}
                required={true}
                inputValue={newTaskValue}
                setValue={setNewTaskValue}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"url"} label={"Website"} />
              <TextInput
                label={"Website"}
                name={"url"}
                required={false}
                inputValue={url ? url : ""}
                setValue={setUrl}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"supportUrl"} label={"Support URL"} />
              <TextInput
                label={"Support URL"}
                name={"supportUrl"}
                required={true}
                inputValue={supportUrl ? supportUrl : ""}
                setValue={setSupportUrl}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"supportPhone"} label={"Support Phone"} />
              <TextInput
                label={"Support Phone"}
                name={"supportPhone"}
                required={true}
                inputValue={supportPhone ? supportPhone : ""}
                setValue={setSupportPhone}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"supportEmail"} label={"Support Email"} />
              <TextInput
                label={"Support Email"}
                name={"supportEmail"}
                required={true}
                inputValue={supportEmail ? supportEmail : ""}
                setValue={setSupportEmail}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"supportAddress"} label={"Support Address"} />
              <TxtArea
                label={"Support Address"}
                name={"supportAddress"}
                required={true}
                inputValue={supportAddress ? supportAddress : ""}
                setValue={setSupportAddress}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 float-right">
              <Button
                text={"Submit"}
                type={"submit"}
                style={"bg-blue-950 text-white"}
              />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
