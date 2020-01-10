<template>
    <div class="mt-5">
        <b-jumbotron header="Netlify Crud">
            <b-button id="login-button" variant="success" size="lg" @click="openLoginModel">Login</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
    name: 'Login',

    data() {
        return {
        }
    },

    methods: {
        openLoginModel() {
            netlifyIdentity.open();
        }
    },

    mounted: function () {
        netlifyIdentity.init({
            container: '#login-button',
            APIUrl: 'https://netlify-crud.netlify.com/.netlify/identity'
        });

        let user = netlifyIdentity.currentUser();
        if (user) {
            this.$store.commit('setUserData', user);

            return;
        }

        let self = this;
        netlifyIdentity.on('login', (user) => {
            self.$store.commit('setUserData', user)
        });
    }
}
</script>