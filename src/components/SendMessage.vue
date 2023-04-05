<template>
    <el-form class="main">
            <el-input class="input-box" v-model="content">
            </el-input>
            <el-button class="submit_btn" icon="el-icon-position"/>
    </el-form>
</template>

<script>


export default {
    name: "send-message",
    data() {
        return {
            content: ""
        }
    }
}
</script>

<style scoped>


.main {
    display: flex;
    flex-direction: row;
    height: fit-content;
    max-width: 100%;
    width: 100%;
    bottom: 0;
    border: 1px;
    border-radius: 5px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.input-box {
    display: inline-block;
    width: 95%;
}

.submit_btn {
    background-color: #2e59d9;
    color: white;
    display: block;
    width:5%;
}

</style>