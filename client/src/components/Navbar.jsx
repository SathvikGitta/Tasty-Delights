import {Link} from "react-router-dom"
import CreatePostPage from "../pages/CreatePostPage"
function Navbar() {
  return (
    <>
    <main className="navbar-container">
        <section className="logo">
            <img src="" alt="" />
            <h1 className="logo-text">Tasty Delights</h1>
        </section>
        <section className="navbar-list">
            <ul>
                <button>
                  <Link to="/createpost">Write</Link>
                </button>
                <button className="btn-signin">
                  <Link to="/signin">Sign in</Link>
                </button>
                <button >
                  <Link to="/signup" className="btn-signup">Get Started</Link>
                </button>
            </ul>
        </section>
    </main>
    </>
  )
}

export default Navbar