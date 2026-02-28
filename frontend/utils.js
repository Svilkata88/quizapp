import Cookies from "js-cookie";

function apiFetch(url, options = {}) {
  const access = Cookies.get("access") || null;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (access) {
    headers.Authorization = `Bearer ${access}`;
  }

  return fetch(url, { ...options, headers, credentials: "include" }).then(
    (res) => {
      if (res.ok) return res.json();

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
          headers.Authorization = `Bearer ${refreshData.access}`;

          // retry
          return fetch(url, {
            ...options,
            headers,
            credentials: "include",
          }).then((retryRes) => {
            if (!retryRes.ok) {
              throw new Error("Refresh failed");
            }
            return retryRes.json();
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
    body: JSON.stringify(body),
  }).then((response) => response);
  return data;
}

function apiLoginUser(url, credentials) {
  const data = apiFetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(credentials),
  }).then((response) => response);
  return data;
}

function apiRegisterUser(url, credentials) {
  return fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    return response.json().then((parsedData) => {
      if (!response.ok) {
        throw parsedData;
      }
      return parsedData;
    });
  });
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
};
