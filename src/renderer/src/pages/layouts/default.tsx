import * as Collapsible from '@radix-ui/react-collapsible'

import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useState } from 'react';

export function Default() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

    return (
        <Collapsible.Root
            className="w-screen h-screen bg-rotion-900 text-rotion-100 flex"
            onOpenChange={setIsSidebarOpen}
            open={isSidebarOpen}
        >
            <Sidebar />
            <div className="flex flex-col flex-1 max-h-screen">
                <Header isSidebarOpen={isSidebarOpen} />
                <Outlet />
            </div>
        </Collapsible.Root>

    )
}