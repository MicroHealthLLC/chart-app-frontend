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
      channels
      data
      user
      createdAt
      updatedAt
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
      channels
      data
      user
      createdAt
      updatedAt
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
      channels
      data
      user
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
      channels
      data
      user
      createdAt
      updatedAt
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
      channels
      data
      user
      createdAt
      updatedAt
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
      channels
      data
      user
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
