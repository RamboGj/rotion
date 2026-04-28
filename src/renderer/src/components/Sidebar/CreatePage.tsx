import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { Document } from '@shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()

  const { mutateAsync: createDocument, isPending: isCreatingDocument } = useMutation({
    // mutationKey: [IPC.DOCUMENTS.CREATE],
    mutationFn: async () => {
      const result = await window.api.createDocument()
      return result.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Document[]>(["documents"], (documents) => {
        if (documents && documents?.length >= 0) {
          return [
            ...documents,
            data
          ]
        }

        return [data]
      })
    }
  })

  return (
    <button
      disabled={isCreatingDocument}
      onClick={() => createDocument()}
      className="flex w-[240px] px-5 items-center hover:cursor-pointer text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Create new page
    </button>
  )
}
