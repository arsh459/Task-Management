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
  Heading,
  StackDivider,
  Box,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@chakra-ui/react"
import {
  StructuredList,
  StructuredListHeader,
  StructuredListItem,
  StructuredListIcon,
  StructuredListButton,
  StructuredListCell,
} from "@saas-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

import { useState } from "react"
import axios from "axios"
const AddComment = ({ task, setUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = useState("")
  const btnRef = React.useRef()
  const scrollRef = React.useRef()

  let url = "https://tasty-cyan-fatigues.cyclic.app/api"
  // let url = "http://localhost:8000/api"

  function addComment() {
    if (input !== "") {
      axios
        .post(
          `${url}/tasks/${task._id}/comments`,
          {
            text: input,
            name: JSON.parse(localStorage.getItem("auth")).name,
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
          setInput("")
        })
        .catch((err) => {
          alert(err.message)
        })
    } else {
      alert("fill the commments field")
    }
  }

  return (
    <>
      {/* <Button onClick={onOpen}>View Comments</Button> */}

      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={(e) => {
          onOpen(e)
        }}
      >
        View Comments
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Comments</DrawerHeader>

          <DrawerBody>
            {task.comments.length !== 0 && (
              <Card
                width="100%"
                mb={4}
                overflowY={"auto"}
                overflowX={"hidden"}
                height="72vh"
              >
                <StructuredList>
                  {task.comments.map((comment) => {
                    return (
                      <StructuredListItem ml={4} mb={4}>
                        <StructuredListCell width="14">
                          <Avatar name={comment.name} size="sm" />
                        </StructuredListCell>
                        <StructuredListCell flex="1">
                          <Text fontWeight="bold">{comment.name}</Text>
                          <Text fontSize="sm" color="muted" noOfLines={6}>
                            {comment.text}
                          </Text>
                        </StructuredListCell>
                      </StructuredListItem>
                    )
                  })}
                </StructuredList>
              </Card>
            )}
            <Input
              type="text"
              value={input}
              placeholder="Add your Comments"
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={addComment}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Card>
                <CardHeader>
                  <Heading size="md">Comments</Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    {task.comments.map((comment) => {
                      return (
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            {comment.name}
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {comment.text}
                          </Text>
                        </Box>
                      )
                    })}
                    <Box>
                      <Input
                        type="text"
                        value={input}
                        placeholder="Add your Comments"
                        onChange={(e) => {
                          setInput(e.target.value)
                        }}
                      />
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addComment}>
              Add Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  )
}

export default AddComment
