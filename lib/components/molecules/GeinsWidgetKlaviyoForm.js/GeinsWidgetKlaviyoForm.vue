<template>
    <div class="geins-widget-klaviyo-form">
        <GeinsKlaviyoForm :formId="formId" />
    </div>
</template>
<script>
/* 
  Klaviyo consent form
*/

export default {
    name: 'GeinsWidgetKlaviyoForm',
    mixins: [],
    props: {
        // Configuration object to the widget to set properties
        configuration: {
            type: Object,
            required: false
        },
    },
    data: () => ({}),
    computed: {
        formId() {
            return this.configuration?.id ?? '';
        }
    },
    watch: {},
    async mounted() { 
        console.log('vidar config',this.configuration)
    },
    methods: {}
};
</script>
  