import { FC, useId } from "react";
import { useTable } from "./BoxedTable.hooks";
import { BoxedTableProps } from "./types";

const BoxedTable: FC<BoxedTableProps> = ({ data, columns }) => {
  const id = useId();
  const { headers, rows } = useTable({ columns, data });

  return (
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
  );
};

export default BoxedTable;
