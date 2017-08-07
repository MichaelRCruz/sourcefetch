'use babel';

// import SourcefetchView from './sourcefetch-view';
import { CompositeDisposable } from 'atom';

export default {

  // sourcefetchView: null,
  // modalPanel: null,
  subscriptions: null,

  activate() {
    // this.sourcefetchView = new SourcefetchView(state.sourcefetchViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.sourcefetchView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sourcefetch:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    // this.sourcefetchView.destroy();
  },

  // serialize() {
  //   return {
  //     sourcefetchViewState: this.sourcefetchView.serialize()
  //   };
  // },

  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      selection = selection.split('').reverse().join('')
      editor.insertText(selection)
    }
  }
};
