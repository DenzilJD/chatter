import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selChat, setSelChat] = useState();
    const [chats, setChats] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!user)
            navigate('/');
    }, [navigate]);

    return <ChatContext.Provider value={{ user, setUser, selChat, setSelChat, chats, setChats }}>
        {children}
    </ChatContext.Provider>;
}

export const ChatState = () => {
    return useContext(ChatContext);
}