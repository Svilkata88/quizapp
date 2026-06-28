import Cookies from "js-cookie";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function apiFetch(url, options = {}) {
  const access = Cookies.get("access") || null;
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(access && { Authorization: `Bearer ${access}` }),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  const body = isFormData
    ? options.body
    : options.body
      ? JSON.stringify(options.body)
      : undefined;

  return fetch(url, { ...options, headers, body, credentials: "include" }).then(
    (res) => {
      // when there is no content ( update or delete ) return null
      if (res.ok) {
        return res.status === 204 ? null : res.json();
      }

      if (res.status !== 401) {
        return res.text().then((text) => {
          try {
            const json = JSON.parse(text);
            return Promise.reject(json);
          } catch {
            return Promise.reject({ general: text });
          }
        });
      }

      // take new access
      // handles if refresh succeed but retry fails
      return fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((refreshRes) => {
          if (!refreshRes.ok) {
            return refreshRes.text().then((text) => {
              try {
                return Promise.reject(JSON.parse(text));
              } catch {
                return Promise.reject({ general: text });
              }
            });
          }
          return refreshRes.json();
        })
        .then((refreshData) => {
          Cookies.set("access", refreshData.access);
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${refreshData.access}`,
          };

          // retry
          return fetch(url, {
            ...options,
            headers: retryHeaders,
            body,
            credentials: "include",
          }).then((retryRes) => {
            if (!retryRes.ok) {
              throw new Error("Refresh failed");
            }
            return retryRes.status === 204 ? null : retryRes.json();
          });
        })
        .catch((error) => {
          console.error("Error during token refresh or retry:", error);
          Cookies.remove("access");
          Cookies.remove("user");
          Cookies.remove("seed");
          return Promise.reject({
            general: "Session expired. Please log in again.",
          });
        });
    },
  );
}

function fetchQuestions(url, page, difficulty) {
  const normalizedUrl = url.endsWith("/") ? url : `${url}/`;
  const params = new URLSearchParams();
  const seed = Cookies.get("seed");

  if (page !== undefined && page !== null) {
    params.set("page", page);
  }

  if (difficulty !== undefined && difficulty !== null && difficulty !== "") {
    params.set("difficulty", difficulty);
  }

  if (seed) {
    params.set("seed", seed);
  }

  const query = params.toString();
  return apiFetch(`${normalizedUrl}${query ? `?${query}` : ""}`).then(
    (response) => response,
  );
}

function fetchAllQuestions(url) {
  return apiFetch(url).then((response) => response);
}

function fetchOwnQuestions(url) {
  const data = apiFetch(`${url}`).then((response) => response);
  return data;
}

function fetchOneQuestions(url, id) {
  const data = apiFetch(`${url}/${id}/`, {}).then((response) => response);
  return data;
}

function createQuestion(url, body) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: body,
  }).then((response) => response);
  return data;
}

function apiEditQuestion(url, newData) {
  const data = apiFetch(`${url}`, {
    method: "PUT",
    body: newData,
  }).then((response) => response);
  return data;
}

function updateQuestions(url, body) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: body,
  }).then((response) => response);
  return data;
}

function apiFetchAllUsers(url) {
  return apiFetch(url).then((response) => response);
}

function apiFetchOneUser(url) {
  return apiFetch(url).then((response) => response);
}

function apiLoginUser(url, credentials) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: credentials,
  }).then((response) => response);
  return data;
}

function apiResetPassword(url, emailObj) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: emailObj,
  }).then((response) => response);
  return data;
}

function apiEditUser(url, newData) {
  const data = apiFetch(`${url}`, {
    method: "PUT",
    body: newData,
  }).then((response) => response);
  return data;
}

function apiRegisterUser(url, credentials) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: credentials,
  }).then((response) => response);
  return data;
}

function apiLogoutUser() {
  return fetch(`${BASE_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  }).then(() => {
    Cookies.remove("access");
  });
}

function showText(divRef, text, className) {
  const child = document.createElement("p");
  child.textContent = text;
  child.className = className;
  divRef.current.appendChild(child);
}

function hideText(divRef) {
  divRef.current.lastChild.remove();
}

function createQuestionIssue(url, questionId, issue) {
  return apiFetch(url, {
    method: "POST",
    credentials: "include",
    body: { questionId, issue },
  }).then(() => {});
}

function createRating(url, questionId, rating) {
  return apiFetch(url, {
    method: "POST",
    credentials: "include",
    body: { questionId, rating },
  });
}

function fetchTopFiveUsers(url) {
  return apiFetch(url, {
    method: "GET",
    credentials: "include",
  }).then((response) => response);
}

function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export {
  fetchQuestions,
  fetchAllQuestions,
  fetchOwnQuestions,
  fetchOneQuestions,
  apiEditQuestion,
  createQuestion,
  updateQuestions,
  showText,
  hideText,
  apiFetchAllUsers,
  apiFetchOneUser,
  apiLoginUser,
  apiResetPassword,
  apiRegisterUser,
  createQuestionIssue,
  apiLogoutUser,
  createRating,
  fetchTopFiveUsers,
  apiEditUser,
  formatTime,
};
