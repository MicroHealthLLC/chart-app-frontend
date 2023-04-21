/* eslint-disable */

export const listReportGroupsWithReports = /* GraphQL */ `
  query ListReportGroups(
    $filter: ModelReportGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        reports {
          items {
            id
            title
          }
          nextToken
        }
        reportIds
        channelId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;