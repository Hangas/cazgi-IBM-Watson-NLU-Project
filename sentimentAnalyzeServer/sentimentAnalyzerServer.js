const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
                }
            }
    };

    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return res.send('error:', err);
    });
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
                }
            }
    };

    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return res.send('error:', err);
    });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
                }
            }
    };

    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return res.send('error:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
                }
            }
    };

    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return res.send('error:', err);
    });
});

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator : new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

