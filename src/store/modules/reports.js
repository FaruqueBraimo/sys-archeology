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
    reportsearchKey:  ''

}

const mutations = {

    addreport (state, payload) {
       Vue.set(state.reports, payload.id, payload.object)
    },
    addreportsForPosition (state, payload) {
       Vue.set(state.reportsForPosition, payload.id, payload.object)
    },
    resetreportsForPosition (state) {
        state.reportsForPosition = {}
    },
    updatereport (state, payload) {
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

    listenreportRealTimeChanges ({state, commit}) {

        // commit('loading', true)

        dbReports.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                commit('loading', false)

                if (change.type === "added") {
                    commit('addreport', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })

                    if (snapshot.docChanges().length === 1) {
                        // showSuccessMessage('Candidato adicionado com sucesso!')
                    }

                }
                if (change.type === "modified") {
                    commit('updatereport', {
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

    addreport ({commit}, payload) {

        commit('loading', true)
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dbReports.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Relátorio adicionada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updatereport ({commit}, payload) {

        commit('loading', true)
        payload.updates.updatedAt = new Date();
        dbReports.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Relátorio actualizada com sucesso!')
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
    storereportPhoto ({state, commit, dispatch}, saveObject) {

        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        showLoading({ //inicializando o processamento
            message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do candidato <b>0%</b>',
        })

        let uploadTask = storageRef.child('reportsImages/' + imageName).put(saveObject.file);

        uploadTask.on('state_changed', function(snapshot){

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            commit('uploadProgress', progress)

            showLoading({ //inicializando o processamento
                message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do candidato <b>0%</b>',
            })

        }, function(error) {
            // Handle unsuccessful uploads
            showLoading(null) //encerrando o processamento
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                let updates = saveObject.isCV ? {cvUrl: downloadURL} : {image: downloadURL}

                dispatch('updatereport',
                    {
                        id: saveObject.id,
                        updates: updates,
                        successMessage: saveObject.successMessage
                    })
                commit('uploadProgress', -1)
                showLoading(null) //encerrando o processamento
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