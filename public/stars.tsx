export const Stars = (props: any) => {
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
        <clipPath id="a88137770c">
          <path
            d="M 459.445312 0 L 747.445312 0 L 747.445312 288 L 459.445312 288 Z M 459.445312 0 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b4134c3523">
          <path
            d="M 456.699219 456.699219 L 749.949219 456.699219 L 749.949219 749.949219 L 456.699219 749.949219 Z M 456.699219 456.699219 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="0a0a69f396">
          <path
            d="M 0 80.820312 L 594 80.820312 L 594 674.820312 L 0 674.820312 Z M 0 80.820312 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a88137770c)">
        <path
          fill={props.fill}
          d="M 606.964844 77.058594 C 607.183594 79.066406 607.488281 81.0625 607.875 83.046875 C 608.261719 85.027344 608.734375 86.992188 609.289062 88.933594 C 609.84375 90.878906 610.476562 92.796875 611.195312 94.683594 C 611.910156 96.574219 612.707031 98.429688 613.582031 100.253906 C 614.453125 102.074219 615.402344 103.855469 616.425781 105.597656 C 617.453125 107.339844 618.546875 109.035156 619.714844 110.683594 C 620.882812 112.335938 622.121094 113.929688 623.421875 115.476562 C 624.726562 117.019531 626.09375 118.507812 627.519531 119.9375 C 628.949219 121.363281 630.4375 122.730469 631.980469 124.035156 C 633.527344 125.335938 635.121094 126.574219 636.773438 127.742188 C 638.421875 128.910156 640.117188 130.003906 641.859375 131.03125 C 643.601562 132.054688 645.382812 133.003906 647.203125 133.875 C 649.027344 134.75 650.882812 135.546875 652.773438 136.261719 C 654.660156 136.980469 656.578125 137.613281 658.519531 138.167969 C 660.464844 138.722656 662.429688 139.195312 664.410156 139.582031 C 666.394531 139.972656 668.390625 140.273438 670.398438 140.496094 C 689.871094 142.628906 715.007812 144.007812 747.457031 144.007812 C 715.007812 144.007812 689.871094 145.386719 670.398438 147.519531 C 668.390625 147.738281 666.394531 148.042969 664.410156 148.429688 C 662.429688 148.820312 660.464844 149.289062 658.519531 149.84375 C 656.578125 150.398438 654.660156 151.035156 652.773438 151.75 C 650.882812 152.46875 649.027344 153.261719 647.203125 154.136719 C 645.382812 155.011719 643.601562 155.960938 641.859375 156.984375 C 640.117188 158.007812 638.421875 159.105469 636.773438 160.273438 C 635.121094 161.441406 633.527344 162.675781 631.980469 163.980469 C 630.4375 165.28125 628.949219 166.648438 627.519531 168.078125 C 626.09375 169.507812 624.726562 170.992188 623.421875 172.539062 C 622.121094 174.082031 620.882812 175.679688 619.714844 177.328125 C 618.546875 178.976562 617.453125 180.671875 616.425781 182.414062 C 615.402344 184.15625 614.453125 185.9375 613.582031 187.761719 C 612.707031 189.582031 611.910156 191.4375 611.195312 193.328125 C 610.476562 195.21875 609.84375 197.132812 609.289062 199.078125 C 608.734375 201.019531 608.261719 202.984375 607.875 204.96875 C 607.488281 206.949219 607.183594 208.945312 606.964844 210.957031 C 604.828125 230.429688 603.449219 255.5625 603.449219 288.011719 C 603.449219 255.5625 602.070312 230.429688 599.9375 210.957031 C 599.71875 208.945312 599.414062 206.949219 599.027344 204.96875 C 598.636719 202.984375 598.167969 201.019531 597.613281 199.078125 C 597.058594 197.132812 596.421875 195.21875 595.707031 193.328125 C 594.988281 191.4375 594.195312 189.582031 593.320312 187.761719 C 592.445312 185.9375 591.496094 184.15625 590.472656 182.414062 C 589.449219 180.671875 588.351562 178.976562 587.183594 177.328125 C 586.015625 175.679688 584.78125 174.082031 583.476562 172.539062 C 582.175781 170.992188 580.808594 169.507812 579.378906 168.078125 C 577.949219 166.648438 576.464844 165.28125 574.917969 163.980469 C 573.375 162.675781 571.777344 161.441406 570.128906 160.273438 C 568.480469 159.105469 566.785156 158.007812 565.042969 156.984375 C 563.300781 155.960938 561.519531 155.011719 559.695312 154.136719 C 557.875 153.261719 556.019531 152.46875 554.128906 151.75 C 552.238281 151.035156 550.320312 150.398438 548.378906 149.84375 C 546.4375 149.289062 544.472656 148.820312 542.488281 148.429688 C 540.507812 148.042969 538.511719 147.738281 536.5 147.519531 C 517.027344 145.386719 491.890625 144.007812 459.445312 144.007812 C 491.890625 144.007812 517.027344 142.628906 536.5 140.496094 C 538.511719 140.273438 540.507812 139.972656 542.488281 139.582031 C 544.472656 139.195312 546.4375 138.722656 548.378906 138.167969 C 550.320312 137.613281 552.238281 136.980469 554.128906 136.261719 C 556.019531 135.546875 557.875 134.75 559.695312 133.875 C 561.519531 133.003906 563.300781 132.054688 565.042969 131.03125 C 566.785156 130.003906 568.480469 128.910156 570.128906 127.742188 C 571.777344 126.574219 573.375 125.335938 574.917969 124.035156 C 576.464844 122.730469 577.949219 121.363281 579.378906 119.9375 C 580.808594 118.507812 582.175781 117.019531 583.476562 115.476562 C 584.78125 113.929688 586.015625 112.335938 587.183594 110.683594 C 588.351562 109.035156 589.449219 107.339844 590.472656 105.597656 C 591.496094 103.855469 592.445312 102.074219 593.320312 100.253906 C 594.195312 98.429688 594.988281 96.574219 595.707031 94.683594 C 596.421875 92.796875 597.058594 90.878906 597.613281 88.933594 C 598.167969 86.992188 598.636719 85.027344 599.027344 83.046875 C 599.414062 81.0625 599.71875 79.066406 599.9375 77.058594 C 602.070312 57.585938 603.449219 32.449219 603.449219 0 C 603.449219 32.449219 604.828125 57.585938 606.964844 77.058594 Z M 606.964844 77.058594 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#b4134c3523)">
        <path
          fill={props.fill}
          d="M 606.90625 535.160156 C 607.128906 537.207031 607.441406 539.238281 607.835938 541.257812 C 608.230469 543.277344 608.710938 545.277344 609.273438 547.253906 C 609.839844 549.234375 610.488281 551.183594 611.214844 553.109375 C 611.945312 555.03125 612.753906 556.921875 613.644531 558.777344 C 614.535156 560.632812 615.5 562.449219 616.542969 564.222656 C 617.585938 565.996094 618.703125 567.722656 619.890625 569.402344 C 621.082031 571.082031 622.339844 572.707031 623.667969 574.277344 C 624.992188 575.851562 626.382812 577.367188 627.839844 578.820312 C 629.292969 580.277344 630.808594 581.667969 632.382812 582.992188 C 633.953125 584.320312 635.578125 585.578125 637.257812 586.769531 C 638.9375 587.957031 640.664062 589.074219 642.4375 590.117188 C 644.210938 591.160156 646.027344 592.125 647.882812 593.015625 C 649.738281 593.90625 651.628906 594.714844 653.550781 595.445312 C 655.476562 596.175781 657.425781 596.820312 659.40625 597.386719 C 661.382812 597.949219 663.382812 598.429688 665.402344 598.824219 C 667.421875 599.222656 669.453125 599.53125 671.5 599.753906 C 691.328125 601.925781 716.921875 603.328125 749.960938 603.328125 C 716.921875 603.328125 691.328125 604.734375 671.5 606.90625 C 669.453125 607.128906 667.421875 607.441406 665.402344 607.835938 C 663.382812 608.230469 661.382812 608.710938 659.40625 609.273438 C 657.425781 609.839844 655.476562 610.488281 653.550781 611.214844 C 651.628906 611.945312 649.738281 612.753906 647.882812 613.644531 C 646.027344 614.535156 644.210938 615.5 642.4375 616.542969 C 640.664062 617.585938 638.9375 618.703125 637.257812 619.890625 C 635.578125 621.082031 633.953125 622.339844 632.382812 623.667969 C 630.808594 624.992188 629.292969 626.382812 627.839844 627.839844 C 626.382812 629.292969 624.992188 630.808594 623.667969 632.382812 C 622.339844 633.953125 621.082031 635.578125 619.890625 637.257812 C 618.703125 638.9375 617.585938 640.664062 616.542969 642.4375 C 615.5 644.210938 614.535156 646.027344 613.644531 647.882812 C 612.753906 649.738281 611.945312 651.628906 611.214844 653.550781 C 610.488281 655.476562 609.839844 657.425781 609.273438 659.40625 C 608.710938 661.382812 608.230469 663.382812 607.835938 665.402344 C 607.441406 667.421875 607.128906 669.453125 606.90625 671.5 C 604.734375 691.328125 603.328125 716.921875 603.328125 749.960938 C 603.328125 716.921875 601.925781 691.328125 599.753906 671.5 C 599.53125 669.453125 599.222656 667.421875 598.824219 665.402344 C 598.429688 663.382812 597.949219 661.382812 597.386719 659.40625 C 596.820312 657.425781 596.175781 655.476562 595.445312 653.550781 C 594.714844 651.628906 593.90625 649.738281 593.015625 647.882812 C 592.125 646.027344 591.160156 644.210938 590.117188 642.4375 C 589.074219 640.664062 587.957031 638.9375 586.769531 637.257812 C 585.578125 635.578125 584.320312 633.953125 582.992188 632.382812 C 581.667969 630.808594 580.277344 629.292969 578.820312 627.839844 C 577.367188 626.382812 575.851562 624.992188 574.277344 623.667969 C 572.707031 622.339844 571.082031 621.082031 569.402344 619.894531 C 567.722656 618.703125 565.996094 617.585938 564.222656 616.542969 C 562.449219 615.5 560.632812 614.535156 558.777344 613.644531 C 556.921875 612.753906 555.03125 611.945312 553.109375 611.214844 C 551.183594 610.488281 549.234375 609.839844 547.253906 609.273438 C 545.277344 608.710938 543.277344 608.230469 541.257812 607.835938 C 539.238281 607.441406 537.207031 607.128906 535.160156 606.90625 C 515.332031 604.734375 489.738281 603.328125 456.699219 603.328125 C 489.738281 603.328125 515.332031 601.925781 535.160156 599.753906 C 537.207031 599.53125 539.238281 599.222656 541.257812 598.824219 C 543.277344 598.429688 545.277344 597.949219 547.253906 597.386719 C 549.234375 596.820312 551.183594 596.175781 553.109375 595.445312 C 555.03125 594.714844 556.921875 593.90625 558.777344 593.015625 C 560.632812 592.125 562.449219 591.160156 564.222656 590.117188 C 565.996094 589.074219 567.722656 587.957031 569.402344 586.769531 C 571.082031 585.578125 572.707031 584.320312 574.277344 582.992188 C 575.851562 581.667969 577.367188 580.277344 578.820312 578.820312 C 580.277344 577.367188 581.667969 575.851562 582.992188 574.277344 C 584.320312 572.707031 585.578125 571.082031 586.769531 569.402344 C 587.957031 567.722656 589.074219 565.996094 590.117188 564.222656 C 591.160156 562.449219 592.125 560.632812 593.015625 558.777344 C 593.90625 556.921875 594.714844 555.03125 595.445312 553.109375 C 596.175781 551.183594 596.820312 549.234375 597.386719 547.253906 C 597.949219 545.277344 598.429688 543.277344 598.824219 541.257812 C 599.222656 539.238281 599.53125 537.207031 599.753906 535.160156 C 601.925781 515.332031 603.328125 489.738281 603.328125 456.699219 C 603.328125 489.738281 604.734375 515.332031 606.90625 535.160156 Z M 606.90625 535.160156 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#0a0a69f396)">
        <path
          fill={props.fill}
          d="M 297 674.820312 C 297 511.394531 163.425781 377.820312 0 377.820312 C 163.425781 377.820312 297 244.246094 297 80.820312 C 297 244.246094 430.574219 377.820312 594 377.820312 C 430.574219 377.820312 297 511.394531 297 674.820312 Z M 297 674.820312 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
