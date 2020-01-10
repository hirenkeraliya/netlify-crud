<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">
                <img src="/logo.png">
            </b-navbar-brand>

            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <strong>{{ userFullName }}</strong>
                    </template>

                    <b-dropdown-item @click="logoutUser()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-navbar>
        <b-container>
            <router-view />
        </b-container>
    </div>
</template>

<script>
    import netlifyIdentity from 'netlify-identity-widget'

    export default {
        name: 'GuestContainer',

        data() {
            return {
                //
            }
        },

        methods: {
            logoutUser() {
                netlifyIdentity.logout();

                this.$store.commit('clearUserData');

                this.$toasted.success(
                    'Logged out successfully.',
                    { icon: 'check', duration: 5000 }
                )

                window.location.href = '/login'
            }
        },

        computed: {
            userFullName: function () {
                var user = this.$store.state.userDetails.user;

                if (user.user_metadata) {
                    return user.user_metadata.full_name;
                }

                return '';
            }
        },

        mounted() {
            netlifyIdentity.init({
                APIUrl: 'https://netlify-crud.netlify.com/.netlify/identity'
            });

            this.$store.commit('setUserData', netlifyIdentity.currentUser());
        }
    }
</script>
