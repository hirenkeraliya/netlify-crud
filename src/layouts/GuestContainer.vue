<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <router-view />
                </b-col>
            </b-row>
        </div>
    </div>
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
