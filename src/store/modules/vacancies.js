import Vue from 'vue'
import {dbVacancies, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";
// TODO: Criar uma função global para confirmações

const state = {

    vacancies: {},
    loading: false,
    uploadProgress: -1,
    vacancySearchKey:  ''
}

const mutations = {
    addVacancy (state, payload) {
       Vue.set(state.vacancies, payload.id, payload.object)
    },
    updateVacancy (state, payload) {
        Object.assign(state.vacancies[payload.id], payload.updates)
    },
    deleteVacancy (state, id) {
        Vue.delete(state.vacancies, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    setVacancySearchKey (state, val) {
        state.vacancySearchKey = val
    },
}

const getters = {
    searchVacancies: (state) => (vacancies) => {
        let object = {}

        Object.keys(vacancies).forEach(key => {
            let vacancy = vacancies[key]
            if (vacancy.title.toLowerCase().includes(state.vacancySearchKey.toLowerCase())) {
                object[key] = vacancy
            }
        })
        return object
    },
    getVacancyImage: (state) => (vacancy) => {
        return vacancy && vacancy.image ? vacancy.image : 'http://statig2.akamaized.net/bancodeimagens/e2/oy/z4/e2oyz4a6zsnn1vs0vs3pv3whl.jpg'
    }
}

const actions = {

    listenVacancyRealTimeChanges ({state, commit}, hasInternetConection) {

        
        dbVacancies.onSnapshot(function(snapshot) {

                snapshot.docChanges().forEach(function(change) {

                    if (change.type === "added") {
                        commit('addVacancy', {
                            id: change.doc.id,
                            object: change.doc.data()
                        })

                        if (snapshot.docChanges().length === 1) {
                            commit('loading', false)
                            // showSuccessMessage('Vaga adicionada com sucesso!')
                        }

                    }
                    if (change.type === "modified") {
                        commit('updateVacancy', {
                            id: change.doc.id,
                            updates: change.doc.data()
                        })
                        if (snapshot.docChanges().length === 1) {
                            commit('loading', false)
                            // showSuccessMessage('Vaga actualizada com sucesso!')
                        }
                    }
                    if (change.type === "removed") {

                        commit('deleteVacancy', change.doc.id)

                        if (!hasInternetConection && snapshot.docChanges().length === 1) {
                            commit('loading', false)
                            // showSuccessMessage('Vaga deletada com sucesso!')
                        }
                    }
                });
            });
    },

    addVacancy ({commit}, payload) {

        commit('loading', true)
        // Adição das datas de add.
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dbVacancies.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Vaga adicionada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updateVacancy ({commit}, payload) {
        commit('loading', true)

        // Colocação da data de actualização
        payload.updatedAt = new Date();

        dbVacancies.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Vaga actualizada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deleteVacancy ({commit}, id) {
        commit('loading', true)
        dbVacancies.doc(id).delete()
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Vaga deletada com sucesso!')
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    setVacancySearchKey ({commit}, text) {
        commit('setVacancySearchKey', text)
    },
    storeVacancyPhoto ({state, commit, dispatch}, saveObject) {

        showLoading({ //inicializando o processamento
            message: 'Gravando imagem da vaga <b>0%</b>',
        })
        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        let uploadTask = storageRef.child('vacancyImages/' + imageName).put(saveObject.file);

        uploadTask.on('state_changed', function(snapshot){

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            showLoading({ //inicializando o processamento
                message: 'Gravando imagem da vaga <b>' + progress + '%</b>',
            })
            commit('uploadProgress', progress)

        }, function(error) {
            // Handle unsuccessful uploads
            showLoading(null) //encerrando o processamento
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                dispatch('updateVacancy', {id: saveObject.id, updates: {image: downloadURL}})
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