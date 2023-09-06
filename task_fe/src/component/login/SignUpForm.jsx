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
  Box,
  Text,
} from "@chakra-ui/react"
import { SiGmail } from "react-icons/si"
import { MdPassword } from "react-icons/md"
import { BsFillPersonFill } from "react-icons/bs"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SignUpForm = ({ setUserInfo }) => {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  let url = "http://localhost:8000/api"

  function handleRegister() {
    if (name !== "" && email !== "" && password !== "") {
      setLoginData({ name: name, email: email, password: password })
    }
  }
  useEffect(() => {
    if (
      loginData.email !== "" &&
      loginData.password !== "" &&
      loginData.name !== ""
    ) {
      axios
        .post(`${url}/register`, { ...loginData })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("auth", JSON.stringify(res.data))
            setUserInfo(res.data)
            navigate("/")
          }
        })
        .catch((err) => {
          alert(err.message)
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
          Sign Up
        </Text>
        <Stack w={"100%"} spacing={4}>
          <InputGroup>
            <InputLeftElement>
              <BsFillPersonFill color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement>
              <SiGmail color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement>
              <MdPassword color="gray.300" />
            </InputLeftElement>
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
              onClick={handleRegister}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default SignUpForm
