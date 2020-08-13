import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectEntity } from './project.entity';
import { AccountMapper } from '../accounts/account.mapper';

export class ProjectMapper {
  static mapToDomain(projectOrmEntity: ProjectOrmEntity): ProjectEntity {
    return new ProjectEntity(
      projectOrmEntity.id,
      new Date(projectOrmEntity.date),
      projectOrmEntity.name,
      projectOrmEntity.status,
      AccountMapper.mapAccountToDomain(projectOrmEntity.owner),
    );
  }
}
