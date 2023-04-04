<template>
    <div :class="bubbleClass">
        <p>{{ message.text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true,
        },
        fromUser: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        bubbleClass() {
            return this.fromUser ? 'user-bubble' : 'bot-bubble';
        },
    },
}
</script>

<style scoped>
.user-bubble {
    background-color: #2351e3;
    color: white;
    text-align: right;
}

.bot-bubble {
    background-color: #f8f9fc;
    color: #3a3b45;
    text-align: left;
}

</style>