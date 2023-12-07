"use client";
import Button from "@/components/elements/Button";
import FormEdit from "@/components/pages/asset/FormEdit";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
export default function EditAsset(props: { params: { slug: string[] } }) {
  const router = useRouter();
  const params = props.params;
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Edit Asset" subTitle="Edit asset" />
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            style={
              "text-indigo-500 bg-indigo-50 border border-indigo-300 hover:bg-indigo-100 float-right"
            }
          >
            <IoArrowBackCircle size={20} />
            Back {params.slug[0]}
          </Button>
        </div>
      </div>
      {params.slug[0] && <FormEdit params={params.slug[0]} />}
    </div>
  );
}
