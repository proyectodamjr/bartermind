import React, { useState } from "react";
import SelectDropdown from './SelectDropdown';

const UploadPicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return; // Handle no file selected case

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("caption", caption);
    formData.append("category", category);

    try {
      const response = await fetch("/api/users/upload", {
        method: "POST",
        body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading picture");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 max-w-sm">
        <div class="mt-3">
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
        <div class="mt-3">
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

        <div class="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <SelectDropdown setCategory={setCategory} />
        </div>
       
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            //className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            class="btn btn-outline-primary mt-3"
          >
            Upload
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default UploadPicture;
