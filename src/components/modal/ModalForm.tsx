type Props = {
  [key: string]: any;
};
const ModalForm = ({ ...props }: Props) => {
  return (
    <form onSubmit={props.handleSubmit || (() => {})}>
      <h3 className="font-bold text-lg text-gray-600">{props.title}</h3>
      <div className="modal-action">{props.children}</div>
    </form>
  );
};

export default ModalForm;
