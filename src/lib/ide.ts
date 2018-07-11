import * as vscode from 'vscode';

//This is for interacting with TrelloClient Object and VS UI

export var currentBID: string;
export var currentLID: string;
export var currentCID: string;

export var currentCard: string;
export var currentList: string;
export var currentBoard: string;
export var statusBarItem: vscode.StatusBarItem;

export const getApiKey: () => string | undefined = () =>
  vscode.workspace.getConfiguration('TrelloCode').get('apiKey');

export const getUserToken: () => string | undefined = () =>
  vscode.workspace.getConfiguration('TrelloCode').get('userToken');

export const setUserToken: (token: string) => Thenable<void> = token =>
  vscode.workspace.getConfiguration('TrelloCode').update('userToken', token);

export function displayCardOnBottom(displayString: string) {
  AddToBar('', '', '', displayString, '$(file-text)');
}

export function ShowBoards(
  boards: string[],
  boardsID: string[]
): Thenable<string> {
  return vscode.window.showQuickPick(boards).then(
    x => {
      if (x) {
      }
      console.log('ShowBoards: ' + x);
      currentBoard = x || '';
      //go through name list and get corresponding selected ID
      for (var j = 0; j < boards.length; j++) {
        if (boards[j] === x) {
          currentBID = boardsID[j];
        }
      }
      console.log('ShowBoards - current: ' + currentBID);
      return currentBID;
    },
    err => console.log(err)
  );
}

export function ShowLists(
  lists: string[],
  listsID: string[]
): Thenable<string> {
  return vscode.window.showQuickPick(lists).then(
    x => {
      currentList = x || '';
      //find ID for selected list
      for (var j = 0; j < lists.length; j++) {
        if (lists[j] === x) {
          currentLID = listsID[j];
        }
      }
      return currentLID;
    },
    err => {}
  );
}

export function ShowCards(cards: string[], cardsID: string[]) {
  return vscode.window.showQuickPick(cards).then(
    x => {
      console.log('console display:' + x);
      currentCard = x || '';
      //find ID for selected list
      for (var j = 0; j < cards.length; j++) {
        if (cards[j] === x) {
          currentCID = cardsID[j];
        }
      }
      console.log(currentCID);
      return x;
    },
    err => {}
  );
}

export function AddToBar(
  message?: string,
  boardName?: string,
  listName?: string,
  cardName?: string,
  iconName?: string
): void {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
  }
  console.log('printing current card name ' + cardName);
  console.log('printing current list' + currentList);
  console.log('printing current board ' + currentBoard);
  statusBarItem.text = cardName
    ? iconName +
      ' ' +
      message +
      ' ' +
      currentBoard +
      ' $(chevron-right)' +
      currentList +
      ' $(chevron-right)' +
      cardName
    : iconName + ' ' + message;
  statusBarItem.show();
  //createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem
}

export function AddStatusIcon(iconName: string) {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
  }
}

const showTokenError = () =>
  vscode.window.showErrorMessage(
    'You need to add the token provided by Trello'
  );

export function PromptUserToken() {
  return vscode.window
    .showInputBox({
      placeHolder: "Please paste in your user token, then hit 'Enter'.",
      ignoreFocusOut: true
    })
    .then(x => (!x ? showTokenError() : x), console.error);
}

export function ShowError(errMessage: string) {
  vscode.window.showErrorMessage(errMessage);
}

export function ShowMessage(infoMessage: string) {
  vscode.window.showInformationMessage(infoMessage);
}
