// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  roadReportsDataValidator,
  roadReportsPatchValidator,
  roadReportsQueryValidator,
  roadReportsResolver,
  roadReportsExternalResolver,
  roadReportsDataResolver,
  roadReportsPatchResolver,
  roadReportsQueryResolver
} from './road-reports.schema'

import type { Application } from '../../declarations'
import { RoadReportsService, getOptions } from './road-reports.class'

export const roadReportsPath = 'road-reports'
export const roadReportsMethods: Array<keyof RoadReportsService> = [
  'find',
  'create',
  'remove'
]

export * from './road-reports.class'
export * from './road-reports.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const roadReports = (app: Application) => {
  // Register our service on the Feathers application
  app.use(roadReportsPath, new RoadReportsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: roadReportsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(roadReportsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(roadReportsExternalResolver),
        schemaHooks.resolveResult(roadReportsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(roadReportsQueryValidator),
        schemaHooks.resolveQuery(roadReportsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(roadReportsDataValidator),
        schemaHooks.resolveData(roadReportsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(roadReportsPatchValidator),
        schemaHooks.resolveData(roadReportsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [roadReportsPath]: RoadReportsService
  }
}
