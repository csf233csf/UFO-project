<template>
    <div style="width:80vw; height:60vh; position: absolute; right:20px; top:10px">
        <div class="grid-container">
            <div class="iPhonecontainer">
                <v-img
                :width="1"
                aspect-ratio="1"
                src="/images/iPhone-img1.png" alt="Image 1" />
            </div>
            <div class="iPhonecontainer">
                <v-img
                src="/images/iPhone-img1.png" alt="Image 1" />
               
            </div>
            <div class="iPhonecontainer">
                <v-img
                src="/images/iPhone-img1.png" alt="Image 1" />
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThreeColumnGrid',
};
</script>

<style>
.grid-container {
    width: 100%;
    height:100%;
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    justify-content: space-between;
    
    right:50px;
    /* Ensure spacing between columns */
}

.iPhonecontainer {
    border: 1px solid #adadad;
    padding: 20px;
    width: 100%;
    display:flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    /* Ensure padding and border are included in width */
}

.iPhonecontainer img {
    max-width: 100%;
    /* Ensure image does not exceed the width of the container */
    height: auto;
    /* Maintain aspect ratio */

}
</style>