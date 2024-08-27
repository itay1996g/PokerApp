import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path d="M282.483 361.931s44.323 44.323 79.448-8.828c18.282-27.666 5.888-54.616-13.603-73.242l-83.906-82.635c-4.723-4.025-11.979-4.025-16.711 0l-85.124 82.635c-16.746 17.523-31.011 45.506-12.518 73.242 35.31 52.966 79.448 8.828 79.448 8.828 0 22.625-6.444 51.703-8.324 59.683-.256 1.112.6 2.11 1.739 2.11h66.145c1.139 0 1.986-.997 1.73-2.101-1.871-8.006-8.324-37.208-8.324-59.692M123.587 97.103c19.503 0 35.31-15.808 35.31-35.31s-15.808-35.31-35.31-35.31a35.17 35.17 0 0 0-11.778 2.017c-5.252 1.849-9.826 5.02-14.202 9.396a8.828 8.828 0 0 0 12.484 12.484c2.652-2.652 5.113-4.358 7.6-5.234a17.532 17.532 0 0 1 5.896-1.008c9.752 0 17.655 7.903 17.655 17.655s-7.903 17.655-17.655 17.655h-8.801a8.828 8.828 0 0 0 0 17.656h8.801z" />
        <Path d="M123.589 150.067c19.503 0 35.31-15.808 35.31-35.31s-15.808-35.31-35.31-35.31h-8.828a8.828 8.828 0 0 0 0 17.656h8.828c9.752 0 17.655 7.903 17.655 17.655s-7.903 17.655-17.655 17.655c-4.808 0-9.446-2.183-13.47-6.207a8.828 8.828 0 0 0-12.484 12.484c7.15 7.15 16.133 11.377 25.954 11.377z" />
    </Svg>
);
export default SvgComponent;
