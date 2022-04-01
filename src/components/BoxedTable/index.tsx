import { FC, useContext, useEffect, useId } from "react";
import { TableContext } from "../../contexts/TableContext";
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
  const tableContext = useContext(TableContext);

  const {
    canNextPage,
    canPrevPage,
    currentPageNumber,
    goToPage,
    nextPage,
    pageSize,
    previousPage,
    rows,
    searchFor,
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
                    tableContext.onSelectRow!(
                      rowData,
                      `${id}-${i}-${currentPageNumber}`
                    )
                  }
                  checked={
                    !!tableContext.selectedRows?.find(
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
    </>
  );
};

export default BoxedTable;
