import { TaskOrmEntity } from "./task.orm-entity";
import { TaskEntity } from "./task.entity";

export class TaskMapper {
  static mapToDomain(task: TaskOrmEntity): TaskEntity {
    return new TaskEntity(
      task.name,
      task.id
    )
  }
  static mapToOrmEntity(task: Partial<TaskEntity>): TaskOrmEntity {
    const taskOrmEntity = new TaskOrmEntity();
    if(task.id) taskOrmEntity.id = task.id;
    if(task.name) taskOrmEntity.name = task?.name;
    return taskOrmEntity;
  }
}
