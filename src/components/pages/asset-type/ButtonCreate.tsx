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
import Label from "@/components/elements/Label";
interface RefreshProps {
  setRefresh: any;
  token: string;
}
const ButtonCreate = ({ setRefresh, token }: RefreshProps, {}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newDescriptionValue, setNewDescriptionValue] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue !== "") {
      const res = await fetch(`${url}/asset-type`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTaskValue,
          description: newDescriptionValue,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
          console.log(res);
        }
        throw new Error("Failed to fetch data");
      }
      toast.success("Asset Type added successfully");
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
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add New Asset Type"}>
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
              <Label htmlFor={"description"} label={"Description"} />
              <TextInput
                label={"Description"}
                name={"description"}
                required={true}
                inputValue={newDescriptionValue}
                setValue={setNewDescriptionValue}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-0 float-right">
              <Button text={"Update"} type={"submit"} style={""} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
