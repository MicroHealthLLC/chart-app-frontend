/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport {
    onCreateReport {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport {
    onUpdateReport {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport {
    onDeleteReport {
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
export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel {
    onCreateChannel {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel {
    onUpdateChannel {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel {
    onDeleteChannel {
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
export const onCreateDataSet = /* GraphQL */ `
  subscription OnCreateDataSet {
    onCreateDataSet {
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
  subscription OnUpdateDataSet {
    onUpdateDataSet {
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
  subscription OnDeleteDataSet {
    onDeleteDataSet {
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
  subscription OnCreateChannelType {
    onCreateChannelType {
      title
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChannelType = /* GraphQL */ `
  subscription OnUpdateChannelType {
    onUpdateChannelType {
      title
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChannelType = /* GraphQL */ `
  subscription OnDeleteChannelType {
    onDeleteChannelType {
      title
      id
      createdAt
      updatedAt
    }
  }
`;
