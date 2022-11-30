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
        }
        title
        createdAt
        updatedAt
        owner
      }
      description
      channelId
      createdAt
      updatedAt
      owner
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
          owner
        }
        description
        channelId
        createdAt
        updatedAt
        owner
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
          owner
        }
        nextToken
      }
      type {
        title
        id
      }
      title
      createdAt
      updatedAt
      owner
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
        }
        title
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
