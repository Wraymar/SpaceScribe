import ReactModal from "react-modal";
import "../../styles/modal.css";

// Set the app element for accessibility
ReactModal.setAppElement("#root");

function PreviewModal({ isOpen, setIsOpen, selectedEntry, imageUrl }) {
  const dateStr = selectedEntry?.created_at
    ? new Date(selectedEntry.created_at).toDateString().split(" ")
    : [];
  const [day, month, dayNum, year] = dateStr.length
    ? dateStr
    : ["", "", "", ""];
  //   const [isOpen, setIsOpen] = useState(false);

  //   const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="glass-card modal-content"
        overlayClassName={"modal-overlay"}
      >
        {/* <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button> */}
        <div className="modal-top-div">
          <div>
            {/* <img
              className="modal-polaroid-frame"
              src="https://storage.needpix.com/rsynced_images/polaroid-2872834_1280.png"
              alt="Polaroid frame"
            /> */}
            {imageUrl && (
              <img
                className="modal-polaroid-photo"
                src={imageUrl}
                alt="Uploaded entry"
              />
            )}
          </div>

          <div className="modal-preview-date">
            <h3>{day}</h3>
            <p>
              {month}, {dayNum}
            </p>
            <p>{year}</p>
          </div>
        </div>

        <div>
          <p>
            <strong>Title: </strong>
            {selectedEntry ? selectedEntry.title : null}
          </p>

          <p>{selectedEntry ? selectedEntry.content : null}</p>
        </div>
      </ReactModal>
    </div>
  );
}

export default PreviewModal;
