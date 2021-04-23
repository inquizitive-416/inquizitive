const CURRENT_USER = "user";

export function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

export function getCurrentUser(user) {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
}