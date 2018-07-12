import Client from '../app/client';

export default (client: Client) =>
  function() {
    const { code } = client;
    const userToken = code.getUserToken();
    if (!userToken) {
      code.ShowError(
        "You are not LoggedIn. Use 'Trello: Login' command to Login."
      );
    } else {
      client
        .getMyBoards()
        .then(() => code.ShowBoards(client.boards, client.boardsIDs))
        .then(selectedBoard => {
          client.currentBID = selectedBoard;
          return client.getBoardLists(selectedBoard);
        })
        .then(() => code.ShowLists(client.lists, client.listsIDs))
        .then(selectedList => {
          client.currentLID = selectedList;
          return client.getAllCards(selectedList);
        })
        .then(() => code.ShowCards(client.cards, client.cardsIDs))
        .then(selectedCard => {
          client.setCurCardID(selectedCard || '');
          code.displayCardOnBottom(selectedCard || '');
        })
        .catch(code.ShowError);
    }
  };
