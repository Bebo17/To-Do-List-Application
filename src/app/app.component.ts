import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CardModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ToDoList';

  taskArray = [{ taskName: ' ', isCompleted: false}];
  constructor () {
    let storedTasks = localStorage.getItem('taskArray');
    if (storedTasks){
      this.taskArray = JSON.parse(storedTasks);
    } else{
      this.taskArray = [];
    }
  }
  ngOnInit (): void {}

  onSubmit(form: NgForm) {
    this.taskArray.push({taskName: form.controls['task'].value,isCompleted: false})
    form.reset();
    this.storeTasks();
  }

  onDelete(index: number){
    this.taskArray.splice(index, 1);
    this.storeTasks();
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.storeTasks();
  }

  clearTable() {
    this.taskArray = [];
    this.storeTasks();
  }

  storeTasks(){
    localStorage.setItem('taskArray', JSON.stringify(this.taskArray));
  }
  
}
