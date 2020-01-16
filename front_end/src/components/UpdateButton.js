import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; 

const UpdateButton = ({i, obj, section, updateName}) => {
    const [toggle, setToggle] = useState(true);
    const [newName, setName] = useState("");
    useEffect(() => {
        setName(obj.name);
    }, [obj.name]);

    if (toggle) {
        return (
            <>
                <button 
                    className="btn update-btn"
                    onClick={() => setToggle(!toggle)}
                >update</button>
                <p className="name">
                    <span className="level">{i + 1} </span> - 
                    {section === "project" ? 
                    <Link to={`/app/project/${obj.id}/${obj.name}`}>{obj.name}</Link> :
                    obj.name }
                </p>
            </>
        );
    } else {
        return (
            <>
                <input 
                    type='text' 
                    value={newName} 
                    onChange={(e) => setName(e.target.value) }/>
                <button 
                    className="btn update-btn"
                    onClick={() => {
                        setToggle(!toggle);
                        updateName(newName, obj.id);
                    }}
                >save</button>
            </>
        );
    }
    
}

export default UpdateButton;