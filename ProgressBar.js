const {BrowserWindow, ipcMain} = require('electron');

module.exports = class ProgressBar {
  _title = 'In progress'

  _options = {
    indeterminate: true,
    text: 'In progress',
    detail: '‎',
    value: 0,
    maximum: 0,
  };

  constructor(options) {
    for (const o in options) {
      this._options[o] = options[o];
    }

    this.window = new BrowserWindow({
      width: 500,
      height: 200,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    ipcMain.on('resize-window', (_, arg) => {
      this.window.setSize(500, arg);
    });
    this.window.loadURL(`file://${__dirname}/progress_page/index.html`);
    // this.window.loadURL(`http://localhost:3000`);

    this.window.webContents.on('did-finish-load', () => {
      this.window.setTitle(this._title);
      for (const o in this._options) {
        this.window.webContents.send(o, this._options[o]);
      }
    });
  }

  set title(newValue) {
    this._title = newValue;
    this.window.setTitle(newValue);
  }
  get title(){
    return this._title;
  }

  set text(newValue) {
    this._options.text = newValue
    this.window.webContents.send('text', newValue);
  }
  get text(){
    return this._options.text;
  }

  set detail(newValue) {
    this._options.detail = newValue
    this.window.webContents.send('detail', newValue);
  }
  get detail(){
    return this._options.detail;
  }

  set value(newValue) {
    this._options.value = newValue
    this.window.webContents.send('value', newValue);
  }
  get value(){
    return this._options.value;
  }

  set maximum(newValue) {
    this._options.maximum = newValue
    this.window.webContents.send('maximum', newValue);
  }
  get maximum(){
    return this._options.maximum;
  }

  set indeterminate(newValue) {
    this._options.indeterminate = newValue
    this.window.webContents.send('indeterminate', newValue);
  }
  get indeterminate(){
    return this._options.indeterminate;
  }
}
