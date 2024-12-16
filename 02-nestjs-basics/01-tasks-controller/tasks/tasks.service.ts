import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private idCounter: number = 1;
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      return task;
    }

    return null;
  }

  createTask(task: Task): Task {
    const taskWithId: Task = {
      ...task,
      id: this.idCounter.toString(),
    }
    this.idCounter++;
    this.tasks.push(taskWithId);
    return taskWithId;
  }

  updateTask(id: string, update: Task): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    const task = this.tasks[taskIndex];
    if (task) {
      const updatedTask = {
        id: task.id,
        ...update,
      };
      this.tasks[taskIndex] = updatedTask
      return updatedTask;
    }

    return null;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    const task = this.tasks[taskIndex];
    if (task) {
      this.tasks.splice(taskIndex, 1);
      return task;
    }

    return null;
  }
}
