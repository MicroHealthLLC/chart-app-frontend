/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onCreateReport(filter: $filter, owner: $owner) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onUpdateReport(filter: $filter, owner: $owner) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onDeleteReport(filter: $filter, owner: $owner) {
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
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onCreateChannel(filter: $filter, owner: $owner) {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onUpdateChannel(filter: $filter, owner: $owner) {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel(
    $filter: ModelSubscriptionChannelFilterInput
    $owner: String
  ) {
    onDeleteChannel(filter: $filter, owner: $owner) {
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
