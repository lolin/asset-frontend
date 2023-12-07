const HeaderCompnent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div>
      <h2 className="text-gray-600 font-semibold">{title}</h2>
      <span className="text-xs">{subTitle}</span>
    </div>
  );
};
export default HeaderCompnent;
