import { createStore } from 'vuex';

const store = createStore({
  state: {
    currentTime: new Date(),
    attendance: [],
    leaveApplications: [],
    annualLeaveBalance: 12, // misalnya sisa cuti tahunan adalah 12 hari
  },
  getters: {
    formattedTime: (state) => state.currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    formattedDate: (state) => state.currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    attendanceList: (state) => state.attendance,
    leaveApplications: (state) => state.leaveApplications,
    annualLeaveBalance: (state) => state.annualLeaveBalance,
  },
  mutations: {
    updateTime(state) {
      state.currentTime = new Date();
    },
    addAttendance(state, payload) {
      state.attendance.push(payload);
    },
    ADD_LEAVE_APPLICATION(state, application) {
      state.leaveApplications.push(application);
    },
    DECREMENT_LEAVE_BALANCE(state, days) {
      state.annualLeaveBalance -= days;
    }
  },
  actions: {
    updateTime({ commit }) {
      commit('updateTime');
    },
    addAttendance({ commit }, payload) {
      commit('addAttendance', payload);
    },
    submitLeaveApplication({ commit }, application) {
      commit('ADD_LEAVE_APPLICATION', application);
      commit('DECREMENT_LEAVE_BALANCE', application.days);
    }
  }
});

export default store;
