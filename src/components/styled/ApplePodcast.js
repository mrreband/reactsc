import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Svg = styled(Icon)`
    width: 35px;
    height: 35px;
`;

export const ApplePodcast = ({ className }) => (
    <Svg viewBox="0 0 24 24" className={className}>
        <title>Apple Podcasts</title>
        <path
            fill="currentColor"
            d="M11.93 24s2.633 0 2.633-7.794c0-1.451-1.18-2.633-2.633-2.633s-2.634 1.182-2.634 2.633C9.296 24 11.93 24 11.93 24zm3.23-2.656c.115-.447.205-.896.275-1.351l.053-.36c.115-.05.23-.098.346-.15a9.513 9.513 0 0 0 4.348-3.993c.447-.803.777-1.67.973-2.572a9.261 9.261 0 0 0 .166-3.088 8.925 8.925 0 0 0-.77-2.787 9.098 9.098 0 0 0-1.924-2.784 9.446 9.446 0 0 0-2.875-1.972 9.106 9.106 0 0 0-3.52-.782 9.384 9.384 0 0 0-3.582.603 9.407 9.407 0 0 0-5.927 7.235 9.425 9.425 0 0 0-.016 2.98c.135.872.391 1.73.768 2.543a9.5 9.5 0 0 0 4.258 4.394c.226.104.451.21.692.314.015.121.046.256.06.392.075.438.166.889.271 1.325a11.749 11.749 0 0 1-1.204-.468 10.99 10.99 0 0 1-5.101-4.754 11.217 11.217 0 0 1-1.098-3.01 10.435 10.435 0 0 1-.15-3.566c.15-1.112.466-2.211.933-3.22a11.193 11.193 0 0 1 2.271-3.204A10.47 10.47 0 0 1 7.717.858a10.981 10.981 0 0 1 4.111-.857c1.412-.015 2.824.24 4.139.758a10.899 10.899 0 0 1 3.43 2.166c.965.895 1.76 1.962 2.346 3.139.496.993.842 2.076 1.008 3.175.18 1.144.18 2.317-.016 3.446a10.957 10.957 0 0 1-.979 3.053 10.972 10.972 0 0 1-4.92 4.922c-.527.256-1.084.481-1.655.661l-.021.023zm.52-4.295l.01-.47c0-.316 0-.632-.046-.943-.015-.121-.045-.226-.075-.346a5.614 5.614 0 0 0 1.926-3.221c.121-.602.15-1.233.061-1.865a5.98 5.98 0 0 0-.451-1.61 5.843 5.843 0 0 0-1.158-1.67 5.948 5.948 0 0 0-1.686-1.159 5.88 5.88 0 0 0-2.197-.496 5.942 5.942 0 0 0-2.227.392 5.779 5.779 0 0 0-1.73 1.083 5.395 5.395 0 0 0-1.235 1.624 5.613 5.613 0 0 0-.587 3.31c.075.557.226 1.099.451 1.609a5.895 5.895 0 0 0 1.49 2.002l-.091.406c-.06.316-.045.617-.045.947v.422a7.1 7.1 0 0 1-2.513-2.663 6.599 6.599 0 0 1-.723-1.972 6.827 6.827 0 0 1-.09-2.347 7.156 7.156 0 0 1 2.031-4.153A7.033 7.033 0 0 1 8.916 4.47a7.359 7.359 0 0 1 2.769-.632 7.4 7.4 0 0 1 2.813.497 7.055 7.055 0 0 1 2.197 1.368 7.382 7.382 0 0 1 1.564 2.047c.316.632.557 1.309.678 2.001a7.07 7.07 0 0 1 .045 2.182 6.868 6.868 0 0 1-.588 2.046 7.136 7.136 0 0 1-2.828 3.176l.114-.106zm-3.75-9.575a2.655 2.655 0 0 1 2.654 2.656 2.653 2.653 0 1 1-5.309.014 2.654 2.654 0 0 1 2.655-2.649v-.021z"
        />
    </Svg>
);
