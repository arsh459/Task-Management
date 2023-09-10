import {
  Card,
  Checkbox,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react"
import AddMember from "./AddMember"
import AddComment from "./AddComment"

export default function Task({ task, setUpdate }) {
  return (
    <Card overflow="hidden" variant="outline" w={"100%"} mt={5}>
      <Stack>
        <CardBody p={10} mb={"-30px"}>
          <Heading size="md">{task.name}</Heading>
          <HStack spacing={5} mb={10}>
            <Text>
              <span>Created by:-</span> {task.createdBy.name}
            </Text>
            <Text>
              <span>Due date:-</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </HStack>
          <HStack spacing={36} justify={"space-between"}>
            <Box>
              <Text h="fit-content" mb={3}>
                <Heading as="h3" size="sm" display={"inline"}>
                  Description :
                </Heading>{" "}
                {task.description}
              </Text>
              <Text h="fit-content" mb={3}>
                <Heading as="h3" size="sm" display={"inline"}>
                  Labels :
                </Heading>{" "}
                {task.labels.map((label) => {
                  return (
                    <Button size="sm" mr={2} variant="outline">
                      {label}
                    </Button>
                  )
                })}
              </Text>
              <Text>
                <Heading as="h3" size="sm" display={"inline"}>
                  Assigned Users :
                </Heading>{" "}
                {task.assignedUsers.map((elem) => {
                  return (
                    <Button size="sm" mr={2} variant="outline">
                      {elem.name}{" "}
                    </Button>
                  )
                })}
              </Text>
            </Box>

            <VStack mr={20}>
              {task.checklist.map((elem) => {
                return (
                  <Checkbox colorScheme="red" defaultChecked={elem.completed}>
                    {elem.text}
                  </Checkbox>
                )
              })}
            </VStack>
          </HStack>
        </CardBody>

        <CardFooter p={10}>
          <HStack spacing={10}>
            <AddMember task={task} setUpdate={setUpdate} />
            <AddComment task={task} setUpdate={setUpdate} />
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  )
}
