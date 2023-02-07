/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport($filter: ModelSubscriptionReportFilterInput) {
    onCreateReport(filter: $filter) {
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
        heatMap {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnUpdateReport($filter: ModelSubscriptionReportFilterInput) {
    onUpdateReport(filter: $filter) {
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
        heatMap {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnDeleteReport($filter: ModelSubscriptionReportFilterInput) {
    onDeleteReport(filter: $filter) {
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
        heatMap {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnCreateReportGroup(
    $filter: ModelSubscriptionReportGroupFilterInput
  ) {
    onCreateReportGroup(filter: $filter) {
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
  subscription OnUpdateReportGroup(
    $filter: ModelSubscriptionReportGroupFilterInput
  ) {
    onUpdateReportGroup(filter: $filter) {
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
  subscription OnDeleteReportGroup(
    $filter: ModelSubscriptionReportGroupFilterInput
  ) {
    onDeleteReportGroup(filter: $filter) {
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
  subscription OnCreateGauge($filter: ModelSubscriptionGaugeFilterInput) {
    onCreateGauge(filter: $filter) {
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
        heatMap {
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
  subscription OnUpdateGauge($filter: ModelSubscriptionGaugeFilterInput) {
    onUpdateGauge(filter: $filter) {
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
        heatMap {
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
  subscription OnDeleteGauge($filter: ModelSubscriptionGaugeFilterInput) {
    onDeleteGauge(filter: $filter) {
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
        heatMap {
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
  subscription OnCreateHeatMap($filter: ModelSubscriptionHeatMapFilterInput) {
    onCreateHeatMap(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      options
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
        heatMap {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeatMap = /* GraphQL */ `
  subscription OnUpdateHeatMap($filter: ModelSubscriptionHeatMapFilterInput) {
    onUpdateHeatMap(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      options
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
        heatMap {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeatMap = /* GraphQL */ `
  subscription OnDeleteHeatMap($filter: ModelSubscriptionHeatMapFilterInput) {
    onDeleteHeatMap(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        user
        createdAt
        updatedAt
        dataSetHeatMapId
      }
      dataSetId
      options
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
        heatMap {
          nextToken
        }
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      channelId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDashboard = /* GraphQL */ `
  subscription OnCreateDashboard(
    $filter: ModelSubscriptionDashboardFilterInput
  ) {
    onCreateDashboard(filter: $filter) {
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
  subscription OnUpdateDashboard(
    $filter: ModelSubscriptionDashboardFilterInput
  ) {
    onUpdateDashboard(filter: $filter) {
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
  subscription OnDeleteDashboard(
    $filter: ModelSubscriptionDashboardFilterInput
  ) {
    onDeleteDashboard(filter: $filter) {
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
  subscription OnCreateChannel($filter: ModelSubscriptionChannelFilterInput) {
    onCreateChannel(filter: $filter) {
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
      heatMap {
        items {
          id
          title
          dataSetId
          options
          channelId
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
  subscription OnUpdateChannel($filter: ModelSubscriptionChannelFilterInput) {
    onUpdateChannel(filter: $filter) {
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
      heatMap {
        items {
          id
          title
          dataSetId
          options
          channelId
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
  subscription OnDeleteChannel($filter: ModelSubscriptionChannelFilterInput) {
    onDeleteChannel(filter: $filter) {
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
      heatMap {
        items {
          id
          title
          dataSetId
          options
          channelId
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
  subscription OnCreateDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onCreateDataSet(filter: $filter) {
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
        heatMap {
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
        dataSetId
        options
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
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onUpdateDataSet = /* GraphQL */ `
  subscription OnUpdateDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onUpdateDataSet(filter: $filter) {
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
        heatMap {
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
        dataSetId
        options
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
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onDeleteDataSet = /* GraphQL */ `
  subscription OnDeleteDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onDeleteDataSet(filter: $filter) {
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
        heatMap {
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
        dataSetId
        options
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
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      user
      createdAt
      updatedAt
      dataSetHeatMapId
    }
  }
`;
export const onCreateDataValue = /* GraphQL */ `
  subscription OnCreateDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onCreateDataValue(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnUpdateDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onUpdateDataValue(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnDeleteDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onDeleteDataValue(filter: $filter) {
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
          dataSetId
          options
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
  subscription OnCreateChannelType(
    $filter: ModelSubscriptionChannelTypeFilterInput
  ) {
    onCreateChannelType(filter: $filter) {
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
  subscription OnUpdateChannelType(
    $filter: ModelSubscriptionChannelTypeFilterInput
  ) {
    onUpdateChannelType(filter: $filter) {
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
  subscription OnDeleteChannelType(
    $filter: ModelSubscriptionChannelTypeFilterInput
  ) {
    onDeleteChannelType(filter: $filter) {
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
  subscription OnCreateCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onCreateCurrentChannel(filter: $filter) {
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
  subscription OnUpdateCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onUpdateCurrentChannel(filter: $filter) {
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
  subscription OnDeleteCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onDeleteCurrentChannel(filter: $filter) {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
