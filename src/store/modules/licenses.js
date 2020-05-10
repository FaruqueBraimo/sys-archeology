import Vue from 'vue'
import {dblicenses, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";

const state = {

    licenses: {},
    licensesForPosition: {},
    loading: false,
    uploadProgress: -1,
    licensesearchKey:  ''

}

const mutations = {

    addlicense (state, payload) {
       Vue.set(state.licenses, payload.id, payload.object)
    },
    addlicensesForPosition (state, payload) {
       Vue.set(state.licensesForPosition, payload.id, payload.object)
    },
    resetlicensesForPosition (state) {
        state.licensesForPosition = {}
    },
    updatelicense (state, payload) {
        Object.assign(state.licenses[payload.id], payload.updates)
    },
    deletelicense (state, id) {
        Vue.delete(state.licenses, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    setlicensesearchKey (state, val) {
        state.licensesearchKey = val
    },
}

const getters = {
    searchlicenses: (state, getters) => (licenses, profissions) => {
        let object = {}

        Object.keys(licenses).forEach(key => {
            let license = licenses[key]
            let userPositions = licenses[key].professions

            if (license.name.toLowerCase().includes(state.licensesearchKey.toLowerCase())
                || getters.positionNames(userPositions, profissions).toLowerCase().includes(state.licensesearchKey.toLowerCase())
                || license.bairro.toLowerCase().includes(state.licensesearchKey.toLowerCase())
            ) {
                object[key] = license
            }
        })
        return object
    },
    hasNext : () => (licensesOrEmployees) => {

        let total = Object.keys(licensesOrEmployees).length

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
    licenseImage : () => (license) => {
        return license && license.image ? license.image : '/statics/icons/icon-128x128.png'
    },

}

const actions = {

    listenlicensesOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.licenses).length
        let lastId = Object.keys(state.licenses)[totalRetrived -1] //Last item id
        let lastlicense = state.licenses[lastId] //getting license by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dblicenses.where("aprovedAt", "==", "").orderBy("createdAt", "desc").startAt(lastlicense).limit(totalToGet)
        }
        if (!condition) {
            query = dblicenses.where("aprovedAt", "==", "").orderBy("createdAt", "desc").limit(10)
        }


        dispatch('listenlicenseRealTimeChanges', query)

    },

    

    listenColaboratorsOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.licenses).length
        let lastId = Object.keys(state.licenses)[totalRetrived -1] //Last item id
        let lastlicense = state.licenses[lastId] //getting license by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dblicenses.orderBy("createdAt", "desc").startAt(lastlicense).limit(totalToGet)
        }
        if (!condition) {
            query = dblicenses.orderBy("createdAt", "desc").limit(totalToGet)
        }


        dispatch('listenlicenseRealTimeChanges', query)

    },

    listenlicenseRealTimeChanges ({state, commit}) {

        // commit('loading', true)

        dblicenses.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                commit('loading', false)

                if (change.type === "added") {
                    commit('addlicense', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })

                    if (snapshot.docChanges().length === 1) {
                        // showSuccessMessage('Candidato adicionado com sucesso!')
                    }

                }
                if (change.type === "modified") {
                    commit('updatelicense', {
                        id: change.doc.id,
                        updates: change.doc.data()
                    })
                }
                if (change.type === "removed") {

                    commit('deletelicense', change.doc.id)

                }
            });
        });
    },

    addlicense ({commit}, payload) {

        commit('loading', true)
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dblicenses.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Licenca adicionada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updatelicense ({commit}, payload) {

        commit('loading', true)
        payload.updates.updatedAt = new Date();
        dblicenses.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Licenca actualizada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deletelicense ({commit}, payload) {
        commit('loading', true)
        
        dblicenses.doc(payload.id).delete()
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

    setlicensesearchKey ({commit}, text) {
        commit('setlicensesearchKey', text)
    },
    storelicensePhoto ({state, commit, dispatch}, saveObject) {

        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        showLoading({ //inicializando o processamento
            message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do candidato <b>0%</b>',
        })

        let uploadTask = storageRef.child('licensesImages/' + imageName).put(saveObject.file);

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

                dispatch('updatelicense',
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