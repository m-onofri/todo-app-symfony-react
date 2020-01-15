import React from 'react';
import {Link} from 'react-router-dom';

function Header (props) {
    return (
        <header>
            <nav>
                <p className="righted"><Link to="/app/user">Hello Manuele</Link> | <Link to="/">Log out</Link></p>
            </nav>
            <h1 className="main-container_title centered">to-do app</h1>
        </header>
    );
}

export default Header;