import Cookies from "js-cookie";

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
      return fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((refreshRes) => {
          if (!refreshRes.ok) {
            throw new Error("Refresh failed");
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
        });
    },
  );
}

function fetchQuestions(url, page) {
  const data = apiFetch(`${url}?page=${page}`).then((response) => response);
  return data;
}

function fetchOneQuestions(url, id) {
  const data = apiFetch(`${url}/${id}`, {}).then((response) => response);
  return data;
}

function createQuestion(url, body) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: body,
  }).then((response) => response);
  return data;
}

function apiLoginUser(url, credentials) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: credentials,
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
  return fetch("http://localhost:8000/api/users/logout", {
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

function createQuestionIssue(questionId, issue) {
  return apiFetch(`http://localhost:8000/api/questions/createIssue/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ questionId, issue }),
  }).then(() => {
    // Cookies.remove("access");
  });
}

function createRating(questionId, rating) {
  return apiFetch(`http://localhost:8000/api/questions/create-rating/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ questionId, rating }),
  });
}

function fetchTopFiveUsers() {
  return apiFetch(`http://localhost:8000/api/users/top-five/`, {
    method: "GET",
    credentials: "include",
  }).then((response) => response);
}

export {
  fetchQuestions,
  fetchOneQuestions,
  showText,
  hideText,
  createQuestion,
  apiLoginUser,
  apiRegisterUser,
  createQuestionIssue,
  apiLogoutUser,
  createRating,
  fetchTopFiveUsers,
  apiEditUser,
};
