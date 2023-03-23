import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  tasks: ITodo[] = [];

  constructor() { }

  addTask(task: ITodo): void {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): ITodo[] {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    return this.tasks;
  }
}
