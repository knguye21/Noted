import { useEffect, useState, useRef } from 'react';
import { auth } from '../../lib/firebase';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Task } from '../../types/types';
import UserNav from '@components/usernav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { updateTask, deleteTask } from '@components/taskutils';
import TaskForm from '@components/taskform';

const db = getFirestore();

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string } | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showMenu, setShowMenu] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const router = useRouter();

    // Refs for task menu and form to detect clicks outside
    const taskMenuRef = useRef<HTMLDivElement | null>(null);
    const taskFormRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                router.push('/auth/login');
            } else {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data() as { firstName: string; lastName: string });
                }
                const tasksSnapshot = await getDocs(collection(db, 'tasks'));
                const userTasks = tasksSnapshot.docs
                    .filter((doc) => doc.data().createdBy === user.uid)
                    .map((doc) => ({
                        ...doc.data(),
                        dateEnd: doc.data().dateEnd?.toDate() || null,
                        id: doc.id,
                    })) as Task[];
                setTasks(userTasks);
            }
        });

        return () => unsubscribe();
    }, [router]);

    // Close task menu and form when clicking outside
    useEffect(() => {
        const handleMenuClickOutside = (event: MouseEvent) => {
            if (taskMenuRef.current && !taskMenuRef.current.contains(event.target as Node)) {
                setShowMenu(null);
            }
        };

        const handleFormClickOutside = (event: MouseEvent) => {
            if (taskFormRef.current && !taskFormRef.current.contains(event.target as Node)) {
                setShowForm(false);
            }
        };

        document.addEventListener('mousedown', handleMenuClickOutside);
        document.addEventListener('mousedown', handleFormClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleMenuClickOutside);
            document.removeEventListener('mousedown', handleFormClickOutside);
        };
    }, []);

    const toggleMenu = (taskId: string) => {
        setShowMenu(prev => prev === taskId ? null : taskId);
    };

    const handleUpdate = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDelete = async (taskId: string) => {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleSave = async (updatedTask: Task) => {
        console.log('Saving task:', updatedTask);  // Log for debugging
        
        if (!updatedTask) {
            console.error('Updated task is undefined');
            return;
        }
    
        await updateTask(updatedTask.id, updatedTask); // Ensure this passes the correct updatedTask
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setShowForm(false);
        setEditingTask(null);
    };

    return (
        <div className="flex">
            <UserNav />
            <div className="border-2 w-full border-base300 m-10">
                <p>Hi, {userInfo?.firstName}!</p>
                <h2>To-Do</h2>
                <div className="space-y-4 px-2">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex flex-col p-4 border h-40 w-full rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
                        >
                            <div className="flex justify-between relative">
                                <h3 className="text-xl font-semibold text-gray-800">{task.taskName}</h3>
                                <FontAwesomeIcon
                                    icon={faEllipsis}
                                    onClick={() => toggleMenu(task.id)}
                                    className="cursor-pointer"
                                />
                                {showMenu === task.id && (
                                    <div
                                        ref={taskMenuRef}
                                        className="absolute right-0 mt-2 p-2 bg-white border rounded shadow-lg"
                                    >
                                        <button
                                            onClick={() => handleUpdate(task)}
                                            className="block text-sm text-gray-700 p-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="block text-sm text-red-600 p-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-600 line-clamp-3 flex-grow">{task.description}</p>
                            <div className="mt-auto">
                                <p className="text-sm text-gray-500">
                                    Due: {task.dateEnd?.toDateString()}
                                </p>
                                <p className="text-sm text-gray-500">Status: {task.timeEnd}</p>
                                <p className="text-sm text-gray-500">Status: {task.status}</p>
                                <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for TaskForm */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={taskFormRef} className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                        <TaskForm
                            initialTask={editingTask}
                            onSave={handleSave}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingTask(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
