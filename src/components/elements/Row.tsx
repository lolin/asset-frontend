type Props = {
  [key: string]: any;
};
const Row = ({ ...props }: Props) => {
  return (
    <tr
      key={props.key || ""}
      className={`bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ${
        props.style || ""
      }`}
    >
      {props.children}
    </tr>
  );
};
export default Row;
