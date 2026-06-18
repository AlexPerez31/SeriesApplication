import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import SeriesList from "./pages/SeriesList";
import SeriesForm from "./pages/SeriesForm";

import DirectorsList from "./pages/DirectorsList";
import DirectorForm from "./pages/DirectorForm";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/series" />} />

        {/* SERIES */}
        <Route path="/series" element={<SeriesList />} />
        <Route path="/series/new" element={<SeriesForm />} />
        <Route path="/series/edit/:id" element={<SeriesForm />} />

        {/* DIRECTORS */}
        <Route path="/directors" element={<DirectorsList />} />
        <Route path="/directors/new" element={<DirectorForm />} />
        <Route path="/directors/edit/:id" element={<DirectorForm />} />
      </Routes>
    </>
  );
}