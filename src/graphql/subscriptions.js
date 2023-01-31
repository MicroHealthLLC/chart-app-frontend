/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport {
    onCreateReport {
      id
      title
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      reportGroup {
        id
        title
        reports {
          nextToken
        }
        reportIds
        createdBy
        updatedBy
        channelId
        createdAt
        updatedAt
      }
      description
      reportGroupId
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      xAxis
      columns
      createdBy
      updatedBy
      createdAt
      updatedAt
      reportDataSetId
    }
  }
`;
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport {
    onUpdateReport {
      id
      title
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      reportGroup {
        id
        title
        reports {
          nextToken
        }
        reportIds
        createdBy
        updatedBy
        channelId
        createdAt
        updatedAt
      }
      description
      reportGroupId
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      xAxis
      columns
      createdBy
      updatedBy
      createdAt
      updatedAt
      reportDataSetId
    }
  }
`;
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport {
    onDeleteReport {
      id
      title
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      reportGroup {
        id
        title
        reports {
          nextToken
        }
        reportIds
        createdBy
        updatedBy
        channelId
        createdAt
        updatedAt
      }
      description
      reportGroupId
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      xAxis
      columns
      createdBy
      updatedBy
      createdAt
      updatedAt
      reportDataSetId
    }
  }
`;
export const onCreateReportGroup = /* GraphQL */ `
  subscription OnCreateReportGroup {
    onCreateReportGroup {
      id
      title
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      reportIds
      createdBy
      updatedBy
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReportGroup = /* GraphQL */ `
  subscription OnUpdateReportGroup {
    onUpdateReportGroup {
      id
      title
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      reportIds
      createdBy
      updatedBy
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReportGroup = /* GraphQL */ `
  subscription OnDeleteReportGroup {
    onDeleteReportGroup {
      id
      title
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      reportIds
      createdBy
      updatedBy
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGauge = /* GraphQL */ `
  subscription OnCreateGauge {
    onCreateGauge {
      id
      title
      notes
      value
      segmentStops
      chartType
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGauge = /* GraphQL */ `
  subscription OnUpdateGauge {
    onUpdateGauge {
      id
      title
      notes
      value
      segmentStops
      chartType
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGauge = /* GraphQL */ `
  subscription OnDeleteGauge {
    onDeleteGauge {
      id
      title
      notes
      value
      segmentStops
      chartType
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dashboard {
        id
        title
        description
        reports {
          nextToken
        }
        gauges {
          nextToken
        }
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      dashboardId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeatMap = /* GraphQL */ `
  subscription OnCreateHeatMap {
    onCreateHeatMap {
      id
      title
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      options
      createdBy
      updatedBy
      createdAt
      updatedAt
      heatMapDataSetId
    }
  }
`;
export const onUpdateHeatMap = /* GraphQL */ `
  subscription OnUpdateHeatMap {
    onUpdateHeatMap {
      id
      title
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      options
      createdBy
      updatedBy
      createdAt
      updatedAt
      heatMapDataSetId
    }
  }
`;
export const onDeleteHeatMap = /* GraphQL */ `
  subscription OnDeleteHeatMap {
    onDeleteHeatMap {
      id
      title
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      options
      createdBy
      updatedBy
      createdAt
      updatedAt
      heatMapDataSetId
    }
  }
`;
export const onCreateDashboard = /* GraphQL */ `
  subscription OnCreateDashboard {
    onCreateDashboard {
      id
      title
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDashboard = /* GraphQL */ `
  subscription OnUpdateDashboard {
    onUpdateDashboard {
      id
      title
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDashboard = /* GraphQL */ `
  subscription OnDeleteDashboard {
    onDeleteDashboard {
      id
      title
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel {
    onCreateChannel {
      id
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      dataSets {
        items {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      title
      channelTypeId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel {
    onUpdateChannel {
      id
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      dataSets {
        items {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      title
      channelTypeId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel {
    onDeleteChannel {
      id
      description
      reports {
        items {
          id
          title
          description
          reportGroupId
          channelId
          dashboardId
          colorSchemeId
          chartType
          dataSetId
          xAxis
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      dataSets {
        items {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        nextToken
      }
      gauges {
        items {
          id
          title
          notes
          value
          segmentStops
          chartType
          channelId
          dashboardId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      title
      channelTypeId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDataSet = /* GraphQL */ `
  subscription OnCreateDataSet {
    onCreateDataSet {
      id
      title
      description
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dataValues {
        items {
          id
          data
          dataSetId
          createdAt
          updatedAt
        }
        nextToken
      }
      heatMap {
        id
        title
        dataSet {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        options
        createdBy
        updatedBy
        createdAt
        updatedAt
        heatMapDataSetId
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onUpdateDataSet = /* GraphQL */ `
  subscription OnUpdateDataSet {
    onUpdateDataSet {
      id
      title
      description
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dataValues {
        items {
          id
          data
          dataSetId
          createdAt
          updatedAt
        }
        nextToken
      }
      heatMap {
        id
        title
        dataSet {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        options
        createdBy
        updatedBy
        createdAt
        updatedAt
        heatMapDataSetId
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onDeleteDataSet = /* GraphQL */ `
  subscription OnDeleteDataSet {
    onDeleteDataSet {
      id
      title
      description
      channel {
        id
        description
        reports {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      dataValues {
        items {
          id
          data
          dataSetId
          createdAt
          updatedAt
        }
        nextToken
      }
      heatMap {
        id
        title
        dataSet {
          id
          title
          description
          channelId
          user
          createdAt
          updatedAt
          dataSetHeatMapId
        }
        options
        createdBy
        updatedBy
        createdAt
        updatedAt
        heatMapDataSetId
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onCreateDataValue = /* GraphQL */ `
  subscription OnCreateDataValue {
    onCreateDataValue {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDataValue = /* GraphQL */ `
  subscription OnUpdateDataValue {
    onUpdateDataValue {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDataValue = /* GraphQL */ `
  subscription OnDeleteDataValue {
    onDeleteDataValue {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        channelId
        dataValues {
          nextToken
        }
        heatMap {
          id
          title
          options
          createdBy
          updatedBy
          createdAt
          updatedAt
          heatMapDataSetId
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChannelType = /* GraphQL */ `
  subscription OnCreateChannelType {
    onCreateChannelType {
      title
      channels {
        items {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChannelType = /* GraphQL */ `
  subscription OnUpdateChannelType {
    onUpdateChannelType {
      title
      channels {
        items {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChannelType = /* GraphQL */ `
  subscription OnDeleteChannelType {
    onDeleteChannelType {
      title
      channels {
        items {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCurrentChannel = /* GraphQL */ `
  subscription OnCreateCurrentChannel {
    onCreateCurrentChannel {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurrentChannel = /* GraphQL */ `
  subscription OnUpdateCurrentChannel {
    onUpdateCurrentChannel {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurrentChannel = /* GraphQL */ `
  subscription OnDeleteCurrentChannel {
    onDeleteCurrentChannel {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
