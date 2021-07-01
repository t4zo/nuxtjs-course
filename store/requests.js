export const state = () => ({
  requests: []
})

export const mutations = {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
}

export const getters = {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.getUserId;
    return state.requests?.filter(r => r.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.requests?.length > 0;
  },
}

export const actions = {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.userEmail,
      message: payload.message,
    }

    context.commit('addRequest', newRequest);
  },
}