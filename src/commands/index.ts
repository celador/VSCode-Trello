import * as vscode from 'vscode';
import TrelloClient from '../lib/trello';
import * as vsInterface from '../lib/vscodeInteractions';
import State from '../lib/state';

import loginTrello from './login';
import getACard from './getCard';
import moveCurCardTL from './moveCard';
import closeCurrentCard from './closeCard';
// var trelloClient: TrelloClient;

// TODO: Ensure that the user token is stored somewhere - and configured, so that the user
// doesn't have to do this all the time
// const appKey = '03e153ce92addad232ddc24891e07c60';

// let _userToken = '';

const commands: (state: State) => vscode.Disposable[] = state =>
  [
    {
      command: 'extension.loginToTrello',
      callback: loginTrello(state)
    },
    {
      command: 'extension.getAllBoards',
      callback: getACard(state)
    },
    {
      command: 'extension.moveCardToNewList',
      callback: moveCurCardTL(state)
    },
    {
      command: 'extension.closeCard',
      callback: closeCurrentCard(state)
    }
  ].map(({ command, callback }) =>
    vscode.commands.registerCommand(command, callback)
  );

export default commands;

