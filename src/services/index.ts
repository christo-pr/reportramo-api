import { roadReports } from './road-reports/road-reports'
import { roadStatus } from './road-status/road-status'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(roadReports)
  app.configure(roadStatus)
  // All services will be registered here
}
