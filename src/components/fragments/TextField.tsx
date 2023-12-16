import Label from "../elements/Label";
import TextInput from "../elements/TextInput";
type Props = {
  [key: string]: any;
};
const TextField = ({ ...props }: Props) => {
  return (
    <div className={`w-full px-3 ${props.divStyle || ""}`}>
      <Label htmlFor={props.name} label={props.label} />
      <TextInput
        name={props.name}
        required={props.required}
        inputValue={props.inputValue || ""}
        setValue={props.setValue}
        type={props.type || "text"}
        placeholder={props.placeholder || ""}
        style={props.style || ""}
        readOnly={props.readOnly || false}
      />
    </div>
  );
};

export default TextField;
