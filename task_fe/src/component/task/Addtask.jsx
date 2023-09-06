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
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
const Addtask = ({ setTasks, tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [state, setState] = useState({
    name: "",
    description: "",
    dueDate: "",
    checklist: "",
    labels: "",
    creatorName: "",
  })
  let url = "https://tasty-cyan-fatigues.cyclic.app/api"

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("auth")).name)
    setToken(JSON.parse(localStorage.getItem("auth")).token)
  }, [])

  useEffect(() => {
    setState({ ...state, creatorName: username })
  }, [username])

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleCreate() {
    let { description, name, checklist, labels, dueDate, creatorName } = state
    console.log(state)
    if (
      name !== "" &&
      dueDate != "" &&
      description !== "" &&
      checklist != "" &&
      labels !== "" &&
      creatorName !== ""
    ) {
      let labelarr = labels.split(",")
      let checkarr = checklist.split(",")
      let mcheckarr = []
      for (let elem of checkarr) {
        let melem = { text: elem, completed: false }
        mcheckarr.push(melem)
      }
      console.log(token)
      let response = await axios.post(
        `${url}/tasks`,
        {
          description,
          name,
          checklist: mcheckarr,
          labels: labelarr,
          dueDate,
          creatorName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log(response.data)
      setTasks([...tasks, response.data])
    } else {
      alert("please fill all fields")
    }
  }
  return (
    <>
      <Button onClick={onOpen}>Create a Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Input
                className="task"
                placeholder="Enter your task name"
                size="lg"
                type="text"
                name="name"
                onChange={handleChange}
              />
              <Input
                placeholder="Description"
                size="lg"
                type="text"
                name="description"
                onChange={handleChange}
              />
              <Input
                placeholder="due date"
                size="lg"
                type="date"
                name="dueDate"
                onChange={handleChange}
              />
              <Input
                placeholder="Enter checklist, separate by commas"
                size="lg"
                type="text"
                name="checklist"
                onChange={handleChange}
              />
              <Input
                placeholder="Enter Labels,separated by commas"
                size="lg"
                type="text"
                name="labels"
                onChange={handleChange}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleCreate}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Addtask
