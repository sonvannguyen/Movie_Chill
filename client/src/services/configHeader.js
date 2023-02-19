export default function getConfigHeader() {
    const token = localStorage.getItem('movie_access_token')
    const configHeader = {
      headers: {
        'authorization': `${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return configHeader;
}