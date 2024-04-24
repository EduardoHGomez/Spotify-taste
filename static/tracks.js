

async function getTracks() {

  	const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
	});

	console.log(response);

  	const data = await response.json();

    console.log(data);

    data.items.forEach((item) => {
        console.log(item.name)
    })



}