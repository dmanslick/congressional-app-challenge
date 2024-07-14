import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ChatBotPage from './pages/ChatBotPage'
import HelpPage from './pages/HelpPage'
import CameraPage from './pages/CameraPage'
import CommunityPage from './pages/CommunityPage'
import SignUpPage from './pages/SignUpPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostPage from './pages/PostPage'

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <HashRouter>
                    <Routes>
                        <Route path='/' Component={LoginPage} />
                        <Route path='/register' Component={SignUpPage} />
                        <Route path='/app' Component={AppLayout}>
                            <Route path='help' Component={HelpPage} />
                            <Route path='camera' Component={CameraPage} />
                            <Route index Component={HomePage} />
                            <Route path='chatbot' Component={ChatBotPage} />
                            <Route path='community' Component={CommunityPage} />
                            <Route path='post/:id' Component={PostPage} />
                        </Route>
                    </Routes>
                </HashRouter>
            </ChakraProvider>
        </QueryClientProvider>
    )
}
