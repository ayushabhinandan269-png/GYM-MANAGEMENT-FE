import { Outlet, Link, useLocation,useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { trackPageVisit } from "../utils/pageTracker";

import {
  LayoutDashboard,
  CreditCard,
  Dumbbell,
  User,
  Users,
  UserCog,
  ClipboardList,
  LogOut,
  Apple 
} from "lucide-react";

const DashboardLayout = () => {

  const location = useLocation();
  const role = localStorage.getItem("role");

  const firstLoad = useRef(true);

  /* ---------------- PAGE ACTIVITY TRACKING ---------------- */

  useEffect(() => {

    // Prevent duplicate activity on first render
    if (firstLoad.current) {
      firstLoad.current = false;
    }

    trackPageVisit(location.pathname);

  }, [location.pathname]);

  /* ---------------- LOGOUT FUNCTION ---------------- */
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  /* ---------------- ACTIVE LINK STYLE ---------------- */

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-yellow-500 text-black font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* ---------------- SIDEBAR ---------------- */}

      <aside className="w-64 bg-black text-white flex flex-col justify-between shadow-lg">

        <div>

          <h1 className="text-2xl font-bold p-6 border-b border-gray-800">
            GymMS
          </h1>

          <nav className="p-4 space-y-2">

            {/* MEMBER MENU */}

            {role === "member" && (
              <>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  <LayoutDashboard size={18}/>
                  Dashboard
                </Link>

                <Link to="/dashboard/plans" className={linkClass("/dashboard/plans")}>
                  <CreditCard size={18}/>
                  Browse Plans
                </Link>

                <Link to="/dashboard/my-plan" className={linkClass("/dashboard/my-plan")}>
                  <ClipboardList size={18}/>
                  My Plan
                </Link>

                <Link to="/dashboard/workouts" className={linkClass("/dashboard/workouts")}>
                  <Dumbbell size={18}/>
                  Workouts
                </Link>

              
                <Link to="/dashboard/nutrition" className={linkClass("/dashboard/nutrition")}>
                  <Apple size={18}/>
                  Nutrition
                </Link>

                <Link to="/dashboard/profile" className={linkClass("/dashboard/profile")}>
                  <User size={18}/>
                  Profile
                </Link>
              </>
            )}

            {/* TRAINER MENU */}

            {role === "trainer" && (
              <>
                <Link to="/trainer/dashboard" className={linkClass("/trainer/dashboard")}>
                  <LayoutDashboard size={18}/>
                  Trainer Dashboard
                </Link>

                <Link to="/trainer/workouts" className={linkClass("/trainer/workouts")}>
                  <Dumbbell size={18}/>
                  Manage Workouts
                </Link>
              </>
            )}

            {/* ADMIN MENU */}

            {role === "admin" && (
              <>
                <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                  <LayoutDashboard size={18}/>
                  Admin Dashboard
                </Link>

                <Link to="/admin/members" className={linkClass("/admin/members")}>
                  <Users size={18}/>
                  Members
                </Link>

                <Link to="/admin/trainers" className={linkClass("/admin/trainers")}>
                  <UserCog size={18}/>
                  Trainers
                </Link>

                <Link to="/admin/plans" className={linkClass("/admin/plans")}>
                  <CreditCard size={18}/>
                  Plans
                </Link>

                <Link to="/admin/workouts" className={linkClass("/admin/workouts")}>
                  <Dumbbell size={18}/>
                  Workouts
                </Link>
              </>
            )}

          </nav>

        </div>

        {/* ---------------- LOGOUT ---------------- */}

        <div className="p-6 border-t border-gray-800">

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400 font-semibold transition"
          >
            <LogOut size={18}/>
            Logout
          </button>

        </div>

      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet/>
      </main>

    </div>

  );

};

export default DashboardLayout;