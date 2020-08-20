import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectEntity } from './project.entity';
import { AccountMapper } from '../accounts/account.mapper';

export class ProjectMapper {
  static mapToDomain(projectOrmEntity: ProjectOrmEntity): ProjectEntity {
    return new ProjectEntity(
      new Date(projectOrmEntity.date),
      projectOrmEntity.name,
      projectOrmEntity.owner.accountId,
      projectOrmEntity.id,
    );
  }

  static mapToOrmEntity(project: Partial<ProjectEntity>): ProjectOrmEntity {
    const projectOrmEntity = new ProjectOrmEntity();
    if(project.id) projectOrmEntity.id = project.id;
    if(project.name) projectOrmEntity.name = project.name;
    if(project.date) projectOrmEntity.date = project.date.getTime().toString();
    return projectOrmEntity;
  }
}
