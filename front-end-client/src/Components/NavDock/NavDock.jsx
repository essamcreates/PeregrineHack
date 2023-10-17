import {useLocation, useNavigate } from "react-router-dom";

const NavDock = (currentUser) => {

    const [navOpen, setNavOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    // in container put navDock around pages that this will be shown 
    // have shown in numerous pages like HomePage, Profile page etc
    // take the url to find the current page and exclude that from option
    // ensure is logged in (then can show option to sign out)
    // each box is an icon hover to get page name etc
    // is a modal ??
    // modal displays after 2 seconds of hover or on click on the button
    // closes after 5 seconds or after button clicked again

    return (
        <div>
            {currentUser && ( <div>
                <button onClick={()=> setNavOpen(!navOpen)}>Nav Dock</button>

                {navOpen &&(<div>
                    {location.pathname!=="/HomePage" && (<div>
                        <button className="nav-icon-button" data-id="HomePage" onClick={()=>{navigate("/HomePage")}}>🏠</button>
                    </div>)}
                    {location.pathname!=="/ProfilePage" && (<div>
                        <button className="nav-icon-button" data-id="ProfilePage" onClick={()=>{navigate("/ProfilePage")}}>👥</button>
                    </div>)}
                    {location.pathname!=="/LoginPage" && (<div>
                        <button className="nav-icon-button" data-id="LoginPage" onClick={()=>{navigate("/LoginPage")}}>👋🏼</button>
                    </div>)}
                </div>)}
            </div>)}
        </div>
    )
}
export default NavDock;