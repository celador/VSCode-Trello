import * as vscode from 'vscode';
import commands from './commands';
import State from './lib/state';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "TrelloCode" is now active!');
  const state = new State();
  commands(state).forEach(command => context.subscriptions.push(command));
}
