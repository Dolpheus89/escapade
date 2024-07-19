import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PanelContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  max-width: 800px;
  min-width: 300px;
  height: auto;
  max-height: 90vh;
  background-color: #f9f9f9;
  border-radius: 0.8rem;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: var(--ff-header-serif);
  color: #2142ab;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 5px;
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 200px;
  height: 40px;
  background-color: #2142ab;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 2.3rem;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

function PersonalizationPanel({ onSave, onClose, note }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [titleStyles, setTitleStyles] = useState({
    fontColor: "#F0F0F0",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "normal",
    textDecoration: "none",
    fontFamily: "Bebas Neue",
  });
  const [contentStyles, setContentStyles] = useState({
    fontColor: "#F0F0F0",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "normal",
    textDecoration: "none",
    fontFamily: "Lato",
  });

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setImage(note.image || null);
      setTitleStyles({
        ...note.titleStyles,
        fontColor: note.titleStyles?.fontColor || "#000000",
        fontSize: note.titleStyles?.fontSize || "16px",
        fontStyle: note.titleStyles?.fontStyle || "normal",
        fontWeight: note.titleStyles?.fontWeight || "normal",
        textDecoration: note.titleStyles?.textDecoration || "none",
        fontFamily: note.titleStyles?.fontFamily || "Bebas Neue",
      });
      setContentStyles({
        ...note.contentStyles,
        fontColor: note.contentStyles?.fontColor || "#000000",
        fontSize: note.contentStyles?.fontSize || "14px",
        fontStyle: note.contentStyles?.fontStyle || "normal",
        fontWeight: note.contentStyles?.fontWeight || "normal",
        textDecoration: note.contentStyles?.textDecoration || "none",
        fontFamily: note.contentStyles?.fontFamily || "Lato",
      });
    }
  }, [note]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveClick = () => {
    onSave({ title, content, image, titleStyles, contentStyles });
    onClose();
  };

  return (
    <PanelContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Title>Personalize Your Note</Title>
      <Label>
        Title:
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Label>
        Content:
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Label>
      <Label>
        Image:
        <Input type="file" onChange={handleImageChange} />
      </Label>
      <Label>
        Title Font Color:
        <Input
          type="color"
          value={titleStyles.fontColor}
          onChange={(e) =>
            setTitleStyles((prev) => ({ ...prev, fontColor: e.target.value }))
          }
        />
      </Label>
      <Label>
        Content Font Color:
        <Input
          type="color"
          value={contentStyles.fontColor}
          onChange={(e) =>
            setContentStyles((prev) => ({ ...prev, fontColor: e.target.value }))
          }
        />
      </Label>
      <Label>
        Font Size:
        <Input
          type="number"
          value={contentStyles.fontSize.replace("px", "")}
          onChange={(e) =>
            setContentStyles((prev) => ({
              ...prev,
              fontSize: `${e.target.value}px`,
            }))
          }
        />
      </Label>
      <Label>
        Font Style:
        <Select
          value={contentStyles.fontStyle}
          onChange={(e) =>
            setContentStyles((prev) => ({ ...prev, fontStyle: e.target.value }))
          }
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
        </Select>
      </Label>
      <Label>
        Font Weight:
        <Select
          value={contentStyles.fontWeight}
          onChange={(e) =>
            setContentStyles((prev) => ({
              ...prev,
              fontWeight: e.target.value,
            }))
          }
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </Select>
      </Label>
      <Label>
        Text Decoration:
        <Select
          value={contentStyles.textDecoration}
          onChange={(e) =>
            setContentStyles((prev) => ({
              ...prev,
              textDecoration: e.target.value,
            }))
          }
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
        </Select>
      </Label>
      <Label>
        Font Family:
        <Select
          value={contentStyles.fontFamily}
          onChange={(e) =>
            setContentStyles((prev) => ({
              ...prev,
              fontFamily: e.target.value,
            }))
          }
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Lato">Lato</option>
        </Select>
      </Label>
      <SaveButton onClick={handleSaveClick}>Save</SaveButton>
    </PanelContainer>
  );
}

PersonalizationPanel.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    titleStyles: PropTypes.shape({
      fontColor: PropTypes.string,
      fontSize: PropTypes.string,
      fontStyle: PropTypes.string,
      fontWeight: PropTypes.string,
      textDecoration: PropTypes.string,
      fontFamily: PropTypes.string,
    }),
    contentStyles: PropTypes.shape({
      fontColor: PropTypes.string,
      fontSize: PropTypes.string,
      fontStyle: PropTypes.string,
      fontWeight: PropTypes.string,
      textDecoration: PropTypes.string,
      fontFamily: PropTypes.string,
    }),
  }),
};

PersonalizationPanel.defaultProps = {
  note: null,
};

export default PersonalizationPanel;
