import {
    app,
    Menu,
    shell,
    BrowserWindow,
    MenuItemConstructorOptions
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
    selector ? : string;
    submenu ? : DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        console.log(mainWindow);
        this.mainWindow = mainWindow;
    }

    buildMenu(data): Menu {
        if (
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
        ) {
            this.setupDevelopmentEnvironment();
        }
        console.log(data);
        
            process.platform === 'darwin' ?
            this.buildDefaultTemplate(data) :
            this.buildDefaultTemplate(data);
    }

    setupDevelopmentEnvironment(): void {
        this.mainWindow.webContents.on('context-menu', (_, props) => {
            const {
                x,
                y
            } = props;

            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click: () => {
                    this.mainWindow.webContents.inspectElement(x, y);
                },
            }, ]).popup({
                window: this.mainWindow
            });
        });
    }

    buildDarwinTemplate(): MenuItemConstructorOptions[] {
        const subMenuAbout: DarwinMenuItemConstructorOptions = {
            label: 'Electron',
            submenu: [{
                    label: 'About ElectronReact',
                    selector: 'orderFrontStandardAboutPanel:',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ElectronReact',
                    accelerator: 'Command+H',
                    selector: 'hide:',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:',
                },
                {
                    label: 'Show All',
                    selector: 'unhideAllApplications:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        };
        const subMenuEdit: DarwinMenuItemConstructorOptions = {
            label: 'Edit',
            submenu: [{
                    label: 'Undo',
                    accelerator: 'Command+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+Command+Z',
                    selector: 'redo:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'Command+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'Command+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'Command+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:',
                },
            ],
        };
        const subMenuViewDev: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [{
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        this.mainWindow.webContents.reload();
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                    },
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        this.mainWindow.webContents.toggleDevTools();
                    },
                },
            ],
        };
        const subMenuViewProd: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [{
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                },
            }, ],
        };
        const subMenuWindow: DarwinMenuItemConstructorOptions = {
            label: 'Window',
            submenu: [{
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:',
                },
                {
                    label: 'Close',
                    accelerator: 'Command+W',
                    selector: 'performClose:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
                },
            ],
        };
        const subMenuHelp: MenuItemConstructorOptions = {
            label: 'Help',
            submenu: [{
                    label: 'Learn More',
                    click() {
                        shell.openExternal('https://electronjs.org');
                    },
                },
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal(
                            'https://github.com/electron/electron/tree/master/docs#readme'
                        );
                    },
                },
                {
                    label: 'Community Discussions',
                    click() {
                        shell.openExternal('https://www.electronjs.org/community');
                    },
                },
                {
                    label: 'Search Issues',
                    click() {
                        shell.openExternal('https://github.com/electron/electron/issues');
                    },
                },
            ],
        };

        const subMenuView =
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true' ?
            subMenuViewDev :
            subMenuViewProd;

        return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
    }

    buildDefaultTemplate(data, browserWindow) {
        const isMac = process.platform === 'darwin'
        if (data === 'Admin') {
            const template = [{
                    label: 'Dashboard'
                },
                // {
                //     label: 'Management',
                //     submenu: [{
                //             label: 'Setup',
                //             submenu: [{
                //                     label: 'AMC',
                //                     click() {
                //                         console.log(browserWindow);
                //                         browserWindow.webContents.send('navigate', '/setup')
                //                     }
                //                 },
                //                 {
                //                     label: 'Funds',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-funds')
                //                     }
                //                 },
                //                 {
                //                     label: 'Bank',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-bank')
                //                     }
                //                 },
                //                 {
                //                     label: 'Branches',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-branches')
                //                     }
                //                 },
                //                 {
                //                     label: 'Bank Accounts',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-accounts')
                //                     }
                //                 },
                //                 {
                //                     label: 'Clients',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-clients')
                //                     }
                //                 },
                //                 {
                //                     label: 'Modes of Transaction',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-nature')
                //                     }
                //                 },
                //                 {
                //                     label: 'Tax',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-tax')
                //                     }
                //                 },
                //                 {
                //                     label: 'Securities',
                //                     click() {
                //                         console.log('Click');
                //                         browserWindow.webContents.send('navigate', '/setup-security')
                //                     }
                //                 }
                //             ]
                //         },
                //         {
                //             type: 'separator'
                //         },
                //         {
                //             label: 'User Management',
                //             click() {
                //                 console.log('Click');
                //                 browserWindow.webContents.send('navigate', '/user-management')
                //             }
                //         },
                //         {
                //             label: 'Role Management',
                //             click() {
                //                 console.log('Click');
                //                 browserWindow.webContents.send('navigate', '/role-management')
                //             }
                //         },
                //     ]
                // },
                // { role: 'viewMenu' }
                {
                    label: 'Transaction',
                    submenu: [{
                            label: 'Create Transaction',
                            click() {
                                console.log('Click');
                                browserWindow.webContents.send('navigate', '/txn-type')
                            }
                        },
                        {
                            role: 'reload',
                            label: 'Concerned Officer'
                        },
                        {
                            role: 'reload',
                            label: 'Pending Transactions'
                        },
                    ]
                },
                {
                    label: 'AMC-Client',
                },
                {
                    label: 'Authorizer A',
                },
                {
                    label: 'Authorizer B',
                },
                {
                    label: 'Dev Tools',
                    submenu: [{
                            role: 'reload'
                        },
                        {
                            role: 'forcereload'
                        },
                        {
                            role: 'toggledevtools'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'resetzoom'
                        },
                        {
                            role: 'zoomin'
                        },
                        {
                            role: 'zoomout'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'togglefullscreen'
                        }
                    ]
                }
            ]
            const menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        } else {
            const template = [
                // { role: 'appMenu' }
                ...(isMac ? [{
                    label: app.name,
                    submenu: [{
                            role: 'about'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'services'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'hide'
                        },
                        {
                            role: 'hideothers'
                        },
                        {
                            role: 'unhide'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'quit'
                        }
                    ]
                }] : []),
                // { role: 'fileMenu' }
                {
                    label: 'Amc System',
                    submenu: [
                        isMac ? {
                            role: 'close'
                        } : {
                            role: 'quit'
                        }
                    ]
                },
                {
                    label: 'Transaction',
                    submenu: [{
                            label: 'Create Transaction',
                            click() {
                                console.log(browserWindow);
                                browserWindow.webContents.send('navigate', '/txn-type')
                            }
                        },
                        {
                            label: 'Concerned Officer'
                        },
                        {
                            label: 'Pending Transactions'
                        },
                    ]
                },
                {
                    label: 'Dev Tools',
                    submenu: [{
                            role: 'reload'
                        },
                        {
                            role: 'forcereload'
                        },
                        {
                            role: 'toggledevtools'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'resetzoom'
                        },
                        {
                            role: 'zoomin'
                        },
                        {
                            role: 'zoomout'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            role: 'togglefullscreen'
                        }
                    ]
                }
            ]
            const menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        }
    }
}