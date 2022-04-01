import { createContext, useState, FC } from "react";

export type SelectedRowType = {
  rowData: any;
  key: string;
};

export const TableContext = createContext<{
  selectedRows: SelectedRowType[];
  onSelectRow?: (rowData: any, key: string) => void;
  clearSelectedRows?: () => void;
}>({ selectedRows: [] });

const TableContextProvider: FC = ({ children }) => {
  const [selectedRows, setSelectedRows] = useState<SelectedRowType[]>([]);

  const onSelectRow = (rowData: any, key: string) =>
    setSelectedRows([...selectedRows, { rowData, key }]);

  const clearSelectedRows = () => setSelectedRows([]);

  return (
    <TableContext.Provider
      value={{ clearSelectedRows, selectedRows, onSelectRow }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
