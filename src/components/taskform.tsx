import { useState } from 'react';
import { Task } from '../types/types';

interface TaskFormProps {
    initialTask?: Task | null; // Optional initial task
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
}

const TaskForm = ({ initialTask, onSave = () => {}, onCancel }: TaskFormProps) => {
    
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTask = {
            ...initialTask, // Merge with the existing task data
            taskName, // Updated task fields
            description,
            dateEnd: dateEnd && timeEnd ? new Date(`${dateEnd}T${timeEnd}`) : null,
            timeEnd,
            status,
            priority,
        };

        console.log('Submitting updated task:', updatedTask); // Log for debugging
        onSave(updatedTask); // Pass the updated task to the onSave callback
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
                        <option value="not started">not started</option>
                        <option value="in progress">in progress</option>
                        <option value="completed">completed</option>
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
                        <option value="Low">low</option>
                        <option value="Medium">medium</option>
                        <option value="High">high</option>
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
