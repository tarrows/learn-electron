import {
  app, App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron'

class MainApp {
  private mainWindow: BrowserWindow | null = null;
  private app: App;
  private mainURL: string = `file://${__dirname}/index.html`

  constructor(app: App) {
    this.app = app;
    this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    this.app.on('ready', this.create.bind(this));
    this.app.on('activate', this.onActivated.bind(this));
  }

  private create() {
    const options: BrowserWindowConstructorOptions = {
      width: 800,
      height: 400,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      titleBarStyle: 'hidden',
    }
    this.mainWindow = new BrowserWindow(options);
    this.mainWindow.loadURL(this.mainURL);
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create();
    }
  }

  private onReady() { this.create(); }

  private onWindowAllClosed() {
    this.app.quit();
  }

}

const MyApp = new MainApp(app);
