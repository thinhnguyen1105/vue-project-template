<template>
	<div class="about">
		<h1>{{authenticated ? `Welcome ${authUser.name}` : 'Are you login ?'}}</h1>
		<v-row style="display:flex; justify-content: center;">
			<v-col cols="12" sm="6" md="3">
				<v-text-field v-model="email" label="Email" placeholder="Email" outlined></v-text-field>
				<v-text-field
					v-model="password"
					label="Password"
					placeholder="Password"
					type="password"
					outlined
				></v-text-field>
			</v-col>
		</v-row>
		<v-btn class="mr-3" @click="logIn">Log in</v-btn>
		<v-btn class="mr-3" @click="logOut">Log out</v-btn>
		<v-btn v-if="authenticated" @click="refresh">Refresh token</v-btn>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn',
			signOut: 'auth/signOut',
			refreshToken: 'auth/refreshToken',
		}),
		async logIn() {
			try {
				await this.signIn({
					email: this.email,
					password: this.password,
				})
				this.$message.success('Đăng nhập thành công !')
			} catch (error) {
				this.$message.error(error)
			}
		},
		async logOut() {
			try {
				await this.signOut()
				this.$message.success('Đăng xuất thành công !')
			} catch (error) {
				this.$message.error(error)
			}
		},
		async refresh() {
			try {
				await this.refreshToken(this.authUser)
				this.$message.success('Lấy lại token thành công !')
			} catch (error) {
				this.$message.error(error)
			}
		},
	},
	computed: {
		...mapGetters({
			authUser: 'auth/getAuthUser',
			authenticated: 'auth/getAuthenticated',
		}),
	},
}
</script>
