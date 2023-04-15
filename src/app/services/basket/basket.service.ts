import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/mocks/todo.mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  
  tasks: ITodo[] = [];
 

  constructor() { }

  //Méthode qui permet d'ajouter une tâche à la liste des tâches enregistrées. Elle prend en entrée un objet task de type ITodo, qui contient toutes les informations de la tâche à ajouter. 
  addTask(task: ITodo): void {
    //La méthode ajoute cette tâche à la fin du tableau 'this.tasks', puis enregistre le tableau dans le localStorage avec la méthode localStorage.setItem().
    this.getTasks()
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: ITodo): void {
  this.getTasks().subscribe((tasks: ITodo[]) => {
    const index = tasks.findIndex((t: ITodo) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

  // Méthode permettant de mettre à jour la liste des tâches dans le localStorge. Elle récupère le tableau this.tasks et l'enregistre dans le localStorge à l'aide de la méthode localStorage.setItem().
  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Cette méthode permet de récupérer la liste complète des tâches enregistrées dans le localStorge.
  getTasks(): Observable<ITodo[]>{
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    // renvoie un Observable qui émet la liste des tâches stockées.
    return of(this.tasks);
  }

  //  Cette méthode permet de récupérer la liste des tâches done à partir du tableau 'this.tasks'.
  getDoneTasks(): ITodo[] {
    //la méthode filter() sert à créer un tableau qui ne contient que les tâches dont la propriété doneDate est true, et retourne ce nouveau tableau.
    return this.tasks.filter(task => task.doneDate);
    
  }

  
  
}
