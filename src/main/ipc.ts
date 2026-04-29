import { ipcMain } from "electron"
import { randomUUID } from "node:crypto"
import { IPC } from "@shared/constants/ipc"
import { CreateDocumentResponse, DeleteDocumentRequest, Document, FetchAllDocumentsResponse, FetchDocumentRequest, FetchDocumentResponse, SaveDocumentRequest } from "@shared/types/ipc"
import { store } from "./store"

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async (_): Promise<FetchAllDocumentsResponse> => {
    return {
        data: Object.values(store.get("documents"))
    }
  
})

ipcMain.handle(IPC.DOCUMENTS.FETCH, async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document

    return {
        data: document
    }
  
})

ipcMain.handle(IPC.DOCUMENTS.CREATE, async (_): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: Document = {
        id,
        title: "Untitled",
        content: ""
    }

    store.set(`documents.${id}`, document)

    return {
        data: document
    }
  
})


ipcMain.handle(IPC.DOCUMENTS.SAVE, async (_, { content, id, title }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
        content,
        id,
        title
    })
})

ipcMain.handle(IPC.DOCUMENTS.DELETE, async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-ignore
    store.delete(`documents.${id}`)
})

