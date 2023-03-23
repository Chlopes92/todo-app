import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private tasks: ITodo[] = [];

  constructor() { }

  addTask(task: ITodo): void {
    this.tasks.push(task);
  }

  getTasks(): ITodo[] {
    return this.tasks;
  }
}
