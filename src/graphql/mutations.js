/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
export const createReportGroup = /* GraphQL */ `
  mutation CreateReportGroup(
    $input: CreateReportGroupInput!
    $condition: ModelReportGroupConditionInput
  ) {
    createReportGroup(input: $input, condition: $condition) {
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
export const updateReportGroup = /* GraphQL */ `
  mutation UpdateReportGroup(
    $input: UpdateReportGroupInput!
    $condition: ModelReportGroupConditionInput
  ) {
    updateReportGroup(input: $input, condition: $condition) {
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
export const deleteReportGroup = /* GraphQL */ `
  mutation DeleteReportGroup(
    $input: DeleteReportGroupInput!
    $condition: ModelReportGroupConditionInput
  ) {
    deleteReportGroup(input: $input, condition: $condition) {
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
export const createGauge = /* GraphQL */ `
  mutation CreateGauge(
    $input: CreateGaugeInput!
    $condition: ModelGaugeConditionInput
  ) {
    createGauge(input: $input, condition: $condition) {
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
export const updateGauge = /* GraphQL */ `
  mutation UpdateGauge(
    $input: UpdateGaugeInput!
    $condition: ModelGaugeConditionInput
  ) {
    updateGauge(input: $input, condition: $condition) {
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
export const deleteGauge = /* GraphQL */ `
  mutation DeleteGauge(
    $input: DeleteGaugeInput!
    $condition: ModelGaugeConditionInput
  ) {
    deleteGauge(input: $input, condition: $condition) {
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
export const createHeatMap = /* GraphQL */ `
  mutation CreateHeatMap(
    $input: CreateHeatMapInput!
    $condition: ModelHeatMapConditionInput
  ) {
    createHeatMap(input: $input, condition: $condition) {
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
export const updateHeatMap = /* GraphQL */ `
  mutation UpdateHeatMap(
    $input: UpdateHeatMapInput!
    $condition: ModelHeatMapConditionInput
  ) {
    updateHeatMap(input: $input, condition: $condition) {
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
export const deleteHeatMap = /* GraphQL */ `
  mutation DeleteHeatMap(
    $input: DeleteHeatMapInput!
    $condition: ModelHeatMapConditionInput
  ) {
    deleteHeatMap(input: $input, condition: $condition) {
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
export const createDashboard = /* GraphQL */ `
  mutation CreateDashboard(
    $input: CreateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    createDashboard(input: $input, condition: $condition) {
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
export const updateDashboard = /* GraphQL */ `
  mutation UpdateDashboard(
    $input: UpdateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    updateDashboard(input: $input, condition: $condition) {
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
export const deleteDashboard = /* GraphQL */ `
  mutation DeleteDashboard(
    $input: DeleteDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    deleteDashboard(input: $input, condition: $condition) {
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
export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
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
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
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
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
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
export const createDataSet = /* GraphQL */ `
  mutation CreateDataSet(
    $input: CreateDataSetInput!
    $condition: ModelDataSetConditionInput
  ) {
    createDataSet(input: $input, condition: $condition) {
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
export const updateDataSet = /* GraphQL */ `
  mutation UpdateDataSet(
    $input: UpdateDataSetInput!
    $condition: ModelDataSetConditionInput
  ) {
    updateDataSet(input: $input, condition: $condition) {
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
export const deleteDataSet = /* GraphQL */ `
  mutation DeleteDataSet(
    $input: DeleteDataSetInput!
    $condition: ModelDataSetConditionInput
  ) {
    deleteDataSet(input: $input, condition: $condition) {
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
export const createDataValue = /* GraphQL */ `
  mutation CreateDataValue(
    $input: CreateDataValueInput!
    $condition: ModelDataValueConditionInput
  ) {
    createDataValue(input: $input, condition: $condition) {
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
export const updateDataValue = /* GraphQL */ `
  mutation UpdateDataValue(
    $input: UpdateDataValueInput!
    $condition: ModelDataValueConditionInput
  ) {
    updateDataValue(input: $input, condition: $condition) {
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
export const deleteDataValue = /* GraphQL */ `
  mutation DeleteDataValue(
    $input: DeleteDataValueInput!
    $condition: ModelDataValueConditionInput
  ) {
    deleteDataValue(input: $input, condition: $condition) {
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
export const createChannelType = /* GraphQL */ `
  mutation CreateChannelType(
    $input: CreateChannelTypeInput!
    $condition: ModelChannelTypeConditionInput
  ) {
    createChannelType(input: $input, condition: $condition) {
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
export const updateChannelType = /* GraphQL */ `
  mutation UpdateChannelType(
    $input: UpdateChannelTypeInput!
    $condition: ModelChannelTypeConditionInput
  ) {
    updateChannelType(input: $input, condition: $condition) {
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
export const deleteChannelType = /* GraphQL */ `
  mutation DeleteChannelType(
    $input: DeleteChannelTypeInput!
    $condition: ModelChannelTypeConditionInput
  ) {
    deleteChannelType(input: $input, condition: $condition) {
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
export const createCurrentChannel = /* GraphQL */ `
  mutation CreateCurrentChannel(
    $input: CreateCurrentChannelInput!
    $condition: ModelCurrentChannelConditionInput
  ) {
    createCurrentChannel(input: $input, condition: $condition) {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const updateCurrentChannel = /* GraphQL */ `
  mutation UpdateCurrentChannel(
    $input: UpdateCurrentChannelInput!
    $condition: ModelCurrentChannelConditionInput
  ) {
    updateCurrentChannel(input: $input, condition: $condition) {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const deleteCurrentChannel = /* GraphQL */ `
  mutation DeleteCurrentChannel(
    $input: DeleteCurrentChannelInput!
    $condition: ModelCurrentChannelConditionInput
  ) {
    deleteCurrentChannel(input: $input, condition: $condition) {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
