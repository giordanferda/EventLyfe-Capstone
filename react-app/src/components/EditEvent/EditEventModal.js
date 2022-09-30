import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditEvent from "./EditEvent";
import "./EditEventModal.css";

function EditEventModal() {
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }
  return (
    <div>
      <button className="editEventButton" onClick={() => setShowModal(true)}>
        Edit Event
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-form">
            <EditEvent closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditEventModal;
