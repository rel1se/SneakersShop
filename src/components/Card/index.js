import React from "react";
import styles from './Card.module.css'

function Card({id, title, imageUrl, price, onPlus, onFavorite, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const onClickPlus = () => {
        onPlus({title, price, imageUrl})
        setIsAdded(!isAdded)
    }
    const onClickFavorite = () => {
        onFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.jpg'} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Цена: </p>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus}
                     src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="Plus"/>
            </div>
        </div>
    );
}

export default Card;
