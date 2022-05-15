function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => {
    //     return res.json()
    // })
    // .then(function(data) {
    //     document.getElementById('results').innerHTML = data.message
    // })
    // API call to meaningcloud
    // Test sentecne: The restaurant was great even though it’s not near Madrid.
    const formdata = new FormData();
    formdata.append("key", add API ID here); //process.env.API_ID
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
        let sentiment_short = data.score_tag;
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
        let subjectivity = data.subjectivity;
        let irony = data.irony;
        document.getElementById('results').innerHTML = `<strong>Subjectivity:</strong> ${subjectivity}\
                                                        <br><strong>Irony:</strong> ${irony}\
                                                        <br><strong>Sentiment:</strong> ${sentiment}`;
    })
    .catch(error => console.log('error', error));
}
    
export { handleSubmit }