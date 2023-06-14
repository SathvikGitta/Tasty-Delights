function RecipeCard({ username, title, description, category, image }) {
  return (
    <>
      <div className="recipeCard-container">
        <div className="recipeCard-containerData">
          <div className="recipeCard-dataCard">
            <div className="recipeCard-Text">
              <p style={{ marginTop: "5px", fontWeight: 500 }}>
                {username.charAt(0).toUpperCase() + username. slice(1)}
              </p>
              <h3 className="recipeCard-title">{title}</h3>
              <p className="recipeCard-description" style={{ width: "300px" }}>
                {description}
              </p>
              <span className="recipeCard-category">{category}</span>
            </div>

            {/* Image Container*/}
            <div className="recipeCard-ImageContainer">
              <img
                src={`http://localhost:3000/Images/${image}`}
                alt={image}
                className="image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeCard;
