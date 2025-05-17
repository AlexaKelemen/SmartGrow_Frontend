/**
 * @file PermissionPrompt.jsx
 * @description
 * A React modal component rendered via a portal,
 * used for requesting permissions, with accessibility and keyboard support.
 *
 * Styles are handled via an associated CSS module.
 *
 * Part of the SmartGrow permission system.
 * @author Taggerkov
 * @version 1.0.0
 * @since 0.6.0
 */

import {createPortal} from 'react-dom';
import {useCallback, useEffect, useId, useRef} from 'react';
import '@/styles/components/permissionPrompt.css';

/**
 * PermissionPrompt component
 *
 * A highly accessible, self-contained modal component rendered via a React portal.
 * This modal requests user confirmation for browser-level or sensitive app permissions
 * (like Notifications, Location, etc.).
 *
 * Features:
 * - Uses portal rendering to appear above all UI.
 * - Automatically focuses when opened, and returns focus on close.
 * - Handles ESC and Enter keys, and traps tab navigation within the modal.
 * - Uses ARIA roles and associations for screen readers.
 *
 * @component
 * @param {boolean} visible - Whether the modal is visible. When false, it is not rendered.
 * @param {function} onConfirm - Callback fired with a boolean: true for confirmation, false for cancel.
 * @param {string} [title] - Optional title displayed at the top of the modal.
 * @param {string} [message] - Optional message displayed as the modal's description.
 * @returns {ReactPortal|null} A React portal containing the modal content, or null if hidden.
 */
export default function PermissionPrompt({visible, onConfirm, title = 'Allow Permission?', message = 'This feature requires your permission to proceed.'}) {
    const titleId = useId();
    const descId = useId();
    const modalRef = useRef();
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (visible) {
            previouslyFocused.current = document.activeElement;
            modalRef.current?.focus();
        }
    }, [visible]);

    const close = useCallback((result) => {
        if (!visible) return;
        onConfirm(result);
        const prev = previouslyFocused.current;
        if (prev && document.body.contains(prev)) prev.focus?.();
    }, [onConfirm, visible]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') close(false);
            const buttons = modalRef.current?.querySelectorAll('button');
            if (!buttons?.length || e.key !== 'Tab') return;
            const [first, last] = [buttons[0], buttons[buttons.length - 1]];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        if (visible) window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [visible, close]);

    if (!visible) return null;

    const modalContent = (
        <div className="permission-overlay">
            <div className="permission-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}
                 aria-describedby={descId} tabIndex="-1" ref={modalRef}>
                <h2 id={titleId}>{title}</h2>
                <p id={descId}>{message}</p>
                <div className="permission-actions">
                    <button onClick={() => close(false)}>Deny</button>
                    <button onClick={() => close(true)}>Allow</button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.getElementById('permission-prompt'));
}