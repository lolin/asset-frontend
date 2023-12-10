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
const ButtonCreate: React.FC<RefreshProps> = (
  { setRefresh, token }: RefreshProps,
  {}
) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newTermValue, setNewTermValue] = useState<any>();
  const [newFloorValue, setNewFloorValue] = useState<any>();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue !== "") {
      const res = await fetch(`${url}/depreciations`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTaskValue,
          term: newTermValue,
          floor: newFloorValue,
        }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
      toast.success("Depreciation added successfully");
      setRefresh(true);
    }
    setNewTaskValue("");
    setNewTermValue("");
    setNewFloorValue("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setModalOpen(true),
            setNewTaskValue(""),
            setNewTermValue(""),
            setNewFloorValue("");
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add New Depreciation"}>
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
              <Label htmlFor={"term"} label={"Number of Month"} />
              <TextInput
                label={"Term"}
                name={"term"}
                type={"number"}
                required={true}
                inputValue={newTermValue}
                setValue={setNewTermValue}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label
                htmlFor={"floorvalue"}
                label={"Minimum Value after Depreciation"}
              />
              <TextInput
                label={"Floor Value"}
                name={"floorvalue"}
                type={"number"}
                required={false}
                inputValue={newFloorValue}
                setValue={setNewFloorValue}
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
