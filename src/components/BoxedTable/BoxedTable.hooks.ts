import { ChangeEvent, useEffect, useState } from "react";
import { BoxedTableProps } from "./types";

const INITIAL_PAGE_SIZE = 20;

export const useTable = ({ columns, data }: BoxedTableProps) => {
  const [pageSize, setPageSize] = useState<number>(INITIAL_PAGE_SIZE);
  const [currentPageNumber, goToPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [rows, setRows] = useState<any>(null);
  const [sortBy, setSortBy] = useState<{
    columnName: string;
    sort: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const minRow = (currentPageNumber - 1) * pageSize;
    const maxRow = pageSize * currentPageNumber;
    setRows(filteredData?.slice(minRow, maxRow));
  }, [currentPageNumber, filteredData, pageSize]);

  const searchFor = (e: ChangeEvent<HTMLInputElement>) => {
    const filtered = data.filter((row: any) => {
      if (e.target.value === "") return true;

      const columnsToSearch = columns.map((col) => col.accessor);
      if (
        columnsToSearch.some((key) => {
          return String(row[key])
            .toUpperCase()
            .includes(e.target.value.toUpperCase());
        })
      )
        return true;

      return false;
    });

    setFilteredData(filtered);
    goToPage(1);
  };

  const sortByColumn = (columnName: string) => {
    const sortedData = filteredData.sort((a: any, b: any) => {
      const leftArgument =
        sortBy?.sort === "desc" ? a[columnName] : b[columnName];
      const rightArgument =
        sortBy?.sort === "asc" ? a[columnName] : b[columnName];

      return String(leftArgument).localeCompare(
        String(rightArgument),
        undefined,
        { numeric: true, sensitivity: "base" }
      );
    });

    setFilteredData([...sortedData]);
    setSortBy({ columnName, sort: sortBy?.sort === "desc" ? "asc" : "desc" });
    goToPage(1);
  };

  return {
    canNextPage: currentPageNumber < Math.ceil(filteredData?.length / pageSize),
    canPrevPage: currentPageNumber > 1,
    clearSelectedRows: () => setSelectedRows([]),
    currentPageNumber,
    goToPage,
    nextPage: () => goToPage(currentPageNumber + 1),
    onSelectRow: (rowData: any, key: string) =>
      setSelectedRows([...selectedRows, { rowData, key }]),
    pageSize,
    previousPage: () => goToPage(currentPageNumber - 1),
    rows,
    searchFor,
    selectedRows,
    setPageSize,
    sortBy,
    sortByColumn,
    totalPages: Math.ceil(filteredData?.length / pageSize) || 1,
  };
};
