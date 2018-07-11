import * as ide from '../lib/ide';
import State from '../lib/state';

export default (state: State) => () => {
  if (!ide.getUserToken()) {
    ide.ShowError(
      "You are not LoggedIn. Use 'Trello: Login' command to Login."
    );
  } else {
    state.trello
      .getMyBoards()
      .then(() => ide.ShowBoards(state.trello.boards, state.trello.boardsIDs))
      .then(selectedBoard => {
        state.trello.currentBID = selectedBoard;
        return state.trello.getBoardLists(selectedBoard);
      })
      .then(() => ide.ShowLists(state.trello.lists, state.trello.listsIDs))
      .then(selectedList => {
        state.trello.currentLID = selectedList;
        return state.trello.getAllCards(selectedList);
      })
      .then(() => ide.ShowCards(state.trello.cards, state.trello.cardsIDs))
      .then(selectedCard => {
        state.trello.setCurCardID(selectedCard || '');
        ide.displayCardOnBottom(selectedCard || '');
        // return true;
      })
      .catch(console.error);
  }
};
