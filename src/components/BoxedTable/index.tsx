import { FC, useEffect, useId } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import { useTable } from "./BoxedTable.hooks";
import {
  Button,
  GotoPageBox,
  PageInput,
  PaginationWrapper,
  SearchBox,
  Select,
  TableHeader,
} from "./BoxedTable.styled";
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
      <PaginationWrapper>
        <Button
          data-testid="prev-button"
          onClick={previousPage}
          disabled={!canPrevPage}
        >
          &lt;
        </Button>
        <Button
          data-testid="next-button"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          &gt;
        </Button>
        <SearchBox
          placeholder={`Search for ${columns
            .map(({ header }) => header)
            .join(", ")}`}
          onChange={searchFor}
        />
        <GotoPageBox>
          Go to page:
          <PageInput
            data-testid="go-to-page-input"
            value={currentPageNumber.toString() || 0}
            min={1}
            max={totalPages}
            onChange={(e) =>
              goToPage(e.target.value === "" ? 0 : e.target.valueAsNumber)
            }
          />
          of {totalPages}
        </GotoPageBox>
        <Select
          value={pageSize}
          data-testid="select-page-size"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </PaginationWrapper>
      <table>
        <thead>
          <tr>
            <th />
            {columns.map(({ header, accessor }, i) => (
              <TableHeader
                onClick={() => sortByColumn(accessor)}
                key={`${header}-${i}`}
              >
                {header}{" "}
                {sortBy?.columnName === accessor && (
                  <>{sortBy.sort === "desc" ? " 🔽" : " 🔼"}</>
                )}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((rowData: any, i: number) => (
            <tr key={`${id}-${i}-${currentPageNumber}`} data-testid="row-data">
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
      {selectedRows.length > 0 && (
        <div>
          <pre>
            {JSON.stringify(
              selectedRows.map(({ rowData }: any) => rowData),
              undefined,
              2
            )}
          </pre>
          <button onClick={clearSelectedRows}>Clear Selected Rows</button>
        </div>
      )}
    </>
  );
};

export default BoxedTable;
