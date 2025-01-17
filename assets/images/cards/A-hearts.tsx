import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path
            d="M256 238.345c9.507-24.214 29.625-44.138 54.881-44.138 21.257 0 40.201 9.993 52.966 26.483 16.013 20.692 27.33 66.754-7.715 101.8C338.353 340.268 256 423.724 256 423.724s-82.353-83.456-100.131-101.235c-35.046-35.046-23.729-81.108-7.715-101.8 12.765-16.49 31.709-26.483 52.966-26.483 25.255.001 45.373 19.925 54.88 44.139M149.616 32.519c-2.683-8.048-14.066-8.048-16.749 0L97.556 138.45a8.828 8.828 0 0 0 16.749 5.583l35.31-105.931h-16.749l35.31 105.931a8.828 8.828 0 0 0 16.749-5.583L149.616 32.519z"
            fill="#d71e00"
        />
        <Path
            d="M158.897 114.759a8.828 8.828 0 0 0 0-17.656h-35.31a8.828 8.828 0 0 0 0 17.656h35.31z"
            fill="#d71e00"
        />
    </Svg>
);
export default SvgComponent;
