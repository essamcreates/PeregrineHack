import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavDock.css"
import HouseIcon from '@mui/icons-material/House';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';

const NavDock = ({currentUser}) => {
    const [navOpen, setNavOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    // have shown in numerous pages like HomePage, Profile page etc - done NOTE: may want a user creation page link or to quiz.
    // import icons
    return (
        <div className="nav-dock">
            {currentUser && ( <div>
                {!navOpen? (<button className="nav-open-menu-button" onClick={()=> setNavOpen(!navOpen)}></button>) : (<button className="nav-close-menu-button" onClick={()=> setNavOpen(!navOpen) }></button>)}
                {navOpen &&(
                    <div className="nav-dock-modal">
                        <div className="nav-dock-modal-content">
                        <div className="empty-cell-1"></div>
                        <div className="empty-cell-2"></div>
                        <div className="empty-cell-3"></div>
                        <div className="empty-cell-4"></div>
                        {location.pathname!=="/HomePage" && (<div>
                            <button className="nav-icon-button" data-id="Home" onClick={()=>{setNavOpen(false);navigate("/HomePage")}}>
                                <HouseIcon style={{ color: "white", fontSize : "50px"}} />
                            </button> {/* find icons later*/}
                        </div>)}
                        {location.pathname!=="/ProfilePage" && (<div> 
                            <button className="nav-icon-button" data-id="Profile" onClick={()=>{setNavOpen(false);navigate("/ProfilePage")}}>
                                <AccountBoxIcon style={{ color: "white", fontSize : "50px"}}/>
                            </button>
                        </div>)}
                        {location.pathname!=="/ProfileCreationPage" && (<div>
                            <button className="nav-icon-button" data-id="Edit Info" onClick={()=>{setNavOpen(false);navigate("/ProfileCreationPage")}}>
                                <EditIcon style={{ color: "white", fontSize : "50px"}} />
                            </button>
                         </div>)}
                        {location.pathname!=="/LoginPage" && (<div>
                            <button className="nav-icon-button" data-id="Signout" onClick={()=>{setNavOpen(false);navigate("/LoginPage")}}>
                                <LogoutIcon style={{ color: "white", fontSize : "50px"}} />
                            </button>
                        </div>)}
                        {location.pathname!=="/QuizPage" && (<div>
                            <button className="nav-icon-button" data-id="Quiz" onClick={()=>{setNavOpen(false);navigate("/QuizPage")}}>
                                <QuizIcon style={{ color: "white", fontSize : "50px"}}/>
                            </button>
                        </div>)}
                    </div>
                    </div>)}
                </div>)}
        </div>
        )
}
export default NavDock;
