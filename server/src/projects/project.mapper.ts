import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectEntity } from './project.entity';

export class ProjectMapper {
  static mapToDomain(projectOrmEntity: ProjectOrmEntity): ProjectEntity {
    return new ProjectEntity(
      Number(projectOrmEntity.createdDate),
      projectOrmEntity.name,
      projectOrmEntity.owner.accountId,
      projectOrmEntity.id,
    );
  }

  static mapToOrmEntity(project: Partial<ProjectEntity>): ProjectOrmEntity {
    const projectOrmEntity = new ProjectOrmEntity();
    if(project.id) projectOrmEntity.id = project.id;
    if(project.name) projectOrmEntity.name = project.name;
    if(project.createdDate) projectOrmEntity.createdDate = project.createdDate.toString();
    return projectOrmEntity;
  }
}
