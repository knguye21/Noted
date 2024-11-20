export interface Task {
    id: string;
    taskName: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    createdBy: string;
    status: 'not started' | 'in progress' | 'completed';
    dateBegin: Timestamp; // Stored as Firestore Timestamp (for the date itself)
    dateEnd: Timestamp; // Stored as Firestore Timestamp (for the date itself)
    timeBegin: string;
    timeEnd: string; 
}
