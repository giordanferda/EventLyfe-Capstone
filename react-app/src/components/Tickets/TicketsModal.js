import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import TicketsForm from "./TicketsForm";
import "./TicketsForm.css";

const TicketsModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="tickets-button" onClick={() => setShowModal(true)}>
        Get Tickets
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TicketsForm />
        </Modal>
      )}
    </>
  );
};

export default TicketsModal;
