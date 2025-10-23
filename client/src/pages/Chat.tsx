
import Channels from "../components/ChannelsList"
import ChatRoom from "../components/ChatRoom"

export default function Chat({username, color}: any) {
    return (
        <section className="w-screen h-screen flex flex-row">
            <div className="basis-2/8">
                <Channels />
            </div>
            <div className="basis-6/8">
                <ChatRoom username={username} color={color} />
            </div>
        </section>
    )
}