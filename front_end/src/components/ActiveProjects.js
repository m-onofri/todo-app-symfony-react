import React from 'react';
import UpdateButton from './UpdateButton';
import PropTypes from 'prop-types';
 
function ActiveProjects (props) {
    return (
        <div id="active-section" className="space-btm">
            <h3 className="section-title">Active projects:</h3>
            {props.projects.map((project, i) => {
                return(
                    <div className="activity activity-active">
                        <div className="second-block">
                            <UpdateButton 
                                i={i} 
                                obj={project} 
                                section="project" 
                                updateName={props.updateProjectName}
                            />
                        </div>
                        <div className="third-block">
                            <p>Started at {project.startedAt}</p>
                        </div>
                        <div className="fourth-block">
                            <button 
                                className="btn done-btn"
                                onClick={() => props.completeProject(project.id)}
                            >done</button>
                            <button 
                                className="btn delete-btn"
                                onClick={() => props.deleteProject(project.id)}
                            >delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

ActiveProjects.propTypes = {
    projects: PropTypes.array.isRequired,
    completeProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
}

export default ActiveProjects;