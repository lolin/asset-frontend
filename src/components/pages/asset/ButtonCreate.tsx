"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../modal/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
interface RefreshProps {
  setRefresh: any;
}
const ButtonCreate = ({ setRefresh }: RefreshProps, {}) => {
  const router = useRouter();
  return (
    <div className="lg:ml-40 ml-0 lg:space-x-8">
      <button
        onClick={() => {
          router.push("/assets/create");
        }}
        className="btn w-full bg-blue-950 hover:bg-slate-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      >
        <AiOutlinePlus size={20} />
      </button>
    </div>
  );
};

export default ButtonCreate;
