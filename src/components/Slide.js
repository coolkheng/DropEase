import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ img }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="outline-none border-none relative">
                <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] -translate-y-[50%] space-y-2 lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
                </div>
                <img
                    className="w-[100%] h-[100px] md:h-auto rounded-xl object-cover object-right"
                    src={img}
                    alt="banner"
                />
                
            </div>
        </div>
    );
};

Slide.propTypes = {
    img: PropTypes.string.isRequired,
};

export default Slide;