<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="pa-5">
        <v-sheet height="64">
            <v-toolbar flat color="white">
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                    Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>
                    <span v-if="$refs.calendar">{{ $refs.calendar.title}}</span>
                    <span v-else>{{ getCalendarLabel }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            outlined
                            color="grey darken-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-sheet>
        <v-sheet height="500">
            <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                :event-color="getEventColor"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
            ></v-calendar>
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="true"
                :activator="selectedElement"
                offset-y
            >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                    <v-toolbar
                        :color="selectedEvent.color"
                        dark
                    >
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text class="text-left">
                        <div class="event-name">
                            <v-chip class="ma-2" :color="selectedEvent.color" label text-color="white">
                                <v-icon left>mdi-label</v-icon>Event Name:
                            </v-chip>
                            <span class="font-weight-bold">{{ selectedEvent.name }}</span>
                        </div>
                        <div class="schedule">
                            <v-chip class="ma-2" :color="selectedEvent.color" label text-color="white">
                                <v-icon left>mdi-clock</v-icon>Schedule:
                            </v-chip>
                            <span v-if="selectedEvent.start === selectedEvent.end" class="font-weight-bold">
                                {{ getFullDate(selectedEvent.start) }}
                            </span>
                            <span v-else class="font-weight-bold">
                                {{ getFullDate(selectedEvent.start) }} - {{ getFullDate(selectedEvent.end) }}
                            </span>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            text
                            color="secondary"
                            @click="selectedOpen = false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-sheet>
    </div>
</template>

<script>
import { getFullDateString, getMonthName } from '../utils'
export default {
    name: 'BaseCalendar',
    props: ['events'],
    data() {
        return {
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days'
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            mode: 'stack',
            modes: ['stack', 'column'],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
                {text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
                {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
                {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
                {text: 'Mon, Wed, Fri', value: [1, 3, 5]}
            ],
            value: new Date(),
            dateOptions: { year: 'numeric', month: 'long', day: 'numeric' }
        }
    },
    mounted () {
        this.refreshCalendar()
    },
    computed: {
        getCalendarLabel () {
            let date = new Date()
            return getMonthName(date.getMonth()) +  ' ' + date.getFullYear()
        }
    },
    methods: {
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        setToday() {
            this.focus = ''
            this.type = 'month'
            this.value = new Date()
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({nativeEvent, event}) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        showEventDetails(event) {
          return '' + event.name + '<br>' +
              'Schedule: ' + event.start + ' - ' + event.end
        },
        getEventColor(event) {
            return event.color
        },
        getFullDate (date) {
            return getFullDateString(new Date(date))
        },
        refreshCalendar() {
            this.$refs.calendar.checkChange()
        }
    }
}
</script>
