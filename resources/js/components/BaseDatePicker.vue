<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-menu
        v-model="modal"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                :label="label"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                @input="update"
                clearable
            ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="modal = false" @change="update" scrollable></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: 'BaseDateRangePicker',
    props: ['value', 'label'],
    data() {
        return {
            modal: false,
            date: '',
        }
    },
    methods: {
        update () {
            this.$emit('update:value', this.date)
        }
    }
}
</script>
