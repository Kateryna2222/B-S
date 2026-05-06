import './ChatBox.scss';

const ChatBox = () => {
    return (
        <>
            <div className="chatBox">
                <div className="left">
                    <div className="avatar">

                    </div>
                    <div className="info">
                        <span className='name'>name</span>
                        <span className='mess'>message</span>
                    </div>
                </div>
                <div className="details">
                    <span className='time'>12:25</span>
                    <div className="new">
                        new
                    </div>
                    {/* <div className="empthy"></div> */}
                </div>
            </div>
        </>
    );
};

export default ChatBox;