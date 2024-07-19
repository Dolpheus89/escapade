import { useState, useEffect, useContext } from "react";
import burgerMenu from "../assets/svg/burger-menu.svg";
import Menu from "../components/Menu";
import LogoEscapade from "../components/LogoEscapade";
import "./Search.css";
import SearchCardList from "../components/SearchCardList";
import { SearchContext } from "../contexts/SearchContext";
import fetchLocalApi from "../functions/fetchLocalApi";

function Search() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const handleCloseMenu = () => setMenuOpen(false);
  const { searchType, searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchLocalApi(
        `https://city-info-server.netlify.app/${searchType}/${searchQuery}`
      );
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [searchType, searchQuery]);

  return (
    <div className="user">
      <header className="user-header">
        <button type="button" onClick={handleMenuClick} onKeyDown={() => {}}>
          <img className="" src={burgerMenu} alt="Menu burger" />
        </button>
        <LogoEscapade />
      </header>
      <main className="user-main">
        <h1 className="user-main__title">Les villes</h1>
        <h2 className="user-main__subtitle">
          qui correspondent au {searchType} {searchQuery}.
        </h2>
        <section className="user-grid">
          {loading ? <p>Loading...</p> : <SearchCardList cities={data} />}
        </section>
      </main>
      {menuOpen && <Menu onClose={handleCloseMenu} />}
    </div>
  );
}

export default Search;
