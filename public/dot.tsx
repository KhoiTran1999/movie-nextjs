export const Dot = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1000"
      zoomAndPan="magnify"
      viewBox="0 0 750 749.999995"
      height="1000"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
      {...props}
    >
      <defs>
        <clipPath id="6a5541b212">
          <path
            d="M 0 0 L 747.75 0 L 747.75 747.75 L 0 747.75 Z M 0 0 "
            clip-rule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#6a5541b212)">
        <path
          fill="red"
          d="M 747.75 373.875 C 747.75 580.320312 580.320312 747.75 373.875 747.75 C 167.429688 747.75 0 580.320312 0 373.875 C 0 167.429688 167.429688 0 373.875 0 C 580.320312 0 747.75 167.429688 747.75 373.875 Z M 747.75 373.875 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
