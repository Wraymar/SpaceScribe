import ReactModal from "react-modal";
import axiosInstance from "../../utils/axiosConfig";
import "../../styles/modal.css";
import noImage from "../../assets/images/noImage.jpg";

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

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/journal/entries/${selectedEntry.id}`);
      setIsOpen(() => false); // Close modal after deletion
      window.location.reload(); // Refresh entries list (optional)
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

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
        <div className="modal-body">
          <div className="modal-top-div">
            <div>
              {imageUrl && imageUrl ? (
                <img
                  className="modal-polaroid-photo"
                  src={imageUrl}
                  alt="Uploaded entry"
                />
              ) : (
                <img src={noImage}></img>
              )}
            </div>

            <div className="glass-text modal-preview-date">
              <h3>{day}</h3>
              <p>
                {month} {dayNum}, {year}
              </p>
            </div>
          </div>

          <div className="content-details">
            <h2>
              {/* <strong>Title: </strong> */}
              <strong>{selectedEntry ? selectedEntry.title : null}</strong>
            </h2>

            <p>{selectedEntry ? selectedEntry.content : null}</p>
          </div>
        </div>
        <br></br>
        <br></br>
        {selectedEntry && (
          <div className="modal-delete-wrapper">
            <button
              className="btn modal-delete-button"
              onClick={() => handleDelete()}
            >
              Delete Entry
            </button>
          </div>
        )}
      </ReactModal>
    </div>
  );
}

export default PreviewModal;
