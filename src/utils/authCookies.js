import Cookies from "js-cookie";

const COOKIE_NAME = "vedanshi_auth";

export const saveAuthToCookie = (data) => {

  const payload = {
    user: {
      _id: data._id,
      name: data.name,
      email: data.email
    },
    accessToken: data.token,
    refreshToken: data.refreshToken
  };

  Cookies.set(COOKIE_NAME, JSON.stringify(payload), {
    expires: 7,
    sameSite: "lax"
  });
};

export const updateAccessToken = (newToken) => {
  const cookie = Cookies.get(COOKIE_NAME);
  if (!cookie) return;

  const parsed = JSON.parse(cookie);

  parsed.accessToken = newToken;

  Cookies.set(COOKIE_NAME, JSON.stringify(parsed), {
    expires: 7,
    sameSite: "lax"
  });
};

export const getAuthFromCookie = () => {

  const cookie = Cookies.get(COOKIE_NAME);

  if (!cookie) return null;

  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
};

export const clearAuthCookie = () => {
  Cookies.remove(COOKIE_NAME);
};