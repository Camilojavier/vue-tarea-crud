<template>
  <div class="course">
    <div class="card">
      <div class="card-header">
        <h4>
          Users
          <RouterLink :to="createEndpoint()" class="btn btn-primary float-end">
            Add User
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Nro.</th>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Birthday</th>
          </tr>
          </thead>
          <tbody v-if="users.length > 0">
          <tr v-for="(userDetail, index) in this.users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ userDetail.user.username }}</td>
            <td>{{ userDetail.user.email }}</td>
            <td>{{ userDetail.firstName }}</td>
            <td>{{ userDetail.lastName }}</td>
            <td>{{ userDetail.age }}</td>
            <td>{{ new Date(userDetail.birthday).toISOString().split('T')[0] }}</td>
            <td>
              <RouterLink :to="{ path: `${userEndpoint()}/${userDetail.user.id}${editEndpoint()}` }" class="btn btn-success">
                Edit
              </RouterLink>
              <button type="button" @click="deleteUser(userDetail.user.id)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="7">There are no students</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {USER_URL, EDIT_ENDPOINT, USER_DETAIL_ENDPOINT, USER_CREATE, USER_DELETE} from '@/constants/api';

export default {
  name: "UserView",
  data() {
    return {
      users: []
    };
  },
  methods: {
    createEndpoint() {
      return USER_CREATE
    },
    editEndpoint() {
      return EDIT_ENDPOINT;
    },
    userEndpoint() {
      return USER_DETAIL_ENDPOINT;
    },
    async getUsers() {
      try {
        const response = await axios.get(USER_URL);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error on UI site (e.g., show an error message to the user)
      }
    },

    async deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`${USER_DELETE}/${userId}`);
          await this.getUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          // Handle error on UI site (e.g., show an error message to the user)
        }
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>


