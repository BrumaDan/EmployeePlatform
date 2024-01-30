import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


export type State = { 
    userName: string
    token: string
    isAuthenticated: boolean
    role: string[]
}
// define the initial state
const initialState: State = {
    userName: '',
    isAuthenticated: false,
    token: '',
    role: []
}

type Action = {
    setUserName: (userName: State['userName']) => void
    setIsAuthenticated: (isAuthenticated: State['isAuthenticated']) => void
    setToken: (token: State['token']) => void
    setRole: (role: State['role']) => void
    reset: () => void
}

export const useAuthStore = create<State & Action>()(
    devtools(
        persist(
            (set) => ({
            ...initialState,
                setToken: (inputToken: string) => set(() => ({ token: inputToken })),
                setRole: (inputRole: string[]) => set(() => ({ role: inputRole })),
                setUserName: (inputUserName: string) => set(() => ({ userName: inputUserName })),
                setIsAuthenticated: (input: boolean) => set(() => ({ isAuthenticated: input })),
                reset: () => {
                    set(initialState)
                },
            }),
            { name: 'authStore' },
        ),
    ),
)



