type Props = {
  [key: string]: any;
};
const Label = ({ ...props }: Props) => {
  return (
    <>
      <label className="block text-sm mb-2 text-gray-500" htmlFor={props.name}>
        {props.label}
      </label>
    </>
  );
};
export default Label;
