import * as vscode from 'vscode';

export default class Code {
  currentBID: string = '';
  currentLID: string = '';
  currentCID: string = '';
  currentCard: string = '';
  currentList: string = '';
  currentBoard: string = '';
  statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
  }

  async PromptApiKey() {
    const apiKey = await vscode.window.showInputBox({
      placeHolder:
        'Please paste in your Trello API Key from https://trello.com/app-key',
      ignoreFocusOut: true
    });
    return apiKey;
  }

  displayCardOnBottom(displayString: string) {
    this.AddToBar(displayString, '$(file-text)');
  }

  ShowBoards(boards: string[], boardsID: string[]): Thenable<string> {
    return vscode.window.showQuickPick(boards).then(x => {
      if (x) {
      }
      this.currentBoard = x || '';
      //go through name list and get corresponding selected ID
      for (var j = 0; j < boards.length; j++) {
        if (boards[j] === x) {
          this.currentBID = boardsID[j];
        }
      }
      return this.currentBID;
    }, console.error);
  }

  ShowLists(lists: string[], listsID: string[]): Thenable<string> {
    return vscode.window.showQuickPick(lists).then(x => {
      this.currentList = x || '';
      //find ID for selected list
      for (var j = 0; j < lists.length; j++) {
        if (lists[j] === x) {
          this.currentLID = listsID[j];
        }
      }
      return this.currentLID;
    }, console.error);
  }

  ShowCards(cards: string[], cardsID: string[]) {
    return vscode.window.showQuickPick(cards).then(x => {
      this.currentCard = x || '';
      //find ID for selected list
      for (var j = 0; j < cards.length; j++) {
        if (cards[j] === x) {
          this.currentCID = cardsID[j];
        }
      }
      return x;
    }, console.error);
  }

  AddToBar(message: string, iconName: string): void {
    this.statusBarItem.text = `${iconName} ${message}`;
    this.statusBarItem.show();
  }

  // AddStatusIcon(iconName: string) {
  //   if (!statusBarItem) {
  //     statusBarItem = vscode.window.createStatusBarItem(
  //       vscode.StatusBarAlignment.Left
  //     );
  //   }
  // }

  showTokenError() {
    vscode.window.showErrorMessage(
      'You need to add the token provided by Trello'
    );
  }

  PromptUserToken() {
    return vscode.window
      .showInputBox({
        placeHolder: 'Please paste in the User Token provided by Trello',
        ignoreFocusOut: true
      })
      .then(
        userToken => (!userToken ? this.showTokenError() : userToken),
        console.error
      );
  }

  ShowError(errMessage: string) {
    vscode.window.showErrorMessage(errMessage);
  }

  ShowMessage(infoMessage: string) {
    vscode.window.showInformationMessage(infoMessage);
  }

  getConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('TrelloCode');
  }

  getApiKey(): string {
    return this.getConfig().get('apiKey') || '';
  }
  setApiKey(key: string) {
    this.getConfig().update('apiKey', key);
  }

  getUserToken(): string {
    return this.getConfig().get('userToken') || '';
  }
  setUserToken(key: string) {
    this.getConfig().update('userToken', key);
  }
}
