import Modal from "@/components/modal/Modal";
import { Asset } from "@/types/asset";
import { signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { BsEye, BsEyeFill } from "react-icons/bs";
import { format } from "date-fns";
import Link from "next/link";
import Router from "next/router";
import Row from "@/components/elements/Row";
import Col from "@/components/elements/Col";
import fetchData from "@/util/fetchWrapper";
interface AssetProps {
  asset: Asset;
  setRefresh: any;
}
const List: React.FC<AssetProps> = ({ asset, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [assetDelete, setAssetDelete] = useState<string>(asset.name);
  const [editAsset, setNewAsset] = useState<string>(asset.name);
  const [editAssetName, setEditAssetName] = useState<string>(asset.name);
  const [editAssetDepartmentId, setEditAssetDepartmentId] = useState<number>(
    asset.departmentId
  );
  const [editAssetBrandId, setEditAssetBrandId] = useState<number>(
    asset.brandId
  );
  const [editAssetVendorId, setEditAssetVendorId] = useState<number>(
    asset.brandId
  );
  const [editAssetConditionId, setEditAssetConditionId] = useState<number>(
    asset.conditionId
  );
  const [editAssetModel, setEditAssetModel] = useState<string>(asset.model);
  const [editAssetSerialNumber, setEditAssetSerialNumber] = useState<string>(
    asset.serialNumber
  );
  const [editAssetMacAddress, setEditAssetMacAddress] = useState<string>(
    asset.macAddress
  );
  const [editAssetIpAddress, setEditAssetIpAddress] = useState<string>(
    asset.ipAddress
  );
  const [editAssetDetail, setEditAssetDetail] = useState<string>(
    asset.assetDetails
  );
  const [editAssetPrice, setEditAssetPrice] = useState<number>(asset.price);
  const [editAssetPurchaseDate, setEditAssetPurchaseDate] = useState<Date>(
    asset.purchaseDate
  );
  const [editAssetWarantyPeriod, setEditAssetWarantyPeriod] = useState<Date>(
    asset.warantyPeriod
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `assets/${asset.id}`;
    const method = "PATCH";
    const body = {
      name: editAssetName,
      departmentId: editAssetDepartmentId,
    };
    if (editAsset !== "") {
      await fetchData({ url, method, body });
    }
    setOpenModalEdit(false);
    toast.success("Asset updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `assets/${asset.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setAssetDelete("");
    setOpenModalDelete(false);
    toast.success("Asset deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={asset.id}>
      <Col style={"w-1/5"}>{asset.name}</Col>
      <Col style={"w-1/5"}>{asset.AssetModel?.Category.name}</Col>
      <Col style={"w-1/5"}>{asset.AssetModel?.name}</Col>
      <Col style={"w-1/5"}>{asset.Department.name}</Col>
      <Col style={"w-1/5"}>
        {asset.purchaseDate
          ? format(new Date(asset.purchaseDate?.toString()), "dd/MMM/yyyy")
          : ""}
      </Col>
      <Col style={"flex gap-5"}>
        <Link href={`/assets/detail/${asset.id}`}>
          <BsEye
            // onClick={() => setOpenModalPreview(true)}
            size={20}
            className="text-blue-950 hover:text-slate-600 transition-all"
            cursor="pointer"
          />
        </Link>
        <Link href={`/assets/${asset.id}`}>
          <FiEdit
            // onClick={() => setOpenModalEdit(true)}
            size={20}
            className="text-blue-950 hover:text-slate-600 transition-all"
            cursor="pointer"
          />
        </Link>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
      </Col>
      <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
        <form onSubmit={handleDelete}>
          <h3 className="font-bold text-lg">Edit Asset</h3>
          <div className="modal-action">
            <p className="mt-4 mr-4">
              Are you sure you want to delete this asset? {assetDelete}
            </p>
            <button type="submit" className="btn bg-red-500 text-white">
              Delete
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        modalOpen={openModalEdit}
        setModalOpen={setOpenModalEdit}
        modalSize="max-w-5xl"
      >
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Asset Detail</h3>
          <div className="modal-action">
            <div className="w-full">
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Asset Code:
                  </label>
                  <span className="text-slate-800 ml-3">{asset.name}</span>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Department:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.Department.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Category:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.AssetModel?.Category.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Model:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.AssetModel?.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Model Number:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.AssetModel?.modelNumber}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    Serial Number:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.serialNumber}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="text-sm mb-2 text-gray-500" htmlFor="name">
                    MacAddress:
                  </label>
                  <span className="text-slate-800 ml-3">
                    {asset.macAddress}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-0">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn float-right bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </Row>
  );
};
export default List;
