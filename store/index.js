export const state = () => ({
  lastFetch: false,
});

export const getters = {
  shouldUpdate(state) {
    const { lastFetch } = state;
    console.log(`lastFetch, ${lastFetch}`)
    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();

    // Returns true if its more than a minute ago
    // console.log(currentTimestamp);
    // console.log(lastFetch);
    return ((currentTimestamp - lastFetch) / 1000) > 60;
  },
};

export const mutations = {
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
