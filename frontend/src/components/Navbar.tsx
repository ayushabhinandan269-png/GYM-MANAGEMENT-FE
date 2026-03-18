import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {

    const token = user?.token;
    const userRole = user?.role;

    setIsLoggedIn(!!token);
    setRole(userRole || null);

  }, [user]);

  const handleLogout = () => {

    logout();
    setIsLoggedIn(false);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

  const linkStyle = {
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    paddingBottom: "4px",
    transition: "all 0.25s ease"
  };

  const hoverEnter = (e: any) => {
    e.currentTarget.style.color = "#f5c518";
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const hoverLeave = (e: any) => {
    e.currentTarget.style.color = "white";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (

    <nav
      style={{
        background: "#111",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h2 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
        GymMS
      </h2>

      <div style={{ display: "flex", gap: "30px" }}>

        {/* PUBLIC LINKS */}

        <Link to="/" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
          Home
        </Link>

        <Link to="/plans" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
          Plans
        </Link>

        {!isLoggedIn && (
          <Link to="/workout-preview" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            Workouts
          </Link>
        )}

        {/* MEMBER DASHBOARD */}

        {isLoggedIn && role === "member" && (
          <Link to="/dashboard" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            Dashboard
          </Link>
        )}

        {/* TRAINER PANEL */}

        {isLoggedIn && role === "trainer" && (
          <Link to="/trainer/dashboard" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            Trainer Panel
          </Link>
        )}

        {/* ADMIN PANEL */}

        {isLoggedIn && role === "admin" && (
          <Link to="/admin/dashboard" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            Admin Panel
          </Link>
        )}

        {/* LOGIN / LOGOUT */}

        {!isLoggedIn ? (

          <Link to="/login" style={linkStyle} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            Login
          </Link>

        ) : (

          <span
            style={{ ...linkStyle, cursor: "pointer" }}
            onClick={handleLogout}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
          >
            Logout
          </span>

        )}

      </div>

    </nav>
  );
}

export default Navbar;