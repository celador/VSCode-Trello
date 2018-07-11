import * as Trello from 'node-trello';

export default class TrelloClient {
  private trello: any;
  private key: string;
  private token: string;

  public boards: any[];
  public boardsIDs: any[];

  public lists: any[];
  public listsIDs: any[];

  public cards: any[];
  public cardsIDs: any[];

  public currentBID: string;
  public currentLID: string;
  public currentCID: string;

  public currentCard: string;

  constructor(key?: string, token?: string) {
    this.key = key || '';
    this.token = token || '';
    this.boards = [];
    this.boardsIDs = [];
    this.lists = [];
    this.listsIDs = [];
    this.cards = [];
    this.cardsIDs = [];
    this.currentBID = '';
    this.currentLID = '';
    this.currentCID = '';
    this.currentCard = '';

    this.trello = new Trello(this.key, this.token);
  }

  public getMyBoards(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.trello.get('/1/members/me/boards', (err, data) => {
        if (err) {
          reject(err);
        }
        this.boards = [];
        this.boardsIDs = [];

        for (var i = 0; i < data.length; i++) {
          this.boards.push(data[i].name);
          this.boardsIDs.push(data[i].id);
        }

        resolve(true);
      });
    });
  }

  public getBoardLists(boardID: string) {
    return new Promise((resolve, reject) => {
      this.trello.get('/1/boards/' + boardID + '/lists', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
        this.lists = [];
        this.listsIDs = [];

        for (var i = 0; i < data.length; i++) {
          this.lists.push(data[i].name);
          this.listsIDs.push(data[i].id);
        }
        resolve(true);
      });
    });
  }

  public getAllCards(listID: string) {
    return new Promise((resolve, reject) => {
      this.trello.get('/1/lists/' + listID + '/cards', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
        this.cards = [];
        this.cardsIDs = [];

        for (var i = 0; i < data.length; i++) {
          this.cards.push(data[i].name);
          this.cardsIDs.push(data[i].id);
        }
        resolve(true);
      });
    });
  }

  public setCurCardID(currentCardName: string) {
    this.currentCard = currentCardName;
    for (var i = 0; i < this.cards.length; i++) {
      if (currentCardName === this.cards[i]) {
        var cid = this.cardsIDs[i];
      }
    }
    this.currentCID = cid;
  }

  public moveCurrentCardToList(newListID: string) {
    var putString = '/1/cards/' + this.currentCID + '/';

    this.trello.put(putString, { idList: newListID }, (err, data) => {
      console.log('currentID ' + this.currentCID + ' new list ID ' + newListID);
      console.log(err);
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }

  public closeCard() {
    var putString = '/1/cards/' + this.currentCID + '/';

    this.trello.put(putString, { closed: true }, (err, data) => {
      console.log(err);
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }
}
