import { EventInterface } from "./EventInterface";
import { AccountId } from "./AccountInterface";


export interface ProjectInterface {
    id?: ProjectId;
    name: string;
    createdDate: number;
    owner: AccountId;
    events?: EventInterface[];
    // addEvent(event: EventInterface): void;
    // updateEvent(event: EventInterface): void;
    // deleteEventById(eventId: string): void;
}

export type ProjectId = string;
