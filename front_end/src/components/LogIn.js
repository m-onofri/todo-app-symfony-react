import React from 'react';

function LogIn (props) {
    return (
        <div id="admin-section">
            <h2 className="project-title centered">Log in or subscribe:</h2>
            <form className="centered admin-form" action="#" method="post">
                <input type="text" placeholder="username" />
                <input type="text" placeholder="password" />
                <div className="buttons">
                    <input 
                        type="submit" 
                            className="btn add-btn" 
                            name="login-button" 
                            value="Log in" 
                        />
                    <input 
                        type="submit" 
                        className="btn add-btn"
                        name="subscribe-button"
                        value="Subscribe" />
                </div>
            </form>
        </div>
    );
}

export default LogIn;