/**
 * @file useUser.js
 * @description
 * React hook for managing authenticated user account actions.
 * Encapsulates API access to `UserController`, providing:
 * - Account deletion
 * - Shared `isLoading` and `error` state
 *
 * This hook uses `UserAPI` internally and prepares for future expansion
 * (e.g., update email, change password, etc.).
 *
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.7.0
 */

import {useCallback} from 'react';
import {UserAPI} from '@/api/restApi';
import {useApiUtils} from '@/utils/apiUtils';

/**
 * User account management hook scoped to the authenticated session.
 *
 * @returns {{
 *   deleteUser: () => Promise<string>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 * @example
 * const { deleteUser, isLoading, error } = useUser();
 *
 * try {
 *   const message = await deleteUser();
 *   console.log(message); // e.g., "User deleted successfully"
 * } catch (err) {
 *   console.error('Failed to delete user:', err);
 * }
 */
export function useUser() {
    const { handleRequest, isLoading, error } = useApiUtils();

    /**
     * Deletes the currently authenticated user's account.
     *
     * @returns {Promise<string>} Confirmation message from the backend.
     * @throws unknown - If the user is not authorized or deletion fails.
     * @example
     * const { deleteUser } = useUser();
     * await deleteUser();
     */
    const deleteUser = useCallback(() => handleRequest(() => UserAPI.deleteUser()), [handleRequest]);

    return {deleteUser, isLoading, error};
}