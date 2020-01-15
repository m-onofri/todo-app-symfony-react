import React from 'react';
import PropTypes from 'prop-types';

function CompletedProjects (props) {
    return (
        <div id="done-section" className="space-btm">
            <h3 className="section-title">Completed projects:</h3>
            {props.projects.map((project, i) => {
                return (
                    <div className="activity activity-done">
                        <div className="first-block"></div>
                        <div className="second-block"><p className="name"><span className="level">{i + 1} </span>- {project.name}</p></div>
                        <div className="third-block">
                            <p>Completed at {project.completedAt}</p>
                        </div>
                        <div className="fourth-block">
                            <button 
                            className="btn done-btn"
                            onClick={() => props.reactiveProject(project.id)}
                            >re-active</button>
                            <button 
                                className="btn back-btn"
                                onClick={() => props.deleteProject(project.id)}
                            >delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

CompletedProjects.propTypes = {
    projects: PropTypes.array.isRequired,
    reactiveProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
}

export default CompletedProjects;