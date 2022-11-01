import React, { useState } from 'react'

const TodoList = () => {


    const [task, setTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.length === 0 ){
            return;
        }
        const listedTask = {
            text: task,
            complete: false
        }
        setAllTasks([...allTasks, listedTask]);
        setTask("");
    }

    const handleDeleteTask = ( dIndex) => {
        const filteredTasks = allTasks.filter((_task, index) => {
            return index !== dIndex;
        });
        setAllTasks(filteredTasks);
    }

    const crossTaskOut = ( idx ) => {
        const completedTasks = allTasks.map((task, i) => {
            if (idx === i ){
                // task.complete = !task.complete
                // Best Practice
                const completedTask = {...task, complete: !task.complete}
                return completedTask;
            }
            return task;
        })
    setAllTasks(completedTasks);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-control'>
                <h1>Add a Task</h1>
                <input type="text" className='rounded-1 form-control' onChange={(e) => setTask(e.target.value)} value={task} />
                <br/>
                <input type="submit" className='btn btn-outline-primary' />
            </form>
            {allTasks.map((task, index) => {
                const taskClasses = [];
                if (task.complete){
                    taskClasses.push("crossedOut")
                }
                return(
                    <div key={index} className='my-5'>
                        <div className='d-flex gap-2 justify-content-center'>
                        <input type="checkbox" checked={task.complete} onChange={(e) =>{
                            crossTaskOut(index);
                        } }/>
                        <h2 id={task} className={taskClasses.join("")} >{task.text}</h2>
                        <br/>
                        <button className='btn btn-outline-danger' onClick={(e) =>{
                            handleDeleteTask(index);
                        } }>Delete</button>
                        </div>
                    </div>
                )

            })}
        </div>
    )
}

export default TodoList
