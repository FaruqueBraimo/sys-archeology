import Vue from 'vue'
import {dbCandidates, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";

const state = {

    candidates: {},
    candidatesForPosition: {},
    loading: false,
    uploadProgress: -1,
    candidateSearchKey:  ''

}

const mutations = {

    addCandidate (state, payload) {
       Vue.set(state.candidates, payload.id, payload.object)
    },
    addCandidatesForPosition (state, payload) {
       Vue.set(state.candidatesForPosition, payload.id, payload.object)
    },
    resetCandidatesForPosition (state) {
        state.candidatesForPosition = {}
    },
    updateCandidate (state, payload) {
        Object.assign(state.candidates[payload.id], payload.updates)
    },
    deleteCandidate (state, id) {
        Vue.delete(state.candidates, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    setCandidateSearchKey (state, val) {
        state.candidateSearchKey = val
    },
}

const getters = {
    searchCandidates: (state, getters) => (candidates, profissions) => {
        let object = {}

        Object.keys(candidates).forEach(key => {
            let candidate = candidates[key]
            let userPositions = candidates[key].professions

            if (candidate.name.toLowerCase().includes(state.candidateSearchKey.toLowerCase())
                || getters.positionNames(userPositions, profissions).toLowerCase().includes(state.candidateSearchKey.toLowerCase())
                || candidate.bairro.toLowerCase().includes(state.candidateSearchKey.toLowerCase())
            ) {
                object[key] = candidate
            }
        })
        return object
    },
    hasNext : () => (candidatesOrEmployees) => {

        let total = Object.keys(candidatesOrEmployees).length

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
    candidateImage : () => (candidate) => {
        return candidate && candidate.image ? candidate.image : '/statics/icons/icon-128x128.png'
    },

}

const actions = {

    listenCandidatesOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.candidates).length
        let lastId = Object.keys(state.candidates)[totalRetrived -1] //Last item id
        let lastCandidate = state.candidates[lastId] //getting candidate by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dbCandidates.where("aprovedAt", "==", "").orderBy("createdAt", "desc").startAt(lastCandidate).limit(totalToGet)
        }
        if (!condition) {
            query = dbCandidates.where("aprovedAt", "==", "").orderBy("createdAt", "desc").limit(10)
        }


        dispatch('listenCandidateRealTimeChanges', query)

    },

    

    listenColaboratorsOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.candidates).length
        let lastId = Object.keys(state.candidates)[totalRetrived -1] //Last item id
        let lastCandidate = state.candidates[lastId] //getting candidate by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dbCandidates.orderBy("createdAt", "desc").startAt(lastCandidate).limit(totalToGet)
        }
        if (!condition) {
            query = dbCandidates.orderBy("createdAt", "desc").limit(totalToGet)
        }


        dispatch('listenCandidateRealTimeChanges', query)

    },

    listenCandidateRealTimeChanges ({state, commit}) {

        // commit('loading', true)

        dbCandidates.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                commit('loading', false)

                if (change.type === "added") {
                    commit('addCandidate', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })

                    if (snapshot.docChanges().length === 1) {
                        // showSuccessMessage('Candidato adicionado com sucesso!')
                    }

                }
                if (change.type === "modified") {
                    commit('updateCandidate', {
                        id: change.doc.id,
                        updates: change.doc.data()
                    })
                }
                if (change.type === "removed") {

                    commit('deleteCandidate', change.doc.id)

                }
            });
        });
    },

    addCandidate ({commit}, payload) {

        commit('loading', true)
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dbCandidates.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Candidato adicionado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updateCandidate ({commit}, payload) {

        commit('loading', true)
        payload.updates.updatedAt = new Date();
        dbCandidates.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Candidato actualizado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deleteCandidate ({commit}, payload) {
        commit('loading', true)
        
        dbCandidates.doc(payload.id).delete()
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

    setCandidateSearchKey ({commit}, text) {
        commit('setCandidateSearchKey', text)
    },
    storeCandidatePhoto ({state, commit, dispatch}, saveObject) {

        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        showLoading({ //inicializando o processamento
            message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do candidato <b>0%</b>',
        })

        let uploadTask = storageRef.child('candidatesImages/' + imageName).put(saveObject.file);

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

                dispatch('updateCandidate',
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