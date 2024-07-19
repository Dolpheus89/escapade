import "../styles/UserCard.css";
import xIcon from "../assets/svg/x-symbol-svgrepo-com.svg";
import dummyImage from "../assets/images/beatriz-alvarez-E_azD0_KkYY-unsplash.jpg";

function UserCard() {
  return (
    <div className="user-card">
      <img className="user-card__icon" src={xIcon} alt="Supprimer la carte" />
      <h3 className="user-card__title">Toulouse</h3>
      <img
        className="user-card__image"
        src={dummyImage}
        alt="A dummy - must be replaced"
      />
      <p className="user-card__note">Votre note : 4 / 5</p>
    </div>
  );
}
// To-Do :
// Remplacer le texte en dur par les data du JSON

export default UserCard;
