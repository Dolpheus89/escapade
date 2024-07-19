import "./City.css";
import { useParams, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import CityHeader from "../components/CityHeader";
import CityFirstSection from "../components/CityFirstSection";
import CityInformationSection from "../components/CityInformationSection";
import CarrousselDivz from "../components/CarrouselDivz";
import ScrollHorizontalCityCard from "../components/ScrollHorizontalCityCard";

function City() {
  const cities = useLoaderData();
  const citiesArray = Object.values(cities);

  const { id } = useParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    async function fetchCityData() {
      try {
        console.info(`Fetching data for city ID: ${id}`);
        const response = await fetch(
          `https://city-info-server.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCityData(data);
        console.info(`Fetched data:`, data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCityData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <CityHeader />
      <main className="city-main">
        <div className={`city-diaporama-popup ${isPopupVisible ? "show" : ""}`}>
          <CarrousselDivz hidePopup={hidePopup} cityData={cityData} />
        </div>
        <CityFirstSection cityData={cityData} showPopup={showPopup} />
        <CityInformationSection cityData={cityData} showPopup={showPopup} />
        {cityData.location ? (
          <ScrollHorizontalCityCard
            cities={citiesArray}
            location={cityData.location}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}

export default City;
