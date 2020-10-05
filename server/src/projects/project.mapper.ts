import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectEntity } from './project.entity';
import { EventMapper } from '../events/event.mapper';
import { EventEntity } from "../events/event.entity";

export class ProjectMapper {
  static mapToDomain(projectOrmEntity: ProjectOrmEntity): ProjectEntity {
    let endDate: number | undefined;
    let events: EventEntity[] | undefined;
    if (projectOrmEntity.events && projectOrmEntity.events.length > 0) {
      events = projectOrmEntity.events.map(EventMapper.mapToDomain);
      endDate = events[0].endDate;
      events.slice(1).map((e) => {
        if (endDate && e.endDate > endDate) endDate = e.endDate;
      });
    }
    return new ProjectEntity(
      Number(projectOrmEntity.createdDate),
      projectOrmEntity.name,
      projectOrmEntity.owner.accountId,
      projectOrmEntity.id,
      endDate,
      events
    );
  }

  static mapToOrmEntity(project: Partial<ProjectEntity>): ProjectOrmEntity {
    const projectOrmEntity = new ProjectOrmEntity();
    if (project.id) projectOrmEntity.id = project.id;
    if (project.name) projectOrmEntity.name = project.name;
    if (project.createdDate)
      projectOrmEntity.createdDate = project.createdDate.toString();
    if (project.events && project.events.length > 0)
      project.events.map(EventMapper.mapToOrmEntity);
    return projectOrmEntity;
  }
}
