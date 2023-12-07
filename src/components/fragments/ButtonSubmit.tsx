import Button from "../elements/Button";

type Props = {
  [key: string]: any;
};
const ButtonSubmit = ({ ...props }: Props) => {
  return (
    <div>
      <Button text={props.text} type={props.type} />
    </div>
  );
};
export default ButtonSubmit;
