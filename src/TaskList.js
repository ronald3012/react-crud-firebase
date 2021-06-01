import React, { useState } from 'react';
import "firebase/database";
import {
    useDatabase,
    useDatabaseListData
  } from "reactfire";

const TaskList = () => {

    const [updating,setUpdating] = useState(false);
    const [task, setTask] = useState('');

    const database = useDatabase();
    const taskRef = database.ref("tasks");
    const response = useDatabaseListData(taskRef);
    const { status, data: tasks } = response;

    if (status == 'loading') {
        return <div className='task'><h1>Cargando...</h1></div>
    }


    const handleSaveTask = () => {

        if (updating != false) {
            taskRef.child(updating).set({task:task});
            setTask('');  
            setUpdating(false); 
        }else{

            taskRef.push().set({ task: task });
            setTask('');  
        }
    };

    const handleDeleteTask = (id) => {
        taskRef.child(id).remove();
    }

    const handleUpdateTask = (id, value) => {
        setTask(value);
        setUpdating(id);
    }

    return (
        <div className='task'>
            <p>Lista de tareas:</p>
            { tasks &&
                tasks.map(task => (
                    <p key={task.NO_ID_FIELD} style={{display:'flex', justifyContent:'space-between',margin:'3px'}}>{task.task} <button onClick={()=>handleUpdateTask(task.NO_ID_FIELD, task.task)}>Editar</button> <button onClick={()=>handleDeleteTask(task.NO_ID_FIELD)}>Borrar</button></p>
                ))
            }
            <div>
                <input placeholder="Escriba una tarea..." value={task} onChange={e=>setTask(e.target.value)} type="text"/> <button className='btn-save' onClick={handleSaveTask}>Guardar</button>
            </div>
        </div>
    )
}

export default TaskList;
