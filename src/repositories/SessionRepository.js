import Repository from "./Repository";

const resource = "session";

export default {
  createSession(payload) {
    return Repository.post(`${resource}`, payload);
  },

  updateSession(payload) {
    return Repository.put(`${resource}`, payload);
  }
};
