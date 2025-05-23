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
 * @author Taggerkov and SophiaJustin
 * @version 1.0.0
 * @since 0.7.0
 */

import { useCallback } from 'react';
import { UserAPI } from '@/api/restApi';
import { useApiUtils } from '@/utils/apiUtils';

/**
 * Provides account deletion functionality for the logged-in user.
 *
 * @returns {{
 *   deleteUser: (password: string) => Promise<string>,
 *   isLoading: boolean,
 *   error: unknown
 * }}
 */
export function useUser() {
  const { handleRequest, isLoading, error } = useApiUtils();

  const deleteUser = useCallback(
    (password) => handleRequest(() => UserAPI.deleteUser(password)),
    [handleRequest]
  );

  return { deleteUser, isLoading, error };
}
