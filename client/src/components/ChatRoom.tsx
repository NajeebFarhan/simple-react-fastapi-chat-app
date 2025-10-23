import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

type messageData = {
  username: string;
  color: string;
  msg: string;
  role: "user" | "system" | "admin";
};

export default function ChatRoom({
  username,
  color,
}: {
  username: string;
  color: string;
}) {
  const messageRef = useRef<HTMLInputElement>(null);
  const [msgData, setMsgData] = useState<messageData[]>([]);
  const ws = useRef<WebSocket>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8000/ws");

    // @ts-ignore
    ws.current.onopen = (e) => {
      console.log("Handshake successful");
      ws.current?.send(JSON.stringify({ username, color }));
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMsgData((msg) => [...msg, data]);
    };

    return () => ws.current?.close();
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (
      ws.current &&
      ws.current.readyState == WebSocket.OPEN &&
      messageRef.current?.value
    ) {
      ws.current.send(
        JSON.stringify({
          username,
          color,
          msg: messageRef.current.value,
          role: "user",
        })
      );
      messageRef.current.value = "";
    }
  };

  return (
    <div className="h-screen w-full bg-discord-black-2 text-discord-white flex flex-col items-center border-l-[1px] border-discord-black-1">
      <div className="w-full p-5 grow overflow-y-scroll scroll-smooth bg-teal-200px-6">
        {msgData.map((m, i) => (
          <div key={i}>
              {m.role === "system" ? (
                <p dangerouslySetInnerHTML={{ __html: m.msg }} className="font-extrabold"/>
              ) : (
                <p><span style={{ color: m.color }} className="font-extrabold">{m.username}</span> - {m.msg}</p>
              )}  
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="w-full p-3 flex flex-row justify-center"
      >
        <div className="grow">
          <InputField inputRef={messageRef} />
        </div>
        <SubmitButton text="Send" />
      </form>
    </div>
  );
}
