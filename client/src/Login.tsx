import { useRef, type FormEvent } from "react"

type states = {
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login({ setUsername, setIsLogged }: states) {

    const usernameRef = useRef<HTMLInputElement>(null)

    const handSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(usernameRef.current?.value) {
            setUsername(usernameRef.current.value)
            setIsLogged(true)
        } else {
            alert("Enter a username")
        }
    }

    return (
        <form action="" onSubmit={handSubmit}>
            <input type="text" ref={usernameRef} required/>
            <button type="submit">Login</button>
        </form>
    )
}