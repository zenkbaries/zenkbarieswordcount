'use babel';

import ZenkbarieswordcountView from './zenkbarieswordcount-view';
import { CompositeDisposable } from 'atom';

export default {

  zenkbarieswordcountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.zenkbarieswordcountView = new ZenkbarieswordcountView(state.zenkbarieswordcountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.zenkbarieswordcountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zenkbarieswordcount:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.zenkbarieswordcountView.destroy();
  },

  serialize() {
    return {
      zenkbarieswordcountViewState: this.zenkbarieswordcountView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.ZenkbarieswordcountView.setCount(words);
      this.modalPanel.show();
  }
      // console.log('Zenkbarieswordcount was toggled!');
      // return (
      //   this.modalPanel.isVisible() ?
      //   this.modalPanel.hide() :
      //   this.modalPanel.show()
      // );
    }

};
