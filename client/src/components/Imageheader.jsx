import { Link } from "react-router-dom";
function Imageheader() {
  return (
    <>
      <main className="imageSection">
        <section className="Imagetext">
          <h2 className="title-headline">Savor the Art of Cooking</h2>
          <span className="titlechef-tagline" style={{ color: "black" }}>
            Find Inspiration and Delicious Recipes on TastyDelights
          </span>
          <Link to="/recipes">
            <button className="imageHeader-btn">Explore Recipes</button>
          </Link>
        </section>

        {/* Image Grid Section */}
        <section className="image-grid"></section>
      </main>
    </>
  );
}

export default Imageheader;
