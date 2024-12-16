import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import {
  validateOrReject,
} from '@nestjs/class-validator';
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);
    if (task) {
      return task;
    }
    throw new NotFoundException('Not Found');
  }

  @Post()
  createTask(@Body() task: Task) {
    validateOrReject(task);
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    validateOrReject(task);
    const updatedTask = this.tasksService.updateTask(id, task);
    if (updatedTask) {
      return updatedTask;
    }

    throw new NotFoundException('Not Found');
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const deletedTask = this.tasksService.deleteTask(id);
    if (deletedTask) {
      return deletedTask;
    }

    throw new NotFoundException('Not Found');
  }
}
