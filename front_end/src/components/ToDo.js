import React from 'react';
import PropTypes from 'prop-types';

function ToDo (props) {
    return (
        <div id="todo-section" className="space-btm">
            <h3 className="section-title">To do:</h3>
            {props.activities.map((activity, i) => {
                return (
                    <div className="activity activity-todo">
                        <div className="first-block"></div>
                        <div className="second-block"><p className="name"><span className="level">{i + 1} </span>- {activity.name}</p></div>
                        <div className="third-block">
                            <button 
                                className="btn start-btn"
                                onClick={() => props.startActivity(activity.id)}
                            >start</button>
                            <button 
                                className="btn delete-btn"
                                onClick={() => props.deleteActivity(activity.id)}
                            >delete</button>
                        </div>
                        <div className="fourth-block"></div>
                    </div>
                );
            })}
        </div>
    );
}

ToDo.propTypes = {
    id: PropTypes.number.isRequired,
    activities: PropTypes.array.isRequired,
    startActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired
}

export default ToDo;