import React, { useEffect, useState } from "react";
import "./OfferPanel.css";
import { fetchOffers, updateOffer } from "../../api/CarsApi";
import { fetchUsers } from "../../api/UserApi";
import { $host } from "../../api/index";
import Modal from "react-modal";

export const OfferPanel = () => {
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [openOffer, setOpenOffer] = useState(null);

  const [status, setStatus] = useState("Ожидает подтверждения");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (status, id) => {
    setModalIsOpen(true);
    setStatus(status);
    setOpenOffer(id);
  };

  const closeModal = async () => {
    setModalIsOpen(false);
  };

  // const updateStatus = async (status, id) => {
  //   const { data } = await $host
  //     .put(`api/offer/${id}`, {
  //       status: status,
  //     })
  //     .then(() => {
  //       window.location.reload();
  //     });
  //   return data;
  // };

  const modalContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: 28 }}>Изменение статуса заказа</p>
      <input
        style={{ padding: 10, fontSize: 22 }}
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button style={{ padding: 10, marginTop: 5 }} onClick={() => {}}>
        Обновить
      </button>
      <button style={{ padding: 10, marginTop: 5 }} onClick={closeModal}>
        Закрыть
      </button>
    </div>
  );

  useEffect(() => {
    fetchOffers()
      .then((data) => setOffers(data.rows))
      .catch((e) => console.log(new Error(e)));
    fetchUsers()
      .then((data) => setUsers(data.rows))
      .catch((e) => console.log(new Error(e)));
  }, []);

  async function deleteOffer(id) {
    const { data } = await $host.delete(`api/offer/${id}`).then(() => {
      window.location.reload();
    });
    return data;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Заказы</h1>
      </header>
      <main style={{ fontSize: 14 }} className="main">
        <table border={1} cellPadding={10}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Список запчастей</th>
              <th>Дата заказа</th>
              <th>Время заказа</th>
              <th>Моб. номер</th>
              <th>Адрес доставки</th>
              <th>Стоимость</th>
              <th>Статус заказа</th>
            </tr>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.devices}</td>
                <td>{offer.createdAt.slice(0, 10)}</td>
                <td>{offer.createdAt.slice(11, 19)}</td>
                <td>{offer.phone}</td>
                <td>{offer.adress}</td>
                <td>{offer.price}</td>
                <td>{status}</td>
                <td onClick={() => deleteOffer(offer.id)}>
                  <img
                    width={30}
                    height={30}
                    src="https://img.freepik.com/free-icon/delete_318-901546.jpg"
                    alt="delete"
                  />
                </td>
                <td onClick={() => openModal(offer.status, offer.id)}>
                  <img
                    width={30}
                    height={30}
                    src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                    alt="update"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
        </div>
      </main>
    </div>
  );
};
