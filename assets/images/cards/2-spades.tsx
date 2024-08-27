import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path d="M282.483 361.931s44.323 44.323 79.448-8.828c18.282-27.666 5.888-54.616-13.603-73.242l-83.906-82.635c-4.723-4.025-11.979-4.025-16.711 0l-85.124 82.635c-16.746 17.523-31.011 45.506-12.518 73.242 35.31 52.966 79.448 8.828 79.448 8.828 0 22.625-6.444 51.703-8.324 59.683-.256 1.112.6 2.11 1.739 2.11h66.145c1.139 0 1.986-.997 1.73-2.101-1.871-8.006-8.324-37.208-8.324-59.692M150.069 141.241l8.828-8.828h-52.966a8.828 8.828 0 0 0 0 17.656h52.966a8.828 8.828 0 0 0 8.828-8.828v-8.828a8.828 8.828 0 0 0-17.656 0v8.828z" />
        <Path d="m155.813 81.484 2.335-2.758.608-.807c14.226-21.339-.114-51.01-25.754-51.434l-.588-.001c-19.503 0-35.31 15.808-35.31 35.31a8.828 8.828 0 0 0 17.656 0c0-9.752 7.903-17.655 17.655-17.655h.441c11.188.187 17.866 14.003 11.211 23.987l7.345 4.897-6.737-5.704-2.339 2.763a339.03 339.03 0 0 0-44.298 67.212 8.828 8.828 0 0 0 15.79 7.898 321.213 321.213 0 0 1 41.985-63.708z" />
    </Svg>
);
export default SvgComponent;
