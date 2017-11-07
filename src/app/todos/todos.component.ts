import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todoes',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoDataService]
})
export class TodosComponent implements OnInit{

  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute
  ) {}


  public ngOnInit() {
    this.route.data.map((data) => data['todos'])
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo: Todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  // rename from removeTodo
  onRemoveTodo(todo: Todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_)  =>  {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }



}
