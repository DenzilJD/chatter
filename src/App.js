import { Box } from "@chakra-ui/react";
import { Chatpage } from "./Components/Chatpage";
import { Homepage } from "./Components/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box className="App"
    // bgColor='#05445E'
    bgColor='#7bc1ff'
    >
      <Routes>
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Box>
  );
}

export default App;