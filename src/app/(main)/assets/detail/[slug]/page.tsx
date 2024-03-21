"use client";
import Button from "@/components/elements/Button";
import DetailAsset from "@/components/pages/asset/DetailAsset";
import HeaderCompnent from "@/components/utility/HeaderComponent";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
export default function CreateAsset(props: { params: { slug: string[] } }) {
  const router = useRouter();
  const params = props.params;
  return (
    <div className=" w-full">
      <div className=" flex items-center justify-between pb-6">
        <HeaderCompnent title="Asset" subTitle="Detail Asset" />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.back()} style={""}>
            <IoArrowBackCircle size={20} />
          </Button>
        </div>
      </div>
      <DetailAsset params={params.slug[0]} />
    </div>
  );
}
