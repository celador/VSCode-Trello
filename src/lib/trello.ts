import * as Trello from 'node-trello';

export default class TrelloClient {
  private _trello: any;
  private _key: string;
  private _token: string;

  public _boards: Array<any>;
  public _boardsIDs: Array<any>;

  public lists: Array<any>;
  public listsIDs: Array<any>;

  public cards: Array<any>;
  public cardsIDs: Array<any>;

  public currentBID: string;
  public currentLID: string;
  public currentCID: string;

  public currentCard: string;

  constructor(key?: string, token?: string) {
    this._key = key || '';
    this._token = token || '';
    this._boards = [];
    this._boardsIDs = [];
    this.lists = [];
    this.listsIDs = [];
    this.cards = [];
    this.cardsIDs = [];
    this.currentBID = '';
    this.currentLID = '';
    this.currentCID = '';
    this.currentCard = '';

    this._trello = new Trello(this._key, this._token);
  }

  public testingT(): string {
    return 'Hello!';
  }

  public getMyBoards(): Thenable<boolean> {
    return new Promise((resolve, reject) => {
      this._trello.get('/1/members/me/boards', (err, data) => {
        if (err) {
          reject(err);
        }
        this._boards = new Array<string>();
        this._boardsIDs = new Array<string>();

        for (var i = 0; i < data.length; i++) {
          this._boards.push(data[i].name);
          this._boardsIDs.push(data[i].id);
        }

        resolve(true);
      });
    });
  }

  public getBoardLists(boardID: string) {
    return new Promise((resolve, reject) => {
      this._trello.get('/1/boards/' + boardID + '/lists', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
        this.lists = new Array<string>();
        this.listsIDs = new Array<string>();

        for (var i = 0; i < data.length; i++) {
          this.lists.push(data[i].name);
          this.listsIDs.push(data[i].id);
        }
        resolve(true);
      });
    });
  }
  //
  public getAllCards(listID: string) {
    return new Promise((resolve, reject) => {
      this._trello.get('/1/lists/' + listID + '/cards', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data);
        this.cards = new Array<string>();
        this.cardsIDs = new Array<string>();

        for (var i = 0; i < data.length; i++) {
          this.cards.push(data[i].name);
          this.cardsIDs.push(data[i].id);
        }
        resolve(true);
      });
    });
  }

  public _setCurCardID(currentCardName: string) {
    this.currentCard = currentCardName;
    for (var i = 0; i < this.cards.length; i++) {
      if (currentCardName === this.cards[i]) {
        var cid = this.cardsIDs[i];
      }
    }
    this.currentCID = cid;
  }

  public _moveCurrentCardToList(newListID: string) {
    var putString = '/1/cards/' + this.currentCID + '/';

    this._trello.put(putString, { idList: newListID }, (err, data) => {
      console.log('currentID ' + this.currentCID + ' new list ID ' + newListID);
      console.log(err);
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }

  public _closeCard() {
    var putString = '/1/cards/' + this.currentCID + '/';

    this._trello.put(putString, { closed: true }, (err, data) => {
      console.log(err);
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }
}
