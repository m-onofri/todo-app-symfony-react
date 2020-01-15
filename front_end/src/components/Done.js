import React from 'react';
import PropTypes from 'prop-types';

function Done (props) {
    return (
        <div id="done-section" className="space-btm">
            <h3 className="section-title">Done:</h3>
            {props.activities.map((activity, i) => {
                return (
                    <div className="activity activity-done">
                        <div className="first-block"></div>
                        <div className="second-block"><p className="name"><span className="level">{i + 1} </span>- {activity.name}</p></div>
                        <div className="third-block">
                            <p>Started at {activity.startedAt}</p>
                        </div>
                        <div className="fourth-block">
                            <p>Completed at {activity.completedAt}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

Done.propTypes = {
    id: PropTypes.number.isRequired,
    activities: PropTypes.array.isRequired
}

export default Done;