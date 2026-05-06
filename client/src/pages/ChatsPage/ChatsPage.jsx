import './ChatsPage.scss';
import ChatBox from "../../components/Chat/ChatBox.jsx";

const ChatsPage = () => {
    return (
        <>
            <div className="chatsPage">
                <h5>Чати</h5>
                <ul className="chats">
                    {
                        [1, 2, 3, 4, 5].map((chat, index) => {
                            return <li key={index}>
                                <ChatBox/>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    );
};

export default ChatsPage;