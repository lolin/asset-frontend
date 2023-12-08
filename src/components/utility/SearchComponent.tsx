import { FiSearch } from "react-icons/fi";

const SearchComponent = ({ searchData, placeholder }: any) => {
  return (
    <div className="flex bg-gray-50 items-center p-2 rounded-md">
      <FiSearch className="text-gray-600" />
      <input
        className="bg-gray-50 outline-none ml-4 block text-gray-600"
        type="text"
        name="search"
        id=""
        placeholder={placeholder ? placeholder : "Search"}
        onChange={searchData}
      />
    </div>
  );
};

export default SearchComponent;
