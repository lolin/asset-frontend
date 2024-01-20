import Modal from "@/components/modal/Modal";
import { Vendor } from "@/types/vendor";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { BsEye } from "react-icons/bs";
import Link from "next/link";
import Label from "@/components/elements/Label";
import TextInput from "@/components/elements/TextInput";
import ModalForm from "@/components/modal/ModalForm";
import Button from "@/components/elements/Button";
import TxtArea from "@/components/elements/TxtArea";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import Row from "@/components/elements/Row";
import Col from "@/components/elements/Col";
import fetchData from "@/util/fetchWrapper";
interface VendorProps {
  vendor: Vendor;
  setRefresh: any;
}
const List: React.FC<VendorProps> = ({ vendor, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [vendorDelete, setVendorDelete] = useState<string>(vendor.name);
  const [editVendor, setEditVendor] = useState<string>(vendor.name);
  const [editVendorPhone, setEditVendorPhone] = useState<string>(vendor.phone);
  const [editVendorEmail, setEditVendorEmail] = useState<string>(vendor.email);
  const [editVendorAddress, setEditVendorAddress] = useState<string>(
    vendor.address
  );
  const [editVendorWebsite, setEditVendorWebsite] = useState<string>(
    vendor.website
  );
  const [editVendorOnlineShop, setEditVendorOnlineShop] = useState<string>(
    vendor.onlineShop
  );
  const [editPICName, setEditPICName] = useState<string>(vendor.picName);
  const [editPICPhone, setEditPICPhone] = useState<string>(vendor.picPhone);
  const [editPICEmail, setEditPICEmail] = useState<string>(vendor.picEmail);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `vendors/${vendor.id}`;
    const method = "PATCH";
    const body = {
      name: editVendor,
      phone: editVendorPhone,
      email: editVendorEmail,
      address: editVendorAddress,
      website: editVendorWebsite,
      onlineShop: editVendorOnlineShop,
      picName: editPICName,
      picPhone: editPICPhone,
      picEmail: editPICEmail,
    };
    if (editVendor !== "") {
      await fetchData({ url, method, body });
    }
    setOpenModalEdit(false);
    toast.success("Vendor updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `vendors/${vendor.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setVendorDelete("");
    setOpenModalDelete(false);
    toast.success("Vendor deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={vendor.id}>
      <Col style="w-1/4">{vendor.name}</Col>
      <Col style="w-1/4">{vendor.phone}</Col>
      <Col style="w-1/4 flex">{vendor.website}</Col>
      <Col style="w-1/4">{vendor.address}</Col>
      <Col style={"flex gap-5"}>
        <BsEye
          onClick={() => setOpenModalPreview(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalPreview} setModalOpen={setOpenModalPreview}>
          <div>
            <h3 className="font-bold text-lg underline">Vendor Information</h3>
            <div className="modal-action">
              <div className="w-full max-w-lg">
                <h3 className="font-bold text-md">{vendor.name}</h3>
                <div className="p-5 gap-5">
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">Phone:</span>{" "}
                    <Link
                      href={`tel:${vendor.phone}`}
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.phone}
                    </Link>
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">Email:</span>{" "}
                    <Link
                      href={`mailto:${vendor.email}`}
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.email}
                    </Link>
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold  mr-2 w-1/4">Website:</span>{" "}
                    <Link
                      href={`${vendor.website}`}
                      target="_blank"
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.website}
                    </Link>
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold  mr-2 w-1/4">Online Shop:</span>{" "}
                    <Link
                      href={vendor.onlineShop}
                      target="_blank"
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.onlineShop}
                    </Link>
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">Address:</span>
                    <span className="w-3/4">{vendor.address}</span>
                  </p>
                  <hr className="mb-4" />
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">PIC:</span>{" "}
                    {vendor.picName}
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">Phone:</span>{" "}
                    <Link
                      href={`tel:${vendor.picPhone}`}
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.picPhone}
                    </Link>
                  </p>
                  <p className="mb-4 w-full flex">
                    <span className="font-bold mr-2 w-1/4">Email:</span>{" "}
                    <Link
                      href={`mailto:${vendor.picEmail}`}
                      className="pointer transition-all hover:text-blue-600"
                    >
                      {vendor.picEmail}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Vendor"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"name"} label={"Name"} />
                <TextInput
                  label={""}
                  name={"name"}
                  required={true}
                  inputValue={editVendor}
                  setValue={setEditVendor}
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
                  inputValue={editVendorPhone}
                  setValue={setEditVendorPhone}
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
                  inputValue={editVendorEmail}
                  setValue={setEditVendorEmail}
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
                  inputValue={editVendorAddress}
                  setValue={setEditVendorAddress}
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
                  inputValue={editVendorWebsite}
                  setValue={setEditVendorWebsite}
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
                  inputValue={editVendorOnlineShop}
                  setValue={setEditVendorOnlineShop}
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
                  inputValue={editPICName}
                  setValue={setEditPICName}
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
                  inputValue={editPICPhone}
                  setValue={setEditPICPhone}
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
                  inputValue={editPICEmail}
                  setValue={setEditPICEmail}
                  placeholder={"mail@example.com"}
                  style={"text-sm"}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 float-right">
                <Button text={"Update"} type={"submit"} style={""} />
              </div>
            </div>
          </ModalForm>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-950 hover:text-slate-600 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <ModalFormDelete
            label={"condition"}
            handleDelete={handleDelete}
            title={"Delete Condition"}
            itemDelete={vendorDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
