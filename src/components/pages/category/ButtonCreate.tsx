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
import Select from "@/components/elements/Select";
import { AssetType } from "@/types/asset-type";
interface RefreshProps {
  setRefresh: any;
  token: string;
  assetTypes: AssetType[];
}
const ButtonCreate: React.FC<RefreshProps> = (
  { setRefresh, token, assetTypes }: RefreshProps,
  {}
) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newAssetTypeId, setNewAssetTypeId] = useState<string>("");
  const url = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newTaskValue !== "") {
      const res = await fetch(`${url}/category`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newTaskValue,
          assetTypeId: newAssetTypeId,
        }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
      toast.success("Category added successfully");
      setRefresh(true);
    }
    setNewTaskValue("");
    setNewAssetTypeId("");
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new category"}>
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
              <Label htmlFor={"asset_type"} label={"Asset Type"} />
              <Select
                label={""}
                name={"companyid"}
                required={true}
                inputValue={newAssetTypeId}
                setValue={setNewAssetTypeId}
                style={""}
              >
                <option>&nbsp;</option>
                {assetTypes.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
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
