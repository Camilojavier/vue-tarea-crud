<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit User</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">First Name</label>
          <input type="text" v-model="model.userDetail.firstName" class="form-control" @input="validateFirstName">
          <span v-if="firstNameError" class="text-danger">{{ firstNameError }}</span>
        </div>
        <div class="mb-3">
          <label for="">Last Name</label>
          <input type="text" v-model="model.userDetail.lastName" class="form-control" @input="validateLastName">
          <span v-if="lastNameError" class="text-danger">{{ lastNameError }}</span>
        </div>
        <div class="mb-3">
          <label for="birthdayInput">Birthday</label>
          <input type="text" id="birthdayInput" v-model="formattedBirthday" @input="validateBirthday"/>
          <span v-if="birthdayError" class="text-danger">{{ birthdayError }}</span>
        </div>
        <div class="mb-3">
          <label for="">Username</label>
          <input type="text" v-model="model.userDetail.user.username" class="form-control" @input="validateUsername">
          <span v-if="usernameError" class="text-danger">{{ usernameError }}</span>
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" v-model="model.userDetail.user.email" class="form-control" @input="validateEmail">
          <span v-if="emailError" class="text-danger">{{ emailError }}</span>
        </div>
        <div class="mb-3">
          <label for="">Password</label>
          <div class="input-group">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="model.userDetail.user.password"
                class="form-control"
                @input="validatePassword"
            />
            <button
                class="btn btn-outline-secondary"
                type="button"
                @click="togglePasswordVisibility"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
          <span v-if="passwordError" class="text-danger">{{ passwordError }}</span>
        </div>
        <div class="mb-3">
          <button type="button" @click="editUser" class="btn btn-primary" :disabled="!isFormValid">
            Edit
          </button>&nbsp;
          <RouterLink :to="userEndpoint()" class="btn btn-primary">
            Back
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { USER_DETAIL_ENDPOINT, USER_URL } from "@/constants/api";
import flatpickr from "flatpickr";
import {
  validateAge, validateEmail, validateFirstName, validateLastName,
  validatePassword, validatePasswordComplexity, validateUsername
} from "@/views/users/validationUtils";

export default {
  name: "UserEditView",
  data() {
    return {
      userId: "",
      formattedBirthday: "",
      model: {
        userDetail: {
          firstName: "",
          lastName: "",
          birthday: "",
          user: {
            id: "",
            username: "",
            password: "",
            email: "",
          },
        },
      },
      showPassword: false,
      firstNameError: null,
      lastNameError: null,
      birthdayError: null,
      usernameError: null,
      passwordError: null,
      emailError: null,
    };
  },
  computed: {
    isFormValid() {
      return !this.firstNameError && !this.lastNameError && !this.birthdayError &&
          !this.usernameError && !this.passwordError && !this.emailError;
    },
  },
  methods: {
    userEndpoint() {
      return USER_DETAIL_ENDPOINT;
    },
    getUser(userId) {
      axios.get(`${USER_URL}/${userId}`).then((res) => {
        this.model.userDetail = res.data;
        this.formattedBirthday = this.formatDate(res.data.birthday);
      }).catch(function (error) {
        // handle error on UI site
      });
    },
    editUser() {
      this.validateFirstName();
      this.validateLastName();
      this.validateBirthday();
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      if (this.isFormValid) {
        axios
            .put(`${USER_URL}/${this.userId}`, this.model.userDetail)
            .then((res) => {
              alert("User was Edited successfully");
            })
            .catch(function (error) {
              console.error("Error editing user:", error);
              alert("Error editing user. Please check the form and try again.");
            });
      } else {
        alert("Please fix the errors in the form before editing the user.");
      }
    },
    formatDate(timestamp) {
      // Helper function to format the timestamp to a readable date
      const date = new Date(timestamp);
      return date.toISOString().split("T")[0];
    },
    validateFirstName() {
      this.firstNameError = validateFirstName(this.model.userDetail.firstName);
    },
    validateLastName() {
      this.lastNameError = validateLastName(this.model.userDetail.lastName);
    },
    validateBirthday() {
      this.birthdayError = validateAge(this.model.userDetail.birthday);

    },
    validateUsername() {
      this.usernameError = validateUsername(this.model.userDetail.user.username);
    },
    validatePassword() {
      this.passwordError = validatePassword(this.model.userDetail.user.password) ||
          validatePasswordComplexity(this.model.userDetail.user.password);
    },
    validateEmail() {
      this.emailError = validateEmail(this.model.userDetail.user.email);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUser(this.userId);

    flatpickr("#birthdayInput", {
      dateFormat: "Y-m-d",
      defaultDate: this.model.userDetail.birthday
          ? [new Date(this.model.userDetail.birthday)]
          : [],
      onClose: (selectedDates) => {
        this.model.userDetail.birthday = selectedDates[0]
            ? selectedDates[0].getTime()
            : "";
        this.formattedBirthday = this.formatDate(
            this.model.userDetail.birthday
        );
      },
    });
  },
};
</script>
