import React from 'react';

function Rating({value, text,color}) {
    return (
        <div className = "rating">
            {/* star 1 */}
            <span>     
                <i style ={{ color }} className={
                    // javascript if statement
                    value >= 1 
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i> 
            </span>
            
            {/* star 2 */}
            <span>     
                <i style ={{ color }} className={
                    // javascript if statement
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i> 
            </span>

            {/* star 3 */}
            <span>     
                <i style ={{ color }} className={
                    // javascript if statement
                    value >= 3 
                        ? 'fas fa-star'
                        : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i> 
            </span>

            {/* star 4 */}
            <span>     
                <i style ={{ color }} className={
                    // javascript if statement
                    value >= 4 
                        ? 'fas fa-star'
                        : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i> 
            </span>

            {/* star 5 */}
            <span>     
                <i style ={{ color }} className={
                    // javascript if statement
                    value >= 5 
                        ? 'fas fa-star'
                        : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i> 
            </span>

            <span> {text && text } </span>


        </div>
    )
}

export default Rating;