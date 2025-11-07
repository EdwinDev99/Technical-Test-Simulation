import { useEffect, useState } from "react";
import type { User } from "./types/user";

const URL = "https://randomuser.me/api/?results=100";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(URL);
    const userResponse = await res.json();
    setUsers(userResponse.results);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-5 text-4xl font-bold">Lista de usuarios</h1>
      <div className="flex gap-20 justify-center m-8 ">
        <button className=" bg-amber-700 p-2.5 rounded-2xl">color</button>
        <button className=" bg-amber-700 p-2.5 rounded-2xl">
          ordenar pais
        </button>
        <button className=" bg-amber-700 p-2.5 rounded-2xl">
          restaura estado inicial
        </button>
      </div>

      <table className="w-2/4">
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
          {users.map((u) => (
            <tr key={u.login.uuid} className="border-b">
              <td>
                <img className="py-3" src={u.picture.thumbnail} alt="img" />
              </td>
              <td className="text-center">{u.name.first}</td>
              <td className="text-center">{u.name.last}</td>
              <td className="text-center">{u.location.country}</td>
              <td>
                <button>Eliminar </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
