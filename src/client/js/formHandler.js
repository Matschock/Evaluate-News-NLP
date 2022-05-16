function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    // Test sentecne: The restaurant was great even though it’s not near Madrid.

    // get API Key from Server
    getApiKeyFromServer('http://localhost:8081/meaningCloud')
    // get meaningClound Sentiment Analysis
    .then(function(api_key, formText){
        getSentimentAnalysis(api_key, formText)
    })
}

 
// get API Key from Server
const getApiKeyFromServer = async (serveraddress) => {
    const res = await fetch(serveraddress);
    try{
        const data = await res.json()
        const api_key = data.API_ID
        console.log(`My API ID is: ${api_key}`)
        return api_key;
    } catch(error){
        console.log("error", error);
    }
}

// get meaningClound Sentiment Analysis
const getSentimentAnalysis = (api_key, formText) => {
    const formdata = new FormData();
    formdata.append("key", api_key);
    formdata.append("txt", formText);
    formdata.append("lang", "auto");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const res = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(res => {
        return res.json()
    })
    .then(function(data) {
        updateUI(data);
    })
}

// transform meaningCloud shortcurs into meaningfull text
function processSentimentJson(sentiment_short){
    let sentiment;
    for (let i=0; i<5; i=i+1) {
        if (sentiment_short === "P+") {
            sentiment = "strong positive";
        } else if (sentiment_short === "P") {
            sentiment = "positive";
        } else if (sentiment_short === "NEU") {
            sentiment = "neutral";
        } else if (sentiment_short === "N") {
            sentiment = "negative";
        } else if (sentiment_short === "N+") {
            sentiment = "strong negative";
        } else {
            sentiment = "without polarity";
        }
    }
    return sentiment
}

// Update website
const updateUI = (data) => {
    let subjectivity = data.subjectivity;
    let irony = data.irony;
    let sentiment = processSentimentJson(data.score_tag);
    document.getElementById('results').innerHTML =   `<strong>Subjectivity:</strong> ${subjectivity}\
                                                    <br><strong>Irony:</strong> ${irony}\
                                                    <br><strong>Sentiment:</strong> ${sentiment}`;
}

    
export { handleSubmit }