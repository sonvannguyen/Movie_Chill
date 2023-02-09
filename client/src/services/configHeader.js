const token = localStorage.getItem('access_token')
const configHeader = {
    headers: {
        'authorization': `${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
}

export default configHeader