import Button from "@/components/elements/Button";
import Col from "@/components/elements/Col";
import Row from "@/components/elements/Row";
import TextInput from "@/components/elements/TextInput";
import Modal from "@/components/modal/Modal";
import ModalForm from "@/components/modal/ModalForm";
import ModalFormDelete from "@/components/modal/ModalFormDelete";
import { Manufacturer } from "@/types/manufacturer";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import fetchData from "@/util/fetchWrapper";
import Link from "next/link";
import Label from "@/components/elements/Label";
import TxtArea from "@/components/elements/TxtArea";
interface BrandProps {
  manufacturer: Manufacturer;
  setRefresh: any;
}
const List: React.FC<BrandProps> = ({ manufacturer, setRefresh }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [brandEdit, setBrandEdit] = useState<string>(manufacturer.name);
  const [image, setImage] = useState<string>(manufacturer.image);
  const [url, setUrl] = useState<string>(manufacturer.url);
  const [supportUrl, setSupportUrl] = useState<string>(manufacturer.supportUrl);
  const [supportEmail, setSupportEmail] = useState<string>(
    manufacturer.supportEmail
  );
  const [supportPhone, setSupportPhone] = useState<string>(
    manufacturer.supportPhone
  );
  const [supportAddress, setSupportAddress] = useState<string>(
    manufacturer.supportAddress
  );
  const [brandDelete, setBrandDelete] = useState<string>(manufacturer.name);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `manufacturers/${manufacturer.id}`;
    const method = "PATCH";
    const body = {
      name: brandEdit,
      image: image,
      url: url,
      supportUrl: supportUrl,
      supportEmail: supportEmail,
      supportPhone: supportPhone,
      supportAddress: supportAddress,
    };
    if (brandEdit !== "") {
      await fetchData({ url, method, body });
    }
    setBrandEdit("");
    setOpenModalEdit(false);
    toast.success("Manufacturer updated successfully");
    setRefresh(true);
  };
  const handleDelete: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = `manufacturers/${manufacturer.id}`;
    const method = "DELETE";
    const body = "";
    await fetchData({ url, method, body });
    setBrandDelete("");
    setOpenModalDelete(false);
    toast.success("Manufacturer deleted successfully");
    setRefresh(true);
  };

  return (
    <Row key={manufacturer.id}>
      <Col style={"w-1/5"}>{manufacturer.name}</Col>
      <Col style={"w-1/5"}>
        <Link href={manufacturer.url ? manufacturer.url : "#"} target="_blank">
          {manufacturer.url ? manufacturer.url : "-"}
        </Link>
      </Col>
      <Col style={"w-1/5"}>
        <Link
          href={manufacturer.url ? manufacturer.supportUrl : "#"}
          target="_blank"
        >
          {manufacturer.supportUrl ? manufacturer.supportUrl : "-"}
        </Link>
      </Col>
      <Col style={"w-1/5"}>
        <Link
          href={manufacturer.url ? `tel:` + manufacturer.supportPhone : "#"}
          target="_blank"
        >
          {manufacturer.supportPhone ? manufacturer.supportPhone : "-"}
        </Link>
      </Col>
      <Col style={"w-1/5"}>
        <Link
          href={manufacturer.url ? `mailto:` + manufacturer.supportEmail : "#"}
          target="_blank"
        >
          {manufacturer.supportEmail ? manufacturer.supportEmail : "-"}
        </Link>
      </Col>
      <Col style={"flex gap-5"}>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-blue-900 hover:text-slate-500 transition-all"
          cursor="pointer"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <ModalForm handleSubmit={handleSubmit} title={"Edit Manufacturer"}>
            <div className="w-full max-w-lg mx-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"name"} label={"Name"} />
                <TextInput
                  label={"Name"}
                  name={"name"}
                  required={true}
                  inputValue={brandEdit}
                  setValue={setBrandEdit}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"url"} label={"Website"} />
                <TextInput
                  label={"Website"}
                  name={"url"}
                  required={false}
                  inputValue={url ? url : ""}
                  setValue={setUrl}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"supportUrl"} label={"Support URL"} />
                <TextInput
                  label={"Support URL"}
                  name={"supportUrl"}
                  required={true}
                  inputValue={supportUrl ? supportUrl : ""}
                  setValue={setSupportUrl}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"supportPhone"} label={"Support Phone"} />
                <TextInput
                  label={"Support Phone"}
                  name={"supportPhone"}
                  required={true}
                  inputValue={supportPhone ? supportPhone : ""}
                  setValue={setSupportPhone}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"supportEmail"} label={"Support Email"} />
                <TextInput
                  label={"Support Email"}
                  name={"supportEmail"}
                  required={true}
                  inputValue={supportEmail ? supportEmail : ""}
                  setValue={setSupportEmail}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <Label htmlFor={"supportAddress"} label={"Support Address"} />
                <TxtArea
                  label={"Support Address"}
                  name={"supportAddress"}
                  required={true}
                  inputValue={supportAddress ? supportAddress : ""}
                  setValue={setSupportAddress}
                  style={""}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6 float-right">
                <Button
                  text={"Update"}
                  type={"submit"}
                  style={"bg-blue-950 text-white"}
                />
              </div>
            </div>
          </ModalForm>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          size={20}
          className="text-blue-900 transition-all hover:text-slate-500"
          cursor="pointer"
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <ModalFormDelete
            label={"manufacturer"}
            handleDelete={handleDelete}
            title={"Delete Manufacturer"}
            itemDelete={brandDelete}
          />
        </Modal>
      </Col>
    </Row>
  );
};
export default List;
