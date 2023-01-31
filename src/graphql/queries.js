/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
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
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        channel {
          id
          description
          type
          title
          channelTypeId
          createdAt
          updatedAt
        }
        reportGroup {
          id
          title
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
          channelId
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
      nextToken
    }
  }
`;
export const getReportGroup = /* GraphQL */ `
  query GetReportGroup($id: ID!) {
    getReportGroup(id: $id) {
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
export const listReportGroups = /* GraphQL */ `
  query ListReportGroups(
    $filter: ModelReportGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGauge = /* GraphQL */ `
  query GetGauge($id: ID!) {
    getGauge(id: $id) {
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
export const listGauges = /* GraphQL */ `
  query ListGauges(
    $filter: ModelGaugeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGauges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        notes
        value
        segmentStops
        chartType
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
        dashboard {
          id
          title
          description
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
      nextToken
    }
  }
`;
export const getHeatMap = /* GraphQL */ `
  query GetHeatMap($id: ID!) {
    getHeatMap(id: $id) {
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
export const listHeatMaps = /* GraphQL */ `
  query ListHeatMaps(
    $filter: ModelHeatMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeatMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDashboard = /* GraphQL */ `
  query GetDashboard($id: ID!) {
    getDashboard(id: $id) {
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
export const listDashboards = /* GraphQL */ `
  query ListDashboards(
    $filter: ModelDashboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDashboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
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
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDataSet = /* GraphQL */ `
  query GetDataSet($id: ID!) {
    getDataSet(id: $id) {
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
export const listDataSets = /* GraphQL */ `
  query ListDataSets(
    $filter: ModelDataSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDataValue = /* GraphQL */ `
  query GetDataValue($id: ID!) {
    getDataValue(id: $id) {
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
export const listDataValues = /* GraphQL */ `
  query ListDataValues(
    $filter: ModelDataValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data
        dataSetId
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChannelType = /* GraphQL */ `
  query GetChannelType($id: ID!) {
    getChannelType(id: $id) {
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
export const listChannelTypes = /* GraphQL */ `
  query ListChannelTypes(
    $filter: ModelChannelTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannelTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        channels {
          nextToken
        }
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCurrentChannel = /* GraphQL */ `
  query GetCurrentChannel($id: ID!) {
    getCurrentChannel(id: $id) {
      id
      name
      regName
      channelId
      createdAt
      updatedAt
    }
  }
`;
export const listCurrentChannels = /* GraphQL */ `
  query ListCurrentChannels(
    $filter: ModelCurrentChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCurrentChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        regName
        channelId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
