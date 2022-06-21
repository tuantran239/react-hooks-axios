# React-hooks-axios

## Installation

Use npm to install react-hooks-axios.

```bash
npm install react-hooks-axios
```

## Update new version v0.2.0

## Usage

index.tsx

```typescript
import { axios, AxiosProvider } from "react-hooks-axios";

axios.defaults.baseURL = "http://localhost:8080";

root.render(
  <AxiosProvider axios={axios}>
    <App />
  </AxiosProvider>
);
```
## Hooks 
useQuery(): get data

useMutation(): post, put, path or delete data

useTransaction(): group query, mutation in one transaction

## useQuery()



```typescript
import { useQuery } from "react-hooks-axios";

 /* use query */
 const { query } = useQuery();
 const { loading, data, error } = query("/posts");
 console.log(loading);
 console.log(data);
 console.log(error);


 /* use with callback */
 const { queryCallback } = useQuery();
 const [fetchPosts, { loading, data, error }] = queryCallback("/posts");

 console.log(loading);
 console.log(data);
 console.log(error);

 useEffect(() => {
  fetchPosts({
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
 }, []);


 /* use with async */
 const { queryAsyncReturnError } = useQuery();

 useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await queryAsyncReturnError("/posts");
    if (error) {
      return;
    }
    console.log(data);
  };
  fetchPosts();
 }, []);

```

## useMutation()
```typescript
import { useMutation } from "react-hooks-axios";

 /* use with callback */
 const { mutationCallback } = useMutation();
 const [createPost, { loading, data, error }] = 
 mutationCallback("/posts");

 console.log(loading);
 console.log(data);
 console.log(error);

 const createPostHandler = () => {
  createPost({
    method: "post", /* post | put | patch | delete */
    body: {
      id: 2,
      title: "post1",
      author: "author1",
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
 };

 /* use with async */
 const { mutationAsyncReturnError } = useMutation();

 const createPostHandler = async () => {
  const body = {
    id: 3,
    title: "post2",
    author: "author2",
  };
  const { data, error } = await mutationAsyncReturnError("/posts", "post", body);
  if (error) {
    return;
  }
  console.log(data);
 };
```

## useTransaction()
```typescript
 import { useTransaction } from "react-hooks-axios";

 const [onTransaction, { loading }] = useTransaction();

 const clickHandler = async () => {
  onTransaction({
    async onRun({ mutation, query }) {
      const body = {
        id: 4,
        title: "post3",
        author: "author2",
      };
      await mutation("/posts", "post", body);
      await mutation("/posts/4", "patch", { author: "author1" });
      const posts = await query("/posts");
      console.log(posts);
    },
    onError(error) {
      console.log(error);
    },
  });
 };
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
