<template>
    <v-row>
        <v-col cols="12">
            <span class="text-body-1">
                <v-icon class="mr-2">mdi-white-balance-sunny</v-icon>Occurring days
            </span>
        </v-col>
        <v-col
            class="py-0"
            v-for="(object, i) in objects"
            :key="i"
            cols="4"
        >
            <v-checkbox
                v-model="items"
                :label="object.label"
                :value="object.value"
                @change="update"
                dense
            ></v-checkbox>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'BaseCheckboxGroup',
    props: ['value', 'objects'],
    data () {
        return {
            items: this.value
        }
    },
    methods: {
        update () {
            this.$emit('update:value', this.items)
        }
    }
}
</script>
