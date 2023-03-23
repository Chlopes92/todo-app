import { Component } from '@angular/core';
import { CategoryType, ITodo } from 'src/app/mocks/todo.mock';
import { FormsModule } from '@angular/forms';
import { BasketService } from 'src/app/services/basket/basket.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  categories: CategoryType[] = ["🛍️", "💊️", "💼", "💸", "🧼", "🤷‍♀️"];
  selectedCategory: CategoryType | undefined;

  
  task: ITodo = {
    id: 0,
    content: '',
    category: ''as CategoryType,
    isUrgent: true,
    doneDate: new Date()
  };
  isButtonDisabled: boolean = true;
  isSelected: boolean = false;

  constructor(private basketService: BasketService) {this.isButtonDisabled = true}

  validateTask(): void {
    if (this.selectedCategory !== undefined && this.task.content  !== '') {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
    const taskData = {
      id: 0,
      category: this.selectedCategory,
      content: this.task.content,
      isUrgent: this.task.isUrgent,
      doneDate: new Date()
    };
    this.basketService.addTask(taskData);
    console.log(this.selectCategory);
    console.log(this.task.content);
    console.log(this.task.isUrgent);
  }

  

  selectCategory(category: CategoryType): void {
    this.selectedCategory = category;
    this.validateTask();
    this.isSelected = true;
  }

}
