import { useContext } from "react";
import { TableContext } from "../../contexts/TableContext";

const DisplaySelection = () => {
  const tableContext = useContext(TableContext);

  if (tableContext.selectedRows.length === 0) return null;

  return (
    <div>
      <pre>
        {JSON.stringify(
          tableContext.selectedRows.map(({ rowData }: any) => rowData),
          undefined,
          2
        )}
      </pre>
      <button onClick={tableContext.clearSelectedRows}>
        Clear Selected Rows
      </button>
    </div>
  );
};

export default DisplaySelection;
