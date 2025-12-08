// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  roadStatusDataValidator,
  roadStatusPatchValidator,
  roadStatusQueryValidator,
  roadStatusResolver,
  roadStatusExternalResolver,
  roadStatusDataResolver,
  roadStatusPatchResolver,
  roadStatusQueryResolver
} from './road-status.schema'

import type { Application } from '../../declarations'
import { RoadStatusService, getOptions } from './road-status.class'

export const roadStatusPath = 'road-status'
export const roadStatusMethods: Array<keyof RoadStatusService> = ['get']

export * from './road-status.class'
export * from './road-status.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const roadStatus = (app: Application) => {
  // Register our service on the Feathers application
  app.use(roadStatusPath, new RoadStatusService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: roadStatusMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(roadStatusPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(roadStatusExternalResolver),
        schemaHooks.resolveResult(roadStatusResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(roadStatusQueryValidator),
        schemaHooks.resolveQuery(roadStatusQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(roadStatusDataValidator),
        schemaHooks.resolveData(roadStatusDataResolver)
      ],
      patch: [
        schemaHooks.validateData(roadStatusPatchValidator),
        schemaHooks.resolveData(roadStatusPatchResolver)
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
    [roadStatusPath]: RoadStatusService
  }
}
