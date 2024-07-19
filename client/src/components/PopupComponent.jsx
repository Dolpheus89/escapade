import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const PopupContainer = styled.div`
  position: relative;
  background: #fcf8f8;
  font-family: var(--ff-header-serif);
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  width: 38rem;
  height: 30rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 27rem;
  height: 3.5rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin-top: 2rem;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const StyledTextarea = styled.textarea`
  width: 27rem;
  height: 12rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const SaveButton = styled.button`
  width: 14rem;
  height: 3.6rem;
  background-color: #f0f0f0;
  color: #2142ab;
  font-family: "Bebas Neue", sans-serif;
  font-size: 2rem;
  border: none;
  border-radius: 1.8rem;
  box-shadow: 0px 4px 4px 0px #00000040;
  cursor: pointer;
  margin-top: 1rem;
`;

function PopupComponent({ show, onClose, onSave, note }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    onSave({ title: noteTitle, content: noteContent });
    onClose();
  };

  if (!show) return null;

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Votre Note</h2>
        <StyledInput
          type="text"
          placeholder="Titre"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <StyledTextarea
          placeholder="Votre note ici..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <SaveButton onClick={handleSave}>Enregistrer</SaveButton>
      </PopupContainer>
    </Overlay>
  );
}

PopupComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  note: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

PopupComponent.defaultProps = {
  note: null,
};

export default PopupComponent;
