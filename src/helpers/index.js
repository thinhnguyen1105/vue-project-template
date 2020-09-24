const LIST_ELEMENT_QUERY_HOMEPAGE = [
  {
    name: 'SectionCourseOnline',
    key: 'course-online'
  },
  {
    name: 'SectionCourseOffline',
    key: 'course-offline'
  },
  {
    name: 'SectionEventList',
    key: 'academic-event'
  },
  {
    name: 'SectionDepartment',
    key: 'academic-department'
  },
  {
    name: 'SectionEbook',
    key: 'book'
  }
]

const QUERY_HOMEPAGE = {
  'course-online': {
    ids: [],
    fields: [
      'id',
      'vendorId',
      'createdAt',
      'status',
      'topics',
      'authors',
      'previewImg',
      'title',
      'shortDescription',
      'isFree',
      'price',
      'disablePurchasing',
      'video'
    ]
  },
  'course-offline': {
    ids: [],
    fields: [
      'id',
      'vendorId',
      'status',
      'topics',
      'authors',
      'metadata',
      'duration',
      'title',
      'price',
      'description',
      'shortDescription',
    ]
  },
  'academic-event': {
    ids: [],
    fields: [
      'id',
      'vendorId',
      'createdAt',
      'previewImage',
      'runningStartDate',
      'title',
      'runningStartHour',
      'center'
    ]
  },
  'academic-department': {
    ids: [],
    fields: ['id', 'vendorId', 'createdAt', 'previewImage', 'name']
  },
  book: {
    ids: [],
    fields: [
      'id',
      'vendorId',
      'createdAt',
      'previewImage',
      'authors',
      'title'
    ]
  }
}

export default {
  LIST_ELEMENT_QUERY_HOMEPAGE,
  QUERY_HOMEPAGE,
}