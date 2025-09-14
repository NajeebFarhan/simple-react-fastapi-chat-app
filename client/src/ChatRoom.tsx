import { useState, useRef, useEffect } from "react"
import type { FormEvent } from "react"

export default function ChatRoom({ username }: { username: string }) {
  const messageRef = useRef<HTMLInputElement>(null)
  const [msgData, setMsgData] = useState<{ username: string, msg: string }[]>([])
  // const [ws, setWs] = useState<WebSocket|null>(null)
  const ws = useRef<WebSocket>(null)
  
  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8000/ws")

    // @ts-ignore
    ws.current.onopen = (e) => {
      console.log("Handshake successful")
      
      ws.current?.send(username)
    }

    ws.current.onmessage = (e) => {
      console.log(e.data)
      const data = JSON.parse(e.data)
      setMsgData(msg => [...msg, data])
    }

    return () => ws.current?.close()
  }, [])


  const sendMessage = (e: FormEvent) => {
    e.preventDefault()

    if(ws.current && ws.current.readyState == WebSocket.OPEN && messageRef.current?.value)
      ws.current.send(JSON.stringify({ username, msg: messageRef.current.value}))
  }


  return (
    <>
      <form onSubmit={sendMessage}>
        <input name="message" ref={messageRef}/>
        <button type="submit">Send</button>
      </form>

      <div>
        {msgData.map((m, i) => (
          <p key={i}>{m.username} - {m.msg}</p>
        ))}
      </div>
    </>
  )
}