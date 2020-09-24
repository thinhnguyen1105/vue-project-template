<template>
	<v-app id="app">
		<div id="nav">
			<router-link to="/">Home</router-link>|
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
		<BaseMessage />
	</v-app>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	methods: {
		...mapActions({
			fetchVendor: 'vendor/fetchVendor',
			getSettingsVendor: 'vendor/getSettingsVendor',
			initAuthen: 'auth/initAuthen',
		}),
	},
	async created() {
		await this.fetchVendor()
		await this.getSettingsVendor()
		this.initAuthen()
	},
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
