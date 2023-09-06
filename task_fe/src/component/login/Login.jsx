import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import SignUpForm from "./SignUpForm"
import LogInForm from "./LogInForm"
const Login = ({ setUserInfo }) => {
  return (
    <VStack spacing={"5"}>
      <Box></Box>
      <Box
        w={"50%"}
        position={"relative"}
        m="auto"
        p={6}
        mt={10}
        border={"1px solid #ddd"}
        style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      >
        <Tabs variant="soft-rounded">
          <TabList
            display={"flex"}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tab>Log In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogInForm setUserInfo={setUserInfo} />
            </TabPanel>
            <TabPanel>
              <SignUpForm setUserInfo={setUserInfo} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box></Box>
    </VStack>
  )
}

export default Login
