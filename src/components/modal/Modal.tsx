interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <dialog
      id="my_modal_3"
      className={`modal ${modalOpen ? "modal-open" : ""} `}
    >
      {/* <div className="modal-box  w-11/12 max-w-5xl"> modal large */}
      <div className="modal-box no-scrollbar">
        <form method="dialog">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
