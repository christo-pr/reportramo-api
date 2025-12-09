// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { RoadReports, RoadReportsData, RoadReportsPatch, RoadReportsQuery } from './road-reports.schema'

export type { RoadReports, RoadReportsData, RoadReportsPatch, RoadReportsQuery }

export interface RoadReportsParams extends MongoDBAdapterParams<RoadReportsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class RoadReportsService<ServiceParams extends Params = RoadReportsParams> extends MongoDBService<
  RoadReports,
  RoadReportsData,
  RoadReportsParams,
  RoadReportsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('RoadReports'))
  }
}
