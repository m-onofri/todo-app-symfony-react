import React from 'react';
import UpdateButton from './UpdateButton';
import PropTypes from 'prop-types';

function ToDo (props) {
    return (
        <div id="todo-section" className="space-btm">
            <h3 className="section-title">To do:</h3>
            {props.activities.map((activity, i) => {
                return (
                    <div className="activity activity-todo">
                        <div className="second-block">
                            <UpdateButton 
                                i={i} 
                                obj={activity} 
                                section="activity" 
                                updateName={props.updateName}
                            />
                        </div>
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