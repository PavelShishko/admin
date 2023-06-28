import React, { useEffect, useState } from "react";
import { createBrand, fetchBrands } from "../../api/CarsApi";
import "./BrandBar.css";

export const BrandPanel = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data.rows))
      .catch((e) => console.log(new Error(e)));
  }, []);

  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const addBrand = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", file);
    createBrand(formData).then((data) => setName(""));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <header className="header">
        <h1>Марки авто</h1>
      </header>
      <main className="brand-main">
        <div>
          <h2>Список всех марок</h2>
          <table border={1} cellPadding={10}>
            <tbody>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
              </tr>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.name}</td>
                  <td>{brand.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Добавление новой марки</h2>
          <input
            className="input"
            type="text"
            placeholder="Введите марку авто"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Выберите изображение</p>
          <input type="file" onChange={selectFile} />
          <input type="button" value="Создать" onClick={addBrand} />
        </div>
      </main>
    </div>
  );
};
