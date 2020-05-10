import Vue from 'vue'
import {dbCourses, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";

const state = {

    courses: {},
    loading: false,
    uploadProgress: -1,

}

const mutations = {

    addCourse (state, payload) {
       Vue.set(state.courses, payload.id, payload.object)
    },
    updateCourse (state, payload) {
        Object.assign(state.courses[payload.id], payload.updates)
    },
    deleteCourse (state, id) {
        Vue.delete(state.courses, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    }
}

const getters = {
    getCourseImage: (state) => (course) => {
        return course && course.image ? course.image : 'statics/default-image.png'
    }
}

const actions = {

    listenCourseRealTimeChanges ({state, commit}) {

        dbCourses.orderBy("createdAt").onSnapshot(function(snapshot) {

                snapshot.docChanges().forEach(function(change) {

                    if (change.type === "added") {
                        commit('addCourse', {
                            id: change.doc.id,
                            object: change.doc.data()
                        })
                    }
                    if (change.type === "modified") {
                        commit('updateCourse', {
                            id: change.doc.id,
                            updates: change.doc.data()
                        })
                    }
                    if (change.type === "removed") {

                        commit('deleteCourse', change.doc.id)

                    }
                });
            });
    },

    addCourse ({commit}, payload) {


        commit('loading', true)

        payload.updatedAt = new Date()
        payload.createdAt = new Date()

        dbCourses.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Curso adicionado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },
    updateCourse ({commit}, payload) {

        payload.updatedAt = new Date()
        commit('loading', true)

        dbCourses.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Curso actualizado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deleteCourse ({commit}, id) {
        commit('loading', true)
        dbCourses.doc(id).delete()
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Curso deletado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });



    },
    storeCoursePhoto ({state, commit, dispatch}, saveObject) {

        showLoading({ //inicializando o processamento
            message: 'Gravando imagem de curso <b>0%</b>',
        })
        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        let uploadTask = storageRef.child('coursesImages/' + imageName).put(saveObject.file);

        uploadTask.on('state_changed', function(snapshot){

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            showLoading({ //inicializando o processamento
                message: 'Gravando imagem de curso <b>' + progress + '%</b>',
            })
            commit('uploadProgress', progress)

        }, function(error) {
            // Handle unsuccessful uploads
            showLoading(null) //encerrando o processamento
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                dispatch('updateCourse', {id: saveObject.id, updates: {image: downloadURL}})
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