import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";
import NavigationBar from "./Header.jsx";

function Explore() {
  return (
    <div className="explore">
      <header>
	<NavigationBar/>
<p className="pageHeader">Home</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Catergories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
