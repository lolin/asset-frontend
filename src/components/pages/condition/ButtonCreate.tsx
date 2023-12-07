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
  const [newCondition, setNewCondition] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newCondition !== "" && newDescription !== "") {
      const res = await fetch(`${url}/conditions`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newCondition,
          description: newDescription,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
          console.log(res);
        }
        throw new Error("Failed to fetch data");
      }
      toast.success("Condition added successfully");
      setRefresh(true);
    }
    setNewCondition("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-10 space-x-8">
      <button
        onClick={() => {
          setModalOpen(true), setNewCondition(""), setNewDescription("");
        }}
        className="btn bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new condition"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"name"} label={"Name"} />
              <TextInput
                label={"Name"}
                name={"name"}
                required={true}
                inputValue={newCondition}
                setValue={setNewCondition}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"description"} label={"Description"} />
              <TextInput
                label={"Description"}
                name={"description"}
                required={true}
                inputValue={newDescription}
                setValue={setNewDescription}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 float-right">
              <Button text={"Submit"} type={"submit"} style={"bg-indigo-600"} />
            </div>
          </div>
        </ModalForm>
      </Modal>
    </div>
  );
};

export default ButtonCreate;
