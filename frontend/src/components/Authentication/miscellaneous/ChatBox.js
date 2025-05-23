import { Box } from "@chakra-ui/layout";
import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import SingleChat from "../../SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      color="#034078"
      fontWeight="bold"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="px"
      h="100%"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
