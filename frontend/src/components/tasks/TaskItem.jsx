/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteTask, editTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
        <p>{task.title}</p>
      </td>
      <td className={classes.isCompleted}>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td className={classes.date}>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td className={classes.btnCenter}>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
        {/* <button
          type="button"
          className={classes.editBtn}
          onClick={(e) => editTask(task._id, e)}
        >
          Edit
        </button> */}
      </td>
    </tr>
  );
}

export default TaskItem;