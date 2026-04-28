import { QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./Routes";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}