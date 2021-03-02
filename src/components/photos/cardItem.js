import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button';

const CardItem = ({ cat }) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    const download = (url, name) => {
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        setFetching(true);
        fetch(url)
            .then(response => {
                response.blob();
                console.log(response);
            })
            .then(blob => {
                setFetching(false);
                const blobURL = URL.createObjectURL(blob);
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
                console.log(url);
            });
    };

    useEffect(() => {
        console.log("Error occured!");
    }, [error])

    return (
        <div className="card" key={cat.id}>
            <img className="card-img" src={cat.url} alt="" />
            {/* href="https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"  */}
            {/* <a className="button" href={cat.url} download="image.png">Download image</a> */}
            <button
                className="btn btn-primary btnFloating"
                disabled={fetching}
                onClick={() => download(cat.url.replace('cdn2', 'api'), "filename")}
                aria-label="download this"
            >
                DOWNLOAD
            </button>
            {/* <h3>{cat.id}</h3> */}
        </div>
    )

}

export default CardItem
