import onlineCourseRepository from '@/api/repository/onlineCourseRepository'
import utilityRepository from '@/api/repository/utilityRepository'

const repositories = {
  onlineCourse: onlineCourseRepository,
  utility: utilityRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}