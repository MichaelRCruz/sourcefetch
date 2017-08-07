'use babel';

// import SourcefetchView from './sourcefetch-view';
import { CompositeDisposable } from 'atom';
import request from 'request';
import cheerio from 'cheerio';

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
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      this.download(selection).then((html) => {
        let answer = self.scrape(html)
        if (answer === '') {
          atom.notifications.addWarning('No answer found :(')
        } else {
          editor.insertText(answer)
        }
      }).catch((error) => {
        console.log(error)
        atom.notifications.addWarning(error.reason)
      })
    }
  },

  scrape(html) {
    $ = cheerio.load(html)
    return $('div.accepted-answer pre code').text()
  },

  // download(url) {
  //   request(url, (error, response, body) => {
  //     if (!error && response.statusCode == 200) {
  //       console.log(body);
  //     }
  //   })
  // }

  download(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject({
            reason: 'Unable to download page'
          })
        }
      })
    })
  }

};
