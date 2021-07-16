import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GCard} from '../gCard';
import {Observable} from 'rxjs';
import {GUser} from '../user/GUser';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  creatCard(newCard: GCard): Observable<GCard> {
    return this.httpClient.post<GCard>(this.baseUrl + 'api/cards/', newCard);
  }

  getAllCards(listId: number): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>(this.baseUrl + 'api/lists/' + listId);
  }

  updateIndex(data: GCard[]): Observable<any> {
    const updateCards: GCard[] = [];
    for (const card of data) {
      const newCard: GCard = {
        labels: [],
        cardId: card.cardId,
        cardIndex: data.indexOf(card)
      };
      updateCards.push(newCard);
    }
    return this.httpClient.post(this.baseUrl + 'api/cards/updateIndex', updateCards);
  }

  moveCardToAnotherList(data: GCard[], newListId: number): Observable<any> {
    console.log(newListId);
    for (const card of data) {
      card.listId = newListId;
      card.cardIndex = data.indexOf(card);
      console.log(card);
    }
    return this.httpClient.post(this.baseUrl + 'api/cards/updateIndexOfCardInAnotherList', data);
  }

  editCard(updateCard: GCard): Observable<GCard>{
    // console.log('check4: ' + updateCard);
    return this.httpClient.put<GCard>(this.baseUrl + 'api/cards/update', updateCard);
  }

  getCard(cardId: number): Observable<GCard> {
    return this.httpClient.get<GCard>(this.baseUrl + 'api/cards/' + cardId);
  }

  searchCard(search: string): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>(this.baseUrl + 'api/cards/searches/' + search);
  }

  getMembersOfCard(cardId: number): Observable<GUser[]> {
    return this.httpClient.get<GUser[]>(this.baseUrl + 'api/cards/' + cardId + '/get-members');
  }

  addMemberToCard(mem: GUser, cardId: number): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'api/cards/' + cardId + '/add-member', mem);
  }

  addLabelToCard(labelId: number, gCard: GCard ): Observable<any>{
    return this.httpClient.post(this.baseUrl + 'api/cards/addLabelToCard/' + labelId, gCard);
  }
}
