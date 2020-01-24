<template>
    <div class="mt-5">
        <b-col cols="12" md="6" offset-md="3">
            <b-card
                header-tag="header"
                header-bg-variant="dark"
            >
                <template v-slot:header>
                    <h4 class="d-inline-block text-white mt-1">
                        {{ student ? 'Edit Student' : 'Add New Student' }}
                    </h4>

                    <b-button class="float-right"
                        variant="danger"
                        @click="cancelStudent"
                    >
                        Cancel
                    </b-button>

                    <b-button class="float-right mr-3"
                        variant="success"
                        @click="student ? updateStudentDetails : addNewStudent()"
                    >
                        Save
                    </b-button>
                </template>

                <b-form-group label="Name" :label-cols="3">
                    <b-form-input type="text" v-model="studentForm.name" />
                </b-form-group>

                <b-form-group label="Email" :label-cols="3">
                    <b-form-input type="text" v-model="studentForm.email" />
                </b-form-group>

                <b-form-group label="Phone Number" :label-cols="3">
                    <b-form-input type="text" v-model="studentForm.phone" />
                </b-form-group>
            </b-card>
        </b-col>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StudentsForm',

    props: {
        student: [String, Number],
    },

    data() {
        return {
            studentForm: {
                name: '',
                email: '',
                phone: '',
            }
        }
    },

    methods: {
        cancelStudent() {
            this.$router.push({ name: 'StudentsList' })
        },

        addNewStudent() {
            let self = this;
            if (! this.studentForm.name || ! this.studentForm.email || ! this.studentForm.phone) {
                self.$toasted.error('Please fill all the fields.');
                return;
            }

            axios.post(
                '/add-new-student',
                this.studentForm
            ).then(function () {
                self.$router.push({ name: 'StudentsList' });

                self.$toasted.success('Student added successfully.')
            }).catch(function (error) {
                console.log(error);

                self.$toasted.error('Something went wrong.')
            });
        },

        updateStudentDetails() {
            console.log('hi');

            this.$router.push({ name: 'StudentsList' })
        }
    },

    created() {
        if (this.student) {
            console.log('hi');
        }
    }
}
</script>