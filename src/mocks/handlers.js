import { authHandlers } from './modules/auth';
import { sensorHandlers } from './modules/sensor';

export const handlers = [
  ...authHandlers,
  ...sensorHandlers
];
