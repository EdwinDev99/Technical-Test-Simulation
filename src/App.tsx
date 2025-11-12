import { useEffect, useRef, useState } from "react";
import type { User } from "./types/user";
import "./index.css";

const URL = "https://randomuser.me/api/?results=100";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isPaintedRows, setIsPaintedRows] = useState<boolean>(false);
  const [filterByContry, setFilterByCountry] = useState(false);

  const originalUser = useRef<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(URL);
    const userResponse = await res.json();
    setUsers(userResponse.results);
    originalUser.current = userResponse.results;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const hadleTogglePainteRows = () => setIsPaintedRows(!isPaintedRows);
  const toggleOrderByCountry = () => setFilterByCountry(!filterByContry);

  const hadleDeleteUserById = (uuid: string) => {
    const userFiltered = users.filter((user) => user.login.uuid !== uuid);
    setUsers(userFiltered);
  };

  const usersRender = filterByContry
    ? [...users].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users;

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-5 text-4xl font-bold">Lista de szsuarios</h1>
      <div className="flex gap-20 justify-center m-8 ">
        <button
          onClick={() => setIsPaintedRows(!isPaintedRows)}
          className=" bg-amber-700 p-2.5 rounded-2xl cursor-pointer"
        >
          colorear filas
        </button>
        <button
          onClick={toggleOrderByCountry}
          className=" bg-amber-700 p-2.5 rounded-2xl cursor-"
        >
          ordenar pais
        </button>
        <button
          className=" bg-amber-700 p-2.5 rounded-2xl cursor-pointer"
          onClick={() => {
            setUsers(originalUser.current);
          }}
        >
          restaura estado inicial
        </button>
      </div>

      <table className={`${isPaintedRows ? "colorRows" : ""} w-2/4`}>
        <thead className="bg-blue-700">
          <tr>
            <th>foto</th>
            <th>nombre</th>
            <th>Apellido</th>
            <th>pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersRender.map((u, index) => (
            <tr key={u.login.uuid} className="border-b">
              <td>
                <img className="py-3" src={u.picture.thumbnail} alt="img" />
              </td>
              <td className="text-center">{u.name.first}</td>
              <td className="text-center">{u.name.last}</td>
              <td className="text-center">{u.location.country}</td>
              <td>
                {index + 1}
                <button
                  className="cursor-pointer"
                  onClick={() => hadleDeleteUserById(u.login.uuid)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
