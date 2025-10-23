import { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <Chat username={username} color={color} />
      ) : (
        <Login
          setUsername={setUsername}
          setColor={setColor}
          setIsLogged={setIsLogged}
        />
      )}
    </>
  );
}

export default App;
