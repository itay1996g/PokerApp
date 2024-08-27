import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
    <Svg width={800} height={800} viewBox="0 0 512 512" {...props}>
        <Path
            d="M423.724 0H88.276c-9.754 0-17.655 7.901-17.655 17.655v476.69c0 9.754 7.901 17.655 17.655 17.655h335.448c9.754 0 17.655-7.901 17.655-17.655V17.655c0-9.754-7.9-17.655-17.655-17.655"
            fill="#e6eef4"
        />
        <Path d="M282.482 370.759c0 21.91 6.047 43.82 8.13 50.732.344 1.139-.521 2.233-1.704 2.233h-65.827c-1.183 0-2.039-1.095-1.704-2.225 2.074-6.947 8.139-29.096 8.139-50.741-8.722 6.321-18.803 9.578-29.917 9.578-32.274 0-60.275-27.101-58.253-59.78 1.13-18.379 12.835-34.145 28.425-43.926 15.651-9.825 30.164-10.611 43.14-7.459-8.298-9.825-13.312-22.502-13.312-36.361 0-34.834 31.576-62.296 67.663-55.314 22.59 4.361 40.545 22.925 44.332 45.612 2.948 17.602-2.304 33.986-12.5 46.062 13.065-3.169 27.692-2.348 43.467 7.662 15.519 9.852 27.18 25.582 28.248 43.926 1.889 32.591-26.2 59.577-58.403 59.577-10.962.002-21.361-3.388-29.924-9.576M123.587 97.103c19.503 0 35.31-15.808 35.31-35.31s-15.808-35.31-35.31-35.31a35.17 35.17 0 0 0-11.778 2.017c-5.252 1.849-9.826 5.02-14.202 9.396a8.828 8.828 0 0 0 12.484 12.484c2.652-2.652 5.113-4.358 7.6-5.234a17.532 17.532 0 0 1 5.896-1.008c9.752 0 17.655 7.903 17.655 17.655s-7.903 17.655-17.655 17.655h-8.801a8.828 8.828 0 0 0 0 17.656h8.801z" />
        <Path d="M123.589 150.067c19.503 0 35.31-15.808 35.31-35.31s-15.808-35.31-35.31-35.31h-8.828a8.828 8.828 0 0 0 0 17.656h8.828c9.752 0 17.655 7.903 17.655 17.655s-7.903 17.655-17.655 17.655c-4.808 0-9.446-2.183-13.47-6.207a8.828 8.828 0 0 0-12.484 12.484c7.15 7.15 16.133 11.377 25.954 11.377z" />
    </Svg>
);
export default SvgComponent;
