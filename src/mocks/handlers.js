import { authHandlers } from './modules/auth';
import { sensorHandlers } from './modules/sensor';
import { greenhouseHandlers } from './modules/greenhouseHandlers';

export const handlers = [
  ...authHandlers,
  ...sensorHandlers,
  ...greenhouseHandlers
];
