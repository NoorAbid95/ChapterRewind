import {describe, it, expect, beforeEach} from 'vitest'
import useAuthStore from './useAuthStore'

beforeEach(() => {
    const {setUser, setLoading, clearUser} = useAuthStore.getState()
    clearUser()
    setLoading(null)
})

describe("useAuthStore", () =>{
    it("should have initial state: user and loading are null", () =>{
        const state = useAuthStore.getState()
        expect(state.user).toBe(null)
        expect(state.isLoading).toBe(null)
    })
    
    it("should update the user with setUser()", () =>{
        const dummyUser = {id: 1, name: "Test User"}
        useAuthStore.getState().setUser(dummyUser)
        expect(useAuthStore.getState().user).toEqual(dummyUser)
    })

    it("should return true from isAuthenticated() if user is set", () =>{
        const dummyUser = {id: 2, name: "Authenticated user"}
        useAuthStore.getState().setUser(dummyUser)
        expect(useAuthStore.getState().isAuthenticated()).toBe(true)
    })

    it("should return false from isAuthenticated if user is null", () =>{
        useAuthStore.getState().clearUser()
        expect(useAuthStore.getState().isAuthenticated()).toBe(false)
    })

    it("should update loading with setLoading()", () =>{
        useAuthStore.getState().setLoading(true)
        expect(useAuthStore.getState().isLoading).toBe(true)
        useAuthStore.getState().setLoading(false)
        expect(useAuthStore.getState().isLoading).toBe(false)
    })

    it("should clear user with clearUser()", () =>{
        const dummyUser = {id: 3, name: "Clear user test"}
        useAuthStore.getState().setUser(dummyUser)
        useAuthStore.getState().clearUser()
        expect(useAuthStore.getState().user).toBe(null)
    })
})