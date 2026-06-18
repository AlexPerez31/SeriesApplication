import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SeriesList() {
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/series");
      setSeries(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("¿Eliminar serie?")) return;

    await api.delete(`/series/${id}`);
    load();
  };

  return (
    <div className="container">
      <h2>Series</h2>

      <button onClick={() => navigate("/series/new")}>
        + Nueva serie
      </button>

      {series.map((s) => (
        <div className="card" key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p>{s.release_date}</p>

          <p>
            <b>Directores:</b>{" "}
            {s.directors?.map((d) => d.name).join(", ") || "Sin directores"}
          </p>

          <div>
            <button onClick={() => navigate(`/series/edit/${s.id}`)}>
              Editar
            </button>

            <button className="danger" onClick={() => remove(s.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}