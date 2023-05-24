/* eslint-disable react/prop-types */
function TrendingCard(props) {
  const userName = props.userName;
  const Title = props.Title;
  const Description = props.Description;
  const Date = props.Date;
  const Category = props.Category;
  

  return (
    <>
    <div className="grid-items-container"> {/* GridItemsContainer containes API Data */}

        <section className='trending-title-holder'>
            <h3 className="trending-grid-title">{userName}</h3>
        </section>

        <section className="trending-blogPost">
            <h2 className='blog-post-heading'>{Title}</h2>
        </section>
        <section className="trending-blogDescription">
            <h2 className='blog-post-description'>{Description}</h2>
        </section>
        <section className='trending-category'>
            <span >{Date}</span>
            <span className="category-type">{Category}</span>
         </section>

         
        </div> 
    </>
  )
}



export default TrendingCard