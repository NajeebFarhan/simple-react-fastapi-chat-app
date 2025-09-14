import { useState } from "react"
import ChatRoom from "./ChatRoom"
import Login from "./Login"

function App() {
      const [username, setUsername] = useState("")
      const [isLogged, setIsLogged] = useState(false)

  return (
    <>
    { isLogged ?
      <ChatRoom username={username}/> :
      <Login setUsername={setUsername} setIsLogged={setIsLogged}/>
    }
    </>
  )
}

export default App
