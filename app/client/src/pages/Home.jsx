import NavBar from "../components/homepage/NavBar";
import HomeWeather from "../components/homepage/HomepageWeather.jsx";
import "../styles/homepage.css";

export default function Homepage() {
  return (
    <>
      <NavBar />
      <div className="homepage-content">
        {/* Dynamic Weather Card */}
        <HomeWeather />
        {/* Stats Grid */}
      </div>
    </>
  );
}
