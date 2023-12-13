import { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
}
const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  setPage,
  limit,
  totalPage,
  totalData,
}) => {
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);

  useEffect(() => {
    if (page === 1 && totalPage === 1) {
      setFirst(1);
      setLast(totalData);
    }
    if (page >= 1 && totalPage > page) {
      setFirst(page * limit - limit + 1);
      setLast(page * limit);
    }
    if (page === totalPage && totalPage > 1) {
      setFirst(page * limit - limit + 1);
      setLast(totalData);
    }
  }, [page, limit, totalPage, totalData]);

  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-900">
        Showing {first} to {last} of {totalData} Entries
      </span>
      {page > 1 && (
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className={`text-sm text-indigo-50 transition duration-150 hover:bg-slate-600 bg-blue-950 font-semibold py-2 px-4 rounded-l ${
              page === 1 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          &nbsp; &nbsp;
          <button
            className={`text-sm text-indigo-50 transition duration-150 hover:bg-slate-600 bg-blue-950 font-semibold py-2 px-4 rounded-r ${
              page === totalPage && "opacity-50 cursor-not-allowed"
            }`}
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default PaginationComponent;
