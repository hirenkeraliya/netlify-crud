<template>
    <div class="mt-5">
         <b-card
            header-tag="header"
            header-bg-variant="dark"
        >
            <template v-slot:header>
                <h4 class="d-inline-block text-white mt-1">Students</h4>

                <b-button class="float-right"
                    variant="info"
                    :to="{ name: 'StudentsAdd' }"
                >
                    Add New Student
                </b-button>
            </template>

            <b-row class="mb-3">
                <b-col cols="12" md="9" class="mb-3 mb-md-0">
                    <multiselect class="w-30 field-select-box"
                        :options="displayPerPages"
                        v-model="perPage"
                        label="label"
                        :allow-empty="false"
                        selectLabel=""
                        selectedLabel=""
                        deselectLabel=""
                    ></multiselect>
                </b-col>

                <b-col cols="12" md="3" class="mb-3 mb-md-0">
                    <b-input v-model="filter" placeholder="Search..." />
                </b-col>
            </b-row>

            <b-table :items="fetchStudents"
                id="students-table"
                :fields="fields"
                striped
                no-sort-reset
                bordered
                hover
                show-empty
                stacked="md"
                primary-key="id"
                :current-page="currentPage"
                :per-page="perPage.value"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                @filtered="onFiltered"
            >
                <template v-slot:cell(actions)="data">
                    <b-button size="sm"
                        variant="primary"
                        class="mr-1 btn-brand"
                        title="Edit Student"
                    >
                        <font-awesome-icon icon="edit"></font-awesome-icon>
                    </b-button>

                    <b-button size="sm"
                        variant="danger"
                        class="mr-1 btn-brand"
                        title="Delete Student"
                    >
                        <font-awesome-icon icon="trash"></font-awesome-icon>
                    </b-button>
                </template>
            </b-table>

            <b-row class="mt-3">
                <b-col>
                    Total records: {{ totalRows }}
                </b-col>

                <b-col>
                    <b-pagination
                        align="right"
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage.value"
                    />
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import axios from 'axios';

export default {
    name: 'StudentList',

    components: { Multiselect },

    data() {
        return {
            perPage: {
                'label': '25',
                'value': '25'
            },
            displayPerPages: [
                {
                    'label': '10',
                    'value': '10'
                }, {
                    'label': '25',
                    'value': '25'
                }, {
                    'label': '50',
                    'value': '50'
                }, {
                    'label': '100',
                    'value': '100'
                }
            ],
            currentPage: 1,
            totalRows: 0,
            sortBy: null,
            sortDesc: false,
            filter: null,
            fields: [
                {
                    key: 'id',
                    label: '#',
                    sortable: true
                },
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'email',
                    label: 'Email',
                    sortable: true
                },
                {
                    key: 'phone',
                    label: 'Phone',
                    sortable: true
                },
                {
                    key: 'actions'
                },
            ],
        }
    },

    methods: {
        onFiltered() {
            if (! this.filter) {
                this.currentPage = 1
            }
        },

        fetchStudents() {
            let self = this;

            return axios.get('/get-students')
            .then(function (response) {
                self.totalRows = response.data.students.length
                return response.data.students;
            })
            .catch(function () {
                return [];
            });
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.w-30 {
    width: 30%;
}
</style>