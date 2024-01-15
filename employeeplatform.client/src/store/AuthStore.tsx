import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
    userName: string 
    token: string
    isAuthenticated: boolean
    role:string[]
}

type Action = {
    setUserName: (userName: State['userName']) => void
    setIsAuthenticated: (isAuthenticated: State['isAuthenticated']) => void
    setToken: (token: State['token']) => void
    setRole: (role: State['role']) => void
}

const useAuthStore = create<State & Action>()(
    devtools(
        persist(
            (set) => ({
                userName: '',
                isAuthenticated: false,
                token: '',
                role: [],
                setToken: (inputToken: string) => set(() => ({ token: inputToken })),
                setRole: (inputRole: string[]) => set(() => ({ role: inputRole })),
                setUserName: (inputUserName: string) => set(() => ({ userName: inputUserName })),
                setIsAuthenticated: (input: boolean) => set(() => ({ isAuthenticated: input })),
            }),
            { name: 'authStore' },
        ),
    ),
)
    

export default useAuthStore;
