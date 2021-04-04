
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask.js'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([] )


  useEffect (() => {
     const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
         setTasks(tasksFromServer)
     }
    
 getTasks()
  }, [])


  //fETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

     return data
 }

 
  //fETCH TASK
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

     return data
 }


//Add Task
 const addTask = async (task)  => {
   const res =  await fetch('http://localhost:5000/tasks', {
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
     body: JSON.stringify(task)  
 })

    const data =  await res.json()

    setTasks([...tasks, data])
 }


//Delete Task
 const deleteTask = async (id) => {
    await fetch('http://localhost:5000/tasks/${id}', {
       method:'DELETE'
    })
    setTasks(tasks.filter((task)  => task.id !== id ))
 }

  // Toggle reminder
  const toggleReminder = async (id) => {
     const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle, reminder:
      !taskToToggle.reminder}

      const res = await fetch('http://localhost:5000/tasks/${id}',{
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
         body: JSON.stringify(updTask) 
      },

       setTasks(tasks.map((task) => task.id === id ?
        {...task, reminder: 
        !task.reminder }:task ))
  }

 
  return (
    <div className="container">
         <Header title = "Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask} 
          />
        {showAddTask && <AddTask  onAdd ={addTask} /> }
         <Tasks tasks={tasks}  onDelete={deleteTask} onToggle={toggleReminder}/>
    </div>
  );
}

export default App;
