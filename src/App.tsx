import { useEffect, useState } from "react";
// import { useRef } from "react";
import ProductList from "./components/ProductList";
import axios, { AxiosError, CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

// const connect = () => console.log("Connecting");
// const disconnect = () => console.log("Disconnecting");
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  //  const ref = useRef<HTMLInputElement>(null);

  // useEffect is used for any action that happens after render of the DOM
  // Only at top level of component, not inside loops or if statements.

  // useEffect(() => {
  //   connect();
  //   // Clean up fetch, executed before connect() call
  //   return () => disconnect();
  // });

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      // get -> promise -> response or error
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });

    return () => controller.abort();
  }, []);

  // Same useEffect but using async await instead
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       setUsers(response.data);
  //     } catch (error) {
  //       setError((error as AxiosError).message);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      {/* <div className="mb-3">
        <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
      </div>
      <div className="mb-3">
        <ProductList category={category} />
      </div> */}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
