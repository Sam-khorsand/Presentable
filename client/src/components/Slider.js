import React from 'react';
import '../styles/Slider.css';
import propsWrapper from '../HOCs/propsWrapper';

const Slider = function ({ valueUpdate, value, selection, minScale, maxScale, stretch }) {

    function handleSliderChange(event) {
        valueUpdate(event.target.value);
    }

    return (
        <div className="slider-wrapper">
            <div className="range">
                <div className="range_container">
                    <div className="range_track" id="track"></div>
                    <div className="range_thumb" id="thumb" style={{ left: (stretch * value) + "px" }}></div>
                    < div className="range_value" id="value" style={{ left: (stretch * value) + "px" }}>{value}</div>
                    <input
                        onChange={handleSliderChange.bind(this)}
                        className="range_tag"
                        type="range"
                        min={minScale}
                        max={maxScale}
                        value={value}
                        step="1" />
                </div>
            </div>
        </div>
    )
};

export default propsWrapper(Slider)