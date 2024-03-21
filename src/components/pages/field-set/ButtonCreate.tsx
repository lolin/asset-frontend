"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import ModalForm from "@/components/modal/ModalForm";
import TextInput from "@/components/elements/TextInput";
import Button from "@/components/elements/Button";
import fetchData from "@/util/fetchWrapper";

interface RefreshProps {
  setRefresh: any;
}
const ButtonCreate = ({ setRefresh }: RefreshProps, {}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue !== "") {
      const url = `field-sets`;
      const method = "POST";
      const body = { name: newTaskValue };
      await fetchData({ url, method, body });
      toast.success("Field set added successfully");
      setRefresh(true);
    }
    setNewTaskValue("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => setModalOpen(true)}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new field set"}>
          <TextInput
            label={"Name"}
            name={"name"}
            required={true}
            inputValue={newTaskValue}
            setValue={setNewTaskValue}
            style={""}
          />
          <Button text={"Submit"} type={"submit"} style={""} />
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
