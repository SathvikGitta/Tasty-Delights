import BlogCard from "./BlogCard"
import Navbar from "./Navbar"
function Blogpost() {
  return (
    <>
    <Navbar/>
    <main className="blog-container">
      <div className="blog-container-flex">
        <BlogCard/>
      </div>
    </main>
    </>
  )
}

export default Blogpost