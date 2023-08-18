import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selChat, setSelChat] = useState();
    const [chats, setChats] = useState([]);
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();
    const col1 = '#05445E';
    const col2 = '#189AB4';
    const col3 = '#75E6DA';
    const col4 = '#D4F1F4';

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!user)
            navigate('/');
    }, [navigate]);

    return <ChatContext.Provider value={
        {
            user, setUser,
            selChat, setSelChat,
            chats, setChats,
            notif, setNotif,
            col1, col2, col3, col4
        }
    }>
        {children}
    </ChatContext.Provider>;
}

export const ChatState = () => {
    return useContext(ChatContext);
}