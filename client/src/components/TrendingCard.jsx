function TrendingCard({ title, description, userName, category, image }) {
  return (
    <>
      <div className="trendingCard-container">
        <img
          src={`http://localhost:3000/Images/${image}`}
          alt={image}
          className="Trending-image"
        />
        <h4 className="trendingcard-userName">{userName}</h4>
        <h2 className="trendingcard-title">{title}</h2>
        <p
          className="trendingcard-description"
          style={{
            width: "350px",
            height: "45px",
          }}
        >
          {description}
        </p>
        <span className="trendingcard-category">{category}</span>
      </div>
    </>
  );
}

export default TrendingCard;
