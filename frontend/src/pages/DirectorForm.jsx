import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DirectorsService } from "../services/directors.service";

export default function DirectorForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    nationality: "",
    birth_date: "",
  });

  useEffect(() => {
    if (id) {
      DirectorsService.getById(id).then((data) =>
        setForm({
          name: data.name || "",
          nationality: data.nationality || "",
          birth_date: data.birth_date || "",
        })
      );
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ TODOS OBLIGATORIOS
    if (
      !form.name.trim() ||
      !form.nationality.trim() ||
      !form.birth_date.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const payload = {
      name: form.name,
      nationality: form.nationality,
      birth_date: form.birth_date,
    };

    if (id) {
      await DirectorsService.update(id, payload);
    } else {
      await DirectorsService.create(payload);
    }

    navigate("/directors");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{id ? "Editar Director" : "Nuevo Director"}</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Nombre *"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="nationality"
            placeholder="Nacionalidad *"
            value={form.nationality}
            onChange={handleChange}
          />

          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
          />

          <button type="submit">Guardar</button>

          <button type="button" onClick={() => navigate("/directors")}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}