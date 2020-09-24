import { RepositoryFactory } from '@/api/factory/repositoryFactory'
const OnlineCourseRepository = RepositoryFactory.get('onlineCourse')
const state = {
  courses: [],
  count: 18
}
const actions = {
  async fetchCourses({ commit }, params = {}) {
    const res = await OnlineCourseRepository.fetch(params);
    commit("setCourses", res.data || []);
    return res.data;
  },
}
const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  }
}
const getters = {
  getCount: state => {
    return state.count
  }
}
export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true
}
