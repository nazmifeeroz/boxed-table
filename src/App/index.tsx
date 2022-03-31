import { useEffect, useState } from "react";
import BoxedTable from "../components/BoxedTable";
import { Posts } from "./types";

function App() {
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "User ID",
      accessor: "userId",
    },
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Content",
      accessor: "body",
    },
  ];

  if (isLoading) return <>loading...</>;

  return (
    <div className="App">
      <BoxedTable columns={columns} data={posts} />
    </div>
  );
}

export default App;
