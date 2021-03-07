import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button';

const CardItem = ({ cat }) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    const download = (url, name) => {
        const newUrl = url.substr(0, 25) + "/v1" + url.substr(25, url.substr(25).indexOf("."))
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        setFetching(true);
        fetch(newUrl)
            .then(response => {
                console.log("🚀 ~ file: cardItem.js ~ line 17 ~ download ~ response", response)
                const result = response.blob();
                console.log("🚀 ~ file: cardItem.js ~ line 19 ~ download ~ result", result)
                // })
                // .then(blob => {
                // console.log("🚀 ~ file: cardItem.js ~ line 20 ~ download ~ blob", blob)
                setFetching(false);

                // const mediaStream = new MediaStream();
                // const video = document.getElementById('video-player');
                // video.srcObject = mediaStream;

                const blobURL = URL.createObjectURL(result.url);
                console.log("🚀 ~ file: cardItem.js ~ line 28 ~ download ~ blobURL", blobURL)
                const a = document.createElement("a");
                a.href = blobURL;
                a.style = "display: none";

                if (name && name.length) a.download = name;
                document.body.appendChild(a);
                a.click();
            })
            .catch((err) => {
                setError(true);
                console.log(err);
                console.log(newUrl);
            });

    };

    // function onStartedDownload(id) {
    //     console.log(`Started downloading: ${id}`);
    // }

    // function onFailed(error) {
    //     console.log(`Download failed: ${error}`);
    // }

    // var downloadUrl = "https://example.org/image.png";


    // var downloading = browser.downloads.download({
    //     url: downloadUrl,
    //     filename: 'my-image-again.png',
    //     conflictAction: 'uniquify'
    // });


    useEffect(() => {
        console.log("Error occured!");
    }, [error])

    useEffect(() => {

        // toDataURL('https://cdn2.thecatapi.com/images/2g6.jpg', function (dataUrl) {
        //     console.log('RESULT:', dataUrl)
        // })


        // downloading.then(onStartedDownload, onFailed);

    }, [])

    // function newLink() {
    //     const newLink = cat.url.replace('cdn2', 'api')
    //     newUrl = newLink.substr(0, 25) + "/v1" + newLink.substr(25, newLink.substr(25).indexOf("."));
    // }

    // let newUrl;
    // newLink();

    return (
        <div className="card" key={cat.id}>
            <div className="card-inner-container">
                {/* <Button variant="outlined" color="secondary"
                    className="btnFloating"
                    disabled={fetching}
                    onClick={() => download(cat.url.replace('cdn2', 'api'), "filename")}
                    aria-label="download this">
                    aaaa
                    <i class="fas fa-arrow-down"></i>
                </Button> */}
                <a href={cat.url} className="btnFloat" download target="_blank">aaaa
                    <i class="fas fa-arrow-down"></i></a>
                <img className="card-img" src={cat.url} alt="" />
                <a href="../../../imgs/1it.jpg" target="_blank" rel="noopener noreferrer" download>
                    <Button>
                        <i className="fas fa-download" />
                        Download File
                    </Button>
                </a>
            </div>
        </div>
    )

}

export default CardItem
