import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ChatBotPage from './pages/ChatBotPage'
import CameraPage from './pages/CameraPage'
import CommunityPage from './pages/CommunityPage'
import SignUpPage from './pages/SignUpPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostPage from './pages/PostPage'
import UnauthLayout from './layouts/UnauthLayout'
import ModelProvider from './providers/ModelProvider'
import HelpUsImprovePage from './pages/HelpUsImprovePage'
import HelpPage from './pages/HelpPage'

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <ModelProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route Component={UnauthLayout}>
                                <Route path='/' Component={LoginPage} />
                                <Route path='/register' Component={SignUpPage} />
                            </Route>
                            <Route path='/app' Component={AppLayout}>
                                <Route path='improve' Component={HelpUsImprovePage} />
                                <Route path='help' Component={HelpPage} />
                                <Route path='camera' Component={CameraPage} />
                                <Route index Component={HomePage} />
                                <Route path='chatbot' Component={ChatBotPage} />
                                <Route path='community' Component={CommunityPage} />
                                <Route path='post/:id' Component={PostPage} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ModelProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}
