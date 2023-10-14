import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  // So the duration in milliseconds, can now be calculated by using that expiration date, and calling getTime on it, which gives me the time value in milliseconds.
  const duration = expirationDate.getTime() - now.getTime();
  // If the expiration is still in the future. So if the token is still valid, therefore, then this will be a positive value.
  // If now is later than the token expiration, so if the token did expire, this will be a negative value.
  return duration;
}
export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) return "EXPIRED";
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) return redirect("/auth");
  return null;
}
