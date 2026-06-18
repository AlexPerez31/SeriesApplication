import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DirectorsList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
        const res = await api.get("/directors");

        setData(Array.isArray(res) ? res : res.data || []);
    } catch (err) {
        console.error(err);
        setData([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("¿Eliminar director?")) return;
    await api.delete(`/directors/${id}`);
    load();
  };

  return (
    <div className="container">
      <h2>Directores</h2>

      <button onClick={() => navigate("/directors/new")}>
        + Nuevo director
      </button>

      {data.map(d => (
        <div className="card" key={d.id}>
          <h3>{d.name}</h3>
          <p>{d.nationality}</p>

          <div>
            <button onClick={() => navigate(`/directors/edit/${d.id}`)}>
              Editar
            </button>

            <button className="danger" onClick={() => remove(d.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}