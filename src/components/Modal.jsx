// This modal is based on the example from https://dev.to/codewithmahadihasan/comprehensive-guide-to-handling-modals-in-react-46je

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => { e.stopPropagation(); }}>
        <div className="modal-title">          
          <span className="modal-close" onClick={onClose}></span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;