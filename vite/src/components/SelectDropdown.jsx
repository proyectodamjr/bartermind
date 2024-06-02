import React, { useState, useEffect } from 'react';

const SelectDropdown = ({ setCategory  }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch("/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOptions(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <div className="input-wrapper">
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.id} value={option.nombre}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
