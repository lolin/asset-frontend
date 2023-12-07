type Props = {
  [key: string]: any;
};
const THead = ({ ...props }: Props) => {
  return (
    <th
      key={props.key || ""}
      className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
        props.style || ""
      }`}
    >
      {props.children}
    </th>
  );
};
export default THead;
