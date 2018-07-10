import * as vsInterface from '../lib/vscodeInteractions';
import State from '../lib/state';

export default function getACard(state: State) {
  //getBoards from TrelloAPI
  //Update the UI with vscodeInteractions
  //repeat
  return () => {
    if (!state.userToken) {
      vsInterface.ShowError(
        "You are not LoggedIn. Use 'Trello: Login' command to Login."
      );
    } else {
      state.client
        .getMyBoards()
        .then(() => {
          return vsInterface.ShowBoards(
            state.client._boards,
            state.client._boardsIDs
          );
        })
        .then(selectedBoard => {
          state.client.currentBID = selectedBoard;
          return state.client.getBoardLists(selectedBoard);
        })
        .then(() => {
          return vsInterface.ShowLists(
            state.client.lists,
            state.client.listsIDs
          );
        })
        .then(selectedList => {
          state.client.currentLID = selectedList;
          return state.client.getAllCards(selectedList);
        })
        .then(() => {
          return vsInterface.ShowCards(
            state.client.cards,
            state.client.cardsIDs
          );
        })
        .then(selectedCard => {
          state.client._setCurCardID(selectedCard || '');
          vsInterface.displayCardOnBottom(selectedCard || '');
          return true;
        }, console.error);
    }
  };
}
