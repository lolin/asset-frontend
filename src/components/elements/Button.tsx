type Props = {
  [key: string]: any;
};
const Button = ({ ...props }: Props) => {
  return (
    <div>
      <button
        className={`btn px-4 py-2 rounded-md font-semibold tracking-wide bg-blue-950 text-white hover:bg-slate-600 ${
          props.style || ""
        }`}
        onClick={props.onClick}
        type={props.type || "button"}
      >
        {props.text}
        {props.children}
      </button>
    </div>
  );
};

export default Button;
