/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserPost = /* GraphQL */ `
  mutation CreateUserPost(
    $input: CreateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    createUserPost(input: $input, condition: $condition) {
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
export const updateUserPost = /* GraphQL */ `
  mutation UpdateUserPost(
    $input: UpdateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    updateUserPost(input: $input, condition: $condition) {
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
export const deleteUserPost = /* GraphQL */ `
  mutation DeleteUserPost(
    $input: DeleteUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    deleteUserPost(input: $input, condition: $condition) {
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
