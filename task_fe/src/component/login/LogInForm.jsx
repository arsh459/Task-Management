import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Box,
  Text,
} from "@chakra-ui/react"
import { SiGmail } from "react-icons/si"
import { MdPassword } from "react-icons/md"
import { BsFillPersonFill } from "react-icons/bs"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LogInForm = ({ setUserInfo }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  let url = "https://tasty-cyan-fatigues.cyclic.app/api"
  // let url = "http://localhost:8000/api"

  function handleLogin() {
    setLoginData({ email: email, password: password })
  }
  useEffect(() => {
    console.log(loginData)
    if (loginData.email !== "" && loginData.password !== "") {
      axios
        .post(`${url}/login`, { ...loginData })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("auth", JSON.stringify(res.data))
            setUserInfo(res.data)
            navigate("/")
          }
        })
        .catch((err) => {
          alert(err)
        })
    }
  }, [loginData])
  return (
    <>
      <Box
        w={"50%"}
        p={"5"}
        m="auto"
        mt={"10"}
        bg={"white"}
        box-shadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
      >
        <Text textAlign={"center"} fontSize={"30px"} fontWeight={"bold"} mb={5}>
          Log In
        </Text>
        <Stack w={"100%"} spacing={4}>
          <InputGroup>
            {/* <InputLeftElement>
              <SiGmail color="gray.300" />
            </InputLeftElement> */}
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </InputGroup>

          <InputGroup>
            {/* <InputLeftElement>
              <MdPassword color="gray.300" />
            </InputLeftElement> */}
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </InputGroup>

          <Box>
            <Button
              bg={"#1273EB"}
              w={"100%"}
              color={"white"}
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default LogInForm
