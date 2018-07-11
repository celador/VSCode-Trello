import * as vscode from 'vscode';
import commands from './commands';
import State from './lib/state';

class Configuration {
  apiKey: string = '';
  userToken: string = '';
}

export function activate(context: vscode.ExtensionContext) {
  const config: any = vscode.workspace.getConfiguration('TrelloCode');
  commands(new State(config as Configuration)).forEach(command => {
    context.subscriptions.push(command);
  });
  console.log('Extension "TrelloCode" is now active!');
}
