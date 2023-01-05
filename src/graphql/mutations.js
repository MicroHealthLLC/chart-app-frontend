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
        user
        createdAt
        updatedAt
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
        user
        createdAt
        updatedAt
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
        user
        createdAt
        updatedAt
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
      createdBy
      updatedBy
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
      createdBy
      updatedBy
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
      user
      createdAt
      updatedAt
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
        user
        createdAt
        updatedAt
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
        user
        createdAt
        updatedAt
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
        user
        createdAt
        updatedAt
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
