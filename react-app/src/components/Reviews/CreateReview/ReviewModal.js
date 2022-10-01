import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateReview from "./CreateReview";

function ReviewModal({ event }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className="review-button" onClick={() => setShowModal(true)}>
        <div className="review-button-star">✰</div>
        <div className="review-button-text">Write a Review</div>
      </button>
      {showModal && (
        <Modal className="test" onClose={() => setShowModal(false)}>
          <CreateReview event={event} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;
