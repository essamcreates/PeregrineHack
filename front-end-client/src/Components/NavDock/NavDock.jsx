import {useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


const NavDock = ({currentUser}) => {

    const [navOpen, setNavOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    // have shown in numerous pages like HomePage, Profile page etc - done NOTE: may want a user creation page link or to quiz.
    // import icons
    // move to bottom left
    // apply css to button  nav-open-menu-button and nav-close-menu-button

    return (
        <div>
            {currentUser && ( <div>
                {!navOpen? (<button onClick={()=> setNavOpen(!navOpen) }>Nav Dock</button>) : (<button className="nav-close-menu-button" onClick={()=> setNavOpen(!navOpen) }>Close Dock</button>)}

                {navOpen &&(
                    <div>
                        <div>
                        {location.pathname!=="/HomePage" && (<div>
                            <button data-id="Home" onClick={()=>{setNavOpen(false);navigate("/HomePage")}}>🏠</button>
                        </div>)}
                        {location.pathname!=="/ProfilePage" && (<div>
                            <button data-id="UserProfile" onClick={()=>{setNavOpen(false);navigate("/ProfilePage")}}>👥</button>
                        </div>)}
                        {location.pathname!=="/LoginPage" && (<div>
                            <button data-id="Signout" onClick={()=>{setNavOpen(false);navigate("/LoginPage")}}>👋🏼</button>
                        </div>)}
                    </div>
                    </div>)}
                </div>)}
        </div>
    )
}
export default NavDock;