import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
import { useState, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: "false",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/auth", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: "true",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authToken) {
      fetchUserData();
    } else {
      setAuthState({ ...authState, status: false });
    }
  }, []);

  // Logout Handle
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthState(false);
    alert("You are logged out");
    navigate("/");
  };

  return (
    <>
      <main className="navbar-container">
        <section className="logo">
          <img src="" alt="" />
          <h1 className="logo-text">
            <Link to="/" className="logo-text" style={{ color: "#232323" }}>
              {authState.username
                ? `Welcome, ${authState.username}`.toLocaleUpperCase()
                : "Tasty Delights"}
            </Link>
          </h1>
        </section>
        <section className="navbar-list">
          <ul style={{ alignItems: "center" }}>
            <button>
              <Link
                to="/recipes"
                className="Link"
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                Explore
              </Link>
            </button>
            <button>
              <Link to="/create-a-post" className="Link">
                Write
              </Link>
            </button>

            {!authToken ? (
              <>
                <AuthContext.Provider value={{ authState, setAuthState }}>
                  <button className="btn-signin">
                    <Link to="/login-page" className="Link">
                      Log in
                    </Link>
                  </button>
                  <button>
                    <Link to="/registration-page" className="btn-signup Link">
                      Get Started
                    </Link>
                  </button>
                </AuthContext.Provider>
              </>
            ) : (
              <>
                <div>
                  <GoPerson
                    size={22}
                    onClick={() => navigate("/profile")}
                    style={{ cursor: "pointer" }}
                    title="profile"
                  />
                </div>
                <button
                  style={{
                    backgroundColor: "#232323",
                    color: "#fff",
                    width: "60px",
                    padding: "7px",
                    borderRadius: "4px",
                  }}
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Navbar;
