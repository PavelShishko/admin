import React, { useEffect, useState } from "react";
import { fetchBrands, fetchDevices, fetchModels } from "../../api/CarsApi";
import "./DevicePanel.css";
import { $host } from "../../api";

const bodys = [
  { label: "Внедорожник 3 дв.", value: "Внедорожник 3 дв." },
  { label: "Внедорожник 5 дв.", value: "Внедорожник 5 дв." },
  { label: "Кабриолет", value: "Кабриолет" },
  { label: "Купе", value: "Купе" },
  { label: "Легковой фургон", value: "Легковой фургон" },
  { label: "Лимузин", value: "Лимузин" },
  { label: "Лифтбек", value: "Лифтбек" },
  { label: "Минивэн", value: "Минивэн" },
  { label: "Пикап", value: "Пикап" },
  { label: "Родстер", value: "Родстер" },
  { label: "Седан", value: "Седан" },
  { label: "Универсал", value: "Универсал" },
  { label: "Хэтчбэк 3 дв.", value: "Хэтчбэк 3 дв." },
  { label: "Хэтчбэк 5 дв.", value: "Хэтчбэк 5 дв." },
];
const yearsArr = [];
for (let i = 1980; i <= 2023; i++) {
  yearsArr.push({ label: i.toString(), value: i.toString() });
}
yearsArr.reverse();

const engineArray = [
  { label: "Бензин", value: "Бензин" },
  { label: "Бензин (пропан-бутан)", value: "Бензин (пропан-бутан)" },
  { label: "Бензин (метан)", value: "Бензин (метан)" },
  { label: "Бензин (гибрид)", value: "Бензин (гибрид)" },
  { label: "Дизель", value: "Дизель" },
  { label: "Дизель (гибрид)", value: "Дизель (гибрид)" },
  { label: "Электро", value: "Электро" },
];

export const DevicePanel = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [devices, setDevices] = useState([]);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(1);
  const [selectedModel, setSelectedModel] = useState(1);
  const [name, setName] = useState("");
  const [body, setBody] = useState("Внедорожник 3 дв.");
  const [year, setYear] = useState("2023");
  const [engine, setEngine] = useState("Бензин");
  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data.rows))
      .catch((e) => console.log(new Error(e)));

    fetchModels()
      .then((data) => setModels(data.rows))
      .catch((e) => console.log(new Error(e)));

    fetchDevices()
      .then((data) => setDevices(data))
      .catch((e) => console.log(new Error(e)));
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const filterModels = models.filter((model) => model.brandId == selectedBrand);

  async function createDevice(device) {
    const { data } = await $host.post(`api/device`, device);
    return data;
  }

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", +price);
    formData.append("brandId", +selectedBrand);
    formData.append("modelId", +selectedModel);
    formData.append("img", file);
    formData.append("count", count);
    formData.append("body", body);
    formData.append("year", +year);
    formData.append("engine", engine);
    createDevice(formData).then((data) => {
      setName("");
      setCount("");
      setDescription("");
      setDevices("");
      setPrice("");
      setFile("");
      window.location.reload();
    });
  };

  async function deleteDevice(id) {
    const { data } = await $host.delete(`api/device/${id}`).then(() => {
      window.location.reload();
    });
    return data;
  }

  return (
    <div>
      <header className="header">
        <h1>Запчасти</h1>
      </header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <main className="main" style={{ width: 800 }}>
          <h3 style={{ margin: "20px" }}>Добавление запчасти</h3>
          <div className="select-models">
            <select onChange={(e) => setSelectedBrand(e.target.value)}>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setSelectedModel(e.target.value);
              }}
            >
              {filterModels.length > 0 ? (
                filterModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))
              ) : (
                <option>Марок у данного авто нету</option>
              )}
            </select>
            <select onChange={(e) => setBody(e.target.value)}>
              {bodys.map((body) => (
                <option key={body.value} value={body.value}>
                  {body.label}
                </option>
              ))}
            </select>
            <select onChange={(e) => setYear(e.target.value)}>
              {yearsArr.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            <select onChange={(e) => setEngine(e.target.value)}>
              {engineArray.map((engine) => (
                <option key={engine.value} value={engine.value}>
                  {engine.label}
                </option>
              ))}
            </select>
            <input
              className="input"
              type="text"
              placeholder="Введите название запчасти"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Введите описание запчасти"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Введите стоимость"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Введите кол-во"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <p>Выберите изображение</p>
            <input type="file" onChange={selectFile} />
            <input type="button" value="Добавить" onClick={addDevice} />
          </div>
        </main>
        <div>
          <p>Все запчасти</p>
          <table border={1} cellPadding={10} style={{ marginBottom: 10 }}>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Название</th>
                <th>Дата добавление</th>
                <th>Стоимость</th>
                <th>Кол-во</th>
                <th>Изображение</th>
                <th>Кузов</th>
                <th>Год</th>
                <th>Двигатель</th>
                <th>Марка</th>
                <th>Модель</th>
              </tr>
              {devices?.map((device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.createdAt.slice(0, 10)}</td>
                  <td>{device.price}</td>
                  <td>{device.count}</td>
                  <td>{device.img}</td>
                  <td>{device.body}</td>
                  <td>{device.year}</td>
                  <td>{device.engine}</td>
                  <td>
                    {brands.find((brand) => brand.id == device.brandId).name}
                  </td>
                  <td>
                    {models.find((model) => model.id == device.modelId).name}
                  </td>
                  <td
                    onClick={() => {
                      deleteDevice(device.id);
                    }}
                  >
                    <img
                      width={30}
                      height={30}
                      src="https://img.freepik.com/free-icon/delete_318-901546.jpg"
                      alt="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
