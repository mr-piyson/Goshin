import Dexie, { type Table } from 'dexie';

export interface Note {
  id?: number;
  title: string;
  body: string;
  updatedAt: number;
  pinned?: boolean;
}

export interface Task {
  id?: number;
  title: string;
  done: boolean;
  createdAt: number;
  due?: number;
}

class AppDB extends Dexie {
  notes!: Table<Note, number>;
  tasks!: Table<Task, number>;
  constructor() {
    super('manganum-clone');
    this.version(1).stores({
      notes: '++id, updatedAt, pinned',
      tasks: '++id, done, createdAt, due',
    });
  }
}

export const db = new AppDB();