import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white border-0">
        <Modal.Title className="h5 mb-0">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>{title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 fs-5 text-center">
        {message}
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center pb-4">
        <Button variant="light" className="px-4" onClick={onHide}>Cancel</Button>
        <Button variant="danger" className="px-4" onClick={() => { onConfirm(); onHide(); }}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}