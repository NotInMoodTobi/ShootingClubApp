import axios from "axios";

export enum ESex {
    male,
    female,
    other
}

export interface User {
    ID: number;
    name: string;
    lastName: string;
    birthdate: number;
    registerDate: number;
    sex: number;
    department: string;
    visitsTimestamps: number[];
}


const API_ENDPOINT = 'http://localhost:5000';

export function getAllUsers(): Promise<User[]> {
    return axios.get(`${API_ENDPOINT}/getNames`).then((r) => r.data);
}

export function getUserById(id: number): Promise<User> {
    return axios.get(`${API_ENDPOINT}/getUserById/${id}`).then((r) => r.data);
}

export function addUser(user: Omit<User, "ID">): Promise<void> {
    return axios.post(`${API_ENDPOINT}/addUser`, user).then((r) => r.data);
}

export function deleteUser(id: number): Promise <void> {
    return axios.delete(`${API_ENDPOINT}/deleteUser/${id}`).then((r) => r.data);
}

export function editUser(id: number, user: User): Promise<void> {
    return axios.put(`${API_ENDPOINT}/editUser/${id}`, user).then((r) => r.data);
}