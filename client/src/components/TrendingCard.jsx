function TrendingCard({ title, description, username, category, image }) {
  return (
    <>
      <div className="trendingCard-container">
        <img
          src={`http://localhost:3000/Images/${image}`}
          alt={image}
          className="Trending-image"
        />
        <h2 className="trendingcard-title">{title}</h2>
        <p
          className="trendingcard-description"
          style={{
            width: "350px",
            marginTop: "6px",
            height: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            lineHeight: "1.5rem",
            textAlign: "justify",
            fontSize: "16px",
          }}
        >
          {description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="trendingcard-username">{username}</span>
          <span className="trendingcard-category" style={{ color: "black" }}>
            {category}
          </span>
        </div>
      </div>
    </>
  );
}

export default TrendingCard;
