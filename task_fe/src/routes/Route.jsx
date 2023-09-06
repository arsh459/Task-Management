import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../component/login/Login"
import Navbar from "../component/navbar/Navbar"
import PrivateRoute from "./PrivateRoute"

export default function RouteComp({ setUserInfo, userInfo }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute userInfo={userInfo}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login setUserInfo={setUserInfo} />
          </>
        }
      />
    </Routes>
  )
}
