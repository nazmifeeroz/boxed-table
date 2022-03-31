import { useEffect, useState } from "react";
import { BoxedTableProps } from "./types";

const INITIAL_PAGE_SIZE = 20;

export const useTable = ({ columns, data }: BoxedTableProps) => {
  const headers = columns.map((col) => col.header);
  const [pageSize, setPageSize] = useState<number>(INITIAL_PAGE_SIZE);
  const [currentPageNumber, goToPage] = useState<number>(1);
  const [rows, setRows] = useState<any>(data);

  useEffect(() => {
    const minRow = (currentPageNumber - 1) * pageSize;
    const maxRow = pageSize * currentPageNumber;
    setRows(data.slice(minRow, maxRow));
  }, [currentPageNumber, data, pageSize]);

  return {
    totalPages: Math.ceil(data.length / pageSize),
    canNextPage: currentPageNumber < Math.ceil(data.length / pageSize),
    canPrevPage: currentPageNumber > 1,
    currentPageNumber,
    goToPage,
    headers,
    nextPage: () => goToPage(currentPageNumber + 1),
    previousPage: () => goToPage(currentPageNumber - 1),
    rows,
    setPageSize,
    pageSize,
  };
};
