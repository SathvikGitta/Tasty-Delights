import {Link} from "react-router-dom"
function Navbar() {
  return (
    <>
    <main className="navbar-container">
        <section className="logo">
            <img src="" alt="" />
            <h1 className="logo-text">
              <Link to="/" className="logo-text" style={{color : "#232323"}}>
              Tasty Delights
              </Link>
            </h1>
        </section>
        <section className="navbar-list">
            <ul>
                <button>
                  <Link to="/createpost" className="Link">Write</Link>
                </button>
                <button className="btn-signin">
                  <Link to="/signin" className="Link">Sign in</Link>
                </button>
                <button >
                  <Link to="/signup" className="btn-signup Link">Get Started</Link>
                </button>
            </ul>
        </section>
    </main>
    </>
  )
}

export default Navbar