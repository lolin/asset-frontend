"use client";
import Button from "@/components/elements/Button";
import FormCreate from "@/components/pages/asset/FormCreate";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
export default function CreateAsset() {
  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Add New Asset" subTitle="Add new asset" />
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            style={
              "text-indigo-500 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 float-right"
            }
          >
            <IoArrowBackCircle size={20} />
            Back
          </Button>
        </div>
      </div>
      <FormCreate />
    </div>
  );
}
