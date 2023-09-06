import { useNavigate } from "react-router-dom"
export default function PrivateRoute({ children, userInfo }) {
  const naviagte = useNavigate()
  if (userInfo.token) {
    return children
  } else {
    naviagte("/login")
    return
  }
}
