/**
 * @file showPushPermissionPrompt.jsx
 * @description
 * Provides a standalone, Promise-based utility for requesting user permission via a modal.
 * Automatically mounts a `PermissionPrompt` component into a temporary React root,
 * and uses a portal to render the modal into the correct DOM target (`#permission-prompt`).
 *
 * The modal is rendered only when needed and is automatically cleaned up afterward.
 * This utility is intended for use without needing to manually include or manage the modal in your component tree.
 *
 * Part of the SmartGrow permission system.
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.6.0
 */

import React from 'react';
import PermissionPrompt from '@/components/permissions/PermissionPrompt';
import ReactDOM from 'react-dom/client';

/**
 * The React root element for the modal.
 */
let root = null;

/**
 * This function shows a push permission modal via a Promise-based wrapper.
 * It returns a Promise that resolves when the user confirms the permission prompt.
 *
 * @param {string} [title='Enable Notifications?'] - The title of the permission prompt.
 * @param {string} [message='SmartGrow will notify you of greenhouse changes.'] - The message in the prompt.
 * @returns {Promise<boolean>} Resolves to true if the user grants permission, false if denied.
 */
export function showPushPermissionPrompt({ title = 'Enable Notifications?', message = 'SmartGrow will notify you of greenhouse changes.' } = {}) {
    return new Promise((resolve) => {
        const container = document.getElementById('permission-prompt');
        const close = (result) => {
            resolve(result);
            root.unmount();
        }
        if (root === null) root = ReactDOM.createRoot(container);
        root.render(
            <PermissionPrompt
                visible={true}
                title={title}
                message={message}
                onConfirm={close}
            />
        );
    });
}