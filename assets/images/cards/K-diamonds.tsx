import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path
            d="M256 176.552 150.069 308.966 256 441.379l105.931-132.413zM97.103 141.241a8.828 8.828 0 0 0 17.656 0V35.31a8.828 8.828 0 0 0-17.656 0v105.931z"
            fill="#d71e00"
        />
        <Path
            d="M165.599 41.055a8.828 8.828 0 0 0-13.404-11.49L99.229 91.359a8.828 8.828 0 0 0 13.404 11.49l52.966-61.794z"
            fill="#d71e00"
        />
        <Path
            d="M130.77 74.317a8.827 8.827 0 1 0-14.366 10.262l44.138 61.793a8.827 8.827 0 1 0 14.366-10.262L130.77 74.317z"
            fill="#d71e00"
        />
    </Svg>
);
export default SvgComponent;
