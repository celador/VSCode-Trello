import * as vscode from 'vscode';
import State from '../lib/state';

import login from './login';
import getCard from './getCard';
import moveCard from './moveCard';
import closeCard from './closeCard';

const commands: (state: State) => vscode.Disposable[] = state =>
  [
    {
      command: 'extension.loginToTrello',
      callback: login(state)
    },
    {
      command: 'extension.getAllBoards',
      callback: getCard(state)
    },
    {
      command: 'extension.moveCardToNewList',
      callback: moveCard(state)
    },
    {
      command: 'extension.closeCard',
      callback: closeCard(state)
    }
  ].map(({ command, callback }) =>
    vscode.commands.registerCommand(command, callback)
  );

export default commands;
