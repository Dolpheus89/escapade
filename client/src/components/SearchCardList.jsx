import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CityCard from "./CityCard";
import "../styles/SearchCardList.css";

function SearchCardList({ cities }) {
  const navigate = useNavigate();

  const handleClick = (cityID) => () => navigate(`/city/${cityID}`);

  return (
    <section className="search-list">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} onClick={handleClick(city.id)} />
      ))}
    </section>
  );
}

SearchCardList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      region: PropTypes.string,
      id: PropTypes.number.isRequired,
      biome: PropTypes.string,
      climat: PropTypes.string,
      fait_insolite: PropTypes.string,
      gastronomie: PropTypes.string,
      choses_insolites_a_faire: PropTypes.arrayOf(PropTypes.string),
      img: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

SearchCardList.defaultProps = {
  cities: [
    {
      name: "",
      region: "",
      biome: "",
      climat: "",
      fait_insolite: "",
      gastronomie: "",
      choses_insolites_a_faire: [],
      img: [],
    },
  ],
};

export default SearchCardList;
