import { CustomField } from "@/types/custom-field";
import List from "./CustomFieldList";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import PaginationComponent from "@/components/utility/PaginationComponent";
import THead from "@/components/elements/THead";
import { FieldSet } from "@/types/field-set";

interface CustomFieldProps {
  customfields: CustomField[];
  fieldsets: FieldSet[];
  page: number;
  setPage: any;
  limit: number;
  totalPage: number;
  totalData: number;
  loading: boolean;
  setLoading: any;
  setRefresh: any;
}

const CustomFieldTable: React.FC<CustomFieldProps> = ({
  customfields,
  fieldsets,
  page,
  setPage,
  limit,
  totalPage,
  totalData,
  loading,
  setLoading,
  setRefresh,
}) => {
  useEffect(() => {
    if (customfields.length > 0) {
      setLoading(false);
    }
  }, [loading, setLoading, customfields.length]);
  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THead>Name</THead>
                <THead>Field Set</THead>
                <THead>Element</THead>
                <THead>Element Value</THead>
                <THead>Helper Text</THead>
                <THead>Action</THead>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className=" p-4">
                    <Puff
                      stroke="#1C64F2"
                      fill="#1C64F2"
                      width={70}
                      height={70}
                      className="m-0 p-0 content-center w-full"
                    />
                  </td>
                </tr>
              ) : customfields.length > 0 ? (
                customfields.map((customField: any) => (
                  <List
                    key={customField.id}
                    customField={customField}
                    fieldSets={fieldsets}
                    setRefresh={setRefresh}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PaginationComponent
            page={page}
            setPage={setPage}
            limit={limit}
            totalPage={totalPage}
            totalData={totalData}
          />
        </div>
      </div>
    </div>
  );
};
export default CustomFieldTable;
