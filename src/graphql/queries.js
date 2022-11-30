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
        type {
          title
          id
          createdAt
          updatedAt
        }
        title
        createdAt
        updatedAt
      }
      description
      channelId
      createdAt
      updatedAt
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
          title
          createdAt
          updatedAt
        }
        description
        channelId
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
          channelId
          createdAt
          updatedAt
        }
        nextToken
      }
      type {
        title
        id
        createdAt
        updatedAt
      }
      title
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
        type {
          title
          id
          createdAt
          updatedAt
        }
        title
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
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
