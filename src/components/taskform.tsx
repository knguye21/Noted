import { useState, useEffect } from 'react';
import { Task } from '../types/types';
import { getAuth } from 'firebase/auth';

interface TaskFormProps {
    initialTask?: Task | null; // Optional initial task
    onSave: (updatedTask: Task) => void; // Required function
    onCancel: () => void; // Required function
}

const TaskForm = ({ initialTask, onSave, onCancel }: TaskFormProps) => {
    const [taskName, setTaskName] = useState(initialTask?.taskName || '');
    const [description, setDescription] = useState(initialTask?.description || '');
    const [dateEnd, setDateEnd] = useState(
        initialTask?.dateEnd ? new Date(initialTask.dateEnd).toISOString().split('T')[0] : '' // Extract date
    );
    const [timeEnd, setTimeEnd] = useState(
        initialTask?.dateEnd ? new Date(initialTask.dateEnd).toISOString().split('T')[1].slice(0, 5) : '' // Extract time
    );
    const [status, setStatus] = useState(initialTask?.status || '');
    const [priority, setPriority] = useState(initialTask?.priority || '');
    const [createdBy, setCreatedBy] = useState<string>(''); // This will hold the createdBy (userId)
    
    
    // Firebase Auth hook to get the current user's info
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser; // Get the current logged-in user
        if (user) {
            setCreatedBy(user.uid); // Use Firebase user UID as createdBy
        }
    }, []);

    // Set a default value for dateBegin and timeBegin (you can adjust these as per your requirements)
    const dateBegin = initialTask?.dateBegin || new Date().toISOString().split('T')[0]; // Current date
    const timeBegin = initialTask?.timeBegin || '08:00'; // Default start time (can be updated if needed)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            const updatedTask: Task = {
                id: initialTask?.id || '', // Use the existing ID if updating
                taskName,
                description,
                createdBy, // Add the createdBy field
                dateBegin: new Date(`${dateBegin}T${timeBegin}`), 
                dateEnd: dateEnd && timeEnd ? new Date(`${dateEnd}T${timeEnd}`) : null, 
                status,
                priority,
                timeBegin,  
                timeEnd     
            };

            console.log('Submitting updated task:', updatedTask);
            onSave(updatedTask);
        } else {
            console.error('onSave function is not defined!');
        }
    };

    return (
        <div>
            <h2>{initialTask ? 'Update Task' : 'Create Task'}</h2>
            <form className="space-y-4">
                <div>
                    <label>Task Name</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Time End</label>
                    <input
                        type="time"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Status</option>
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label>Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
