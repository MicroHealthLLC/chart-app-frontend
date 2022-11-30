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
