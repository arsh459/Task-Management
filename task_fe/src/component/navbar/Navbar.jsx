import { Box, Button, Flex, Text } from "@chakra-ui/react"
import React from "react"
import SignUpForm from "../login/SignUpForm"
import LogInForm from "../login/LogInForm"
import { useNavigate } from "react-router-dom"

const Navbar = ({ setUserInfo, userInfo }) => {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem("auth")
    setUserInfo({})
    navigate("/login")
  }
  return (
    <>
      <Flex
        // bg={"#0C356A"}
        bg={"#053B50"}
        position={"sticky"}
        top={"0"}
        h={"12vh"}
        // overflow={"hidden"}
        style={{ zIndex: "2" }}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={10}
          w={"80%"}
          m={"auto"}
        >
          <Flex>
            <Text
              color={"#F6F4EB"}
              fontWeight={"500"}
              fontSize={"30px"}
              margin={"auto"}
            >
              Task Management
            </Text>
          </Flex>
          <Flex gap={4}>
            {userInfo.name ? (
              <>
                <Button>{userInfo.name}</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button>Login</Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar
