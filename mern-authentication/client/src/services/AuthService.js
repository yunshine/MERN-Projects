// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login: user => {
        // return fetch('/user/login', {
        return fetch('http://localhost:8080/user/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: { username: "", role: "" } };
            }
        })
    },
    register: user => {
        return fetch('/user/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        console.log("in AuthService logout function...");
        return fetch('user/logout')
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        console.log("in AuthService isAuthenticated function...");
        return fetch('http://localhost:8080/user/authenticated')
            .then(res => {
                if (res.status !== 401) {
                    return res.json().then(data => data);
                } else {
                    return { isAuthenticated: false, user: { username: "", role: "" } };
                }
            })
    }
}
