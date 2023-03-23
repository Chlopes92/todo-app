import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { Observable, of } from 'rxjs';

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

  getTasks(): Observable<ITodo[]>{
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    return of(this.tasks);
  }

  getDoneTasks(): ITodo[] {
    return this.tasks.filter(task => task.done);
  }
  
}
