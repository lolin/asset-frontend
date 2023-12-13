"use client";
import Button from "@/components/elements/Button";
import FormCreate from "@/components/pages/asset-model/FormCreate";
import FormEdit from "@/components/pages/asset-model/FormEdit";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
export default function CreateAsset(props: { params: { id: string } }) {
  const router = useRouter();
  const params = props.params;
  console.log(params);
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Add New Asset" subTitle="Add new asset" />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.back()} style={""}>
            <IoArrowBackCircle size={20} />
          </Button>
        </div>
      </div>
      {params.id && <FormEdit params={params.id} />}
    </div>
  );
}
