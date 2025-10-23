export default function SubmitButton({text}: {text: string}) {
    return (
        <button type="submit" className="p-0.5 px-2 bg-discord-black-1 text-discord-white rounded mx-2 hover:cursor-pointer">{text}</button>
    )
}