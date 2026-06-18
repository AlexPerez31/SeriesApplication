# Sistema de Gestión de Series de Televisión

## 1. Descripción del proyecto

Este proyecto es una aplicación web full-stack para la gestión de series de televisión y sus directores. Permite realizar operaciones CRUD completas sobre ambas entidades y gestiona una relación muchos-a-muchos entre series y directores.

La aplicación está compuesta por un backend REST API desarrollado en FastAPI y un frontend desarrollado en React. Todo el sistema se encuentra desplegado en la nube.

---

## 2. Arquitectura del sistema

El sistema sigue una arquitectura desacoplada en tres capas:

Frontend (React + Vite)
        ↓
API REST (FastAPI - Render)
        ↓
ORM (SQLAlchemy)
        ↓
Base de datos (PostgreSQL - Neon)

Esta arquitectura permite separación de responsabilidades, escalabilidad y mantenibilidad.

---

## 3. Tecnologías utilizadas

Frontend:
- React
- Vite
- JavaScript
- Fetch API

Backend:
- FastAPI
- Python
- SQLAlchemy
- Pydantic
- Alembic

Base de datos:
- PostgreSQL (Neon Cloud)

Despliegue:
- Frontend: Vercel
- Backend: Render

---

## 4. Funcionalidades

### Gestión de series
- Crear series
- Listar series
- Editar series
- Eliminar series
- Asignar múltiples directores

### Gestión de directores
- Crear directores
- Listar directores
- Editar directores
- Eliminar directores
- Relación con múltiples series

---

## 5. Modelo de datos

### Serie
- id
- título
- descripción
- fecha de lanzamiento
- directores (relación muchos a muchos)

### Director
- id
- nombre
- nacionalidad
- fecha de nacimiento

Relación:
- Una serie puede tener varios directores
- Un director puede participar en varias series

---

## 6. API REST

### Series
- GET /series
- GET /series/{id}
- POST /series
- PUT /series/{id}
- DELETE /series/{id}

### Directores
- GET /directors
- GET /directors/{id}
- POST /directors
- PUT /directors/{id}
- DELETE /directors/{id}

---

## 7. Variables de entorno

### Backend (.env)

El backend requiere la siguiente variable:

DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_datos

Esta variable permite la conexión con la base de datos PostgreSQL en Neon.

---

### Frontend (.env)

El frontend requiere la siguiente variable:

VITE_API_URL=https://seriesapplication.onrender.com

Esta variable define la URL base de la API.

---

## 8. Ejecución local

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
cd frontend
npm install
npm run dev
```

## 9. Despliegue

Backend (Render)
API desplegada en Render
Conexión a base de datos Neon
Variables de entorno configuradas en el panel de Render
Frontend (Vercel)
Aplicación desplegada en Vercel
Configuración de SPA para rutas
Comunicación con backend mediante API REST
Base de datos (Neon)
Base de datos PostgreSQL en la nube
Migraciones gestionadas con SQLAlchemy y Alembic


## 10. CORS

El backend permite solicitudes desde:

http://localhost:5173
https://series-application.vercel.app
