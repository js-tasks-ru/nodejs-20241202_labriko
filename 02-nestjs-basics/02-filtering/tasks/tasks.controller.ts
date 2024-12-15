import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import {
  isEnum,
} from '@nestjs/class-validator';
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    if (
      status && !isEnum(status, TaskStatus) ||
      page && page < 0 ||
      limit && limit < 0
    ) {
      throw new BadRequestException('Bad Request');
    }
    return this.tasksService.getFilteredTasks(status, page, limit);
  }
}
