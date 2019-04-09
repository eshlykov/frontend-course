import React from 'react';
import './TopBar.css';
import WhoIs from "../WhoIs/WhoIs";
import SignOut from "../SignOut/SignOut";

const TopBar = () => (
    <div className="TopBar">
        <WhoIs/>
        <SignOut/>
    </div>
);

export default TopBar;