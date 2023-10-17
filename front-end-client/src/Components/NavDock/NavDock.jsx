import {useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavDock.css"

const NavDock = ({currentUser}) => {

    const [navOpen, setNavOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    // in container put navDock around pages that this will be shown  - done 
    // have shown in numerous pages like HomePage, Profile page etc - done NOTE: may want a user creation page link or to quiz.
    // take the url to find the current page and exclude that from option- done
    // ensure is logged in (then can show option to sign out)- done
    // each box is an icon hover to get page name etc
    // is a modal ?? - yes
    // modal displays after 2 seconds of hover or on click on the button
    // closes after 5 seconds or after button clicked again

    return (
        <div className="nav-dock">
            {currentUser && ( <div>
                {!navOpen? (<button className="nav-open-menu-button" onClick={()=> setNavOpen(!navOpen) }>Nav Dock</button>) : (<button className="nav-close-menu-button" onClick={()=> setNavOpen(!navOpen) }>Close Dock</button>)}

                {navOpen &&(
                    <div className="nav-dock-modal">
                        <div className="nav-dock-modal-content">
                        {location.pathname!=="/HomePage" && (<div>
                            <button className="nav-icon-button" data-id="Home" onClick={()=>{navigate("/HomePage")}}>🏠</button>
                        </div>)}
                        {location.pathname!=="/ProfilePage" && (<div>
                            <button className="nav-icon-button" data-id="UserProfile" onClick={()=>{navigate("/ProfilePage")}}>👥</button>
                        </div>)}
                        {location.pathname!=="/LoginPage" && (<div>
                            <button className="nav-icon-button" data-id="Signout" onClick={()=>{navigate("/LoginPage")}}>👋🏼</button>
                        </div>)}
                    </div>
                    </div>)}
                </div>)}
        </div>
    )
}
export default NavDock;