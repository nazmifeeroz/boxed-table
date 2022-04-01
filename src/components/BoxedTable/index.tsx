import { FC, useEffect, useId } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import { useTable } from "./BoxedTable.hooks";
import { BoxedTableProps } from "./types";

const BoxedTable: FC<BoxedTableProps> = ({ data, columns }) => {
  const id = useId();
  const { setQueryParams, query } = useQueryParams();

  const {
    canNextPage,
    canPrevPage,
    clearSelectedRows,
    currentPageNumber,
    goToPage,
    nextPage,
    onSelectRow,
    pageSize,
    previousPage,
    rows,
    searchFor,
    selectedRows,
    setPageSize,
    sortBy,
    sortByColumn,
    totalPages,
  } = useTable({ columns, data });

  useEffect(() => {
    if (query.params.page) goToPage(parseInt(query.params.page));
    if (query.params.pageSize) setPageSize(parseInt(query.params.pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQueryParams([
      { key: "page", value: currentPageNumber },
      {
        key: "pageSize",
        value: pageSize,
      },
    ]);
  }, [currentPageNumber, setQueryParams, pageSize]);

  return (
    <>
      <input
        type="text"
        style={{ width: "300px" }}
        placeholder={`Search for ${columns
          .map(({ header }) => header)
          .join(", ")}`}
        onChange={searchFor}
      />
      <table>
        <thead>
          <tr>
            <th />
            {columns.map(({ header, accessor }, i) => (
              <th
                role="button"
                onClick={() => sortByColumn(accessor)}
                key={`${header}-${i}`}
                style={{
                  cursor: "pointer",
                }}
              >
                {header}{" "}
                {sortBy?.columnName === accessor && (
                  <>{sortBy.sort === "desc" ? " 🔽" : " 🔼"}</>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((rowData: any, i: number) => (
            <tr key={`${id}-${i}-${currentPageNumber}`}>
              <td>
                <input
                  type="checkbox"
                  onChange={() =>
                    onSelectRow(rowData, `${id}-${i}-${currentPageNumber}`)
                  }
                  checked={
                    !!selectedRows.find(
                      (row: any) =>
                        row.key === `${id}-${i}-${currentPageNumber}`
                    )
                  }
                />
              </td>
              {columns.map((col, i) => (
                <td key={`${col.accessor}-${i}`}>{rowData[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={previousPage} disabled={!canPrevPage}>
          prev
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
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
      {selectedRows.length > 0 && (
        <div>
          <pre>
            {JSON.stringify(
              selectedRows.map(({ rowData }: any) => rowData),
              undefined,
              2
            )}
          </pre>
          <button onClick={clearSelectedRows}>Clear</button>
        </div>
      )}
    </>
  );
};

export default BoxedTable;
