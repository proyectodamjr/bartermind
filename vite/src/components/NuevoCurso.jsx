import React, { useState } from "react";
import SelectDropdown from './SelectDropdown';
import swal from 'sweetalert';

const NuevoCurso = () => {
  const [message, setMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("category", category);

    try {
      const response = await fetch("/api/users/crearCurso", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      swal({
        title: "Curso creado!",
        text: data.message,
        icon: "success"
    }).then(() => {
        window.location.href = '/misCursos.html'; 
    });
    } catch (error) {
      console.error(error);
      
      swal({
        title: "Error",
        text: data.message,
        icon: "error"
    });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-2 max-w-sm">
        <h1>Crear Curso</h1>
        <div class="mt-3">
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Título del curso
          </label>
          <div>
            <input
                type="text"
                id="caption"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Título"
                className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300 w-100"
            />
          </div>
          
        </div>

        <div class="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <SelectDropdown setCategory={setCategory} />
        </div>
       <br />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpload}
            disabled={ !caption || !category }
            class="btn btn-outline-primary mt-3"
          >
            Upload
          </button>
          <a class="btn btn-outline-danger mt-3 ms-3" href="/misCursos.html">Cancelar</a>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default NuevoCurso;
