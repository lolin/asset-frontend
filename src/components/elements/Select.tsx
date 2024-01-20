type Props = {
  [key: string]: any;
};

const Select = ({ ...props }: Props) => {
  return (
    <select
      id={props.name}
      name={props.name}
      required={props.required || false}
      value={props.inputValue}
      className={`select select-bordered w-full p-2.5  ${props.style || ""}`}
      onChange={(e) =>
        props.setValue(
          props.valueType === "string"
            ? String(e.target.value)
            : Number(e.target.value)
        )
      }
    >
      {props.children}
    </select>
  );
};

export default Select;
