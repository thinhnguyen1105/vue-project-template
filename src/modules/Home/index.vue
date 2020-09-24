<script>
import {mapGetters, mapActions} from 'vuex'
import MainLayout from '@/templates/layout/MainLayout.vue'
export default {
	components: {
		MainLayout,
	},
	data() {
		return {
			convertedData: [],
		}
	},
	computed: {
		...mapGetters({
			getViewData: 'vendor/getViewData',
			dataHomePage: 'vendor/getDataHomePage',
		}),
	},
	methods: {
		...mapActions({
			fetchDataForHomePage: 'vendor/fetchDataForHomePage',
		}),
		replaceIdByObjectDetail(viewHasId, viewHasDetail) {
			viewHasId.forEach((id, index) => {
				const replaceItem = viewHasDetail.find((detailItem) => {
					return detailItem.id === id || detailItem.dynamoId === id
				})
				if (replaceItem) viewHasId[index] = replaceItem
			})
		},
		setDataForHomepage(viewData) {
			const listElementQueryHomepage = this.$helpers.LIST_ELEMENT_QUERY_HOMEPAGE
			listElementQueryHomepage.forEach((element) => {
				viewData.forEach((view) => {
					if (view.element === element.name) {
						this.replaceIdByObjectDetail(
							view.props.items,
							this.dataHomePage[element.key]
						)
					}
				})
			})
		},
		inputElementIdToQuery(viewData, query) {
			const listElementQueryHomepage = this.$helpers.LIST_ELEMENT_QUERY_HOMEPAGE
			listElementQueryHomepage.forEach((element) => {
				viewData.forEach((view) => {
					if (view.element === element.name) {
						query[element.key].ids = query[element.key].ids.concat(
							view.props.items
						)
					}
				})
			})
			return query
		},
		async getDataDetails(viewData) {
			const query = this.$helpers.QUERY_HOMEPAGE
			const queryHasElementId = this.inputElementIdToQuery(viewData, query)
			await this.fetchDataForHomePage({query: queryHasElementId})
			this.setDataForHomepage(viewData)
			return viewData
		},
		getDataNewDesignSystem(convertedData) {
			return convertedData.map((data) => {
				if (data.element === 'SectionBannerImageSlider') {
					return {
						...data,
						props: {
							...data.props,
							'full-width': true,
						},
						element: 'SectionSlideshow',
					}
				} else if (data.element === 'SectionCourseOnline') {
					return {
						...data,
						element: 'SectionOnlineCourse',
					}
				} else if (data.element === 'SectionCourseOffline') {
					return {
						...data,
						element: 'SectionOfflineCourse',
					}
				} else if (data.element === 'SectionBannerText') {
					return {
						...data,
						element: 'SectionHeroBanner',
					}
				} else return data
			})
		},
	},
	render(createElement) {
		return this.$renderUIFromJSON.renderElement(createElement, {
			element: 'MainLayout',
			children: this.convertedData,
		})
	},
	watch: {
		convertedData: {
			async handler(val) {
				if (val) {
					this.$forceUpdate()
				}
			},
			immediate: true,
		},
		getViewData: {
			async handler(viewData) {
				if (viewData) {
					this.convertedData = await this.getDataDetails(viewData)
					this.convertedData = await this.getDataNewDesignSystem(
						this.convertedData
					)
					if (this.convertedData) {
						this.$forceUpdate()
					}
				}
			},
			immediate: true,
		},
	},
}
</script>
