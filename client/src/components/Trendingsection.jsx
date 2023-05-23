import {HiArrowTrendingUp} from "react-icons/hi2"
function Trendingsection() {
  return (
    <>
    <main className="trending-container">
        <h3 className='trending-title'><HiArrowTrendingUp className="arrow" size={20}/> Trending on Medium</h3>
        <section className="trending-grid-layout">  {/* Layout for grid items */}

        <div className="grid-items-container"> {/* GridItemsContainer containes API Data */}

        <section className='trending-title-holder'>
            <img src="" alt="" />
            <h3 className="trending-grid-title">Matty Brownell {/* Blog.Title*/}</h3>
            <h4 className='trending-grid-metadata'>UX Collective {/* Blog.MetaData*/}</h4>
        </section>

        <section className="trending-blogPost">
            <h2 className='blog-post-heading'>{/*Blog.PostTitle*/}How I used Midjourney to design a brand identity</h2>
        </section>

        <section className='trending-category'>
            <span >{/*Blog.Dat */}May 15</span>
            <span className="category-type">{/*Blog.category*/} breakfast</span>
         </section>

         
        </div> 

         <div className="grid-items-container"> {/* GridItemsContainer containes API Data */}

        <section className='trending-title-holder'>
            <img src="" alt="" />
            <h3 className="trending-grid-title">Matty Brownell {/* Blog.Title*/}</h3>
            <h4 className='trending-grid-metadata'><span className='grey-text-word'>in</span>UX Collective {/* Blog.MetaData*/}</h4>
        </section>

        <section className="trending-blogPost">
            <h2 className='blog-post-heading'>{/*Blog.PostTitle*/}How I used Midjourney to design a brand identity</h2>
        </section>

        <section className='trending-category'>
            <span >{/*Blog.Dat */}May 15</span>
            <span>{/*Blog.category*/} breakfast</span>
         </section>

         
        </div> 

         <div className="grid-items-container"> {/* GridItemsContainer containes API Data */}

        <section className='trending-title-holder'>
            <img src="" alt="" />
            <h3 className="trending-grid-title">Matty Brownell {/* Blog.Title*/}</h3>
            <h4 className='trending-grid-metadata'><span className='grey-text-word'>in</span>UX Collective {/* Blog.MetaData*/}</h4>
        </section>

        <section className="trending-blogPost">
            <h2 className='blog-post-heading'>{/*Blog.PostTitle*/}How I used Midjourney to design a brand identity</h2>
        </section>

        <section className='trending-category'>
            <span >{/*Blog.Dat */}May 15</span>
            <span>{/*Blog.category*/} breakfast</span>
         </section>

         
        </div> 
        {/* End of GridItemsContainer */}
        </section>
    </main>
    </>
  )
}

export default Trendingsection