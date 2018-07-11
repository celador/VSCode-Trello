import * as ide from '../lib/ide';
import State from '../lib/state';

export default ({ trello }: State) =>
  function() {
    const userToken = ide.getUserToken();
    if (!userToken) {
      ide.ShowError(
        "You are not LoggedIn. Use 'Trello: Login' command to Login."
      );
    } else if (trello) {
      trello
        .getMyBoards()
        .then(() => ide.ShowBoards(trello.boards, trello.boardsIDs))
        .then(selectedBoard => {
          trello.currentBID = selectedBoard;
          return trello.getBoardLists(selectedBoard);
        })
        .then(() => ide.ShowLists(trello.lists, trello.listsIDs))
        .then(selectedList => {
          trello.currentLID = selectedList;
          return trello.getAllCards(selectedList);
        })
        .then(() => ide.ShowCards(trello.cards, trello.cardsIDs))
        .then(selectedCard => {
          trello.setCurCardID(selectedCard || '');
          ide.displayCardOnBottom(selectedCard || '');
          // return true;
        })
        .catch(console.error);
    }
  };
