import "../styles/UserNote.css";
import xIcon from "../assets/svg/x-symbol-svgrepo-com.svg";

function UserNote() {
  return (
    <div className="user-note">
      <img className="user-note__icon" src={xIcon} alt="Supprimer la carte" />
      <h3 className="user-note__title">Toulouse</h3>
      <p className="user-note__note">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odio
        nostrum incidunt sequi numquam quo assumenda modi fugiat magnam nihil!
        numquam quo assumenda modi fugiat magnam nihil!
      </p>
    </div>
  );
}

export default UserNote;
