import Navbar from "./component/navbar/Navbar"
import { Box } from "@chakra-ui/react"
import RouteComp from "./routes/Route"
import { useState, useEffect } from "react"

function App() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    let authData = JSON.parse(localStorage.getItem("auth")) || {}
    if (authData.token) {
      setUserInfo(authData)
    } else {
      setUserInfo({})
    }
  }, [])

  useEffect(() => {
    if (userInfo.token) {
      localStorage.setItem("auth", JSON.stringify(userInfo))
    }
  }, [userInfo])

  return (
    <Box>
      <Navbar setUserInfo={setUserInfo} userInfo={userInfo} />
      <RouteComp setUserInfo={setUserInfo} userInfo={userInfo} />
    </Box>
  )
}

export default App
