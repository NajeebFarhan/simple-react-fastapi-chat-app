import { useRef } from "react";
import type { FormEvent } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

type states = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setUsername, setColor, setIsLogged }: states) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const handSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (usernameRef.current?.value) {
      setUsername(usernameRef.current.value);
      setColor(colorRef.current?.value || "#000");
      setIsLogged(true);
    } else {
      alert("Enter a username");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-discord-blurple">
      <form
        action=""
        onSubmit={handSubmit}
        className="p-3 bg-discord-black-2 rounded flex flex-row items-center"
      >
        <InputField inputRef={usernameRef} />
        <SubmitButton text="Login" />
        <input type="color" ref={colorRef} className="rounded" />
      </form>
    </div>
  );
}
