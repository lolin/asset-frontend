import Link from "next/link";
interface SidebarLinkProps {
  children: React.ReactNode;
  pathname: string;
  url: string;
  style: string;
}
const SidebarLink = ({ children, pathname, url, style }: SidebarLinkProps) => {
  return (
    <Link
      href={url}
      className={`group relative flex items-center gap-2.5  px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
        pathname === url && "rounded-md text-white"
      } ${style || "text-gray-500 "}`}
    >
      {children}
    </Link>
  );
};
export default SidebarLink;
