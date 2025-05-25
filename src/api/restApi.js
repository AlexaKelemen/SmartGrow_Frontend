/**
 * SmartGrow REST API layer.
 *
 * This module defines an interface to all HTTP endpoints exposed by the SmartGrow backend.
 * It uses a configured Axios instance to ensure consistent headers, authentication, and refresh handling.
 *
 * This layer is grouped by logical backend services:
 * - AuthAPI: Authentication and token issuance
 * - ActionAPI: Historical user-triggered actions
 * - SensorAPI: Environmental sensor data
 * - PresetAPI: CRUD operations for plant growth presets
 * - HealthAPI: System status diagnostics
 *
 * All requests are authenticated unless otherwise noted.
 * @author Taggerkov,Alexa Kelemen
 * @version 2.0.0
 * @since 0.0.1
 */
import API, {
    authPath,
    userPath,
    greenhousePath,
    sensorPath,
    actionPath,
    presetPath,
    notificationPath,
    healthPath
} from './axiosConfig'
/**
 * @typedef {import('@/api/dtoTypes').LoginCredentials}
 * @typedef {import('@/api/dtoTypes').RegisterCredentials}
 * @typedef {import('@/api/dtoTypes').AuthResponse}
 * @typedef {import('@/api/dtoTypes').UserProfileDTO}
 * @typedef {import('@/api/dtoTypes').PastSensorReadingRequestDTO}
 * @typedef {import('@/api/dtoTypes').PastSensorReadingResultDTO}
 * @typedef {import('@/api/dtoTypes').CurrentSensorReadingResultDTO}
 * @typedef {import('@/api/dtoTypes').SensorThresholdDTO}
 * @typedef {import('@/api/dtoTypes').ActionQueryDTO}
 * @typedef {import('@/api/dtoTypes').ActionResultDTO}
 * @typedef {import('@/api/dtoTypes').GreenhouseStatusDTO}
 * @typedef {import('@/api/dtoTypes').GreenhousePairDTO}
 * @typedef {import('@/api/dtoTypes').GreenhouseRenameDTO}
 * @typedef {import('@/api/dtoTypes').NotificationQueryDTO}
 * @typedef {import('@/api/dtoTypes').NotificationResultDTO}
 * @typedef {import('@/api/dtoTypes').RawHealthResponse}
 */

/**
 * Authentication API for user login and registration.
 *
 * This module interacts with the backend `AuthController`, mapping to the following DTOs:
 * - Request: `UserDto` (for login), `RegisterRequestDto` (for registration)
 * - Response: `AuthResponseDto`
 * @author Taggerkov
 */
const AuthAPI = {
    /**
     * Logs in an existing user.
     * @param {LoginCredentials} credentials - UserDto.<br>
     * Contains email and password.
     * @returns {Promise<AuthResponse>} AuthResponseDto.<br>
     * Contains tokens and confirmed email.
     */
    login: credentials => API.post(`${authPath}/login`, credentials).then(res => res.data),
    /**
     * Registers a new user.
     * @param {RegisterCredentials} credentials - RegisterRequestDto.<br>
     * Contains email, password, and confirmation.
     * @returns {Promise<AuthResponse>} AuthResponseDto.<br>
     * Contains tokens and confirmed email.
     */
    register: credentials => API.post(`${authPath}/register`, credentials).then(res => res.data),

    /**
     * Requests a new access token using a refresh token.
     * @param {string} refreshToken - The existing refresh token.
     * @returns {Promise<RefreshResponse>} RefreshResponse.<br>
     * Contains both new tokens.
     */
    refresh: (refreshToken) => API.post(`${authPath}/refresh`, refreshToken, {headers: {'Content-Type': 'application/json'}}).then(res => res.data)
};

/**
 * User API for account-level operations on the authenticated user.
 *
 * This module interacts with the backend `UserController`, scoped to the currently authenticated user.
 * - No request DTO is used
 * - Response: `string` confirmation message
 * @author Taggerkov
 */
const UserAPI = {
    /**
     * Deletes the currently authenticated user's account.
     * @param {string} password - User's password for confirmation.
     * @returns {Promise<string>} Success message
     */
    deleteUser: (password) => API.delete(`${userPath}`, {params: {password}}).then(res => res.data)
};

/**
 * Greenhouse API for managing user-linked greenhouse devices.
 *
 * This module interacts with the backend `GreenhouseController`, mapping to the following DTOs:
 * - Request: `GreenhousePairDTO`, `GreenhouseRenameDTO`
 * - Response: `string` confirmation messages
 * @author Taggerkov, Alexa Kelemen
 */
const GreenhouseAPI = {
    /**
     * Pairs a greenhouse device with the authenticated user.
     * @param {GreenhousePairDTO} payload - GreenhousePairDto.<br>
     * Contains MAC address and greenhouse name.
     * @returns {Promise<string>} Confirmation message.
     * @author Taggerkov
     */
    pair: (payload) => API.post(`${greenhousePath}/pair`, payload).then(res => res.data),

    /**
     * Unpairs a greenhouse by ID from the authenticated user.
     * @param {number} id - ID of the greenhouse to unpair.
     * @returns {Promise<string>} Confirmation message.
     * @author Taggerkov
     */
    unpair: (id) => API.post(`${greenhousePath}/unpair/${id}`, id).then(res => res.data),

    /**
     * Renames a greenhouse associated with the authenticated user.
     * @param {GreenhouseRenameDTO} payload - GreenhouseRenameDTO<br>
     * Contains new name and greenhouse ID.
     * @returns {Promise<string>} Confirmation message.
     */
    rename: (payload) => API.put(`${greenhousePath}/rename/${payload.id}`, payload).then(res => res.data),
    /**
     * Fetches all greenhouses associated with the authenticated user.
     * @returns {Promise<GreenhouseDTO[]>} Array of greenhouse objects.
     */
    getAll: () => API.get(`${greenhousePath}`).then((res) => res.data),
    /**
     * Assigns a preset to a greenhouse.
     * @param {number} id - Greenhouse ID.
     * @param {number} presetId - ID of the preset to assign.
     * @returns {Promise<string>} Confirmation message.
     */
    assignPreset: (id, presetId) => API.put(`${greenhousePath}/preset/${id}`, presetId).then(res => res.data),

    /**
     * Sends a configuration POST request for a greenhouse.
     *
     * @param {number} greenhouseId - The greenhouse ID (used in query).
     * @param {number|string} id - The config target ID (used in path).
     * @param {{ type: string, method: string }} payload - Configuration data.
     * @returns {Promise<string>} Confirmation message.
     */
    configure: (greenhouseId, id, payload) => API.put(`${greenhousePath}/configure/${id}`, payload, {params: {greenhouseId}}),
    /**
     * Triggers a prediction for a specific greenhouse.
     * @param {number} greenhouseId
     * @returns {Promise<string>} Prediction result or confirmation.
     */
    predict: (greenhouseId) => API.post(`${greenhousePath}/predict/${greenhouseId}`).then(res => res.data),
}

/**
 * Sensor API for accessing environmental sensor data.
 *
 * This module interacts with the backend `SensorReadingController`, mapping to the following DTOs:
 * - Request: `PastSensorReadingRequestDTO` (for historical queries)
 * - Response: `CurrentSensorReadingResultDTO[]`, `PastSensorReadingResultDTO[]`
 * @author Taggerkov
 */
const SensorAPI = {
    /**
     * Gets current sensor readings.
     * @param {number} greenhouseId - Greenhouse ID.
     * @returns {Promise<CurrentSensorReadingResultDTO[]>} CurrentSensorReadingResultDTO.<br>
     * Contains id, type, unit, timestamp, and values.
     */
    getCurrentReadings: (greenhouseId) => API.get(`${sensorPath}/${greenhouseId}/current-sensor-readings/`).then(res => res.data),

    /**
     * Gets historical sensor data with optional filters.
     * @param {number} greenhouseId - Greenhouse ID.
     * @param {PastSensorReadingRequestDTO} [filters={}] - PastSensorReadingRequestDTO.<br>
     * Contains after/before dates and reading type.
     * @returns {Promise<PastSensorReadingResultDTO[]>} PastSensorReadingResultDTO.<br>
     * Contains id, type, value, unit, and timestamp.
     */
    getPastReadings: (greenhouseId, filters = {}) => API.get(`${sensorPath}/${greenhouseId}/past-sensor-readings/`, {params: filters}).then(res => res.data)
};

/**
 * Action API for querying historical greenhouse actions.
 *
 * This module interacts with the backend `ActionController`, mapping to the following DTOs:
 * - Request: `ActionQueryDTO`
 * - Response: `ActionResultDTO[]`
 * @author Taggerkov, Alexa Kelemen
 */
const ActionAPI = {
    /**
     * Retrieves past actions for a greenhouse in a date range.
     * @param {number} greenhouseId - Greenhouse ID.
     * @param {ActionQueryDTO} filters - ActionQueryDTO.<br>
     * Contains start and end timestamps.
     * @returns {Promise<ActionResultDTO[]>} ActionResultDTO.<br>
     * Contains type, status, and timestamp.
     * @author Taggerkov
     */
    getPastActions: (greenhouseId, filters) => API.post(`${actionPath}/${greenhouseId}/past-actions`, filters).then(res => res.data),

    /**
     * Triggers a new action on the specified greenhouse.
     * @param {number} greenhouseId - Greenhouse ID.
     * @param {string} actionType - Action name (e.g., "Irrigation", "Ventilation").
     * @returns {Promise<string>} Success message or result from server.
     */
    triggerAction: (greenhouseId, actionType) => API.post(`${actionPath}/${greenhouseId}/triggerAction`, actionType, {headers: {"Content-Type": "application/json"}}).then(res => res.data)
};

/**
 * Preset API for managing user-defined plant growth configurations.
 *
 * This module interacts with the backend `PresetController`, mapping to the following DTOs:
 * - Request: `Preset` (used for creation and update)
 * - Response: `Preset` (on fetch and create)
 * @author Taggerkov, Alexa Kelemen
 */
const PresetAPI = {
    /**
     * Creates a new preset with specified parameters.
     *
     * @param {CreatePresetDTO} preset - Preset DTO with user-defined environmental preferences.
     * @returns {Promise<Preset>} The newly created preset.
     * @author Taggerkov
     */
    createPreset: (preset) => API.post(`${presetPath}`, preset).then(res => res.data),

    /**
     * Fetches a preset by unique identifier.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<Preset>} The preset, if found.
     * @author Taggerkov
     */
    getPreset: (id) => API.get(`${presetPath}/${id}`).then(res => res.data),

    /**
     * Updates a preset by ID with new parameters.
     *
     * @param {number} id - Preset ID.
     * @param {UpdatePresetDTO} preset - Full preset object to replace existing.
     * @returns {Promise<number>} HTTP status code from server.
     * @author Taggerkov
     */
    updatePreset: (id, preset) => API.put(`${presetPath}/${id}`, preset).then(res => res.status),

    /**
     * Permanently deletes a preset by ID.
     *
     * @param {number} id - Preset ID.
     * @returns {Promise<number>} HTTP status code from server.
     * @author Taggerkov
     */
    deletePreset: (id) => API.delete(`${presetPath}/${id}`).then(res => res.status),

    /**
     * Gets all presets.
     * @returns {Promise<Preset[]>}
     */
    getAllPresets: () => API.get(`${presetPath}/all`).then(res => res.data)
};

/**
 * Health API for checking backend service availability.
 *
 * This module interacts with the backend `HealthCheckController`, returning a simple service status response.
 * - Response: `{ status: string }`
 * @author Taggerkov
 */
const HealthAPI = {
    /**
     * Verifies whether the backend service is online.
     *
     * @returns {Promise<RawHealthResponse>} A status object, e.g. { status: "Healthy" }.
     */
    getStatus: () => API.get(`${healthPath}`).then(res => res.data)
};

/**
 * Notification API for fetching greenhouse alerts.
 *
 * This module interacts with the backend `NotificationController`, which provides
 * time-bound alert messages such as warnings about environmental conditions.
 * @author Alexa Kelemen, Taggerkov
 */
const NotificationAPI = {
    /**
     * Retrieves the VAPID public key used for client-side push subscription.
     * @returns {Promise<string>} Base64-encoded VAPID public key.
     * @author Taggerkov
     */
    getVapidKey: () => API.get(`${notificationPath}/public-key`).then(res => res.data),

    /**
     * Sends the client-side push subscription to the backend to store it.
     * @param {PushSubscription} subscription - The push subscription object.
     * @returns {Promise<void>}
     * @author Taggerkov
     */
    saveSubscription: (subscription) => API.post(`${notificationPath}/save-subscription`, subscription),

    /**
     * Fetches notifications for a greenhouse within a specific time window.
     *
     * @param {number} greenhouseId - ID of the greenhouse.
     * @param {NotificationQueryDTO} query - Contains `startDate` and `endDate` in ISO format.
     * @returns {Promise<NotificationResultDTO[]>} List of notifications.
     */
    getPastNotifications: (greenhouseId, query) =>
        API.post(`${notificationPath}/${greenhouseId}/past-notifications`, query).then(res => res.data)
};

export {AuthAPI, UserAPI, GreenhouseAPI, SensorAPI, ActionAPI, PresetAPI, NotificationAPI, HealthAPI}