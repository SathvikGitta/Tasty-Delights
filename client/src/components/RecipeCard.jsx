function RecipeCard({ userName, title, description, category, image }) {
  return (
    <>
      <div className="recipeCard-container">
        <div className="recipeCard-containerData">
          <div className="recipeCard-dataCard">
            <div className="recipeCard-Text">
              <h4 className="recipeCard-userName">{userName} </h4>
              <h3 className="recipeCard-title">{title}</h3>
              <p className="recipeCard-description">{description}</p>
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
        <div className="recipeCard-categories"></div>
      </div>
    </>
  );
}

export default RecipeCard;
