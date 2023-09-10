import { Box, Heading } from "@chakra-ui/react"
import Task from "./Task"
export default function TaskViewer({
  setTasks,
  tasks,
  setUpdate,
  assignedtasks,
}) {
  console.log("tasks", tasks)
  return (
    <Box w={"80%"}>
      <Heading mb={10}>Tasks</Heading>

      <Heading as="h4" size="md">
        Assigned Tasks
      </Heading>
      {assignedtasks.map((task) => {
        return <Task task={task} setUpdate={setUpdate} />
      })}

      <Heading as="h4" size="md" mt={10}>
        Created Tasks
      </Heading>
      {tasks.map((task) => {
        return <Task task={task} setUpdate={setUpdate} />
      })}
    </Box>
  )
}
