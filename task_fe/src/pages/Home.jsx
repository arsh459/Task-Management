import { Box, VStack } from "@chakra-ui/react"
import Addtask from "../component/task/Addtask"
import { useState, useEffect } from "react"
import TaskViewer from "../component/task/TaskViewer"
import axios from "axios"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [assignedtasks, setAssignedTasks] = useState([])
  const [update, setUpdate] = useState(false)
  // let url = "http://localhost:8000"
  let url = "https://tasty-cyan-fatigues.cyclic.app"

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token
    axios
      .get(`${url}/api/tasks/unassigned`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data)
        setTasks(res.data)
      })
      .catch((err) => alert(err.message))
  }, [update])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token
    axios
      .get(`${url}/api/tasks/assigned`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data)
        setAssignedTasks(res.data)
      })
      .catch((err) => alert(err.message))
  }, [update])

  return (
    <Box m="auto" mt={5}>
      <VStack spacing={6}>
        <Addtask setTasks={setTasks} tasks={tasks} />
        <TaskViewer
          setTasks={setTasks}
          tasks={tasks}
          setUpdate={setUpdate}
          setAssignedTasks={setAssignedTasks}
          assignedtasks={assignedtasks}
        />
      </VStack>
    </Box>
  )
}
