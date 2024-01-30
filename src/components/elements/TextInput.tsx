type Props = {
  [key: string]: any;
};

const TextInput = ({ ...props }: Props) => {
  return (
    <input
      id={props.name}
      name={props.name}
      required={props.required}
      value={props.inputValue}
      onChange={(e) => props.setValue(e.target.value)}
      type={props.type || "text"}
      placeholder={props.placeholder || ""}
      className={`input text-slate-800 input-bordered w-full max-ful ${
        props.style || ""
      }`}
      readOnly={props.readOnly || false}
    />
  );
};

export default TextInput;
