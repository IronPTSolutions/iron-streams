import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getStreams() {
  return http.get("/streams").then((res) => res.data);
}

export function getStream(id) {
  // TODO
}

export function createStream(stream) {
  return http.post("/streams", stream).then((res) => res.data);
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}
