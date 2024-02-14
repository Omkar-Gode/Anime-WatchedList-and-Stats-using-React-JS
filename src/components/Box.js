import { useState } from "react";

function Box({children, title}){
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <div className="boxbuttondiv">
                <button onClick={()=>{setIsOpen(!isOpen)}}>{isOpen ? <>&#129137;</> : <>&#129139;</>}</button>
                <p>{title}</p>
            </div>
        {isOpen && children}
    </div>

    );
}

export default Box;