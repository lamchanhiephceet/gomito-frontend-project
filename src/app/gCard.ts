import {Glabel} from './glabel';

import {GUser} from './user/GUser';

export class GCard {
  listId?: number;
  cardName?: string;
  cardId?: number;
  cardIndex?: number;
  description?: string;
  members?: GUser[];
  labels?: Glabel[];
  comment?: Comment[];
  boardId?: number;
}
