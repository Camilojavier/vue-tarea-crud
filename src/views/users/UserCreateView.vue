<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Users</h4>
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
          <input type="text" id="birthdayInput" @blur="validateBirthday">
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
                @blur="validatePassword"
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
          <button type="button" @click="saveUser" class="btn btn-primary" :disabled="!isFormValid">
            Save
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
import { USER_DETAIL_ENDPOINT, CREATE_URL } from "@/constants/api";
import flatpickr from "flatpickr";
import {
  validateAge, validateEmail, validateFirstName, validateLastName,
  validatePassword,
  validatePasswordComplexity,
  validateUsername
} from "@/views/users/validationUtils";

export default {
  name: "UserCreateView",
  data() {
    return {
      model: {
        userDetail: {
          firstName: '',
          lastName: '',
          birthday: '',
          user: {
            username: '',
            password: '',
            email: ''
          }
        }
      },
      showPassword: false,
      birthdayError: null,
      usernameError: null,
      passwordError: null,
      emailError: null,
      firstNameError: null,
      lastNameError: null,
    }
  },
  computed: {
    isFormValid() {
      return !this.birthdayError && !this.usernameError && !this.passwordError && !this.emailError && !this.lastNameError && !this.firstNameError;
    },
  },
  methods: {
    userEndpoint() {
      return USER_DETAIL_ENDPOINT;
    },
    saveUser() {
      axios.post(CREATE_URL, this.model.userDetail)
          .then(res => {
            alert('User was saved successful');
            this.model.userDetail = {
              firstName: '',
              lastName: '',
              birthday: '',
              user: {
                username: '',
                password: '',
                email: ''
              }
            }
          }).catch(function (error) {
        console.error("Error saving user:", error);
        alert('Error saving user. Please check the form and try again.');
      })
    },
    validateFirstName(){
      this.firstNameError = validateFirstName(this.model.userDetail.firstName);
    },
    validateLastName(){
      this.lastNameError = validateLastName(this.model.userDetail.lastName);
    },
    validateBirthday() {
      this.birthdayError = validateAge(this.model.userDetail.birthday);

    },
    validateUsername() {
      this.usernameError = validateUsername(this.model.userDetail.user.username);
    },
    validatePassword(){
      this.passwordError = validatePassword(this.model.userDetail.user.password) ||
          validatePasswordComplexity(this.model.userDetail.user.password);
    },
    validateEmail(){
      this.emailError = validateEmail(this.model.userDetail.user.email);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    flatpickr('#birthdayInput', {
      dateFormat: 'Y-m-d',
      onClose: (selectedDates) => {
        this.model.userDetail.birthday = selectedDates[0] ? selectedDates[0].toISOString().split('T')[0] : '';
        this.validateBirthday();
      },
    });
  }
}
</script>
