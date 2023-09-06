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
  Input,
  Stack,
} from "@chakra-ui/react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react"

import { useState } from "react"
import { useEffect } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import axios from "axios"
const AddMember = ({ task, setUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [users, setUsers] = useState([])
  let url = "https://tasty-cyan-fatigues.cyclic.app/api"

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
            <Stack spacing={5}>
              <Menu>
                <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
                  Add Members
                </MenuButton>
                <MenuList>
                  {users.map((user) => {
                    return (
                      <MenuItem
                        onClick={(e) => {
                          addUser(e.target.name, e.target.value)
                        }}
                        value={user.name}
                        name={user._id}
                      >
                        {user.name}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add Member</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMember
