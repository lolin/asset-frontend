const HeaderCompnent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div>
      <h2 className="text-slate-700 font-semibold text-4xl">{title}</h2>
      <span className="text-xs">{subTitle}</span>
    </div>
  );
};
export default HeaderCompnent;
