/*
 * Copyright © 2025 Taggerkov
 * Licensed under the MIT License. See LICENSE file in: https://github.com/Taggerkov/openpokedex, for full license information.
 */

import {createHashRouter} from 'react-router-dom'
import App from '@/App'

// Router configuration for OpenPokeDex application.
// Uses HashRouter to support GitHub Pages deployments.

/**
 * Application router configuration.
 * Defines all routes for SmartGrow using a HashRouter.
 *
 * @author Taggerkov
 * @see https://reactrouter.com/en/main/routers/create-hash-router
 */
const router = createHashRouter([{
    path: '/',
    element: <App/>,
    children: [
        // TODO
    ]
}])

export default router