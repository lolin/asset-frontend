import Button from "../elements/Button";

type Props = {
  [key: string]: any;
};
const ModalFormDelete = ({ ...props }: Props) => {
  return (
    <form onSubmit={props.handleDelete || (() => {})}>
      <h3 className="font-bold text-lg text-slate-600">{props.title}</h3>
      <div className="modal-action">
        <p className="mt-2 mr-4 w-full">
          Are you sure you want to delete this {props.label || "item"}?{" "}
          <strong className="text-slate-600 text-md">{props.itemDelete}</strong>
        </p>
        <Button
          text={"Delete"}
          type={"submit"}
          style={"bg-red-500 text-white"}
        />
      </div>
    </form>
  );
};

export default ModalFormDelete;
