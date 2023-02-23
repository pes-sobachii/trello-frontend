import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";

import './index.css'
import Board from './Pages/Board/Board'

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 60000}},
});

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Board/>
        </QueryClientProvider>
    </React.StrictMode>
)
