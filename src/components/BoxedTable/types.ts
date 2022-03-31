import { Post } from "../../App/types";

type ColumnType = {
  header: string;
  accessor: string;
};

export type BoxedTableProps = {
  data: Post[]; // data type needs to be appended if using for other api
  columns: ColumnType[];
};

export type SelectedRowType = {
  rowData: Post;
  key: string;
};
