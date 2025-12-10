// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RoadReportsService } from './road-reports.class'

// Main data model schema
export const roadReportsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    type: Type.String(),
    description: Type.Optional(Type.String()),
    location: Type.Object({
      latitude: Type.Number(),
      longitude: Type.Number(),
    }),
    direction: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'RoadReports', additionalProperties: false }
)
export type RoadReports = Static<typeof roadReportsSchema>
export const roadReportsValidator = getValidator(roadReportsSchema, dataValidator)
export const roadReportsResolver = resolve<RoadReportsQuery, HookContext<RoadReportsService>>({})

export const roadReportsExternalResolver = resolve<RoadReports, HookContext<RoadReportsService>>({})

// Schema for creating new entries
export const roadReportsDataSchema = Type.Pick(roadReportsSchema, ['type', 'description', 'location', 'direction'], {
  $id: 'RoadReportsData'
})
export type RoadReportsData = Static<typeof roadReportsDataSchema>
export const roadReportsDataValidator = getValidator(roadReportsDataSchema, dataValidator)
export const roadReportsDataResolver = resolve<RoadReportsData & { createdAt: string; updatedAt: string }, HookContext<RoadReportsService>>({
    createdAt: async () => new Date().toISOString(),
    updatedAt: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const roadReportsPatchSchema = Type.Partial(roadReportsSchema, {
  $id: 'RoadReportsPatch'
})
export type RoadReportsPatch = Static<typeof roadReportsPatchSchema>
export const roadReportsPatchValidator = getValidator(roadReportsPatchSchema, dataValidator)
export const roadReportsPatchResolver = resolve<RoadReportsPatch, HookContext<RoadReportsService>>({
  updatedAt: async () => new Date().toISOString()
})

// Schema for allowed query properties
export const roadReportsQueryProperties = Type.Pick(roadReportsSchema, ['_id', 'type', 'description', 'location', 'direction'])
export const roadReportsQuerySchema = Type.Intersect(
  [
    querySyntax(roadReportsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RoadReportsQuery = Static<typeof roadReportsQuerySchema>
export const roadReportsQueryValidator = getValidator(roadReportsQuerySchema, queryValidator)
export const roadReportsQueryResolver = resolve<RoadReportsQuery, HookContext<RoadReportsService>>({})
