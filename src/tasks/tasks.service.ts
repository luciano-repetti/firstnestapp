import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  //SIMULATE DATABASE
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'Some task',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTask() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'Se elimino correctamente la tarea.';
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    const newTask = Object.assign(task, updatedFields);

    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));

    return newTask;
  }
}
