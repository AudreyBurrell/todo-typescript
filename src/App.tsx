import type { Task } from "./types/Task"; 
import "./styles/App.css";

import { useState } from "react";

function App() {
    let currentDate = new Date().toDateString();

    return (
        <main className="app">
            {/* WHAT I WANT
                Left hand side: 
                    Title of application
                    Date
                    Filtering materials
                    Progress for just that day
                    Previous Date
                    Tomorrow
                    Add task
                    Upload CSV
                Right hand side:
                    Where the tasks show up
                    Delete button for the tasks
                    Priority?
                    
            */}
            <div className="leftSideBar">
                <h2>Todo List</h2>
                <p id="date-display">{currentDate}</p>
                <div className="filterArea">
                    {/*When ready, filtering stuff goes here */}
                </div>
                <div className="navigation">
                    <button>&#x276E; Previous</button>
                    <button>Next &#x276F;</button>
                </div>
                <div className="taskAdditionArea">
                    <button>+ Task</button>
                    <button>Upload CSV</button>
                </div>
            </div>
            <div className="rightSideBar">
                <div className="toDoListArea">'
                
                </div>
            </div>
        
        </main>
    )
} 

export default App;