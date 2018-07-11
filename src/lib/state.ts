import Trello from './trello';

export default class State {
  constructor({ apiKey, userToken }) {
    this.trello = new Trello(apiKey, userToken);
  }

  trello: Trello | undefined;
}
