// import { useRef } from "react";
// import ProductList from "./components/ProductList";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";
// import { AxiosError } from "axios";

// const connect = () => console.log("Connecting");
// const disconnect = () => console.log("Disconnecting");
function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();
  // const [category, setCategory] = useState("");
  //  const ref = useRef<HTMLInputElement>(null);

  // useEffect is used for any action that happens after render of the DOM
  // Only at top level of component, not inside loops or if statements.

  // useEffect(() => {
  //   connect();
  //   // Clean up fetch, executed before connect() call
  //   return () => disconnect();
  // });

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

    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Ric" };
    setUsers([newUser, ...users]);

    userService
      .add(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
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
    </>
  );
}

export default App;
