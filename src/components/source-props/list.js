import gql from 'graphql-tag';

  export const SOURCE_LIST_QUERY = gql`
  query UNIT(
    $id: ID!
    $typeRelationships: String!
    $parameters: String
  ) {
    unitData(
      unitId: $id
      typeRelationships: $typeRelationships
      parameters: $parameters
    )
    {
      instance {
      id
      value
    }
    }
  }
`;

export const LIST_RELATIONSHIPS = {
   item: null,
};