import { formatDate } from "../../utils/formatDate.js";


const MessageBox = ({isMine, msg}) => {
    
    return (
        <div
            className={isMine ? 'mine' : 'otherUser'}
        >   
            {msg.imageUrl && (
                <div className="imageMessage">
                    <img 
                        src={`http://localhost:3000/chats/${msg.imageUrl}`} 
                        alt="зображення" 
                        style={{ width: 'auto', height: '250px', maxWidth: '500px' }}
                    />
                    <div className={isMine ? 'time right' : 'time left'}>
                        {msg.createdAt? formatDate(msg.createdAt) : null}
                    </div>
                    <div className={isMine ? 'isRead isReadMy' : 'isRead isReadOther'}>
                        {
                            msg.isRead? 
                            <span>&#10003;&#10003;</span>
                            :                   
                            <span>&#10003;</span>         
                        }
                    </div>
                </div>
            )}
            {msg.content && (
                <div className={msg.imageUrl ? 'textWithImg text' : 'text'}>
                    {msg.content}
                    <div className={isMine ? 'time right' : 'time left'}>
                        {msg.createdAt? formatDate(msg.createdAt) : null}
                    </div>
                    <div className={isMine ? 'isRead isReadMy' : 'isRead isReadOther'}>
                        {
                            msg.isRead?
                            <span>&#10003;&#10003;</span>
                            :                   
                            <span>&#10003;</span>         
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBox;