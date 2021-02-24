import React from 'react'

const cardItem = (cat) => {
    return (
        <div className="card" key={cat.id}>
            <img src={cat.url} alt="" />
            {/* <h3>{cat.id}</h3> */}
        </div>
    )
}

export default cardItem
