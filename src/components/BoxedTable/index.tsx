import { FC, useId } from "react";
import { useTable } from "./BoxedTable.hooks";
import { BoxedTableProps } from "./types";

const BoxedTable: FC<BoxedTableProps> = ({ data, columns }) => {
  const id = useId();
  const {
    canNextPage,
    canPrevPage,
    currentPageNumber,
    goToPage,
    headers,
    nextPage,
    previousPage,
    rows,
    setPageSize,
    totalPages,
    pageSize,
  } = useTable({ columns, data });

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={`${header}-${i}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rowData: any, i: number) => (
            <tr key={`${id}-${i}`}>
              {columns.map((col, i) => (
                <td key={`${col.accessor}-${i}`}>{rowData[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPrevPage}>
          prev
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          next
        </button>
        <span>
          {currentPageNumber} of {totalPages}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <span>
          {" "}
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={currentPageNumber}
            onChange={(e) =>
              goToPage(e.target.value ? e.target.valueAsNumber : 1)
            }
            style={{ width: "100px" }}
          />
        </span>{" "}
      </div>
    </>
  );
};

export default BoxedTable;
