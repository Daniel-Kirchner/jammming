const Spotify = {
  async fetchData(params) {
    const baseURL = "https://api.spotify.com/v1";
    const token = this.getAccessToken();
    const response = await fetch(`${baseURL}${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse) return;

    return jsonResponse;
  },

  getAuthUrl() {
    const clientId = process.env.REACT_APP_CLIENT_ID; // Spotify clientId.
    const redirectUri = "http://localhost:3000"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const reponseType = "token";

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

  async getCurrentUser() {
    const param = "/me";
    return await this.fetchData(param);
  },

  async search(term, type = "track") {
    const param = `/search?q=${term}&type=${type}`;
    const jsonResponse = await this.fetchData(param);

    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async getUserPlaylists(userID) {
    const param = `/users/${userID}/playlists`;

    const jsonResponse = await this.fetchData(param);
    if (!jsonResponse.items) return;

    return jsonResponse.items.map((item) => ({
      id: item.id,
      description: item.description,
      name: item.name,
      numberOfTracks: item.tracks.total,
    }));
  },

  async getPlaylistTracks(id) {
    const param = `/playlists/${id}`;

    const jsonResponse = await this.fetchData(param);
    if (!jsonResponse.tracks) return;

    return {
      name: jsonResponse.name || "",
      tracks: jsonResponse.tracks.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
      })),
    };
  },

  logout() {
    window.localStorage.removeItem("token");
    return "";
  },
};

export default Spotify;
