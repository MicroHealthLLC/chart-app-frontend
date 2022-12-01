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
        type
        title
        channelTypeId
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
        type
        title
        channelTypeId
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
        type
        title
        channelTypeId
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
          channelId
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
          channelId
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
          channelId
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
      channels
      data
      user
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDataSet = /* GraphQL */ `
  subscription OnUpdateDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onUpdateDataSet(filter: $filter) {
      id
      title
      description
      channels
      data
      user
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDataSet = /* GraphQL */ `
  subscription OnDeleteDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onDeleteDataSet(filter: $filter) {
      id
      title
      description
      channels
      data
      user
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
