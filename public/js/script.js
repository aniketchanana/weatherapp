//client side javascript


const weatherForm  = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('.first');
const messagetwo = document.querySelector('.second');


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    messageone.textContent = "Loading...";
    messagetwo.textContent = '';
    const location = search.value;
    if(location === undefined || location === '')
    {
        messageone.textContent = "please enter something"
    }
    else
    {
        const url = `/weather?address=${location}`;
        fetch(url).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageone.textContent = 'error!!';
                }
                else{
                    messageone.textContent = data.location;
                    messagetwo.textContent = `${data.summary} with max temp ${data.maxtemp} f and min temp ${data.mintemp} f`;
                }
            })
        })
    }

})