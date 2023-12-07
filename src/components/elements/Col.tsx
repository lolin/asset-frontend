type Props = {
  [key: string]: any;
};
const Col = ({ ...props }: Props) => {
  return (
    <td className={`px-4 py-4 text-md text-slate-600 ${props.style || ""}`}>
      {props.children}
    </td>
  );
};
export default Col;
