<template>
    <b-container>
        <b-row align-v="center">
            <b-col>
                <router-view />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'GuestContainer',

        data() {
            return {
                //
            }
        },

    }
</script>
