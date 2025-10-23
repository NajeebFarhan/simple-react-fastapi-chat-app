export default function InputField({inputRef}: any) {
    return (
        <input type="text" ref={inputRef} className="bg-discord-black-1 text-discord-white p-2 w-full rounded outline-0" required />
    )
}