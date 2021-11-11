import {useState, useEffect} from 'react';
import { User, getAllUsers, getUserById } from '../api/users';

export function useAllUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<unknown|undefined>(undefined);

    useEffect(() => {

        getAllUsers().then((users) => {
            setUsers(users);
        }).catch((err) => {
            setError(err);
        });

    }, []);

    return { users, error };

}

export function useUserById(id: number) {
    const [user, setUser] = useState<User|null>(null);
    const [error, setError] = useState<unknown|undefined>(undefined);

    useEffect(() => {

        getUserById(id).then((user) => {
            setUser(user);
        }).catch((err) => {
            setError(err);
        });

    }, [id]);

    return { user, error };

}