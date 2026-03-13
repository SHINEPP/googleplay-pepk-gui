const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

const java = require("./core/java")
const pepk = require("./core/pepk")

function createWindow() {

    const win = new BrowserWindow({
        width: 520,
        height: 820,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile("renderer/index.html")

    // 调试用
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

ipcMain.handle("select-file", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile"]
    })
    if (result.canceled) return ""
    return result.filePaths[0]
})

ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    })
    if (result.canceled) return ""
    return result.filePaths[0]
})

ipcMain.handle("check-java", java.check)

ipcMain.handle("run-pepk", pepk.run)