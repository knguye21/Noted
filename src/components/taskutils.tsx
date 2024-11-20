import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Task } from '../types/types'; 
import { getFirestore } from 'firebase/firestore';
import { db } from '../lib/firebase'; 

const db = getFirestore();

/**
 * Adds a new task to Firestore.
 * @param task - The task data to add.
 */
export const addTask = async (task: Task) => {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), task);
        console.log('Task added with ID: ', docRef.id);
        return docRef.id; // Return the ID of the new task if needed
    } catch (error) {
        console.error('Error adding task: ', error);
        throw error; // Rethrow the error for handling in the component
    }
};

/**
 * Updates a task in Firestore.
 * @param taskId - The ID of the task to update.
 * @param updatedTask - The updated task data.
 */
export const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
        console.log('Updated task:', updatedTask); // Log to check if it's a valid object
        
        if (!updatedTask || Object.keys(updatedTask).length === 0) {
            console.error('Updated task is empty or invalid:', updatedTask);
            return;
        }
        
        const taskRef = doc(db, 'tasks', taskId.toString());
        await updateDoc(taskRef, updatedTask);
        console.log('Task updated successfully');
    } catch (error) {
        console.error('Error updating task: ', error);
        throw error;
    }
};

/**
 * Deletes a task from Firestore.
 * @param taskId - The ID of the task to delete.
 */
export const deleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
};
