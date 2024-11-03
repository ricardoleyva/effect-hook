// import apiClient from "./api-client";
import create from "./http-service";

export interface User {
  id: number;
  name: string;
}

// class UserService {
//   getAllUsers() {
//     const controller = new AbortController();
//     const request = apiClient
//       // get -> promise -> response or error
//       .get<User[]>("/users", {
//         signal: controller.signal,
//       });
//     return { request, cancel: () => controller.abort() };
//   }

//   deleteUser(id: number) {
//     return apiClient.delete("/users/" + id);
//   }

//   addUser(newUser: User) {
//     return apiClient.post("/users", newUser);
//   }

//   updateUser(updatedUser: User) {
//     return apiClient.put("/users/" + updatedUser.id, updatedUser);
//   }
// }

// export default new UserService();

export default create("/users");
