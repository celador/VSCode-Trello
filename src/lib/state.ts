import TrelloClient from './trello';

export default class State {
  public appKey: string = '03e153ce92addad232ddc24891e07c60';
  public userToken: string = '';
  public client: TrelloClient = new TrelloClient();
}
