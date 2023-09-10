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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Card,
  Avatar,
} from "@chakra-ui/react"
import { Box, Text, Tag } from "@chakra-ui/react"
import {
  StructuredList,
  StructuredListHeader,
  StructuredListItem,
  StructuredListIcon,
  StructuredListButton,
  StructuredListCell,
} from "@saas-ui/react"

import { useState, useEffect } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import axios from "axios"

const AddMember = ({ task, setUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [users, setUsers] = useState([])
  let url = "https://tasty-cyan-fatigues.cyclic.app/api"
  // let url = "http://localhost:8000/api"

  function addUser(userId, username) {
    console.log("userId", userId)
    console.log("username", username)
    axios
      .post(
        `${url}/tasks/${task._id}/adduser`,
        {
          userIdToAdd: userId,
          userName: username,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      )
      .then((res) => {
        setUpdate((prev) => !prev)
        onClose()
      })
  }

  useEffect(() => {
    axios
      .get(`${url}/users`)
      .then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((err) => alert(err.message))
  }, [])

  return (
    <>
      <Button onClick={onOpen}>Add Member</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Card width="100%" height={"70vh"} overflowY={"auto"}>
                <StructuredList pl={6} pr={6}>
                  <StructuredListHeader>Users</StructuredListHeader>
                  {users.map((user) => {
                    return (
                      <StructuredListItem pb={2}>
                        <StructuredListCell width="14">
                          <Avatar name={user.name} size="sm" />
                        </StructuredListCell>
                        <StructuredListCell flex="1">
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="muted">
                            {user.email}
                          </Text>
                        </StructuredListCell>
                        <StructuredListCell>
                          <Tag
                            cursor={"pointer"}
                            data-id={user._id}
                            data-name={user.name}
                            onClick={(e) => {
                              addUser(
                                e.target.getAttribute("data-id"),
                                e.target.getAttribute("data-name")
                              )
                            }}
                          >
                            Add Member
                          </Tag>
                        </StructuredListCell>
                      </StructuredListItem>
                    )
                  })}
                </StructuredList>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMember
