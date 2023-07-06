<template>
    <div :class="`klaviyo-form-${formId}`"></div>
</template>
<script>
/* 
  Klaviyo consent form
*/

export default {
    name: 'GeinsKlaviyoForm',
    mixins: [],
    props: {
        formId: {
            type: String,
            default: ''
        }
    },
    data: () => ({}),
    computed: {},
    watch: {},
    async mounted() { },
    methods: {}
};
</script>
  