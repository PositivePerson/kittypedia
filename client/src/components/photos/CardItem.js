import React, { useState, useEffect, useRef } from 'react'

import Button from '@material-ui/core/Button';

const CardItem = ({ cat }) => {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);



    const inputRef = React.useRef(null)

    const downloadFile = async url => {
        // e.preventDefault();
        const response = await fetch('/api/download', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const body = await response.text();
        console.log(body);

        const displayFileFolderContent = await fetch('/api/showFilesFolderContent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const reponseFromDelete = await displayFileFolderContent.text();
        console.log(reponseFromDelete);

        const anchorClicked = await inputRef.current.click();

        setTimeout(() => {
            removeAllSavedFiles();
        }, 5000)
    }

    const removeAllSavedFiles = async () => {
        const response = await fetch('/api/cleanDirectory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const body = await response.text();
        console.log(body);
    }


    useEffect(() => {
        console.log("Error occured!");
    }, [error])

    return (
        <div className="card" key={cat.id}>
            <div className="card-inner-container">
                {/* <Button variant="outlined" color="secondary"
                    className="btnFloating"
                    disabled={fetching}
                    onClick={() => downloadFile(cat.url)}
                    aria-label="download this">
                    <i className="fas fa-download" />
                </Button> */}

                <a href={`/images/${cat.url.substr(34)}`} ref={inputRef} target="_blank" download>
                </a>

                <button variant="outlined" color="secondary"
                    type="button"
                    className="btnFloating btn btn-outline-secondary"
                    disabled={fetching}
                    onClick={() => downloadFile(cat.url)}
                    aria-label="download this">
                    {/* <i class="fas fa-arrow-down"></i> */}
                    <i style={{ fontSize: "1.5em" }} className="fas fa-download" />
                </button>

                {/* <a href={cat.url} className="btnFloat" download target="_blank">aaaa
                    <i class="fas fa-arrow-down"></i></a> */}

                <img className="card-img" src={cat.url} alt="" />
                {/* <Button onClick={() => downloadFile(cat.url)}>
                    <i className="fas fa-download" />
                        Download File
                </Button> */}
            </div>
        </div>
    )

}

export default CardItem
