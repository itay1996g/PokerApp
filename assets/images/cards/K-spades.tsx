import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path d="M282.483 361.931s44.323 44.323 79.448-8.828c18.282-27.666 5.888-54.616-13.603-73.242l-83.906-82.635c-4.723-4.025-11.979-4.025-16.711 0l-85.124 82.635c-16.746 17.523-31.011 45.506-12.518 73.242 35.31 52.966 79.448 8.828 79.448 8.828 0 22.625-6.444 51.703-8.324 59.683-.256 1.112.6 2.11 1.739 2.11h66.145c1.139 0 1.986-.997 1.73-2.101-1.871-8.006-8.324-37.208-8.324-59.692M97.103 141.241a8.828 8.828 0 0 0 17.656 0V35.31a8.828 8.828 0 0 0-17.656 0v105.931z" />
        <Path d="M165.599 41.055a8.828 8.828 0 0 0-13.404-11.49L99.229 91.359a8.828 8.828 0 0 0 13.404 11.49l52.966-61.794z" />
        <Path d="M130.77 74.317a8.827 8.827 0 1 0-14.366 10.262l44.138 61.793a8.827 8.827 0 1 0 14.366-10.262L130.77 74.317z" />
    </Svg>
);
export default SvgComponent;
