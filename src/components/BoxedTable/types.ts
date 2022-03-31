type ColumnType = {
  header: string;
  accessor: string;
};

export type BoxedTableProps = {
  data: any;
  columns: ColumnType[];
};
