export const GET_CHARCTERS_QUERY = (page) => `
query{
    characters(page:${page}){
      results{
        id,
        name,
        image
      }
    }
  }`;
export const GET_CHARCTER_DETAILS_QUERY = (id) => `
query {
  character(id: "${id}") {
    id
    name
    status
    species
    type
    gender
    image
    created
    location {
      name
    }
    origin {
      name
    }
    episode: episode {
      name
    }
  }
}
  `;
