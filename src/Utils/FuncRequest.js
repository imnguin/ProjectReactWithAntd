const headerDefautl = {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const _fetchAPI = async (url = '', data = {}, _header = headerDefautl, method = 'POST') => {
    try {
        let requestData = {
            cache: 'no-cache',
            credentials: 'same-origin',
            withCredentials: true,
            headers: _header,
            method: method,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        }

        if (method == 'POST') {
            requestData = {
                ...requestData,
                body: JSON.stringify(data)
            }
        }

        let response = await fetch(url, requestData);

        const result = await response.json();
        
        return result;
        
    } catch (error) {
        return {
            iserror: true,
            message: error.message,
            messagedetail: error.stack,
            resultObject: null
        }
    }
};