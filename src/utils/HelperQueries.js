import Auth from './../auth/Auth';

export async function changeDatabase (name) {
    try {
        let response = await fetch('/change-db', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': Auth.getToken()
            }),
            body: JSON.stringify({
                databaseName: name
            })
        });
        return response;
    }
    catch (e) {
        return e;
    }
}