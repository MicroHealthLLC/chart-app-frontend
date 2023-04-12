/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      title
      reportGroup {
        id
        title
        reports {
          nextToken
        }
        reportIds
        channelId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      description
      reportGroupId
      channelId
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
        channelId
        dataValues {
          nextToken
        }
        user
        createdAt
        updatedAt
      }
      dataSetId
      xAxis
      yAxis
      yAction
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
        reportGroup {
          id
          title
          reportIds
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        description
        reportGroupId
        channelId
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
        }
        dataSetId
        xAxis
        yAxis
        yAction
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
          colorSchemeId
          chartType
          dataSetId
          xAxis
          yAxis
          yAction
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
      channelId
      createdBy
      updatedBy
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
        channelId
        createdBy
        updatedBy
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
      channelId
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
        channelId
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
        channelId
        dataValues {
          nextToken
        }
        user
        createdAt
        updatedAt
      }
      dataSetId
      options
      leadCol
      columns
      notes
      channelId
      createdBy
      updatedBy
      createdAt
      updatedAt
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
        }
        dataSetId
        options
        leadCol
        columns
        notes
        channelId
        createdBy
        updatedBy
        createdAt
        updatedAt
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
      cards
      background
      channelId
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
        cards
        background
        channelId
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
          colorSchemeId
          chartType
          dataSetId
          xAxis
          yAxis
          yAction
          columns
          createdBy
          updatedBy
          createdAt
          updatedAt
          reportDataSetId
        }
        nextToken
      }
      reportGroups {
        items {
          id
          title
          reportIds
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
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
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      heatMaps {
        items {
          id
          title
          dataSetId
          options
          leadCol
          columns
          notes
          channelId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
        nextToken
      }
      dashboards {
        items {
          id
          title
          description
          cards
          background
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
        reportGroups {
          nextToken
        }
        dataSets {
          nextToken
        }
        gauges {
          nextToken
        }
        heatMaps {
          nextToken
        }
        dashboards {
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
      user
      createdAt
      updatedAt
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
        channelId
        dataValues {
          nextToken
        }
        user
        createdAt
        updatedAt
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
        channelId
        dataValues {
          nextToken
        }
        user
        createdAt
        updatedAt
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
