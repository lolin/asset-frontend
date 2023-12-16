import SidebarLinkGroup from "@/components/sidebar/SidebarLinkGroup";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaThList } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CgListTree } from "react-icons/cg";
import SidebarLink from "@/components/sidebar/SidebarLink";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  console.log(sidebarOpen);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-slate-900 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0 z-10" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-5 py-5 lg:py-6">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar scrollb flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-5 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <SidebarLink
                  url="/dashboard"
                  pathname={pathname}
                  style={`rounded-sm py-2 text-gray-100 ease-in-out hover:bg-gray-700 dark:hover:bg-gray-600 ${
                    pathname.includes("dashboard") &&
                    "bg-gray-700 dark:bg-gray-600"
                  }`}
                >
                  <RxDashboard size={20} />
                  Dashboard
                </SidebarLink>
              </li>
              <li>
                <SidebarLink
                  url="/assets"
                  pathname={pathname}
                  style={`rounded-sm py-2 text-gray-100 ease-in-out hover:bg-gray-700 dark:hover:bg-gray-600 ${
                    pathname.includes("assets") &&
                    "bg-gray-700 dark:bg-gray-600"
                  }`}
                >
                  <FaThList size={20} />
                  Asset
                </SidebarLink>
              </li>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("manufacturers")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-100 duration-300 ease-in-out hover:bg-gray-700 dark:hover:bg-gray-700 ${
                          (pathname === "/utility" ||
                            pathname.includes("utility")) &&
                          "bg-gray-800 dark:bg-grey-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CgListTree size={22} />
                        Asset Utility
                        <IoIosArrowDown
                          size={18}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLink
                              url="/asset-models"
                              pathname={pathname}
                              style={""}
                            >
                              Asset Model
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/asset-type"
                              pathname={pathname}
                              style={""}
                            >
                              Asset Type
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/asset-status"
                              pathname={pathname}
                              style={""}
                            >
                              Asset Status
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/categories"
                              pathname={pathname}
                              style={""}
                            >
                              Category
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/field-sets"
                              pathname={pathname}
                              style={""}
                            >
                              Fied Set
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/custom-fields"
                              pathname={pathname}
                              style={""}
                            >
                              Custom Field
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/conditions"
                              pathname={pathname}
                              style={""}
                            >
                              Condition Type
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/depreciations"
                              pathname={pathname}
                              style={""}
                            >
                              Depreciations
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/manufacturers"
                              pathname={pathname}
                              style={""}
                            >
                              Manufacturer
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/vendors"
                              pathname={pathname}
                              style={""}
                            >
                              Vendor
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("manufacturers")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-100 duration-300 ease-in-out hover:bg-gray-700 dark:hover:bg-gray-700 ${
                          (pathname === "/utility" ||
                            pathname.includes("utility")) &&
                          "bg-gray-800 dark:bg-grey-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CgListTree size={22} />
                        Comapany Utility
                        <IoIosArrowDown
                          size={18}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLink
                              url="/companies"
                              pathname={pathname}
                              style={""}
                            >
                              Company
                            </SidebarLink>
                          </li>
                          <li>
                            <SidebarLink
                              url="/departments"
                              pathname={pathname}
                              style={""}
                            >
                              Department
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-100">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <Link
                  href="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-100 duration-300 ease-in-out hover:bg-gray-700 dark:hover:bg-gray-600 ${
                    pathname.includes("chart") && "bg-gray-700 dark:bg-gray-600"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9801)">
                      <path
                        d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                        fill=""
                      />
                      <path
                        d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9801">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Chart
                </Link>
              </li>
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
