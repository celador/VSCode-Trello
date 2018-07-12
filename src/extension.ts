import * as vscode from 'vscode';
import commands from './commands';

export function activate(context: vscode.ExtensionContext) {
  commands
    .map(({ command, callback }) =>
      vscode.commands.registerCommand(command, callback)
    )
    .forEach(command => {
      context.subscriptions.push(command);
    });
}
