import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const API = "https://task-backend-dwij-gpgma0hxfgcmccdq.centralindia-01.azurewebsites.net";

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get(API + '/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {

    if(title.trim() === ''){
      alert("Enter task");
      return;
    }

    await axios.post(API + '/tasks', {
      title
    });

    setTitle('');
    getTasks();
  };

  const deleteTask = async (id) => {

    await axios.delete(API + '/tasks/' + id);

    getTasks();
  };

  const startEdit = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  const updateTask = async () => {

    await axios.put(API + '/tasks/' + editId, {
      title
    });

    setTitle('');
    setEditId(null);

    getTasks();
  };

  return (
    <div style={{padding:'20px'}}>

      <h1>Task Manager</h1>

      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      {
        editId ? (
          <button onClick={updateTask}>
            Update
          </button>
        ) : (
          <button onClick={addTask}>
            Add
          </button>
        )
      }

      <hr />

      {
        tasks.map((task)=>(
          <div key={task._id} style={{marginBottom:'10px'}}>

            {task.title}

            <button
              onClick={()=>startEdit(task)}
              style={{marginLeft:'10px'}}
            >
              Edit
            </button>
 
            <button
              onClick={()=>deleteTask(task._id)}
              style={{marginLeft:'10px'}}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default App;