import * as Trello from 'node-trello';
import Code from './code';

import open = require('open');

export default class Client {
  private _trello: Trello;
  public code: Code;

  public boards: any[] = [];
  public boardsIDs: any[] = [];
  public lists: any[] = [];
  public listsIDs: any[] = [];
  public cards: any[] = [];
  public cardsIDs: any[] = [];
  public currentBID: string = '';
  public currentLID: string = '';
  public currentCID: string = '';
  public currentCard: string = '';

  constructor() {
    this.code = new Code();
    this.init();
  }

  private init(): Promise<Trello> {
    return this._trello
      ? Promise.resolve(this._trello)
      : this.getApiKey()
          .then(() => this.getUserToken)
          .catch(err => this.code.ShowError(err.message))
          .then(() => {
            this.code.AddToBar('Trello logged in', '$(person)');
            this._trello = new Trello(
              this.code.getApiKey(),
              this.code.getUserToken()
            );
            return this._trello;
          });
  }

  public getApiKey(): Promise<string> {
    const apiKey = this.code.getApiKey();
    return apiKey
      ? Promise.resolve(apiKey)
      : this.code.PromptApiKey().then(key => {
          if (key) {
            this.code.setApiKey(key);
            return key;
          } else {
            open('https://trello.com/app-key');
            throw new Error(
              'Missing API Key. You need to add your API Key from Trello so we can verify your identity.'
            );
          }
        });
  }

  public getUserToken(): Promise<string> {
    const userToken = this.code.getUserToken();
    return userToken
      ? Promise.resolve(userToken)
      : new Promise(() => {
          open(
            `https://trello.com/1/authorize?key=${this.code.getApiKey()}&expiration=never&response_type=token&scope=read,write,account`
          );
          return this.code.PromptUserToken().then(token => {
            if (token) {
              this.code.setUserToken(token);
              return token;
            } else {
              throw new Error('Missing User Token');
            }
          });
        });
  }

  public getMyBoards(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._trello.get('/1/members/me/boards', (err, data) => {
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
      this._trello.get('/1/boards/' + boardID + '/lists', (err, data) => {
        if (err) {
          throw err;
        }
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
      this._trello.get('/1/lists/' + listID + '/cards', (err, data) => {
        if (err) {
          throw err;
        }
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

    this._trello.put(putString, { idList: newListID }, (err, data) => {
      if (err) {
        throw err;
      }
    });
  }

  public closeCard() {
    var putString = '/1/cards/' + this.currentCID + '/';

    this._trello.put(putString, { closed: true }, (err, data) => {
      if (err) {
        throw err;
      }
    });
  }
}
