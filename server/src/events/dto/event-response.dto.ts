import { ResponseInterface } from '../../common/ResponseInterface';
import { EventEntity } from '../event.entity';
import { ApiProperty } from "@nestjs/swagger";

type EventResponseTypes = EventEntity | EventEntity[] | string | null;

class EventResponseDto implements ResponseInterface {
  @ApiProperty({example: false})
  isError: boolean;
  message: EventResponseTypes;

  constructor(isError: boolean, message: EventResponseTypes) {
    this.isError = isError;
    this.message = message;
  }
}

export default EventResponseDto;
