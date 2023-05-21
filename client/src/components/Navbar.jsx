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
                <button>Write</button>
                <button className="btn-signin">Sign In</button>
                <button className="btn-signup">Get Started</button>
            </ul>
        </section>
    </main>
    </>
  )
}

export default Navbar