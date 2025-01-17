import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path
            d="M256 176.552 150.069 308.966 256 441.379l105.931-132.413zM158.897 44.138a8.828 8.828 0 0 0 0-17.656h-52.966a8.828 8.828 0 0 0 0 17.656h52.966z"
            fill="#d71e00"
        />
        <Path
            d="M114.759 35.31a8.828 8.828 0 0 0-17.656 0v8.828a8.828 8.828 0 0 0 17.656 0V35.31zM114.881 122.122a8.828 8.828 0 1 0 17.411 2.929c6.146-36.533 13.104-53.566 33.951-84.845 2.704-4.057 1.607-9.538-2.45-12.241s-9.538-1.607-12.241 2.45c-22.194 33.299-30.101 52.655-36.671 91.707z"
            fill="#d71e00"
        />
    </Svg>
);
export default SvgComponent;
