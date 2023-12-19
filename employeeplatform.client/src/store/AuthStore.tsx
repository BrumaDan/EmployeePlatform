import { create } from 'zustand'
type State = {
    userName: string 
    token: string
    isAuthenticated: boolean
}

type Action = {
    setUserName: (userName: State['userName']) => void
    setIsAuthenticated: (isAuthenticated: State['isAuthenticated']) => void
    setToken: (token: State['token']) => void
}
const useAuthStore = create <State & Action>((set) => ({
    userName: '',
    isAuthenticated: false,
    token: '',
    setToken: (inputToken: string) => set(() => ({ token: inputToken })),
    setUserName: (inputUserName: string) => set(() => ({ userName: inputUserName })),
    setIsAuthenticated: (input: boolean) => set(() => ({ isAuthenticated: input })),
}))

export default useAuthStore;
