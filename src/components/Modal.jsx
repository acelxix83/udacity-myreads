/**
 * A modal component that displays content in a popup overlay. This code is based on the example from https://dev.to/codewithmahadihasan/comprehensive-guide-to-handling-modals-in-react-46je
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - A boolean indicating whether the modal is open.
 * @param {Function} props.onClose - A function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element|null} The rendered modal component, or null if the modal is closed.
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
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