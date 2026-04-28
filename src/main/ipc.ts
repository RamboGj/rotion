import { ipcMain } from "electron"

ipcMain.handle("fetch-documents", async (_) => {
    return [
        { id: "123", title: "Test doc" },
        { id: "321", title: "Test New" },
        { id: "222", title: "Test Two" },
        { id: "111", title: "Test Three" },
    ]
})
