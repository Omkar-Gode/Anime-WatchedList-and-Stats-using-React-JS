import Logo from "./Logo";

function NavBar({children}){
    return (
        <div className="header">
            <Logo/>
            <div className="name">
                <h2 style={{display:"inline-block"}}><span style={{}}>My</span>AnimeList</h2>    
            </div>
            {children}
        </div>
    );
}

export default NavBar;