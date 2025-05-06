# SmartGrow Frontend

SmartGrow is a smart home solution for a personal greenhouse.

# 📁 Project Structure

```
src/
 ├── api/                            # Core API (handles REST API calls using Axios)
 │    └── restApi.js                 # Centralized REST API modules
 ├── hooks/                          # Custom React hooks for frontend data management
 │    ├── useSensorReadings.js       # Hook for fetching sensor reading data
 │    ├── useModelPrediction.js      # Hook for interacting with the ML prediction service
 │    ├── useControlState.js         # Hook for fetching greenhouse control state
 │    └── index.js                   # Centralized export file for all hooks
 ├── pages/                          # Main page components (views/screens)
 │    ├── viewmodels/                # Intermediate logic layer for views
 │    └── views/                     # Pure presentation components
 ├── components/                     # Static or reusable UI components
 ├── styles/                         # Styling folder for the frontend
 │    ├── pages/                     # Specific styles for individual pages
 │    ├── themes/                    # Theme-based styles
 │    ├── anime.css                  # Animations used across the project
 │    └── global.css                 # Global styling and both header/footer settings
 ├── App.jsx                         # Root component of the application
 ├── router.jsx                      # Defines the routing for the application
 └── main.jsx                        # React entry point and routing setup
```

---

## Explanation

- **/api/**: Core Axios-based REST API client, grouping backend communications.
- **/hooks/**: React custom hooks built on top of the API client, managing data and UI state.
- **/pages/**: View components representing different pages of the frontend application.
- **/components/**: Static or reusable UI elements like buttons, cards, forms.
- **/styles/**: Contains all the .css for the application, including global styles, page-specific styles, and animations.
- **App.jsx**: Main wrapper and entry for the React application.
- **router.jsx**: Handles application's routing in a metadata-driven architecture.
- **main.jsx**: Bootstraps React app and sets up routing if applicable.

> ✅ This structure ensures clean separation of concerns, easy maintenance, and project scalability.

# 🔀 **Routing**

The routing system is built around metadata-driven navigation,
where routes and their properties are stored as metadata.

This allows for dynamic page registration and the automatic generation of navigation links based on the route definitions.
The benefits of this approach include easy scalability, maintainability, and synchronization.

The system can be extended to include other metadata for features like conditional rendering or feature toggles,
making it flexible for future needs without heavy manual maintenance.

# 🛠️ API Functionality Overview

## SensorAPI

Handles all data related to environmental sensor readings.

| Endpoint                     | Method | Description                                                      |
|:-----------------------------|:-------|:-----------------------------------------------------------------|
| `/api/SensorReadings`        | GET    | Fetch a list of historical sensor readings (limit configurable). |
| `/api/SensorReadings/latest` | GET    | Fetch the most recent sensor reading from the database.          |

## ModelAPI

Handles machine learning model interactions for prediction and monitoring.

| Endpoint             | Method | Description                                                         |
|:---------------------|:-------|:--------------------------------------------------------------------|
| `/api/Model/predict` | POST   | Send feature data to the model and receive a prediction result.     |
| `/api/Model/health`  | GET    | Check if the machine learning model service is running and healthy. |

## ControlAPI

Handles control system state monitoring for the greenhouse environment.

| Endpoint               | Method | Description                                                          |
|:-----------------------|:-------|:---------------------------------------------------------------------|
| `/api/Control/state`   | GET    | Fetch the current (latest) control system state.                     |
| `/api/Control/history` | GET    | Fetch historical list of control system states (limit configurable). |

# 🛠️ Technology Stack

## Frontend

- ⚛️ React
- 🧭 React Router
- 🌐 Axios
- ⚡ Vite
- 📚 JSDoc

## Tooling

- ESLint
- Prettier

# 🧰 Available Scripts

Inside the project directory, you can run:

| Command           | Description                                                                      |
|:------------------|:---------------------------------------------------------------------------------|
| `npm run dev`     | Starts the development server using Vite. Automatically reloads on file changes. |
| `npm run build`   | Builds the production-ready static files into the `/dist` folder using Vite.     |
| `npm run preview` | Serves the built `/dist` folder locally to preview the production build.         |
| `npm run deploy`  | Deploys the `/dist` production build to GitHub Pages under the `pages` branch.   |
| `npm run docs`    | Generates HTML documentation from JSDoc comments into the `/docs` folder.        |

---

# 🚀 Quick Usage Example

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Generate project documentation
npm run docs

# Deploy site to GitHub Pages (after build)
npm run deploy
```

---

- Last edited on: 03/05/25
- Last editor: Taggerkov