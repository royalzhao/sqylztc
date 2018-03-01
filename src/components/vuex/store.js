import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
    show:false
}

const mutations={
    show(state){
        state.show=true;
    },
    hide(state){
        state.show=false;
    }
}
export default new Vuex.Store({
	state,mutations
 
})