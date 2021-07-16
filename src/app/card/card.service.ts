import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GCard} from '../gCard';
import {Observable} from 'rxjs';
import {GUser} from '../user/GUser';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {
  }

  creatCard(newCard: GCard): Observable<GCard> {
    return this.httpClient.post<GCard>('http://localhost:8080/api/cards/', newCard);
  }

  getAllCards(listId: number): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>('http://localhost:8080/api/lists/' + listId);
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
    return this.httpClient.post('http://localhost:8080/api/cards/updateIndex', updateCards);
  }

  moveCardToAnotherList(data: GCard[], newListId: number): Observable<any> {
    console.log(newListId);
    for (const card of data) {
      card.listId = newListId;
      card.cardIndex = data.indexOf(card);
      console.log(card);
    }
    return this.httpClient.post('http://localhost:8080/api/cards/updateIndexOfCardInAnotherList', data);
  }

  editCard(updateCard: GCard): Observable<GCard>{
    // console.log('check4: ' + updateCard);
    return this.httpClient.put<GCard>('http://localhost:8080/api/cards/update', updateCard);
  }

  getCard(cardId: number): Observable<GCard> {
    return this.httpClient.get<GCard>('http://localhost:8080/api/cards/' + cardId);
  }

  searchCard(search: string): Observable<GCard[]> {
    return this.httpClient.get<GCard[]>('http://localhost:8080/api/cards/searches/' + search);
  }

  getMembersOfCard(cardId: number): Observable<GUser[]> {
    return this.httpClient.get<GUser[]>('http://localhost:8080/api/cards/' + cardId + '/get-members');
  }

  addMemberToCard(mem: GUser, cardId: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/cards/' + cardId + '/add-member', mem);
  }

  addLabelToCard(labelId: number, gCard: GCard ): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/cards/addLabelToCard/' + labelId, gCard);
  }
}
