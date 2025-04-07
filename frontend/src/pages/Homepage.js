import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="black"
      >
        <Text fontSize="20" fontFamily="Work sans" color="black">
          Convo core
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderColor="black"
        borderRadius="lg "
        color="black"
        borderWidth="3px"
      >
        <Tabs variant="enclosed" colorScheme="black">
          <TabList mb="1em">
            <Tab width="50%" _selected={{ color: "white", bg: "blue.500" }}>
              Login
            </Tab>
            <Tab width="50%" _selected={{ color: "white", bg: "blue.500" }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
