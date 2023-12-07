import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex ml-60 bg-gray-700 py-5 px-5">
      <h1 className="text-white">Navbar</h1>
      <ul className="flex ml-5">
        <Link href="/">
          <li className="mr-3 text-blue-300 cursor-pointer">Home</li>
        </Link>
        <Link href="/">
          <li className="mr-3 text-blue-300 cursor-pointer">Assets</li>
        </Link>
        <Link href="/brands">
          <li className="mr-3 text-blue-300 cursor-pointer">Brands</li>
        </Link>
      </ul>
    </nav>
  );
}
