import "../styles/UserCardList.css";
import { useState, useContext } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "../styles/UserNote.css";
import styloPlume from "../assets/images/stylo-plume.png";
import PopupComponent from "./PopupComponent";
import PersonalizationPanel from "./PersonalizationPanel";
import Live2DWidget from "./Live2DWidget";
import CityCard from "./CityCard";
import { UserContext } from "../contexts/UserContext";

function UserCardList() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const {
    favorites,
    updateFavoritePosition,
    notes,
    addNote,
    updateNote,
    updateNotePosition,
    deleteNote,
  } = useContext(UserContext);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setEditIndex(null);
    setEditMode(null);
    setShowPopup(false);
  };

  const openPersonalization = () => {
    setShowPersonalization(true);
  };

  const closePersonalization = () => {
    setEditIndex(null);
    setEditMode(null);
    setShowPersonalization(false);
  };

  const generateUniqueId = () => `note-${Date.now()}-${Math.random()}`;

  const handleSaveNote = (note) => {
    const newNote = {
      ...note,
      id: generateUniqueId(),
      titleStyles: note.titleStyles || {},
      contentStyles: note.contentStyles || {},
      width: note.width || 300,
      height: note.height || 370,
    };

    if (editIndex !== null) {
      updateNote(editIndex, newNote);
    } else {
      addNote(newNote);
    }
    if (editMode === "simple") {
      closePopup();
    } else if (editMode === "custom") {
      closePersonalization();
    }
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  const openEditPanel = (index) => {
    setEditIndex(index);
    setEditMode("simple");
    setShowPopup(true);
  };

  const openEditPersonalization = (index) => {
    setEditIndex(index);
    setEditMode("custom");
    setShowPersonalization(true);
  };

  const toggleResizing = () => {
    setIsResizing(!isResizing);
  };

  return (
    <section className="user-card-list">
      <Live2DWidget />
      <div className="user-card-list-button-container">
        <button
          className="user-card-list-button-container__cta --pen"
          type="button"
          onClick={openPopup}
        >
          <img src={styloPlume} alt="Ecrire une note" />
        </button>
        <button
          className="user-card-list-button-container__cta --text"
          type="button"
          onClick={openPersonalization}
        >
          Personnaliser
        </button>
      </div>
      <div className="user-card-list-cards-container">
        {favorites.map((city) => (
          <Draggable
            key={city.id}
            position={city.position || { x: 0, y: 0 }}
            onStop={(e, data) => {
              updateFavoritePosition(city.id, { x: data.x, y: data.y });
            }}
          >
            <div style={{ position: "relative", display: "flex" }}>
              <CityCard city={city} />
            </div>
          </Draggable>
        ))}
        {notes.map((note, index) => (
          <Draggable
            key={note.id}
            position={note.position || { x: 0, y: 0 }}
            disabled={isResizing}
            onStop={(e, data) => {
              updateNotePosition(note.id, { x: data.x, y: data.y });
            }}
          >
            <div
              className="handle"
              style={{
                position: "relative",
                width: note.width,
                height: note.height,
              }}
            >
              <ResizableBox
                width={note.width}
                height={note.height}
                minConstraints={[100, 100]}
                maxConstraints={[800, 800]}
                onResizeStop={(e, data) => {
                  const updatedNotes = notes.map((n, idx) =>
                    idx === index
                      ? {
                          ...n,
                          width: data.size.width,
                          height: data.size.height,
                        }
                      : n
                  );
                  updateNote(index, updatedNotes);
                  setIsResizing(false);
                }}
                resizeHandles={["se"]}
              >
                <div
                  className="user-note-save"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    resize: "both",
                    overflow: "hidden",
                  }}
                >
                  <button
                    className="close-user-note"
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    &times;
                  </button>
                  <button
                    className="edit-user-note-simple"
                    type="button"
                    onClick={() => openEditPanel(index)}
                  >
                    &#9998; simple
                  </button>
                  <button
                    className="edit-user-note-perso"
                    type="button"
                    onClick={() => openEditPersonalization(index)}
                  >
                    &#9998; perso
                  </button>
                  <button
                    className="resize-note"
                    type="button"
                    onClick={toggleResizing}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                    }}
                  >
                    zoom
                  </button>
                  <h3
                    className="user-note__title"
                    style={{
                      marginTop: "1.2rem",
                      color: note.titleStyles.fontColor,
                      fontSize: note.titleStyles.fontSize,
                      fontStyle: note.titleStyles.fontStyle,
                      fontWeight: note.titleStyles.fontWeight,
                      textDecoration: note.titleStyles.textDecoration,
                      fontFamily: note.titleStyles.fontFamily,
                    }}
                  >
                    {note.title}
                  </h3>
                  <p
                    className="user-note__note"
                    style={{
                      color: note.contentStyles.fontColor,
                      fontSize: note.contentStyles.fontSize,
                      fontStyle: note.contentStyles.fontStyle,
                      fontWeight: note.contentStyles.fontWeight,
                      textDecoration: note.contentStyles.textDecoration,
                      fontFamily: note.contentStyles.fontFamily,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "5",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {note.content}
                  </p>
                  {note.image && (
                    <img
                      src={note.image}
                      alt="Note"
                      style={{
                        margin: "0.5rem",
                        borderRadius: "0.5rem",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        ))}
      </div>

      <PopupComponent
        show={showPopup}
        onClose={closePopup}
        onSave={handleSaveNote}
        note={editIndex !== null ? notes[editIndex] : null}
      />

      {showPersonalization && (
        <div className="personalization-container">
          <PersonalizationPanel
            onClose={closePersonalization}
            onSave={handleSaveNote}
            note={editIndex !== null ? notes[editIndex] : null}
          />
        </div>
      )}
    </section>
  );
}

export default UserCardList;
