import { BoxedTableProps } from "./types";

export const useTable = ({ columns, data }: BoxedTableProps) => {
  const headers = columns.map((col) => col.header);
  const rows = data;

  return {
    headers,
    rows,
  };
};
