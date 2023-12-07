import Label from "../elements/Label";
import TxtArea from "../elements/TxtArea";
type Props = {
  [key: string]: any;
};
const TextArea = ({ ...props }: Props) => {
  return (
    <div className={`w-full px-3 ${props.divStyle || ""}`}>
      <Label htmlFor={props.name} label={props.label} />
      <TxtArea
        name={props.name}
        rows={props.row || 4}
        required={props.required}
        inputValue={props.inputValue}
        setValue={props.setValue}
        placeholder={props.placeholder || ""}
        style={props.style || ""}
      />
    </div>
  );
};

export default TextArea;
