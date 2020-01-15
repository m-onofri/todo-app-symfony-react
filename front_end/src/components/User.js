import React from 'react';
import Proptypes from 'prop-types';
import ActiveProjects from './ActiveProjects';
import CompletedProjects from './CompletedProjects';
import AddActivity from './AddActivity';

function User (props) {

    const activeProjects = props.projects.filter(p => p.status === "active");
    const completedProjects = props.projects.filter(p => p.status === "completed");
    return (
        <div id="main-container">
            <div id="resume-section">
                <h2 className="centered">Hello Manuele, you have {activeProjects.length} active projects</h2>
            </div>
            <AddActivity 
                placeholder="Add a Project"
                cb={props.addProject}
                index={undefined}
            />
            <hr className="space-btm" />
            <div id="secondary-container">
                <ActiveProjects 
                    projects={activeProjects}
                    completeProject={props.completeProject}
                    deleteProject={props.deleteProject}
                />
                <hr className="space-btm" />
                <CompletedProjects 
                    projects={completedProjects}
                    reactiveProject={props.reactiveProject}
                    deleteProject={props.deleteProject}
                />
            </div>
        </div>
    );
}

User.propTypes = {
    addProject: Proptypes.func.isRequired,
    completeProject: Proptypes.func.isRequired,
    deleteProject: Proptypes.func.isRequired,
    reactiveProject: Proptypes.func.isRequired,
    projects: Proptypes.array.isRequired
}

export default User;