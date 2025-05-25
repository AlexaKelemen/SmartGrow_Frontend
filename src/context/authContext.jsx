/**
 * @file authContext.jsx
 * @description Provides global authentication context and access hooks for the SmartGrow application.
 *
 * This module defines a React Context used to manage authentication state across the app.
 * It includes an `AuthProvider` component to wrap the application and a `useAuth` hook
 * for accessing the authentication state and login/logout functions.
 *
 * The authentication state is backed by `localStorage` via the `accessToken` key.
 * If an access token is found on the load, it is used as the initial `user` state.
 *
 * @version 1.0.0
 * @since 0.8.0
 * @author Taggerkov
 */

import {createContext, useContext, useState} from 'react';

// Defines the authentication context structure; initialized as null to enforce scoped usage within <AuthProvider>.
const AuthContext = createContext(null);

/**
 * Provides authentication context to its children.
 *
 * Initializes the authentication state using a locally stored access token.
 * Provides `login` and `logout` methods to update the state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The children components that will have access to the auth context.
 * @returns {JSX.Element} The context provider with `user`, `login`, and `logout` available to consumers.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
    const stored = localStorage.getItem('accessToken');
    const [user, setUser] = useState(stored && stored !== 'null' ? stored : null);
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


/**
 * Custom hook for accessing authentication context.
 *
 * Must be used within a child of `AuthProvider`. Throws an error if used outside.
 *
 * @returns {{ user: string | null, login: Function, logout: Function }} Authentication state and methods.
 * @throws {Error} If used outside an `AuthProvider`.
 *
 * @example
 * const { user, login, logout } = useAuth();
 */
export function checkAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider!');
    return context;
}