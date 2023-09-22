import {GCard} from './gCard';
import {Glabel} from './glabel';

export class ListModel {
  listName?: string;
  listId?: number;
  boardId?: number;
  cards?: GCard[];
  listIndex?: number;
  dropListId?: number;
}
