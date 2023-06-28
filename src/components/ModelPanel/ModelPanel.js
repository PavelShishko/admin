import React, { useEffect, useState } from "react";
import { createModel, fetchBrands } from "../../api/CarsApi";
import "./ModelPanel.css";

export const ModelPanel = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(1);
  const [name, setName] = useState("");
  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data.rows))
      .catch((e) => console.log(new Error(e)));
  }, []);

  const addModel = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", selectedBrand);
    createModel(formData).then((data) => setName(""));
  };

  return (
    <div>
      <header className="header">
        <h1>Модели авто</h1>
      </header>
      <main className="main">
        <h3 style={{ margin: "20px" }}>Выберите марку авто</h3>
        <div className="select-models">
          <select onChange={(e) => setSelectedBrand(e.target.value)}>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <input
            className="input"
            type="text"
            placeholder="Введите модель авто"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="button" value="Добавить" onClick={addModel} />
        </div>
      </main>
    </div>
  );
};
