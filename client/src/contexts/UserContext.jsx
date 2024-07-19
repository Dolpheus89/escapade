import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addFavorite = (city) => {
    setFavorites([...favorites, city]);
  };

  const updateFavoritePosition = (cityId, position) => {
    const updatedFavorites = favorites.map((city) =>
      city.id === cityId ? { ...city, position } : city
    );
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((fav) => fav.id !== city.id));
  };

  // eslint-disable-next-line arrow-body-style
  const isFavorite = (city) => {
    return favorites.some((fav) => fav.id === city.id);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (index, updatedNote) => {
    const updatedNotes = notes.map((note, idx) =>
      idx === index ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const updateNotePosition = (noteId, position) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, position } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        updateFavoritePosition,
        isFavorite,
        notes,
        addNote,
        updateNote,
        updateNotePosition,
        deleteNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
