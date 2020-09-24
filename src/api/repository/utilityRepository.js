import Repository from '@/api/core'
const baseURL = process.env.VUE_APP_API_UTILITY + '/homepage'

const fetch = (params) => {
  return Repository(baseURL).fetch(params)
}

const fetchOne = (id) => {
  return Repository(baseURL).fetchOne(id)
}

const create = (params) => {
  return Repository(baseURL).create(params)
}

const update = (id, params) => {
  return Repository(baseURL).update(id, params)
}

const remove = (id) => {
  return Repository(baseURL).delete(id)
}

export default {
  fetch,
  fetchOne,
  create,
  update,
  remove
}