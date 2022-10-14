# React-hooks-axios

## Installation

Use npm to install react-hooks-axios.

```bash
npm install react-hooks-axios
```
## Usage (New version v0.4.0)

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
useAxios(): get, post, put, path, delete data

useAxiosMulti(): multi axios

## useAxios()

```typescript

/* use with callback */
 import { useAxios } from 'react-hooks-axios'

 const { axiosCallback } = useAxios()
 const [createPost, { loading, data, error }] = axiosCallback()

 const createPostHandler = () => {
  createPost({
    method: 'post' /* get | post | put | patch | delete */,
    url: '/posts', //update url argument
    body: {
      id: 2,
      title: 'post1',
      author: 'author1',
    },
    onCompleted(data) {
      console.log(data)
    },
    onError(error) {
      console.log(error)
    },
  })
 }

 /* use with async */
 const { asyncReturn, asyncThrow } = useAxios()

 // asyncReturn
 useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await asyncReturn('/posts')
    if (error) {
      return
    }
    console.log(data)
  }
  fetchPosts()
 }, [])

 // asyncThrow
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const { data } = await asyncThrow('/posts')
      console.log(data)
    } catch (error) {
      return
    }
  }
  fetchPosts()
 }, [])

```

## useAxiosMulti()
```typescript
 import { useAxiosMulti } from "react-hooks-axios";

 const [onHandle, { loading }] = useAxiosMulti();

 const clickHandler = async () => {
  onHandle({
    async onRun(axios) {
      const body = {
        id: 4,
        title: "post3",
        author: "author2",
      };
      await axios("/posts", "post", body);
      await axios("/posts/4", "patch", { author: "author1" });
      const posts = await axios("/posts", "get");
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
