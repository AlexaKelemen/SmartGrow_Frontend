/**
 * @file showPushPermissionPrompt.js
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
import ReactDOM from 'react-dom/client';
import PermissionPrompt from '@/components/permissions/PermissionPrompt';

/**
 * Displays the push notification permission modal.
 *
 * This function dynamically renders the `PermissionPrompt` component using a React portal,
 * then returns a Promise that resolves with the user's decision (`true` for allowing, `false` for denying).
 *
 * The modal is automatically unmounted and removed from the DOM after the user makes a choice.
 *
 * @function showPushPermissionPrompt
 * @param {string} [title='Enable Notifications?'] - The title displayed in the modal.
 * @param {string} [message='SmartGrow will notify you of greenhouse changes.'] - The message shown below the title.
 * @returns {Promise<boolean>} A Promise that resolves to the user's choice: `true` (Allow) or `false` (Deny).
 *
 * @example
 * const approved = await showPushPermissionPrompt();
 * if (approved) {
 *   Notification.requestPermission();
 * }
 */
export function showPushPermissionPrompt({title = 'Enable Notifications?', message = 'SmartGrow will notify you of greenhouse changes.'} = {}) {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = ReactDOM.createRoot(container);
        root.render(
            <PermissionPrompt
                visible={true}
                title={title}
                message={message}
                onConfirm={resolve}
            />
        );
    });
}