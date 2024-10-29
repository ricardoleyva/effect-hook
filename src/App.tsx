import { useEffect, useState } from "react";
// import { useRef } from "react";
import ProductList from "./components/ProductList";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

// const connect = () => console.log("Connecting");
// const disconnect = () => console.log("Disconnecting");
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState([]);
  const [category, setCategory] = useState("");
  //  const ref = useRef<HTMLInputElement>(null);

  // useEffect is used for any action that happens after render of the DOM
  // Only at top level of component, not inside loops or if statements.

  // useEffect(() => {
  //   connect();
  //   // Clean up fetch, executed before connect() call
  //   return () => disconnect();
  // });

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
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
      </div>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
