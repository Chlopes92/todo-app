import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryType, ITodo } from 'src/app/mocks/todo.mock';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent {

tasks?:ITodo[];
  //Tableau de string avec les différentes catégories possibles pour une tâche.
categories: CategoryType[] = ["🛍️", "💊️", "💼", "💸", "🧼", "🤷‍♀️"];
//Propriété optionnelle représentant la catégorie sélectionnée pour une tâche.
selectedCategory: CategoryType | undefined;
// C'est un objet représentant une tâche avec les propriétés de l'interface. Elle va permettre de stocker les informations.
task: ITodo = {
  id: 0,
  content: '',
  category:'' as CategoryType,
  isUrgent: false,
  doneDate: new Date(),
  // doneDate: null,
  // done: false, 
};
//Booléen pour indiquer si le bouton de validation est activé ou non.
isButtonDisabled: boolean = true;
//Booléen qui indique si une catégorie a été sélectionnée ou non
isSelected: boolean = false;
// Ajouter une variable pour stocker le dernier ID utilisé
lastId: number; 

constructor(private basketService: BasketService, private activatedRoute: ActivatedRoute, private route: Router) {
  this.isButtonDisabled = true
// Récupérer la dernière valeur d'ID utilisée depuis le LocalStorage
  this.lastId = parseInt(localStorage.getItem('lastId') || '0');
}

ngOnInit(){
  // Récupérer l'ID de la tâche sélectionnée depuis le LocalStorage
  // const selectedTaskId = parseInt(localStorage.getItem('selectedTaskId') || '0');
  //   // Charger la tâche sélectionnée en utilisant l'ID
  //   this.basketService.getTasks(selectedTaskId).subscribe((task: ITodo[]) => {
  //     this.tasks = task;
  //     this.selectedCategory = task.category;
  //   });
  
  this.basketService.getTasks().subscribe((tasks: ITodo[]) => {
    this.tasks = tasks;
  });

 if(this.tasks)
 this.tasks.forEach(
  task =>{
    if(task.id === this.lastId) {
      this.task = task;
    }
  } 

 );
 this.selectedCategory = this.task.category;
}



// Méthode est appelée lors de la validation d'une tâche à accomplir.
validateTask(): void {

  // Elle va vérifier si une catégorie a été sélectionnée et si le contenu de la tâche n'est pas vide.
  if (this.selectedCategory !== undefined && this.task.content  !== '')
  //Si c'est le cas, elle active le bouton de validation mais sans cette validation, le bouton est inactif.
  {
    this.isButtonDisabled = false;
  } else {
    this.isButtonDisabled = true;
  }

  // Elle va créer un objet "taskData" avec les propriétés de la tâche. 
  const taskData = {
    id: ++this.lastId, // Incrémenter l'ID à chaque nouvel objet créé
    content: this.task.content,
    category: this.selectedCategory,
    isUrgent: this.task.isUrgent,
    doneDate: null,
    // done: this.task.done,
  };

  // Puis elle va ajouter et sauvegarder la tâche de la BasketService.
  this.basketService.addTask(taskData);
  this.basketService.saveTasks();
  console.log(taskData);
  // Stocker la nouvelle valeur d'ID dans le LocalStorage
  localStorage.setItem('lastId', this.lastId.toString());
}

//Cette méthode est utilisée pour la sélection de la catégorie d'une tâche, prenant en paramètre la seule category séléctionée.
selectCategory(category: CategoryType): void {
  //Cette propriété "selectedCategory" contiendra le string correspondant à la catégorie sélectionnée
  this.selectedCategory = category;
  // this.validateTask();
  this.isSelected = true;
}

}
