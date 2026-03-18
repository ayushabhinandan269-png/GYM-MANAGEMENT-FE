import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

/* PUBLIC PAGES */

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const PlanPreview = lazy(() => import("../pages/PlanPreview"));
const WorkoutPreview = lazy(() => import("../pages/WorkoutPreview"));
const NutritionPage = lazy(() => import("../features/member/NutritionPage"));

/* MEMBER */

const Plans = lazy(() => import("../pages/Plans"));
const MemberDashboard = lazy(() => import("../features/member/MemberDashboard"));
const MyPlan = lazy(() => import("../features/member/MyPlan"));
const Profile = lazy(() => import("../features/member/Profile"));
const WorkoutsPage = lazy(() => import("../features/member/WorkoutsPage"));

/* ADMIN */

const AdminDashboard = lazy(() => import("../features/admin/AdminDashboard"));
const ManageMembers = lazy(() => import("../features/admin/ManageMembers"));
const ManageTrainers = lazy(() => import("../features/admin/ManageTrainers"));
const ManagePlans = lazy(() => import("../features/admin/ManagePlans"));
const ManageWorkouts = lazy(() => import("../features/admin/ManageWorkouts"));

function AppRoutes() {

  return (
    <Routes>

      {/* PUBLIC WEBSITE */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<PlanPreview />} />
        <Route path="/workout-preview" element={<WorkoutPreview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* MEMBER DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["member"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MemberDashboard />} />
        <Route path="plans" element={<Plans />} />
        <Route path="my-plan" element={<MyPlan />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* TRAINER */}

      <Route
        path="/trainer"
        element={
          <ProtectedRoute allowedRoles={["trainer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="workouts" element={<WorkoutsPage />} />
      </Route>

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="members" element={<ManageMembers />} />
        <Route path="trainers" element={<ManageTrainers />} />
        <Route path="plans" element={<ManagePlans />} />
        <Route path="workouts" element={<ManageWorkouts />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;