type Props = {
  [key: string]: any;
};

const TxtArea = ({ ...props }: Props) => {
  return (
    <textarea
      rows={props.rows || 4}
      name={props.name}
      required={props.required}
      value={props.inputValue}
      onChange={(e) => props.setValue(e.target.value)}
      placeholder={props.placeholder || ""}
      className={`block p-2.5 w-full text-sm text-slate-800 rounded-lg border border-gray-300 focus:border-gray-200 focus:outline outline-2 outline-offset-2  outline-gray-300 ${
        props.style || ""
      }`}
    ></textarea>
  );
};

export default TxtArea;
