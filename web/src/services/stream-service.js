import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getProfile() {
  return http.get("/profile");
}

export function getStreams() {
  return http.get("/streams");
}

export function getStream(id) {
  // TODO
}

export function createStream(stream) {
  return http.post("/streams", stream);
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}
