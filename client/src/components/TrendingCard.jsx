function TrendingCard({title,description,userName,category}) {
  return (
    <>
    <div className="trendingCard-container">
        <h4 className="trendingcard-userName">{userName}</h4>
        <h2 className="trendingcard-title">{title}</h2>
        <p className="trendingcard-description">{description}</p>
        <span className="trendingcard-category">{category}</span>
    </div>
    </>
  )
}

export default TrendingCard