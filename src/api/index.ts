import axios from 'axios';
import type { Task, Room, Message } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    apiKey: API_KEY,
    'Content-Type': 'application/json',
  },
});

export async function getTasks() {
  const response = await api.get<Task[]>('/tasks?select=*');
  const data = response.data;

  return data;
}

export async function setTaskDone({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}) {
  const response = await api.patch(`/tasks?id=eq.${id}`, { isDone });
  const data = response.data;

  return data;
}

export async function updateTask({
  id,
  task,
}: {
  id: number;
  task: { title: string; body: string; deadline: Date; isDone: boolean };
}) {
  const response = await api.patch(`/tasks?id=eq.${id}`, { ...task });
  const data = response.data;

  return data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`/tasks?id=eq.${id}`);
  const data = response.data;

  return data;
}

export async function getMessageRoom() {
  const response = await api.get<Room[]>('/rooms?select=*');
  const data = response.data;

  return data;
}

export async function getRoomById(id: number) {
  const response = await api.get<Room[]>(`/rooms?id=eq.${id}`);
  const data = response.data;

  return data;
}

export async function getMessages(roomId: number) {
  const response = await api.get<Message[]>(`/chats?room_id=eq.${roomId}`);
  const data = response.data;

  return data;
}
