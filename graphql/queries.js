/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPost = /* GraphQL */ `
  query GetUserPost($id: ID!) {
    getUserPost(id: $id) {
      id
      user_id
      product_type
      product_size
      product_quantity
      timeline_start
      timeline_end
      createdAt
      updatedAt
    }
  }
`;
export const listUserPosts = /* GraphQL */ `
  query ListUserPosts(
    $filter: ModelUserPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        product_type
        product_size
        product_quantity
        timeline_start
        timeline_end
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
