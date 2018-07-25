const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

export default class Service{

	static async get(url){
		let d = await fetch(url, {credentials: 'include', headers});
        return await d.json();
    }

	static async post(url, data){
		let b = await fetch(url, {
			method: 'POST', 
			credentials: 'include',
			body: JSON.stringify(data), 
			headers
		});
		return await b.json();
	}
}