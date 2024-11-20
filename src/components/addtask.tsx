import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../lib/firebase'; 
import TaskForm from '@components/taskform'; 
import { addTask } from '@components/taskutils'; 
import { Task } from '../types/types'; 

const AddTask = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]); // Define state as Task array

    const handleAddTask = async (task: Task) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                alert('No user logged in');
                return;
            }
            // Add task using the addTask utility function
            const newTaskId = await addTask(task);
    
            // Optionally update the local state with the new task (if needed for immediate UI update)
            setTasks([...tasks, { ...task, id: newTaskId }]);
            setIsFormVisible(false); // Close the form after adding a task
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false); // Close the form without saving
    };

    return (
        <div>
            <button
                onClick={() => setIsFormVisible(true)}
                className="flex space-x-2 text-orange800"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Task</span>
            </button>

            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <TaskForm
                            onSave={handleAddTask}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;
