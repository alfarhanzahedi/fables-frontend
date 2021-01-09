import Repository from "./Repository";

const resource = "user";

export default {
  partiallyUpdateUser(userId, payload) {
    return Repository.patch(`${resource}/${userId}`, payload);
  },

  getUserOrganizations(userId) {
    return Repository.get(`${resource}/${userId}/organization`);
  },

  getUserCoupons(userId) {
    return Repository.get(`${resource}/${userId}/coupon`);
  }
};
