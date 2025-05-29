import { useEffect, useRef, useState } from "react";
import DynamicHeader from "../../components/Common/Headers";

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! How can I help you today?", sender: "bot" },
        { id: 2, text: "I have a question about your services.", sender: "user" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: newMessage, sender: "user" },
        ]);
        setNewMessage("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen w-full max-w-xl mx-auto bg-white shadow sm:rounded-xl overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-20">
                <DynamicHeader heading="Mayur Deepali" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base break-words whitespace-pre-wrap max-w-[75%]
                ${msg.sender === "user"
                                    ? "bg-pink-600 text-white rounded-br-none"
                                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="sticky bottom-0 z-30 bg-white border-t p-2 flex gap-2">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
