import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path
            d="M256 238.345c9.507-24.214 29.625-44.138 54.881-44.138 21.257 0 40.201 9.993 52.966 26.483 16.013 20.692 27.33 66.754-7.715 101.8C338.353 340.268 256 423.724 256 423.724s-82.353-83.456-100.131-101.235c-35.046-35.046-23.729-81.108-7.715-101.8 12.765-16.49 31.709-26.483 52.966-26.483 25.255.001 45.373 19.925 54.88 44.139M150.069 141.241l8.828-8.828h-52.966a8.828 8.828 0 0 0 0 17.656h52.966a8.828 8.828 0 0 0 8.828-8.828v-8.828a8.828 8.828 0 0 0-17.656 0v8.828z"
            fill="#d71e00"
        />
        <Path
            d="m155.813 81.484 2.335-2.758.608-.807c14.226-21.339-.114-51.01-25.754-51.434l-.588-.001c-19.503 0-35.31 15.808-35.31 35.31a8.828 8.828 0 0 0 17.656 0c0-9.752 7.903-17.655 17.655-17.655h.441c11.188.187 17.866 14.003 11.211 23.987l7.345 4.897-6.737-5.704-2.339 2.763a339.03 339.03 0 0 0-44.298 67.212 8.828 8.828 0 0 0 15.79 7.898 321.213 321.213 0 0 1 41.985-63.708z"
            fill="#d71e00"
        />
    </Svg>
);
export default SvgComponent;
