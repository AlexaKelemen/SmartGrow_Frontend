import '@/styles/components/PermissionPrompt.css';

/**
 * Custom modal prompting the user to allow push notifications.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Controls visibility of the modal.
 * @param {function(boolean):void} props.onConfirm - Called with true (allow) or false (cancel).
 * @param {string} [props.title] - Optional title override.
 * @param {string} [props.message] - Optional message override.
 */
export default function PermissionPrompt({ visible, onConfirm, title, message }) {
    if (!visible) return null;

    return (
        <div className="permission-overlay">
            <div className="permission-modal">
                <h2>{title || 'Enable Notifications?'}</h2>
                <p>{message || 'SmartGrow would like to send you alerts about your greenhouse conditions.'}</p>
                <div className="permission-actions">
                    <button onClick={() => onConfirm(false)}>No Thanks</button>
                    <button onClick={() => onConfirm(true)}>Allow</button>
                </div>
            </div>
        </div>
    );
}