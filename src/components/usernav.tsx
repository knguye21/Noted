import { useEffect, useState } from "react";
import { auth } from "@lib/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import AddTask from "./addtask";

const db = getFirestore();
const UserNav = () => {
    const [userInfo, setUserInfo] = useState<{firstName: string} | null>(null);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                router.push('/auth/login');
            } else {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as {firstName: string};
                    setUserInfo(userData);
                } else {
                    console.log('No such document');
                }
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (!userInfo) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col h-screen py-5 px-8 space-y-1 bg-base100 w-48 md:w-64 lg:w-80">
            <div className="flex items-center pb-10">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>
            <AddTask />
            <a href='#' className="py-1">Dashboard</a>
            <a href='#' className="py-1">Profile</a>
        </div>
    );
};

export default UserNav;