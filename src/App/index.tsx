import { useEffect, useState } from "react";
import BoxedTable from "../components/BoxedTable";
import { Container } from "./App.styled";
import { Post } from "./types";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
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
    <Container>
      <BoxedTable columns={columns} data={posts} />
    </Container>
  );
}

export default App;
