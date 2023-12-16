import Label from "../elements/Label";
import Select from "../elements/Select";
type Props = {
  [key: string]: any;
};
const SelectOption = ({ ...props }: Props) => {
  return (
    <div className={`w-full px-3 ${props.divStyle || ""}`}>
      <Label htmlFor={props.name} label={props.label} />
      <Select
        name={props.name}
        required={props.required}
        inputValue={props.inputValue}
        setValue={props.setValue || null}
        style={props.style || ""}
      >
        {props.children}
      </Select>
    </div>
  );
};

export default SelectOption;
