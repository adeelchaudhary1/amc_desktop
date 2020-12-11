/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import path from "path";
import { app, Menu, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

export default class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_PROD === "true"
) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "resources")
    : path.join(__dirname, "../resources");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 1024,
    icon: getAssetPath("icon.png"),
    webPreferences:
      (process.env.NODE_ENV === "development" ||
        process.env.E2E_BUILD === "true") &&
        process.env.ERB_SECURE !== "true"
        ? {
          nodeIntegration: true,
        }
        : {
          preload: path.join(__dirname, "dist/renderer.prod.js"),
        },
  });
  console.log(`file://${__dirname}/app.html`);
  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on("menu-item-show", (event, data) => {
    console.log("menu HIT")
    buildDefaultTemplate(data, mainWindow);
  });

  ipcMain.on("logout", (event, data) => {
    app.quit();
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

let template = [];

const buildDefaultTemplate = (data, browserWindow) => {
  if (process.platform === 'darwin') {
    template = [
      {
        label: "Dashboard",
        enabled: false,
        click() {
          mainWindow.webContents.send("navigate", "/dashboard");
        },
      },
      // { role: 'viewMenu' }
      {
        label: "Transaction",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/pending-transactions");
        }
      },
      {
        label: "Concerned Officer",
        enabled: true,
        submenu: [
          {
            click() {
              console.log("Click");
              mainWindow.webContents.send("navigate", "/officer-listing");
            },
            enabled: true,
            label: "Listing",
          },
          {
            enabled: true,
            click() {
              console.log("Click");
              mainWindow.webContents.send("navigate", "/authorizer-listing");
            },
            label: "Authorizer",
          },
        ],
      },
      {
        label: "Create Transaction",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/txn-type");
        }
      },
      {
        label: "Rejected",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/rejected-transactions");
        }
      },
      {
        label: "Reviewer",
        enabled: true,
        submenu: [
          {
            label: "AMC-Client",
            enabled: true,
            click() {
              mainWindow.webContents.send("navigate", "/amc-client");
            }
          },
          {
            label: "Authorizer-A",
            enabled: true,
            click() {
              mainWindow.webContents.send("navigate", "/comp-sign-transactions/signatory-a");
            }
          },
          {
            label: "Authorizer-B",
            enabled: true,
            click() {
              mainWindow.webContents.send("navigate", "/comp-sign-transactions/signatory-b");
            }
          },
        ]
      },
      {
        label: "Dev Tools",
        enabled: true,
        submenu: [
          {
            role: "reload",
          },
          {
            role: "forcereload",
          },
          {
            role: "toggledevtools",
          },
          {
            type: "separator",
          },
          {
            role: "resetzoom",
          },
          {
            role: "zoomin",
          },
          {
            role: "zoomout",
          },
          {
            type: "separator",
          },
          {
            role: "togglefullscreen",
          },
        ],
      },
    ];
  } else {
    template = [
      {
        label: "Dashboard",
        enabled: false,
        click() {
          mainWindow.webContents.send("navigate", "/dashboard");
        },
      },
      // { role: 'viewMenu' }
      {
        label: "Transaction",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/pending-transactions");
        }
        // submenu: [
        //   {
        //     enabled: false,
        //     label: "Pending Transaction",
        //     click() {
        //       mainWindow.webContents.send("navigate", "/pending-transactions");
        //     }
        //   },
        // ],
      },
      {
        label: "Concerned Officer",
        enabled: true,
        submenu: [
          {
            click() {
              console.log("Click");
              mainWindow.webContents.send("navigate", "/officer-listing");
            },
            enabled: true,
            label: "Listing",
          },
          {
            enabled: true,
            click() {
              console.log("Click");
              mainWindow.webContents.send("navigate", "/authorizer-listing");
            },
            label: "Authorizer",
          },
        ],
      },
      {
        label: "Create Transaction",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/txn-type");
        }
      },
      {
        label: "Rejected",
        enabled: true,
        click() {
          mainWindow.webContents.send("navigate", "/rejected-transactions");
        }
      },
      {
        label: "AMC-Client",
        enabled: false,
        click() {
          mainWindow.webContents.send("navigate", "/amc-client");
        }
      },

      {
        label: "Authorizer-A",
        enabled: false,
        click() {
          mainWindow.webContents.send("navigate", "/comp-sign-transactions/signatory-a");
        }
      },
      {
        label: "Authorizer-B",
        enabled: false,
        click() {
          mainWindow.webContents.send("navigate", "/comp-sign-transactions/signatory-b");
        }
      },
      {
        label: "Dev Tools",
        enabled: true,
        submenu: [
          {
            role: "reload",
          },
          {
            role: "forcereload",
          },
          {
            role: "toggledevtools",
          },
          {
            type: "separator",
          },
          {
            role: "resetzoom",
          },
          {
            role: "zoomin",
          },
          {
            role: "zoomout",
          },
          {
            type: "separator",
          },
          {
            role: "togglefullscreen",
          },
        ],
      },
    ];
  }
  const isMac = process.platform === "darwin";
  const featuesList = JSON.parse(data.features);
  let labelArr = [];
  for (let index = 0; index < featuesList.length; index++) {
    for (let j_index = 0; j_index < template.length; j_index++) {
      const result = searchTree(template[j_index], featuesList[index].feature);
      if (result !== null) {
        labelArr.push(result.label);
        break;
      }
    }
  }
  template.forEach(function iter(a) {
    if (labelArr.includes(a.label)) {
      a.enabled = true;
    }
    Array.isArray(a.children) && a.children.forEach(iter);
  });
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

const searchTree = (element, matchingTitle) => {
  if (element.label === matchingTitle) {
    element.enabled = true;
    return element;
  } else if (element.submenu != null) {
    var i;
    var result = null;
    for (let i = 0; result == null && i < element.submenu.length; i++) {
      result = searchTree(element.submenu[i], matchingTitle);
    }
    return result;
  }
  return null;
}


/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (process.env.E2E_BUILD === "true") {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow);
} else {
  app.on("ready", createWindow);
}

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
