"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import ModalForm from "@/components/modal/ModalForm";
import Label from "@/components/elements/Label";
import TextInput from "@/components/elements/TextInput";
import Button from "@/components/elements/Button";
import TxtArea from "@/components/elements/TxtArea";
interface RefreshProps {
  setRefresh: any;
  token: string;
}
const ButtonCreate = ({ setRefresh, token }: RefreshProps, {}) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newVendor, setNewVendor] = useState<string>("");
  const [newVendorPhone, setNewVendorPhone] = useState<string>("");
  const [newVendorEmail, setNewVendorEmail] = useState<string>("");
  const [newVendorAddress, setNewVendorAddress] = useState<string>("");
  const [newVendorWebsite, setNewVendorWebsite] = useState<string>("");
  const [newVendorOnlineShop, setNewVendorOnlineShop] = useState<string>("");
  const [newPICName, setNewPICName] = useState<string>("");
  const [newPICPhone, setNewPICPhone] = useState<string>("");
  const [newPICEmail, setNewPICEmail] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newVendor !== "") {
      const res = await fetch(`${url}/vendors`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newVendor,
          phone: newVendorPhone,
          email: newVendorEmail,
          address: newVendorAddress,
          website: newVendorWebsite,
          onlineShop: newVendorOnlineShop,
          picName: newPICName,
          picPhone: newPICPhone,
          picEmail: newPICEmail,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          // signOut();
          console.log(res);
        }
        throw new Error("Failed to fetch data");
      }

      toast.success("Vendor added successfully");
      setRefresh(true);
    }
    setModalOpen(false);
  };
  return (
    <div className="lg:ml-40 ml-10 space-x-8">
      <button
        onClick={() => {
          setModalOpen(true),
            setNewVendor(""),
            setNewVendorPhone(""),
            setNewVendorEmail(""),
            setNewVendorAddress(""),
            setNewVendorWebsite(""),
            setNewVendorOnlineShop(""),
            setNewPICName(""),
            setNewPICPhone(""),
            setNewPICEmail("");
        }}
        className="btn bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        Create
        <AiOutlinePlus size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <ModalForm handleSubmit={handleSubmit} title={"Add new vendor"}>
          <div className="w-full max-w-lg mx-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"name"} label={"Name"} />
              <TextInput
                label={""}
                name={"name"}
                required={true}
                inputValue={newVendor}
                setValue={setNewVendor}
                placeholder={"Vendor"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"phone"} label={"Phone"} />
              <TextInput
                label={""}
                type={"tel"}
                name={"phone"}
                required={false}
                inputValue={newVendorPhone}
                setValue={setNewVendorPhone}
                placeholder={"08XXXXXXXXX"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"email"} label={"Email"} />
              <TextInput
                label={""}
                type={"email"}
                name={"email"}
                required={false}
                inputValue={newVendorEmail}
                setValue={setNewVendorEmail}
                placeholder={"mail@example.com"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"address"} label={"Address"} />
              <TxtArea
                label={""}
                row={4}
                name={"address"}
                required={false}
                inputValue={newVendorAddress}
                setValue={setNewVendorAddress}
                placeholder={"Address"}
                style={""}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"website"} label={"Website"} />
              <TextInput
                label={""}
                type={"text"}
                name={"website"}
                required={false}
                inputValue={newVendorWebsite}
                setValue={setNewVendorWebsite}
                placeholder={"http://example.com"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"onlineShop"} label={"Online Store"} />
              <TextInput
                label={""}
                type={"text"}
                name={"onlineShop"}
                required={false}
                inputValue={newVendorOnlineShop}
                setValue={setNewVendorOnlineShop}
                placeholder={"http://example.com/online-shop"}
                style={"text-sm"}
              />
            </div>
            <hr className="my-6 border-gray-700" />
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"picName"} label={"PIC Name"} />
              <TextInput
                label={""}
                type={"text"}
                name={"picName"}
                required={false}
                inputValue={newPICName}
                setValue={setNewPICName}
                placeholder={"PIC name"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"picPhone"} label={"PIC Phone"} />
              <TextInput
                label={""}
                type={"tel"}
                name={"picPhone"}
                required={false}
                inputValue={newPICPhone}
                setValue={setNewPICPhone}
                placeholder={"08XXXXXXXXX"}
                style={"text-sm"}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Label htmlFor={"picEmail"} label={"PIC Email"} />
              <TextInput
                label={""}
                type={"email"}
                name={"picEmail"}
                required={false}
                inputValue={newPICEmail}
                setValue={setNewPICEmail}
                placeholder={"mail@example.com"}
                style={"text-sm"}
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
