import { EventOrmEntity } from './event.orm-entity';
import { EventEntity } from './event.entity';

export class EventMapper {
  static mapToDomain(event: EventOrmEntity): EventEntity {
    return new EventEntity(
      Number(event.endDate),
      event.manager.accountId,
      event.name,
      event.status,
      event.id,
    );
  }

  static mapToOrmEntity(event: Partial<EventEntity>): EventOrmEntity {
    const eventOrmEntity = new EventOrmEntity();
    if(event.id !== undefined) eventOrmEntity.id = event.id;
    if(event.endDate !== undefined) eventOrmEntity.endDate = event.endDate.toString();
    if(event.name !== undefined) eventOrmEntity.name = event.name;
    if(event.status !== undefined) eventOrmEntity.status = event.status;
    return eventOrmEntity

  }
}
