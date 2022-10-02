import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import EditReview from "./EditReview";

function EditReviewModal({ event, review }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="editReviewBut" onClick={() => setShowModal(true)}>
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-form">
            <EditReview rev={review} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
