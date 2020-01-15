import React, {useState, useEffect} from 'react';
import $ from 'jquery'; 
import PropTypes from 'prop-types';
import AddActivity from './AddActivity';
import ToDo from './ToDo';
import InProgress from './InProgress';
import Done from './Done';

const Project = (props) => {
    const [activities, setActivities] = useState([]);
    const { params } = props.match;
    useEffect(() => {
        $.ajax({
            url: `http://localhost:8000/projects/${params.projectId}/activities`,
            success: function( result ) {
                const data = JSON.parse(result);
                setActivities(data);
            }
        });
    }, []);

    function addActivity(activityName, projectId) {
        const updatedActivities = [...activities];
        const newActivity = {
          name: activityName,
          started: "",
          completed: "",
          status: "todo",
          projectId: projectId
        }
        const url = `http://localhost:8000/projects/${projectId}/activities/new`;
        $.ajax({
          url: url,
          method:'POST',
          data:JSON.stringify(newActivity),
           success: function( result ) {
                        console.log(result)
                        newActivity.id = parseInt(result);
                        updatedActivities.push(newActivity);
                        setActivities(updatedActivities);
                  }
        });
      }
    
    function startActivity(activityId) {
        $.ajax({
            url:`http://localhost:8000/projects/${params.projectId}/activities/update/status`,
            method:'PUT',
            data:JSON.stringify({
              status: "in progress",
              id: activityId
            }),
             success: function( result ) {
                        console.log(result);
                    }
        });
        const myActivities = [...activities];
        const d = new Date();
        const updatedActivities = myActivities.map(activity => {
          if (activity.id === activityId) {
            activity.startedAt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            activity.status = 'in progress';
          }
          return activity;
        })
        setActivities(updatedActivities);
      }
    
    function completeActivity(activityId) {
        $.ajax({
            url:`http://localhost:8000/projects/${params.projectId}/activities/update/status`,
            method:'PUT',
            data:JSON.stringify({
              status: "completed",
              id: activityId
            }),
             success: function( result ) {
                        console.log(result);
                    }
        });
        const myActivities = [...activities];
        const d = new Date();
        const updatedActivities = myActivities.map(activity => {
          if (activity.id === activityId) {
            activity.completedAt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            activity.status = 'completed';
          }
          return activity;
        })
        setActivities(updatedActivities);
      }
    
    function deleteActivity(activityId) {
        const myActivities = [...activities];
        const updatedActivities = myActivities.filter(a => a.id !== activityId);
        setActivities(updatedActivities);
      }
    
    function backActivity(activityId) {
        $.ajax({
            url:`http://localhost:8000/projects/${params.projectId}/activities/update/status`,
            method:'PUT',
            data:JSON.stringify({
              status: "back",
              id: activityId
            }),
             success: function( result ) {
                        console.log(result);
                    }
        });
        const myActivities = [...activities];
        const updatedActivities = myActivities.map(activity => {
          if (activity.id === activityId) {
            activity.status = 'todo';
          }
          return activity;
        })
        setActivities(updatedActivities);
    }

    return (
        <div id="main-container">
            <div id="admin-section">
                <h2 className="project-title centered">{params.projectTitle}</h2>
                <AddActivity 
                    placeholder="Add an activity"
                    cb={addActivity}
                    id={params.projectId}
                />
            </div>
            <hr className="space-btm" />
            <div id="secondary-container">
                <ToDo
                    id={params.projectId}
                    activities={activities.filter(a => a.status==="todo")}
                    startActivity={startActivity}
                    deleteActivity={deleteActivity}
                />
                <hr className="space-btm" />
                <InProgress 
                    id={params.projectId}
                    activities={activities.filter(a => a.status==="in progress")}
                    completeActivity={completeActivity}
                    backActivity={backActivity}
                />
                <hr className="space-btm" />
                <Done
                    id={params.projectId}
                    activities={activities.filter(a => a.status==="completed")}
                />
            </div>
        </div>
    );
}

Project.propTypes = {
    match: PropTypes.object.isRequired,
    activities: PropTypes.array.isRequired,  
    addActivity: PropTypes.func.isRequired,
    startActivity: PropTypes.func.isRequired,
    completeActivity: PropTypes.func.isRequired,
    backActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired
}

export default Project;