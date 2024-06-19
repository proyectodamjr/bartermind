import React, { useState, useEffect } from 'react';

const SelectDropdown = ({ handleCategory  }) => {
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
    handleCategory(event.target.selectedIndex);
  };

  return (
    <div className="input-wrapper">
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Filtro categoría</option>
        {options.map((option) => (
          <option key={option.id} value={option.nombre} id={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
