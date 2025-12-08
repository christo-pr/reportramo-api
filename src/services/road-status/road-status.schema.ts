// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RoadStatusService } from './road-status.class'

// Main data model schema
export const roadStatusSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    status: Type.Boolean()
  },
  { $id: 'RoadStatus', additionalProperties: false }
)
export type RoadStatus = Static<typeof roadStatusSchema>
export const roadStatusValidator = getValidator(roadStatusSchema, dataValidator)
export const roadStatusResolver = resolve<RoadStatusQuery, HookContext<RoadStatusService>>({})

export const roadStatusExternalResolver = resolve<RoadStatus, HookContext<RoadStatusService>>({})

// Schema for creating new entries
export const roadStatusDataSchema = Type.Pick(roadStatusSchema, ['status'], {
  $id: 'RoadStatusData'
})
export type RoadStatusData = Static<typeof roadStatusDataSchema>
export const roadStatusDataValidator = getValidator(roadStatusDataSchema, dataValidator)
export const roadStatusDataResolver = resolve<RoadStatusData, HookContext<RoadStatusService>>({})

// Schema for updating existing entries
export const roadStatusPatchSchema = Type.Partial(roadStatusSchema, {
  $id: 'RoadStatusPatch'
})
export type RoadStatusPatch = Static<typeof roadStatusPatchSchema>
export const roadStatusPatchValidator = getValidator(roadStatusPatchSchema, dataValidator)
export const roadStatusPatchResolver = resolve<RoadStatusPatch, HookContext<RoadStatusService>>({})

// Schema for allowed query properties
export const roadStatusQueryProperties = Type.Pick(roadStatusSchema, ['_id', 'status'])
export const roadStatusQuerySchema = Type.Intersect(
  [
    querySyntax(roadStatusQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RoadStatusQuery = Static<typeof roadStatusQuerySchema>
export const roadStatusQueryValidator = getValidator(roadStatusQuerySchema, queryValidator)
export const roadStatusQueryResolver = resolve<RoadStatusQuery, HookContext<RoadStatusService>>({})
