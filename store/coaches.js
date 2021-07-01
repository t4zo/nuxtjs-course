// import mutations from './mutations';
// import actions from './actions';
// import getters from './gettersns';

export const state = () => ({
  coaches: [
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description: "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description: 'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ]
});

export const mutations = {
  addCoach(state, payload) {
    state.coaches.push(payload);
  }
}

export const actions = {
  addCoach(context, payload) {
    const newCoach = {
      id: context.rootGetters.getUserId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate:  payload.rate,
    }

    context.commit('addCoach', newCoach);
  }
}

export const getters = {
  // fullName(state) {
  //   return `${state.firstName} ${state.lastName}`;
  // },
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches?.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.getUserId;
    return coaches.some(coach => coach.userId === userId);
  },
  getCoachById: (state) => (id) => {
    return state.coaches.find(c => c.id === id);
  }
}
