

const Message = (props)=>{
    const { Message } = props;
    
    const styles = {
        left:"clear-both w-auto text-sm bg-[#1d1d1e] float-left p-3 overflow-hidden my-2 ml-2 max-w-[400px] text-white rounded-ss rounded-e",
        right: "clear-both bg-[#8775d9] float-right mr-2 w-auto text-sm overflow-hidden p-3 my-2 ml-2 max-w-[400px] rounded-s rounded-es px-5"
    }

    return(
        <section
            className={Message?.role == "user" ? styles.right : styles.left }
        >
            {Message.message}
        </section>
    )
};

export default Message;