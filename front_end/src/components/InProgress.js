import React from 'react';
import PropTypes from 'prop-types';

function InProgress (props) {
    return (
        <div id="inprogress-section" className="space-btm">
            <h3 className="section-title">In Progress:</h3>
            {props.activities.map((activity, i) => {
                return (
                    <div className="activity activity-inprogress">
                        <div className="first-block"></div>
                        <div className="second-block"><p className="name"><span className="level">{i + 1} </span>- {activity.name}</p></div>
                        <div className="third-block">
                            <p>Started at {activity.startedAt}</p>
                        </div>
                        <div className="fourth-block">
                            <button 
                                className="btn done-btn"
                                onClick={() => props.completeActivity(activity.id)}
                            >done</button>
                            <button 
                                className="btn back-btn"
                                onClick={() => props.backActivity(activity.id)}
                            >back</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

InProgress.propTypes = {
    id: PropTypes.number.isRequired,
    activities: PropTypes.array.isRequired,
    completeActivity: PropTypes.func.isRequired,
    backActivity: PropTypes.func.isRequired
}

export default InProgress;