import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SeriesService } from "../services/series.service";
import { DirectorsService } from "../services/directors.service";

export default function SeriesForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [directors, setDirectors] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    release_date: "",
    directorIds: [],
  });

  // cargar directores
  useEffect(() => {
    DirectorsService.getAll().then(setDirectors);
  }, []);

  // editar serie
  useEffect(() => {
    if (!id) return;

    SeriesService.getById(id).then((data) => {
      setForm({
        title: data.title || "",
        description: data.description || "",
        release_date: data.release_date || "",
        directorIds: data.directors?.map((d) => d.id) || [],
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // checkbox logic
  const handleDirectorCheck = (id) => {
    setForm((prev) => {
      const exists = prev.directorIds.includes(id);

      return {
        ...prev,
        directorIds: exists
          ? prev.directorIds.filter((x) => x !== id)
          : [...prev.directorIds, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIÓN COMPLETA
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.release_date.trim()
    ) {
      alert("Todos los campos de la serie son obligatorios");
      return;
    }

    if (form.directorIds.length === 0) {
      alert("Debes seleccionar al menos un director");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      release_date: form.release_date,
      director_ids: form.directorIds,
    };

    if (id) {
      await SeriesService.update(id, payload);
    } else {
      await SeriesService.create(payload);
    }

    navigate("/series");
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Serie" : "Crear Serie"}</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          name="title"
          placeholder="Título *"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción *"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="release_date"
          value={form.release_date}
          onChange={handleChange}
        />

        <label>
          <b>Directores *</b>
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {directors.map((d) => (
            <label key={d.id}>
              <input
                type="checkbox"
                checked={form.directorIds.includes(d.id)}
                onChange={() => handleDirectorCheck(d.id)}
              />
              {d.name}
            </label>
          ))}
        </div>

        <button type="submit" className="primary">
          Guardar
        </button>

        <button type="button" onClick={() => navigate("/series")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}