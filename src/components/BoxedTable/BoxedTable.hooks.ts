import { ChangeEvent, useEffect, useState } from "react";
import { BoxedTableProps } from "./types";

const INITIAL_PAGE_SIZE = 20;

export const useTable = ({ columns, data }: BoxedTableProps) => {
  const headers = columns.map((col) => col.header);
  const [pageSize, setPageSize] = useState<number>(INITIAL_PAGE_SIZE);
  const [currentPageNumber, goToPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [rows, setRows] = useState<any>(null);

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

  return {
    canNextPage: currentPageNumber < Math.ceil(filteredData?.length / pageSize),
    canPrevPage: currentPageNumber > 1,
    currentPageNumber,
    goToPage,
    headers,
    nextPage: () => goToPage(currentPageNumber + 1),
    pageSize,
    previousPage: () => goToPage(currentPageNumber - 1),
    rows,
    searchFor,
    setPageSize,
    totalPages: Math.ceil(filteredData?.length / pageSize) || 1,
  };
};
