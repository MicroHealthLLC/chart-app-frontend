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
        type
        title
        channelTypeId
        createdAt
        updatedAt
      }
      description
      channelId
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
        xAxis
        user
        createdAt
        updatedAt
      }
      dataSetId
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
        description
        channelId
        colorSchemeId
        chartType
        dataSet {
          id
          title
          description
          channelId
          xAxis
          user
          createdAt
          updatedAt
        }
        dataSetId
        createdAt
        updatedAt
        reportDataSetId
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
          channelId
          colorSchemeId
          chartType
          dataSetId
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
          xAxis
          user
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
      xAxis
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
        xAxis
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
        xAxis
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
          xAxis
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
