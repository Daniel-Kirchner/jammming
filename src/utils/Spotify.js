const clientId = process.env.REACT_APP_CLIENT_ID; // Spotify clientId.
const redirectUri = "http://localhost:3000"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const authEndpoint = "https://accounts.spotify.com/authorize";
const reponseType = "token";

const Spotify = {
  getAuthUrl() {
    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${reponseType}`;
  },

  getAccessToken() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    return token;
  },

  logout() {
    window.localStorage.removeItem("token");
    return "";
  },

  async getCurrentUser(token) {
    if (!token) {
      return {};
    }
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      return {};
    }
    console.log("Inside spotify.js " + jsonResponse);
    return jsonResponse;
  },

  // TODO: make search method generic for types
  async search(term, type = "track") {
    const token = this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
};

export default Spotify;
