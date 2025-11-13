import { useEffect, useRef, useState } from "react";
import type { User } from "./types/user";
import "./index.css";

const URL = "https://randomuser.me/api/?results=100";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isPaintedRows, setIsPaintedRows] = useState<boolean>(false);
  const [filterByContry, setFilterByCountry] = useState(false);
  const [searchBycountry, setsearchBycountry] = useState("");
  const [userSorted, setUserSorted] = useState<User[]>([]);

  const originalUser = useRef<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("https://randomuser.me/api/?results=100");
    const userResponse = await res.json();
    setUsers(userResponse.results);
    originalUser.current = userResponse.results;
  };

  const toggleOrderByCountry = () => setFilterByCountry(!filterByContry);

  const hadleDeleteUserById = (uuid: string) => {
    const userFiltered = users.filter((user) => user.login.uuid !== uuid);
    setUsers(userFiltered);
  };

  const userRender = userSorted.filter((user) =>
    user.location.country.toLowerCase().includes(searchBycountry.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filterByContry) {
      const newUser = [...users].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
      setUserSorted(newUser);
      return;
    }
    setUserSorted(users);
  }, [filterByContry, users]);

  // 👇 AQUÍ va el return correcto
  return (
    <div className="flex flex-col items-center">
      <h1 className="p-5 text-4xl font-bold">Lista de usuarios</h1>
      <div className="flex gap-20 justify-center m-8">
        <button
          onClick={() => setIsPaintedRows(!isPaintedRows)}
          className="bg-amber-700 p-2.5 rounded-2xl cursor-pointer"
        >
          Colorear filas
        </button>
        <button
          onClick={toggleOrderByCountry}
          className="bg-amber-700 p-2.5 rounded-2xl cursor-pointer"
        >
          Ordenar por país
        </button>
        <button
          className="bg-amber-700 p-2.5 rounded-2xl cursor-pointer"
          onClick={() => setUsers(originalUser.current)}
        >
          Restaurar estado inicial
        </button>
        <input
          type="text"
          placeholder="Buscar por país"
          value={searchBycountry}
          onChange={(e) => setsearchBycountry(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      <table className={`${isPaintedRows ? "colorRows" : ""} w-2/4`}>
        <thead className="bg-blue-700 text-white">
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userRender.length === 0 ? (
            <tr>
              <td className="text-center py-3" colSpan={5}>
                No hay usuarios
              </td>
            </tr>
          ) : (
            userRender.map((u, index) => (
              <tr key={u.login.uuid} className="border-b text-center">
                <td>
                  <img
                    className="py-3 mx-auto"
                    src={u.picture.thumbnail}
                    alt="img"
                  />
                </td>
                <td>{u.name.first}</td>
                <td>{u.name.last}</td>
                <td>{u.location.country}</td>
                <td>
                  {index + 1}
                  <button
                    className="cursor-pointer text-red-600 font-semibold"
                    onClick={() => hadleDeleteUserById(u.login.uuid)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
