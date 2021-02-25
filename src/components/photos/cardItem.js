import React from 'react'

const CardItem = ({ cat }) => {
    return (
        <div className="card" key={cat.id}>
            <img className="card-img" src={cat.url} alt="" />
            {/* <h3>{cat.id}</h3> */}
        </div>
    )
}

export default CardItem
