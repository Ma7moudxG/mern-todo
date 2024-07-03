import React, { useEffect, useState } from 'react';
import classes from './TaskList.module.scss';
import axios from 'axios';
import TaskItem from './TaskItem';
import toast from 'react-hot-toast';

export default function TaskList() {
    const [taskList, setTaskList] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [editedTask, setEditedTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const addNewTask = async (e) => {
        e.preventDefault();
        if(newTask.length <= 0) {
            toast.error('Task is empty')
            return;
        }
        try {
            const {data} = await axios.post('/api/tasks', {
                title: newTask
            });
            toast.success('New task created');
            setTaskList([{...data},...taskList]);
            setNewTask('');
            setIsAddingNew(false);
        } catch(err) {
            console.log(err);
        }

    }

    const editTask = async (id, e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    }

    const updateTask = () => {

    }


    const getTasks = async () => {
        try{
            const {data} = await axios.get('/api/tasks/myTasks');
            setTaskList(
                data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
            console.log(taskList)
        } catch (err) {
            console.log(err);
        }
    };

    const addNewButtonClick = () => {
        setIsAddingNew(!isAddingNew);
    }

    useEffect(() => {
        getTasks();
    },[]);

    const deleteTask = async (id) => {
        try{
            await axios.delete(`/api/tasks/${id}`);
            toast.success('Task deleted')
            setTaskList(taskList.filter(task => task._id !== id))
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className=''>
        <div className={classes.topBar}>
            <button type="button" 
            className={classes.addNew}
            onClick={addNewButtonClick}
            >Add new</button>
        </div>
        {isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewTask}>
                <input type="text" value={newTask} 
                onChange={e => setNewTask(e.target.value)}
                placeholder='Task Title'
                />
                <button type='submit'>Add</button>
            </form>
        )}
        {/* {isEditing && (
            <form className={classes.addNewForm} onSubmit={updateTask}>
                <input type="text" value={newTask} 
                onChange={e => setNewTask(e.target.value)}
                placeholder='Task Title'
                />
                <button type='submit'>Save</button>
            </form>
        )} */}
        {taskList.length > 0 ? (
            <table className={classes.taskList_table}>
                <tbody>
                    {taskList.map( (task) => (
                        <TaskItem key={task._id} task={task} deleteTask = {deleteTask} editTask = {editTask} />
                    ))}
                </tbody>
            </table>
        ) : "No tasks yet"}
    </div>
  )
}
