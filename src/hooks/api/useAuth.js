/**
 * @file useAuth.js
 * @description
 * React hook for handling user authentication logic, including login and registration.
 * Integrates with `AuthAPI` and manages form state such as loading and errors.
 *
 * This hook wraps asynchronous calls to the backend via REST and exposes
 * a clean interface for components that require authentication workflows.
 *
 * Includes:
 * - Login via `AuthAPI.login()`
 * - Registration via `AuthAPI.register()`
 * - Token renewal via `AuthAPI.refresh()`
 * - Shared `loading` and `error` state
 *
 * All data structures used in this hook are defined in `dtoTypes.js`.
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback} from 'react';
import {AuthAPI} from '@/api/restApi';
import {useApiUtils} from '@/utils/apiUtils'

/**
 * @typedef {import('@/api/dtoTypes').LoginCredentials}
 * @typedef {import('@/api/dtoTypes').RegisterCredentials}
 * @typedef {import('@/api/dtoTypes').AuthResponse}
 */

/**
 * Authentication hook for handling user login and registration.
 *
 * Provides shared state (`loading`, `error`) and API-bound functions for:
 * - Logging in existing users
 * - Registering new accounts
 *
 * @returns {{
 *   login: (credentials: LoginCredentials) => Promise<AuthResponse>,
 *   register: (credentials: RegisterCredentials) => Promise<AuthResponse>,
 *   refresh: (refreshToken: string) => Promise<RefreshResponse>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 * @example
 * const { login, register, loading, error } = useAuth();
 *
 * await register(registerData);
 * await login(loginData);
 */
export function useAuth() {
    const { handleRequest, isLoading, error } = useApiUtils();

    /**
     * Logs in an existing user using their credentials.
     *
     * @param {LoginCredentials} credentials - Object containing email and password.
     * @returns {Promise<AuthResponse>} Resolves with user token payload if successful.
     * @throws unknown - Will throw if the request fails (e.g., 401 Unauthorized).
     * @example
     * const { login, loading, error } = useAuth();
     * try {
     *   const response = await login({ email: 'user@example.com', password: 'secret' });
     *   console.log('Access token:', response.accessToken);
     * } catch (err) {
     *   console.error('Login failed:', err);
     * }
     */
    const login = useCallback((credentials) => handleRequest(() => AuthAPI.login(credentials)), [handleRequest])

    /**
     * Registers a new user account using credentials.
     *
     * @param {RegisterCredentials} credentials - Object with email, password, and confirmation.
     * @returns {Promise<AuthResponse>} Resolves with user token payload on success.
     * @throws unknown - Will throw if the request fails or validation errors occur.
     * @example
     * const { register, loading, error } = useAuth();
     * try {
     *   const response = await register({
     *     email: 'newuser@example.com',
     *     password: 'strongPassword123',
     *     passwordConfirmation: 'strongPassword123'
     *   });
     *   console.log('Registered user:', response.email);
     * } catch (err) {
     *   console.error('Registration failed:', err.message);
     * }
     */
    const register = useCallback((credentials) => handleRequest(() => AuthAPI.register(credentials)), [handleRequest]);


    /**
     * Requests a new access token using a refresh token.
     *
     * @param {string} refreshToken - The previously issued refresh token.
     * @returns {Promise<RefreshResponse>} Contains the new access token and refresh token.
     * @throws unknown - Will throw if the refresh token is invalid or expired.
     * @example
     * const { refresh } = useAuth();
     * const tokens = await refresh(localStorage.getItem('refreshToken'));
     * localStorage.setItem('accessToken', tokens.token);
     */
    const refresh = useCallback((refreshToken) => handleRequest(() => AuthAPI.refresh(refreshToken)), [handleRequest]);

    return {login, register, refresh, isLoading, error};
}