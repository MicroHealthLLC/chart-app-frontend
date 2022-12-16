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
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
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
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
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
      colorSchemeId
      chartType
      dataSet {
        id
        title
        description
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
          colorSchemeId
          chartType
          dataSetId
          createdAt
          updatedAt
          reportDataSetId
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
          colorSchemeId
          chartType
          dataSetId
          createdAt
          updatedAt
          reportDataSetId
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
          colorSchemeId
          chartType
          dataSetId
          createdAt
          updatedAt
          reportDataSetId
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
export const onUpdateDataSet = /* GraphQL */ `
  subscription OnUpdateDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onUpdateDataSet(filter: $filter) {
      id
      title
      description
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
export const onDeleteDataSet = /* GraphQL */ `
  subscription OnDeleteDataSet($filter: ModelSubscriptionDataSetFilterInput) {
    onDeleteDataSet(filter: $filter) {
      id
      title
      description
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
export const onCreateDataValue = /* GraphQL */ `
  subscription OnCreateDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onCreateDataValue(filter: $filter) {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
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
export const onUpdateDataValue = /* GraphQL */ `
  subscription OnUpdateDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onUpdateDataValue(filter: $filter) {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
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
export const onDeleteDataValue = /* GraphQL */ `
  subscription OnDeleteDataValue(
    $filter: ModelSubscriptionDataValueFilterInput
  ) {
    onDeleteDataValue(filter: $filter) {
      id
      data
      dataSetId
      dataSet {
        id
        title
        description
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
export const onCreateCurrentChannel = /* GraphQL */ `
  subscription OnCreateCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onCreateCurrentChannel(filter: $filter) {
      id
      name
      channelId
      regName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurrentChannel = /* GraphQL */ `
  subscription OnUpdateCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onUpdateCurrentChannel(filter: $filter) {
      id
      name
      channelId
      regName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurrentChannel = /* GraphQL */ `
  subscription OnDeleteCurrentChannel(
    $filter: ModelSubscriptionCurrentChannelFilterInput
  ) {
    onDeleteCurrentChannel(filter: $filter) {
      id
      name
      channelId
      regName
      createdAt
      updatedAt
    }
  }
`;
