export const Play = (props: any) => {
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
        <clipPath id="707cc4053c">
          <path d="M 93.75 0 L 656.25 0 L 656.25 750 L 93.75 750 Z M 93.75 0 " clipRule="nonzero" />
        </clipPath>
      </defs>
      <g clipPath="url(#707cc4053c)">
        <path
          fill={props.fill}
          d="M 144.035156 749.511719 C 160.40625 749.511719 179.117188 742.496094 198.414062 729.046875 L 614.734375 444.289062 C 641.632812 426.164062 656.25 401.019531 656.25 374.707031 C 656.25 348.394531 641.632812 323.253906 614.734375 305.125 L 199 20.367188 C 179.703125 6.917969 160.40625 0.488281 144.035156 0.488281 C 113.046875 0.488281 93.75 25.628906 93.75 67.144531 L 93.75 682.855469 C 93.75 724.371094 113.046875 749.511719 144.035156 749.511719 Z M 144.035156 749.511719 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
