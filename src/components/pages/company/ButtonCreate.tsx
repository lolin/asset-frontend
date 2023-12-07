"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import ModalForm from "@/components/modal/ModalForm";
import TextInput from "@/components/elements/TextInput";
import Button from "@/components/elements/Button";
interface RefreshProps {
  setRefresh: any;
  token: string;
}
const ButtonCreate = ({ setRefresh, token }: RefreshProps, {}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue !== "") {
      const res = await fetch(`${url}/brands`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newTaskValue }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
          console.log(res);
        }
        throw new Error("Failed to fetch data");
      }
      toast.success("Brand added successfully");
      setRefresh(true);
    }
    setNewTaskValue("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-10 space-x-8">
      <button
        onClick={() => setModalOpen(true)}
        className="btn bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new company"}>
          <TextInput
            label={"Name"}
            name={"name"}
            required={true}
            inputValue={newTaskValue}
            setValue={setNewTaskValue}
            style={""}
          />
          <Button text={"Submit"} type={"submit"} style={"bg-indigo-600"} />
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
