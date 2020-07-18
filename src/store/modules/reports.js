import Vue from 'vue'
import {dbReports, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";

const state = {

    reports: {},
    reportsForPosition: {},
    loading: false,
    uploadProgress: -1,
    file:  ''

}

const mutations = {

    addreport (state, payload) {
       Vue.set(state.reports, payload.id, payload.object)
    },
    addFile(state, payload) {
        state.file = payload
    },
     addreportsForPosition (state, payload) {
       Vue.set(state.reportsForPosition, payload.id, payload.object)
    },
    resetreportsForPosition (state) {
        state.reportsForPosition = {}
    },
    updateReport (state, payload) {
        Object.assign(state.reports[payload.id], payload.updates)
    },
    deletereport (state, id) {
        Vue.delete(state.reports, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    setreportsearchKey (state, val) {
        state.reportsearchKey = val
    },
}

const getters = {
    searchreports: (state, getters) => (reports, profissions) => {
        let object = {}

        Object.keys(reports).forEach(key => {
            let report = reports[key]
            let userPositions = reports[key].professions

            if (report.name.toLowerCase().includes(state.reportsearchKey.toLowerCase())
                || getters.positionNames(userPositions, profissions).toLowerCase().includes(state.reportsearchKey.toLowerCase())
                || report.bairro.toLowerCase().includes(state.reportsearchKey.toLowerCase())
            ) {
                object[key] = report
            }
        })
        return object
    },
    hasNext : () => (reportsOrEmployees) => {

        let total = Object.keys(reportsOrEmployees).length

        return total % 10 === 0;
    },

    positionNames: () => (userPositions, positions) => {
        let strs = ''
        if (userPositions && userPositions.length) {
            userPositions.forEach(e => {

                strs = strs.length > 0 ? strs + ', ' : strs
                strs += positions[e] ? positions[e].label : ''

            })
        }
        return strs
    },
    reportImage : () => (report) => {
        return report && report.image ? report.image : '/statics/icons/icon-128x128.png'
    },

}

const actions = {

    listenreportsOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.reports).length
        let lastId = Object.keys(state.reports)[totalRetrived -1] //Last item id
        let lastreport = state.reports[lastId] //getting report by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dbReports.where("aprovedAt", "==", "").orderBy("createdAt", "desc").startAt(lastreport).limit(totalToGet)
        }
        if (!condition) {
            query = dbReports.where("aprovedAt", "==", "").orderBy("createdAt", "desc").limit(10)
        }


        dispatch('listenreportRealTimeChanges', query)

    },

    

    listenColaboratorsOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.reports).length
        let lastId = Object.keys(state.reports)[totalRetrived -1] //Last item id
        let lastreport = state.reports[lastId] //getting report by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dbReports.orderBy("createdAt", "desc").startAt(lastreport).limit(totalToGet)
        }
        if (!condition) {
            query = dbReports.orderBy("createdAt", "desc").limit(totalToGet)
        }


        dispatch('listenreportRealTimeChanges', query)

    },

    listenreportRealTimeChanges ({dispatch , state, commit}) {

        // commit('loading', true)

        dbReports.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                commit('loading', false)

                if (change.type === "added") {
                    commit('addreport', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })

                    let saveObject = { id :  change.doc.id, file:  state.file
                    
                    }
                    


                    if (snapshot.docChanges().length === 1) {
                        // showSuccessMessage('Candidato adicionado com sucesso!')
                    }

                }
                if (change.type === "modified") {
                    commit('updateReport', {
                        id: change.doc.id,
                        updates: change.doc.data()
                    })
                }
                if (change.type === "removed") {

                    commit('deletereport', change.doc.id)

                }
            });
        });
    },

    addReport ({commit, dispatch}, payload2) {
        let payload = {}
          payload.arqId =  payload2.arqId
          payload.description =  payload2.description
        commit('loading', true)
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dbReports.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                payload2.id = docRef.id
                dispatch('storeReportPdf',payload2)
                showSuccessMessage('Relátorio adicionada com sucesso!')

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updateReport ({commit}, payload) {

        dbReports.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                showSuccessMessage( 'Relátorio actualizada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deletereport ({commit}, payload) {
        commit('loading', true)
        
        dbReports.doc(payload.id).delete()
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage)
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });



    },

    setreportsearchKey ({commit}, text) {
        commit('setreportsearchKey', text)
    },

    storeReportPdf ({state, commit, dispatch}, saveObject) {
    
        let fileName = saveObject.id + '.' + saveObject.file.name.split('.')[1]
          let progress2
       
    
        let uploadTask = storageRef.child('reports/'+ fileName).put(saveObject.file) 
       
        ;
    
        uploadTask.on('state_changed', function(snapshot){
            
    
        }, function(error) {

        }, function() {

           
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    
                console.log(downloadURL)
             
               dbReports.doc(saveObject.id).update( {url : downloadURL })
           

                commit('uploadProgress', -1)
            });
        });
    }


}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}