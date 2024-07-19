import { useLoaderData } from "react-router-dom";
import HomePage from "../components/HomePage";
import InfiniteScrolling from "../components/InfiniteScrolling";
import "./Home.css";
import FirstLike from "../components/FirstLike";

function Home() {
  const cities = useLoaderData();
  const citiesArray = Object.values(cities);

  return (
    <div>
      <FirstLike />
      <HomePage />
      <InfiniteScrolling cities={citiesArray} />
    </div>
  );
}

export default Home;
