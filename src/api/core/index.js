import axios from 'axios'
const credentials = {
  vendorId: '23b0bfb0-c00b-11e9-a060-17d3861b7a5b'
}
const Repository = BASE_URL => ({
  fetch: (params, option) =>
    axios.get(
      BASE_URL,
      { params: { ...params, vendorId: credentials.vendorId } },
      option
    ),
  fetchOne: (id, option) =>
    axios.get(
      BASE_URL + "/" + id,
      { params: { vendorId: credentials.vendorId } },
      option
    ),
  create: (params, options) =>
    axios.post(
      BASE_URL,
      { ...params, vendorId: credentials.vendorId },
      {
        headers: {
          Authorization: credentials.accessToken
        }
      },
      options
    ),
  update: (id, params, option) =>
    axios.put(
      BASE_URL + `/${id}?vendorId=${credentials.vendorId}`,
      params,
      {
        headers: {
          Authorization: credentials.accessToken
        }
      },
      option
    ),
  delete: (id, option) =>
    axios.delete(
      BASE_URL + `/${id}?vendorId=${credentials.vendorId}`,
      {
        headers: {
          Authorization: credentials.accessToken
        }
      },
      option
    ),
});

export default Repository
