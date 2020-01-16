import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Project from './components/Project';
import User from './components/User';
import slugify from 'react-slugify';
import $ from 'jquery'; 

class MainApp extends Component {
  state = {
    user: {username: "m_ono", password: "Hercules2004", id: "1"},
    projects: []
  }

  componentDidMount() {
    const that = this;
    $.ajax({
      url: "http://localhost:8000/projects",
      success: function( result ) {
        const data = JSON.parse(result);
        that.setState({
          projects:data
        });
      }
    });
  }

  randomToken = () => {
    return Math.random().toString(36).substring(2, 15);
  }

  addProject = projectName => {
    const that = this;
    const d = new Date();
    const updatedProjects = [...this.state.projects];
    const slug = `${slugify(projectName)}-${this.randomToken()}`
    const newProject = {
      name: projectName,
      startedAt: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
      status: 'active',
      completedAt: "",
      userId: this.state.user.id,
      slug: slug
    }
    $.ajax({
      url:'http://localhost:8000/projects/new',
      method:'POST',
      data:JSON.stringify(newProject),
       success: function( result ) {
                  newProject.id = parseInt(result);
                  updatedProjects.push(newProject);
                  that.setState({
                    projects: updatedProjects
                  });
                }
    });
  }

  deleteProject = (id) => {
    $.ajax({
      url:`http://localhost:8000/projects/${id}/delete`,
      method:'DELETE',
      success: function( result ) {
                  console.log(result);
              }
    });
    const updatedProjects = this.state.projects.filter(project => project.id !== id);
    this.setState({
      projects: updatedProjects
    });
  }

  completeProject = id => {
    $.ajax({
      url:'http://localhost:8000/projects/update/status',
      method:'PUT',
      data:JSON.stringify({
        status: "active",
        id: id
      }),
       success: function( result ) {
                  console.log(result);
              }
    });
    const d = new Date();
    const updatedProjects = this.state.projects.map(p => {
      if (p.id === id) {
        p.status = 'completed';
        p.completed = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }
      return p;
    })
    this.setState({
      projects: updatedProjects
    });
  }

  updateProjectName = (newName, id) => {
    $.ajax({
      url: `http://localhost:8000/projects/update/name`,
      method:'PUT',
      data:JSON.stringify({
        projectName: newName,
        id: id
      }),
       success: function( result ) {
                  console.log(result);
              }
    });

    const updatedProjects = this.state.projects.map(p => {
      if (p.id === id) {
        p.name = newName;
      }
      return p;
    });

    this.setState({
      projects: updatedProjects
    });
  }

  reactiveProject = id => {
    $.ajax({
      url:'http://localhost:8000/projects/update/status',
      method:'PUT',
      data:JSON.stringify({
        status: "completed",
        id: id
      }),
       success: function( result ) {
                  console.log(result);
              }
    });
    const updatedProjects = this.state.projects.map(p => {
      if (p.id === id) {
        p.status = 'active';
        p.completed = null;
      }
      return p;
    })
    this.setState({
      projects: updatedProjects
    });
  }

  render() {
    return (
      <>
        <Route exact path="/app/user" render={() => <User
                                                addProject={this.addProject}
                                                completeProject={this.completeProject}
                                                deleteProject={this.deleteProject}
                                                reactiveProject={this.reactiveProject}
                                                projects={this.state.projects}
                                                updateProjectName={this.updateProjectName}
                                              />} />
        <Route path="/app/project/:projectId/:projectTitle" render={(props) => <Project
                                                                      match={props.match}
                                                                      activities={this.state.activities}  
                                                                      addActivity={this.addActivity}
                                                                      startActivity={this.startActivity}
                                                                      completeActivity={this.completeActivity}
                                                                      backActivity={this.backActivity}
                                                                      deleteActivity={this.deleteActivity}
                                                                    />} />
      </>
    );
  }
}

export default MainApp;
