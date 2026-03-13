const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {

    selectFile: () => ipcRenderer.invoke("select-file"),

    selectFolder: () => ipcRenderer.invoke("select-folder"),

    runPEPK: (data) => ipcRenderer.invoke("run-pepk", data),

    checkJava: () => ipcRenderer.invoke("check-java"),
})