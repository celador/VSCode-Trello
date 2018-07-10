import * as vsInterface from '../lib/vscodeInteractions';

export default function closeCurrentCard(state) {
  return () => {
    if (!state.client || !state.client.currentCID) {
      vsInterface.ShowError('You need to get a card to work on.');
    } else {
      state.client._closeCard();
      vsInterface.AddToBar('Select a Card', '', '', '', '$(terminal)');
    }
  };
}
