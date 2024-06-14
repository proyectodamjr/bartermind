import React, { useState } from "react";
import SelectDropdown from './SelectDropdown';
import swal from 'sweetalert';
import SelectDropdownCurso from "./SelectDropdownCurso";

const UploadPicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [curso, setCurso] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = /(\.mp4|\.mkv)$/i;
    if (!allowedFileTypes.test(file.name)) {
      swal({
        title: "Error",
        text: "Solo se permiten archivos en formato .mp4 y .mkv",
        icon: "error"
      });
      setSelectedFile(null);
      event.target.value = null; // Clear the input
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);
    formData.append("category", category);
    formData.append("curso", curso);

    try {
      const response = await fetch("/api/users/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      swal({
        title: "Subida exitosa!",
        text: data.message,
        icon: "success"
      }).then(() => {
        window.location.href = '/perfil.html';
      });
    } catch (error) {
      console.error(error);

      swal({
        title: "Error",
        text: "Ocurrió un error al subir el video.",
        icon: "error"
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 max-w-sm">
        <h1>Subir video</h1>
        <div className="mt-3">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Video
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Título"
            className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <SelectDropdown setCategory={setCategory} />
        </div>

        <div className="mt-3">
          <label
            htmlFor="curso"
            className="block text-sm font-medium text-gray-700"
          >
            Curso
          </label>
          <SelectDropdownCurso setCurso={setCurso} />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || !caption || !category || !curso}
            className="btn btn-outline-primary mt-3"
          >
            Upload
          </button>
          <a className="btn btn-outline-danger mt-3 ms-3" href="/perfil.html">Cancelar</a>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default UploadPicture;
