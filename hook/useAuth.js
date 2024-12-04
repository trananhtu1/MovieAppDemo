import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            console.log('đã lấy thông tin user:', user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            throw error;
        }
    };

    return { 
        user,
        logout
    }
}