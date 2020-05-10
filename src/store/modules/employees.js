import Vue from 'vue'
import {dbCandidates, storageRef} from '../../boot/firebase'
import { showErrorMessage } from "../../functions/handle-error-messages";
import { showSuccessMessage } from "../../functions/show-success-messages";
import {showLoading} from "../../functions/show-loading";

const state = {

    employees: {},
    loading: false,
    uploadProgress: -1,
    employeeSearchKey:  ''

}

const mutations = {

    addEmployee (state, payload) {
       Vue.set(state.employees, payload.id, payload.object)
    },
    updateEmployee (state, payload) {
        Object.assign(state.employees[payload.id], payload.updates)
    },
    deleteEmployee (state, id) {
        Vue.delete(state.employees, id)
    },
    loading (state, val) {
        state.loading = val
    },
    uploadProgress (state, val) {
        state.uploadProgress = val
    },
    setEmployeeSearchKey (state, val) {
        state.employeeSearchKey = val
    },
}

const getters = {
    searchEmployees: (state, getters) => (employees, profissions) => {
        let object = {}

        Object.keys(employees).forEach(key => {
            let employee = employees[key]
            let userPositions = employees[key].professions

            if (employee.name.toLowerCase().includes(state.employeeSearchKey.toLowerCase())
                || getters.positionNames(userPositions, profissions).toLowerCase().includes(state.employeeSearchKey.toLowerCase())
                || employee.bairro.toLowerCase().includes(state.employeeSearchKey.toLowerCase())
            ) {
                object[key] = employee
            }
        })
        return object
    },

    employees : (state) => () => {
        let emps = {}

        Object.keys(state.employees).forEach(key => {
            let emp = state.employees[key]
            if (emp.aprovedAt) {
                emps[key] = emp
            }
        })
        return emps
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
    employeeImage : () => (employee) => {
        return employee && employee.image ? employee.image : '/statics/icons/icon-128x128.png'
    },

}

const actions = {

    listenEmployeesOnGenericConditition ({ dispatch }, condition = null) {
        let totalRetrived = Object.keys(state.employees).length
        let lastId = Object.keys(state.employees)[totalRetrived -1] //Last item id
        let lastEmployee = state.employees[lastId] //getting employee by Id

        let totalToGet = totalRetrived > 0 ? totalRetrived : 10
        let query = {}

        if (condition === 'getNext10') {
            totalToGet += 10
            query = dbCandidates.where("aprovedAt", ">", new Date(2000, 2,2)).orderBy("aprovedAt", "desc").orderBy("createdAt", "desc").startAt(lastEmployee).limit(totalToGet)
        }
        if (!condition) {
            query = dbCandidates.where("aprovedAt", ">", new Date(2000, 2,2)).orderBy("aprovedAt", "desc").orderBy("createdAt", "desc").limit(10)
        }


        dispatch('listenEmployeeRealTimeChanges', query)

    },

    listenEmployeeRealTimeChanges ({state, commit}, query) {

        commit('loading', true)

        query.onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach(function(change) {

                commit('loading', false)

                if (change.type === "added") {
                    commit('addEmployee', {
                        id: change.doc.id,
                        object: change.doc.data()
                    })

                    if (snapshot.docChanges().length === 1) {
                        // showSuccessMessage('Funcionário adicionado com sucesso!')
                    }

                }
                if (change.type === "modified") {
                    commit('updateEmployee', {
                        id: change.doc.id,
                        updates: change.doc.data()
                    })
                }
                if (change.type === "removed") {

                    commit('deleteEmployee', change.doc.id)

                }
            });
        });
    },

    addEmployee ({commit}, payload) {

        commit('loading', true)
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        dbCandidates.add(payload)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage('Funcionário adicionado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    updateEmployee ({commit}, payload) {

        commit('loading', true)
        payload.updates.updatedAt = new Date();
        dbCandidates.doc(payload.id).update(payload.updates)
            .then(function(docRef) {
                commit('loading', false)
                showSuccessMessage(payload.sucessMessage ? payload.sucessMessage : 'Funcionário actualizado com sucesso!')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                commit('loading', false)
                showErrorMessage(error.message)
            });
    },

    deleteEmployee ({commit}, payload) {
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

    setEmployeeSearchKey ({commit}, text) {
        commit('setEmployeeSearchKey', text)
    },
    storeEmployeePhoto ({state, commit, dispatch}, saveObject) {

        commit('uploadProgress', -1)

        let imageName = saveObject.id + '.' + saveObject.file.name.split('.')[1]

        showLoading({ //inicializando o processamento
            message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do funcionário <b>0%</b>',
        })

        let uploadTask = storageRef.child('employeesImages/' + imageName).put(saveObject.file);

        uploadTask.on('state_changed', function(snapshot){

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            commit('uploadProgress', progress)

            showLoading({ //inicializando o processamento
                message: saveObject.progressMessage ? saveObject.progressMessage : 'Gravando imagem do funcionário <b>0%</b>',
            })

        }, function(error) {
            // Handle unsuccessful uploads
            showLoading(null) //encerrando o processamento
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                let updates = saveObject.isCV ? {cvUrl: downloadURL} : {image: downloadURL}

                dispatch('updateEmployee',
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