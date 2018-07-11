import * as vscode from 'vscode';
import commands from './commands';
import State from './lib/state';

export function activate(context: vscode.ExtensionContext) {
  commands(new State()).forEach(command => context.subscriptions.push(command));
  console.log('Extension "TrelloCode" is now active!');
}
