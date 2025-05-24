/**
 * @file dtoTypes.js
 * @description
 * Contains data transfer object (DTO) type definitions used across the SmartGrow frontend.
 *
 * These typedefs describe the shape of data exchanged with the backend API,
 * corresponding directly to DTOs defined in the C# `Api.DTOs` namespace.
 *
 * All types defined here are intended for use with the `restApi.js` module
 * and its associated React hooks (e.g., `useLogin`, `useCurrentSensorReadings`).
 *
 * @author Taggerkov, Alexa kelemen
 * @version 2.0.0
 * @since 0.7.0
 */

// ────────────────
//    Auth DTOs
// ────────────────

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @description DTO for logging in a user (maps to `UserDto` in backend).
 * @example
 * const credentials = {
 *   email: "user@example.com",
 *   password: "1234"
 * };
 */

/**
 * @typedef {Object} RegisterCredentials
 * @property {string} email - The user's email (must be a valid address).
 * @property {string} password - Chosen password.
 * @property {string} passwordConfirmation - Must match password (validated server-side).
 * @description DTO for registering a new user (maps to `RegisterRequestDto`).
 * @example
 * const registration = {
 *   email: "bob@example.com",
 *   password: "strongPassword!",
 *   passwordConfirmation: "strongPassword!"
 * };
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} accessToken - JWT access token.
 * @property {string} refreshToken - JWT refresh token.
 * @property {string} email - Authenticated user's email.
 * @description Returned by login and registration APIs (maps to `AuthResponseDto`).
 * @example
 * const response = {
 *   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
 *   refreshToken: "d4f3b9ec-befc-4b55-a8b9-...",
 *   email: "alice@example.com"
 * };
 */

/**
 * @typedef {Object} RefreshResponse
 * @property {string} token - New JWT access token.
 * @property {string} refreshToken - New refresh token to be stored.
 * @description Response returned after a successful token refresh (matches anonymous object from backend `/auth/refresh`).
 * @example
 * const response = {
 *   token: "eyJhbGciOiJIUzI1NiIsInR5...",
 *   refreshToken: "9dabc3a9-6e7d-443d-8fd2..."
 * }
 */

// ────────────────
//  GreenHouse DTOs
// ────────────────
/**
 * @typedef {Object} GreenhouseDTO
 * @property {number} id - Unique identifier for the greenhouse.
 * @property {string} name - User-assigned greenhouse name.
 * @property {string} macAddress - MAC address of the greenhouse device.
 * @property {string} lightingMethod - Type of lighting used (e.g. LED).
 * @property {string} wateringMethod - Watering system in use (e.g. Drip).
 * @property {string} fertilizationMethod - Fertilization method (e.g. Organic).
 * @property {string} userEmail - Email of the greenhouse owner.
 * @property {number} [activePresetId] - ID of the currently applied preset (nullable).
 * @property {string} [activePresetName] - Name of the currently applied preset (nullable).
 *
 * @description
 * Represents a greenhouse record returned by the backend (maps to `GreenhouseDto`).
 *
 * @example
 * const greenhouse = {
 *   id: 1,
 *   name: "Tomato House",
 *   macAddress: "00:11:22:33:44:55",
 *   lightingMethod: "LED",
 *   wateringMethod: "Drip",
 *   fertilizationMethod: "Organic",
 *   userEmail: "user@example.com",
 *   activePresetId: 5,
 *   activePresetName: "Tomato Boost"
 * };
 */
/**
 * @typedef {Object} GreenhousePairDTO
 * @property {string} macAddress - MAC address of the greenhouse device.
 * @property {string} name - Human-readable name assigned to the greenhouse.
 * @description Represents a greenhouse device during pairing or registration (maps to `GreenhousePairDto`).
 * @example
 * const greenhouse = {
 *   macAddress: "00:1A:2B:3C:4D:5E",
 *   name: "South Greenhouse"
 * };
 */

/**
 * @typedef {Object} GreenhouseRenameDTO
 * @property {number} id - Unique identifier of the greenhouse.
 * @property {string} name - New name to assign to the greenhouse.
 * @description Used to rename a greenhouse (maps to `GreenhouseRenameDto`).
 * @example
 * const renameRequest = {
 *   id: 3,
 *   name: "West Wing Greenhouse"
 * };
 */
 /**
 * @typedef {Object} ConfigurationDTO
 * @property {string[]} type - List of types being configured.
 * @property {string[]} method - Corresponding configuration methods.
 */
// ────────────────
//   Action DTOs
// ────────────────

/**
 * @typedef {Object} ActionQueryDTO
 * @property {string} startDate - ISO 8601 formatted start timestamp.
 * @property {string} endDate - ISO 8601 formatted end timestamp.
 * @description Defines a date range to query greenhouse actions (maps to `ActionQueryDTO`).
 * @example
 * const query = {
 *   startDate: "2025-04-01T00:00:00Z",
 *   endDate: "2025-04-10T23:59:59Z"
 * };
 */

/**
 * @typedef {Object} ActionResultDTO
 * @property {string} type - Type of action performed (e.g., "Irrigation", "Ventilation").
 * @property {string} status - Outcome status (e.g., "Success", "Failed").
 * @property {string} timestamp - ISO 8601 formatted time of execution.
 * @description Response from past action queries (maps to `ActionResultDTO`).
 * @example
 * const action = {
 *   type: "Irrigation",
 *   status: "Success",
 *   timestamp: "2025-04-05T14:35:00Z"
 * };
 */

// ────────────────
//   Sensor DTOs
// ────────────────

/**
 * @typedef {Object} PastSensorReadingRequestDTO
 * @property {string} [beforeDate] - Optional ISO 8601 timestamp. Includes readings before this date.
 * @property {string} [afterDate] - Optional ISO 8601 timestamp. Includes readings after this date, only if within bounds.
 * @property {string} [readingType] - Must be one of: "Temperature", "AirHumidity", "SoilHumidity".
 * @description Optional filters for past sensor queries (maps to `PastSensorReadingRequestDTO`).
 * @example
 * const filters = {
 *   afterDate: "2025-03-01T00:00:00Z",
 *   beforeDate: "2025-03-31T23:59:59Z",
 *   readingType: "Temperature"
 * };
 */

/**
 * @typedef {Object} PastSensorReadingResultDTO
 * @property {number} id - Reading ID.
 * @property {string} type - Type of sensor reading (e.g., "Temperature").
 * @property {number} value - Measured value.
 * @property {string} unit - Measurement unit (e.g., "°C", "%").
 * @property {string} timestamp - ISO timestamp of when the reading occurred.
 * @description Historical sensor reading entry (maps to `PastSensorReadingResultDTO`).
 * @example
 * const reading = {
 *   id: 12,
 *   type: "AirHumidity",
 *   value: 55.2,
 *   unit: "%",
 *   timestamp: "2025-03-20T15:00:00Z"
 * };
 */

/**
 * @typedef {Object} CurrentSensorReadingResultDTO
 * @property {number} id - Reading ID.
 * @property {string} type - Type of current sensor reading.
 * @property {number} value - Measured value.
 * @property {string} unit - Unit of measurement.
 * @property {string} timestamp - ISO timestamp of current reading.
 * @property {number} maxValue - Maximum acceptable threshold for this reading.
 * @property {number} minValue - Minimum acceptable threshold for this reading.
 * @description Real-time sensor reading with thresholds (maps to `CurrentSensorReadingResultDTO`).
 * @example
 * const reading = {
 *   id: 5,
 *   type: "Temperature",
 *   value: 21.8,
 *   unit: "°C",
 *   timestamp: "2025-05-01T12:00:00Z",
 *   minValue: 18.0,
 *   maxValue: 24.0
 * };
 */

// ────────────────
//   Preset DTOs
// ────────────────

/**
 * @typedef {Object} Preset
 * @property {number} [id] - Optional. Unique preset ID assigned by the backend.
 * @property {string} name - Human-readable name for the preset (e.g., "Tomato Grow Profile").
 * @property {number} minTemperature - Minimum target temperature in °C.
 * @property {number} maxTemperature - Maximum target temperature in °C.
 * @property {number} minAirHumidity - Minimum target air humidity in percentage.
 * @property {number} maxAirHumidity - Maximum target air humidity in percentage.
 * @property {number} minSoilHumidity - Minimum target soil humidity in percentage.
 * @property {number} maxSoilHumidity - Maximum target soil humidity in percentage.
 * @property {number} hoursOfLight - Daily light exposure in hours (e.g., 12 for 12 hours).
 *
 * @description
 * Represents a complete preset configuration for greenhouse automation.
 * Used in create, read, update, and delete operations for environmental presets.
 *
 * @example
 * const preset = {
 *   name: "Tomato Plan",
 *   minTemperature: 20,
 *   maxTemperature: 25,
 *   minAirHumidity: 50,
 *   maxAirHumidity: 70,
 *   minSoilHumidity: 30,
 *   maxSoilHumidity: 60,
 *   hoursOfLight: 14
 * };
 */
/**
 * @typedef {Object} CreatePresetDTO
 * @property {string} name - Name of the preset (e.g., "Tomato Boost").
 * @property {number} minTemperature - Minimum temperature in °C.
 * @property {number} maxTemperature - Maximum temperature in °C.
 * @property {number} minAirHumidity - Minimum air humidity (%).
 * @property {number} maxAirHumidity - Maximum air humidity (%).
 * @property {number} minSoilHumidity - Minimum soil humidity (%).
 * @property {number} maxSoilHumidity - Maximum soil humidity (%).
 * @property {number} hoursOfLight - Daily light exposure in hours.
 * @property {string} userEmail - Email of the user creating the preset.
 *
 * @description
 * DTO used when creating a new environmental preset. Sent to backend via POST request.
 * All fields are required to define a valid configuration.
 *
 * @example
 * const createDto = {
 *   name: "Lettuce Profile",
 *   minTemperature: 16,
 *   maxTemperature: 22,
 *   minAirHumidity: 60,
 *   maxAirHumidity: 75,
 *   minSoilHumidity: 35,
 *   maxSoilHumidity: 55,
 *   hoursOfLight: 10,
 *   userEmail: "user@example.com"
 * };
 */
/**
 * @typedef {Object} UpdatePresetDTO
 * @property {number} id - Unique ID of the preset to update.
 * @property {string} name - Updated name for the preset.
 * @property {number} minTemperature - Updated minimum temperature (°C).
 * @property {number} maxTemperature - Updated maximum temperature (°C).
 * @property {number} minAirHumidity - Updated minimum air humidity (%).
 * @property {number} maxAirHumidity - Updated maximum air humidity (%).
 * @property {number} [minSoilHumidity] - Optional updated minimum soil humidity (%).
 * @property {number} [maxSoilHumidity] - Optional updated maximum soil humidity (%).
 * @property {number} [hoursOfLight] - Optional updated daily light exposure (hours).
 *
 * @description
 * DTO used to update an existing preset. Sent to backend via PUT request.
 * All required fields must be provided to successfully update the preset.
 *
 * @example
 * const updateDto = {
 *   id: 5,
 *   name: "Updated Tomato Boost",
 *   minTemperature: 18,
 *   maxTemperature: 25,
 *   minAirHumidity: 55,
 *   maxAirHumidity: 75,
 *   minSoilHumidity: 40,
 *   maxSoilHumidity: 60,
 *   hoursOfLight: 14
 * };
 */


// ────────────────
// Notification DTOs
// ────────────────

/**
 * @typedef {Object} NotificationQueryDTO
 * @property {string} startDate - Start of date range (ISO 8601 format).
 * @property {string} endDate - End of date range (ISO 8601 format).
 * @description Used to query greenhouse notifications within a specific time window (maps to `NotificationQueryDTO`).
 * @example
 * const query = {
 *   startDate: "2025-05-01T00:00:00Z",
 *   endDate: "2025-05-19T23:59:59Z"
 * };
 */

/**
 * @typedef {Object} NotificationResultDTO
 * @property {number} id - Notification identifier.
 * @property {string} timestamp - Time the notification was generated (ISO 8601 format).
 * @property {string} content - Message content of the notification.
 * @description Represents a single greenhouse notification (maps to `NotificationResultDTO`).
 * @example
 * const notification = {
 *   id: 42,
 *   timestamp: "2025-05-19T14:22:00Z",
 *   content: "Soil humidity below threshold in greenhouse 2."
 * };
 */

// ────────────────
//   Health DTOs
// ────────────────

/**
 * @typedef {Object} RawHealthResponse
 * @property {string} status - The backend service status (e.g., "Healthy").
 * @description Represents the API health check result (returned by `HealthCheckController`).
 * @example
 * const health = {
 *   status: "Healthy"
 * };
 */