<template>
    <v-row class="ma-5">
        <v-col cols="12" md="3">
            <v-card>
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Add an Event!</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="data.event_name" label="Event Name" prepend-icon="mdi-tag" clearable></v-text-field>
                    <base-date-picker :value.sync="data.start_date" label="Start date"/>
                    <base-date-picker :value.sync="data.end_date" label="End date"/>
                    <base-checkbox-group :value.sync="data.occurring_days" :objects="days"/>
                </v-card-text>
                <v-btn
                    :disabled="!validateData || formLoading"
                    :loading="formLoading"
                    color="primary"
                    @click="addEvent"
                    block
                    tile
                    depressed
                >
                    <span>Add</span>
                </v-btn>
            </v-card>
        </v-col>
        <v-col cols="12" md="9">
            <v-card class="pa-5">
                <v-skeleton-loader
                    ref="skeleton"
                    :loading="loading"
                    :transition="transition"
                    type="date-picker"
                >
                    <base-calendar :events="events" ref="base-calendar"/>
                </v-skeleton-loader>
            </v-card>
        </v-col>
        <v-snackbar v-model="snackbar.success" color="success" :timeout="snackbar.timeout">
            <span v-html="snackbar.message"></span>
        </v-snackbar>
        <v-snackbar v-model="snackbar.error" color="error" :timeout="snackbar.timeout">
            <span v-html="snackbar.message"></span>
        </v-snackbar>
    </v-row>
</template>

<script>
import BaseCalendar from '../components/BaseCalendar'
import BaseDatePicker from '../components/BaseDatePicker'
import BaseCheckboxGroup from '../components/BaseCheckboxGroup'
import {
    itemColors,
    random,
    extractErrorFromResponse,
    getDayOfWeek,
    getDateString
} from '../utils'

export default {
    name: 'CalendarPage',
    components: {BaseCalendar, BaseDatePicker, BaseCheckboxGroup},
    data() {
        return {
            loading: true,
            formLoading: false,
            transition: 'fade-transition',
            data: {
                event_name: '',
                start_date: '',
                end_date: '',
                occurring_days: []
            },
            days: [
                {label: 'Mon', value: 'Mo'},
                {label: 'Tue', value: 'Tu'},
                {label: 'Wed', value: 'We'},
                {label: 'Thu', value: 'Th'},
                {label: 'Fri', value: 'Fr'},
                {label: 'Sat', value: 'Sa'},
                {label: 'Sun', value: 'Su'}
            ],
            events: [],
            snackbar: {
                success: false,
                error: false,
                message: '',
                timeout: 3000
            }
        }
    },
    async mounted() {
        await this.getEvents()
    },
    computed: {
        validateData() {
            return Object.values(this.data).every(item => Array.isArray(item) ? item.length : item)
        }
    },
    methods: {
        addEvent() {
            this.formLoading = true
            this.data.occurring_days = JSON.stringify(this.data.occurring_days)
            axios.post('calendar-events', this.data)
                .then(async(response) => {
                    this.formLoading = false
                    let result = response.data
                    let data = result.data

                    this.splitEventDates([ data ])
                    this.$refs['base-calendar'].refreshCalendar()

                    this.showAlert({ success: true, message: result.message })
                })
                .catch(error => {
                    this.showAlert({ success: false, message: extractErrorFromResponse(error) })
                })
        },
        async getEvents() {
            await axios.get('calendar-events')
                .then(response => {
                    let result = response.data
                    let data = result.data
                    this.splitEventDates(data)
                })
                .catch(error => {
                    this.showAlert({ success: false, message: extractErrorFromResponse(error) })
                })

            this.loading = false
        },
        splitEventDates (events) {
            let newDateRanges = []
            let colors = itemColors()

            events.forEach(event => {
                let color = colors[random(0, colors.length - 1)]

                let eventName = event.event_name
                let startDate = new Date(event.start_date);
                let endDate = new Date(event.end_date);
                let occurringDays = event.occurring_days

                let newDates = []
                let loop = new Date(startDate);
                do {
                    if (occurringDays.includes(getDayOfWeek(loop.getDay(), 2))) {
                        newDates.push(new Date(getDateString(loop)))
                    }
                    let newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                } while(loop <= endDate)

                let iterator = 0;
                newDates.forEach((date, i) => {
                    if (iterator === 0) {
                        startDate = date
                        iterator++
                    } else {
                        let test = new Date(startDate)
                        test.setDate(test.getDate() + iterator)
                        if (test.toLocaleDateString() === date.toLocaleDateString()) {
                            if (i < newDates.length - 1) {
                                iterator++
                            } else {
                                this.addNewDateRange(newDateRanges, eventName, startDate, date, color)
                            }
                        } else {
                            this.addNewDateRange(newDateRanges, eventName, startDate, newDates[i-1], color)
                            iterator = 1
                            startDate = date

                            if (i === newDates.length - 1) {
                                this.addNewDateRange(newDateRanges, eventName, date, date, color)
                            }
                        }
                    }
                })
            })

            this.events.push(...newDateRanges)
        },
        addNewDateRange(newDateRanges, eventName, start, date, color) {
            newDateRanges.push({
                name: eventName,
                start: start,
                end: date,
                color: color
            })
        },
        showAlert(item) {
            if (item.success) {
                this.snackbar.success = true
                this.snackbar.message = item.message
            } else {
                this.snackbar.error = true
                this.snackbar.message = item.message
            }

            this.loading = false
            this.formLoading = false
        }
    }
}
</script>
