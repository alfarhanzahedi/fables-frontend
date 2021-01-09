<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog animation-slide-in">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">
                  <i class="far fa-credit-card"></i> &nbsp;&nbsp;Payment
                </h4>
                <button type="button" class="close" @click="$emit('close')">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <img
                        class="img-fluid"
                        src="@/assets/images/payment.png"
                      />
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <span class="beta-flag"
                        ><i class="fab fa-jedi-order"></i>&nbsp;
                        <b>experimental</b></span
                      >
                      <p class="small">
                        This is a dummy Payment Gateway. The button should fire
                        a request to a payment Gateway and return the status
                        token to the server.
                      </p>

                      <br />
                      <form @submit.prevent="makePayment">
                        <div class="form-group">
                          <label for="amount" class="sr-only">Amount</label>
                          <input
                            id="amount"
                            type="number"
                            class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                            placeholder="1000"
                            v-model="amount"
                            v-bind:class="{
                              'border-bottom-danger': errors.amount.length
                            }"
                            v-on:input="errors.amount = []"
                          />
                          <div class="text-danger small">
                            {{ errors.amount.join() }}
                          </div>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-block btn-default mt-3"
                        >
                          Make Payment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.7s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header {
  border: none !important;
}
</style>

<script>
import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "PaymentModal",
  data: function() {
    return {
      amount: null,
      errors: {
        amount: []
      }
    };
  },
  methods: {
    makePayment() {
      let payload = {
        amount: this.amount
      };
      OrganizationRepository.makePayment(
        this.$route.params.organizationId,
        payload
      )
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
          if (error.response.data.data) {
            Object.assign(this.errors, error.response.data.data);
          }
        });
    }
  }
};
</script>
