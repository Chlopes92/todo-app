import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricalComponent } from './pages/historical/historical.component';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path:"tasks",
    component: TasksComponent,
  },
  {
    path:"tasks/:id",
    component: TaskDetailsComponent,
  },
  {
    path: "historical",
    component: HistoricalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
