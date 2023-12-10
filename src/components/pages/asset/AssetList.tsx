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
interface AssetProps {
  asset: Asset;
  setRefresh: any;
  token: string;
}
const List: React.FC<AssetProps> = ({ asset, setRefresh, token }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [assetDelete, setAssetDelete] = useState<string>(asset.name);
  const [editAsset, setNewAsset] = useState<string>(asset.name);
  const [editAssetName, setEditAssetName] = useState<string>(asset.name);
  const [editAssetCategoryId, setEditAssetCategoryId] = useState<number>(
    asset.categoryId
  );
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
    if (editAsset !== "") {
      const res = await fetch(`${url}/assets/${asset.id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editAssetName,
          categoryId: editAssetCategoryId,
          departmentId: editAssetDepartmentId,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          signOut();
        }
        throw new Error("Failed to fetch data");
      }
    }
    setOpenModalEdit(false);
    toast.success("Asset updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/assets/${asset.id}`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401) {
        signOut();
      }
      throw new Error("Failed to fetch data");
    }
    setAssetDelete("");
    setOpenModalDelete(false);
    toast.success("Asset deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={asset.id}>
      <Col style={"w-1/5"}>{asset.name}</Col>
      <Col style={"w-1/5"}>{asset.Category.name}</Col>
      <Col style={"w-1/5"}>{asset.Manufacturer.name}</Col>
      <Col style={"w-1/5"}>{asset.Department.name}</Col>
      <Col style={"w-1/5"}>
        {asset.purchaseDate
          ? format(new Date(asset.purchaseDate?.toString()), "dd/MMM/yyyy")
          : ""}
      </Col>
      <Col style={"flex gap-5"}>
        <Link href={`/assets/${asset.id}`}>
          <BsEye
            onClick={() => setOpenModalPreview(true)}
            size={20}
            className="text-blue-950 hover:text-slate-600 transition-all"
            cursor="pointer"
          />
        </Link>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Edit Asset</h3>
            <div className="modal-action">
              <div className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      value={editAsset}
                      onChange={(e) => setNewAsset(e.target.value)}
                      type="text"
                      placeholder="asset name.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      // value={editAssetPhone}
                      // onChange={(e) => setNewAssetPhone(e.target.value)}
                      type="phone"
                      placeholder="phone.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      // value={editAssetEmail}
                      // onChange={(e) => setNewAssetEmail(e.target.value)}
                      type="email"
                      placeholder="email.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <textarea
                      // value={editAssetAddress}
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-600 rounded-lg border border-gray-300 "
                      placeholder="Your message..."
                      // onChange={(e) => setNewAssetAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="website"
                    >
                      Website
                    </label>
                    <input
                      name="website"
                      // value={editAssetWebsite}
                      // onChange={(e) => setNewAssetWebsite(e.target.value)}
                      type="text"
                      placeholder="http://"
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="onlineShop"
                    >
                      Online Shop
                    </label>
                    <input
                      name="onlineShop"
                      // value={editAssetOnlineShop}
                      // onChange={(e) => setNewAssetOnlineShop(e.target.value)}
                      type="text"
                      placeholder="http://tokopedia.com/"
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                </div>
                <hr className="my-6 border-gray-700" />
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="picName"
                    >
                      PIC Name
                    </label>
                    <input
                      name="picName"
                      // value={editPICName}
                      // onChange={(e) => setNewPICName(e.target.value)}
                      type="text"
                      placeholder="pic name.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="picPhone"
                    >
                      PIC Phone
                    </label>
                    <input
                      name="picPhone"
                      // value={editPICPhone}
                      // onChange={(e) => setNewPICPhone(e.target.value)}
                      type="phone"
                      placeholder="PIC Phone.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block text-sm mb-2 text-gray-500"
                      htmlFor="picEmail"
                    >
                      PIC Email
                    </label>
                    <input
                      name="picEmail"
                      // value={editPICEmail}
                      // onChange={(e) => setNewPICEmail(e.target.value)}
                      type="email"
                      placeholder="PIC email.."
                      className="input input-bordered w-full max-full text-sm"
                      required
                    />
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
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
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
      </Col>
    </Row>
  );
};
export default List;
