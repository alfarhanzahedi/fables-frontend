import Repository from "./Repository";

const resource = "organization";
const reviewSubResource = "review";
const couponSubResource = "coupon";

export default {
  createOrganization(payload) {
    return Repository.post(`${resource}`, payload);
  },

  getOrganizations() {
    return Repository.get(`${resource}`);
  },

  getOrganization(organizationId) {
    return Repository.get(`${resource}/${organizationId}`);
  },

  partiallyUpdateOrganization(organizationId, payload) {
    return Repository.patch(`${resource}/${organizationId}`, payload);
  },

  createReview(organizationId, payload) {
    return Repository.post(
      `${resource}/${organizationId}/${reviewSubResource}`,
      payload
    );
  },

  getAllReviews(organizationId) {
    return Repository.get(`${resource}/${organizationId}/${reviewSubResource}`);
  },

  partiallyUpdateReview(organizationId, reviewId, payload) {
    return Repository.patch(
      `${resource}/${organizationId}/${reviewSubResource}/${reviewId}`,
      payload
    );
  },

  deleteReview(organizationId, reviewId) {
    return Repository.delete(
      `${resource}/${organizationId}/${reviewSubResource}/${reviewId}`
    );
  },

  createCoupon(organizationId, payload) {
    return Repository.post(
      `${resource}/${organizationId}/${couponSubResource}`,
      payload
    );
  },

  getAllCoupons(organizationId) {
    return Repository.get(`${resource}/${organizationId}/${couponSubResource}`);
  },

  partiallyUpdateCoupon(organizationId, couponId, payload) {
    return Repository.patch(
      `${resource}/${organizationId}/${couponSubResource}/${couponId}`,
      payload
    );
  },

  deleteCoupon(organizationId, couponId, payload) {
    return Repository.post(
      `${resource}/${organizationId}/${couponSubResource}/${couponId}`,
      payload
    );
  },

  makePayment(organizationId, payload) {
    return Repository.post(`${resource}/${organizationId}/payment`, payload);
  }
};
