import { app, BrowserWindow, dialog, ipcMain } from "electron"
import path from "path"

import * as java from "./core/java.js"
import * as pepk from "./core/pepk.js"

import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow() {

    const win = new BrowserWindow({
        width: 520,
        height: 820,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false  // ✅ 添加这一行，允许 preload 使用 require
        }
    })

    win.loadFile("src/renderer/index.html")

    // 调试用
    win.webContents.openDevTools()
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