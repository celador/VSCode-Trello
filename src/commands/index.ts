import Client from '../app/client';

import getCard from './getCard';
import moveCard from './moveCard';
import closeCard from './closeCard';

const client = new Client();

export default [
  {
    command: 'TrelloCode.getAllBoards',
    callback: getCard(client)
  },
  {
    command: 'TrelloCode.moveCardToNewList',
    callback: moveCard(client)
  },
  {
    command: 'TrelloCode.closeCard',
    callback: closeCard(client)
  }
];
