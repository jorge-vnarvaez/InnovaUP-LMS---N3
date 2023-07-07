<template lang="">
    <div :style="{
        ...res_properties.style,
    }" class="smart-scrollable">

        <!-- Make default slot -->
        <slot>

        </slot>
        
    </div>
</template>
<script>
export default {
    props: {
        disableScroll: {
            type: Boolean,
            default: false
        },
        backgroundImage: {
            type: String,
            default: null
        },
        background: {
            type: String,
            default: null
        },
        padding: {
            type: String,
            default: null
        },
        centered: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: null
        },
        xyScroll: {
            type: Boolean,
            default: false
        },
        yScroll: {
            type: Boolean,
            default: false
        },
        xScroll: {
            type: Boolean,
            default: false
        },
        elMinWidth: {
            type: String,
            default: null
        },
        elMinHeight: {
            type: String,
            default: null
        },
        elMaxWidth: {
            type: String,
            default: null
        },
        elMaxHeight: {
            type: String,
            default: null
        },
        width: {
            type: String,
            default: null
        },
        height: {
            type: String,
            default: null
        },
        rowGap: {
            type: String,
            default: null
        },
        colGap: {
            type: String,
            default: null
        },
        gap: {
            type: String,
            default: null
        },
        n: {
            type: Number,
            default: 0
        },
        nx: {
            type: Number,
            default: 0
        },
        ny: {
            type: Number,
            default: 0
        },
        snap: {
            type: Boolean,
            default: false
        },
        disableGrid: {
            type: Boolean,
            default: false
        },
        thumb: {
            type: Object,
            default: () => {
                return {

                }
            }
        }
    },
    data(){
        return {
            default_sizes: {
                elMinWidth: 'auto',
                elMaxWidth: '1fr',
                elMinHeight: 'auto',
                elMaxHeight: '1fr',
                width: '100%',
                height: '100%',
            }
        }
    },
    computed: {
        res_thumb_properties(){
            // defaults
            let res = {
                background: 'blue',
                color: 'red',
                width: '30px',
                height: '30px',
                borderRadius: '0px',
            }

            // overwrite defaults
            res = {
                ...res,
                ...this.thumb
            }

            return res

        },
        grid_repeat_res_x(){
            let res = ''
            res += `repeat(${this.nx || this.n}, minmax(${this.elMinWidth || this.default_sizes.elMinWidth}, ${this.elMaxWidth || this.default_sizes.elMaxWidth}))`
            return res
        },
        grid_repeat_res_y(){
            let res = ''
            res += `repeat(${this.ny || this.n}, minmax(${this.elMinHeight || this.default_sizes.elMinHeight}, ${this.elMaxHeight || this.default_sizes.elMaxHeight}))`
            return res
        },
        res_properties(){

            let base_res = {
                ...(this.id ? {id: this.id} : {}),
            }

            if(!base_res?.style){
                base_res.style = {
                    display: this.disableGrid ? undefined : 'grid',
                    position: this.disableGrid ? 'relative' : undefined,
                }
            }

            if(!this.xScroll && !this.yScroll){
                // base_res.style.overflow = 'scroll'
            }
            if(this.xScroll && !this.disableScroll){
                base_res.style.overflowX = 'scroll'
            }
            if(this.yScroll && !this.disableScroll){
                base_res.style.overflowY = 'scroll'
            }

            // Grid repeat properties
            if(this.n && this.xScroll){
                base_res.style.gridTemplateColumns = this.grid_repeat_res_x
            }
            if(this.n && this.yScroll){
                base_res.style.gridTemplateRows = this.grid_repeat_res_y
            }

            // Grid gap properties
            if(this.rowGap || (this.gap && this.xScroll)){
                base_res.style.gridRowGap = this.rowGap || this.gap
            }
            if(this.colGap || (this.gap && this.yScroll)){
                base_res.style.gridRowGap = this.colGap || this.gap
            }
            if(this.gap){
                base_res.style.gap = this.gap
            }

            if(this.snap){
                base_res.style.scrollPadding = this.gap || '10px'
            }

            // snap properties
            if(this.snap && this.xScroll){
                base_res.style.scrollSnapType = 'x mandatory'
                
            }
            if(this.snap && this.yScroll){
                base_res.style.scrollSnapType = 'y mandatory'
            }


            // if centered center grid
            if(this.centered){
                base_res.style.justifyItems = 'center'
                base_res.style.alignItems = 'center'
            }



            if(this.background){
                base_res.style.background = this.background
            }
            if(this.backgroundImage){
                base_res.style.backgroundImage = this.backgroundImage
            }            

            if(this.width){
                base_res.style.width = this.width
                base_res.style.maxWidth = this.width
            }
            if(this.height){
                base_res.style.height = this.height
                base_res.style.maxHeight = this.height
            }

            return base_res
        },

    }
}
</script>
<style lang="scss" scoped>
    .smart-scrollable {
        &::-webkit-scrollbar-thumb {
            background: #99999950;
            border-radius: 5px;
        }
        &::-webkit-scrollbar {
            height: 7px;
            width: 7px;
        }
        &::-webkit-scrollbar-track {
            background: #efefef90;
        }
        &::-webkit-scrollbar-track:not(:active) {
          display: none;
        }
    }
</style>