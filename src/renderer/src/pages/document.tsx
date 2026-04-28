import { useParams } from "react-router-dom"
import { Editor, OnContentUpdatedParams } from "../components/Editor"
import { ToC } from "../components/ToC"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Document as TDocument } from "@shared/types/ipc"

export function Document() {
    const { id } = useParams<{ id: string }>()

    const queryClient = useQueryClient()

    const { data, isFetching } = useQuery({
        queryKey: [`document-${id}`],
        queryFn: async () => {
            const response = await window.api.fetchDocument({ id: id ?? "" })
            return response.data
        },
        enabled: !!id
    })

    const { mutateAsync: saveDocument } = useMutation({
        mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
            await window.api.saveDocument({ content, title, id: id! })
        },
        onSuccess: (_, { title }) => {
            queryClient.setQueryData<TDocument[]>(['documents'], (documents) => {
                return documents?.map((document) => {
                    if (document.id === id) return { ...document, title }

                    return document
                })
            })
        }
    })

    const initialContent = data ? `
        <h1>${data?.title}</h1>${data.content ?? '<p></p>'}
    ` : `<h1>Untitled</h1>`

    function handleEditorContentUpdated({ content, title }: OnContentUpdatedParams) {
        saveDocument({ content, title })
    }

    return (
        <main className="flex flex-1 py-12 px-10 gap-8">
            <aside className="hidden lg:block sticky top-0">
                <span className="text-rotion-300 font-semibold uppercase text-xs">TABLE OF CONTENTS</span>
                <ToC.Root>
                    <ToC.Link>
                        Back-end
                    </ToC.Link>
                    <ToC.Section>
                        <ToC.Link>
                            Banco de dados
                        </ToC.Link>
                    </ToC.Section>
                </ToC.Root>
            </aside>

            <section className="flex-1 leading-relaxed flex flex-col items-center">
                {!isFetching && data && <Editor onContentUpdated={handleEditorContentUpdated} content={initialContent} />}
            </section>
        </main>
    )
}