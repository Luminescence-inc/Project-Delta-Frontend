// @ts-ignore
import * as React from "react";
import {} from "react";
import { SvgIconProps } from "./icon.types";
import IconMarkup from "./defaultMarkup";

export const CtaArrow = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.0893 9.81429C2.7565 9.86011 2.5 10.1496 2.5 10.4999C2.5 10.8821 2.80526 11.1918 3.18182 11.1918H15.1666L10.8372 15.5678L10.7711 15.6453C10.5725 15.9157 10.5937 16.3002 10.8352 16.5463C11.101 16.8171 11.5327 16.818 11.7995 16.5483L17.2897 10.9997C17.3225 10.9679 17.3521 10.9328 17.378 10.895C17.5639 10.6248 17.5377 10.2499 17.2994 10.0092L11.7994 4.45161L11.7228 4.38478C11.4555 4.18438 11.0767 4.20754 10.8352 4.45372C10.5695 4.72452 10.5704 5.16262 10.8373 5.43226L15.1677 9.80797H3.18182L3.0893 9.81429Z"
      fill="white"
    />
  </IconMarkup>
);

export const SearchIcon = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconMarkup>
);

export const SearchIcon2 = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconMarkup>
);

export const Menu = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <line
      x1="0.75"
      y1="1.25"
      x2="19.25"
      y2="1.25"
      stroke="#0E2D52"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="0.75"
      y1="8.25"
      x2="19.25"
      y2="8.25"
      stroke="#0E2D52"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </IconMarkup>
);

export const Cancel = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <line
      x1="1.0581"
      y1="2.92458"
      x2="15.0366"
      y2="15.0428"
      stroke="#0E2D52"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="0.988932"
      y1="14.9394"
      x2="13.9336"
      y2="1.7225"
      stroke="#0E2D52"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </IconMarkup>
);

export const ArrowUp = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.70734 0.293024C7.51981 0.105553 7.26551 0.000236988 7.00034 0.000236988C6.73518 0.000236988 6.48087 0.105553 6.29334 0.293024L0.636343 5.95002C0.540833 6.04227 0.464651 6.15261 0.412242 6.27462C0.359833 6.39662 0.332246 6.52784 0.331092 6.66062C0.329939 6.7934 0.355241 6.92508 0.405521 7.04798C0.455802 7.17087 0.530055 7.28253 0.623948 7.37642C0.717841 7.47031 0.829492 7.54456 0.952389 7.59485C1.07529 7.64513 1.20696 7.67043 1.33974 7.66927C1.47252 7.66812 1.60374 7.64053 1.72575 7.58812C1.84775 7.53572 1.9581 7.45953 2.05034 7.36402L7.00034 2.41402L11.9503 7.36402C12.1389 7.54618 12.3915 7.64698 12.6537 7.6447C12.9159 7.64242 13.1668 7.53725 13.3522 7.35184C13.5376 7.16643 13.6427 6.91562 13.645 6.65342C13.6473 6.39123 13.5465 6.13863 13.3643 5.95002L7.70734 0.293024Z"
      fill="black"
    />
  </IconMarkup>
);

export const Edit = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </IconMarkup>
);

export const Plus = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M19.5 11H13.5V5C13.5 4.73478 13.3946 4.48043 13.2071 4.29289C13.0196 4.10536 12.7652 4 12.5 4C12.2348 4 11.9804 4.10536 11.7929 4.29289C11.6054 4.48043 11.5 4.73478 11.5 5V11H5.5C5.23478 11 4.98043 11.1054 4.79289 11.2929C4.60536 11.4804 4.5 11.7348 4.5 12C4.5 12.2652 4.60536 12.5196 4.79289 12.7071C4.98043 12.8946 5.23478 13 5.5 13H11.5V19C11.5 19.2652 11.6054 19.5196 11.7929 19.7071C11.9804 19.8946 12.2348 20 12.5 20C12.7652 20 13.0196 19.8946 13.2071 19.7071C13.3946 19.5196 13.5 19.2652 13.5 19V13H19.5C19.7652 13 20.0196 12.8946 20.2071 12.7071C20.3946 12.5196 20.5 12.2652 20.5 12C20.5 11.7348 20.3946 11.4804 20.2071 11.2929C20.0196 11.1054 19.7652 11 19.5 11Z" />
  </IconMarkup>
);
export const AddMore = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91005 10.0899 0 6.5 0C2.91005 0 0 2.91005 0 6.5C0 10.0899 2.91005 13 6.5 13ZM5.85 3.9C5.85 3.72761 5.91848 3.56228 6.04038 3.44038C6.16228 3.31848 6.32761 3.25 6.5 3.25C6.67239 3.25 6.83772 3.31848 6.95962 3.44038C7.08152 3.56228 7.15 3.72761 7.15 3.9V5.85H9.1C9.27239 5.85 9.43772 5.91848 9.55962 6.04038C9.68152 6.16228 9.75 6.32761 9.75 6.5C9.75 6.67239 9.68152 6.83772 9.55962 6.95962C9.43772 7.08152 9.27239 7.15 9.1 7.15H7.15V9.1C7.15 9.27239 7.08152 9.43772 6.95962 9.55962C6.83772 9.68152 6.67239 9.75 6.5 9.75C6.32761 9.75 6.16228 9.68152 6.04038 9.55962C5.91848 9.43772 5.85 9.27239 5.85 9.1V7.15H3.9C3.72761 7.15 3.56228 7.08152 3.44038 6.95962C3.31848 6.83772 3.25 6.67239 3.25 6.5C3.25 6.32761 3.31848 6.16228 3.44038 6.04038C3.56228 5.91848 3.72761 5.85 3.9 5.85H5.85V3.9Z" fill="#0E2D52"/>
  </IconMarkup>
);

export const AddMoreClose = (props: SvgIconProps) => (
  <IconMarkup {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10ZM6.97 6.97C7.11063 6.82955 7.30125 6.75066 7.5 6.75066C7.69875 6.75066 7.88937 6.82955 8.03 6.97L10 8.94L11.97 6.97C12.1122 6.83752 12.3002 6.7654 12.4945 6.76882C12.6888 6.77225 12.8742 6.85097 13.0116 6.98838C13.149 7.12579 13.2277 7.31118 13.2312 7.50548C13.2346 7.69978 13.1625 7.88783 13.03 8.03L11.06 10L13.03 11.97C13.1625 12.1122 13.2346 12.3002 13.2312 12.4945C13.2277 12.6888 13.149 12.8742 13.0116 13.0116C12.8742 13.149 12.6888 13.2277 12.4945 13.2312C12.3002 13.2346 12.1122 13.1625 11.97 13.03L10 11.06L8.03 13.03C7.88783 13.1625 7.69978 13.2346 7.50548 13.2312C7.31118 13.2277 7.12579 13.149 6.98838 13.0116C6.85097 12.8742 6.77225 12.6888 6.76882 12.4945C6.7654 12.3002 6.83752 12.1122 6.97 11.97L8.94 10L6.97 8.03C6.82955 7.88937 6.75066 7.69875 6.75066 7.5C6.75066 7.30125 6.82955 7.11063 6.97 6.97Z" fill="black"/>
  </IconMarkup>
);

export const Phone = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </IconMarkup>
);
export const Share = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M12.1875 10.375C11.2614 10.375 10.4385 10.8251 9.92569 11.5178L5.511 9.26175C5.58506 9.01013 5.625 8.74403 5.625 8.46875C5.625 8.09591 5.55191 7.73987 5.41956 7.41397L10.0464 4.63403C10.5627 5.23997 11.3309 5.625 12.1875 5.625C13.7383 5.625 15 4.36331 15 2.8125C15 1.26169 13.7383 0 12.1875 0C10.6367 0 9.375 1.26169 9.375 2.8125C9.375 3.17094 9.44253 3.51384 9.56531 3.82938L4.92688 6.61625C4.411 6.02819 3.65441 5.65625 2.8125 5.65625C1.26169 5.65625 0 6.91794 0 8.46875C0 10.0196 1.26169 11.2812 2.8125 11.2812C3.75381 11.2812 4.5885 10.8164 5.09928 10.1042L9.50116 12.3537C9.41919 12.6173 9.375 12.8973 9.375 13.1875C9.375 14.7383 10.6367 16 12.1875 16C13.7383 16 15 14.7383 15 13.1875C15 11.6367 13.7383 10.375 12.1875 10.375ZM12.1875 0.9375C13.2214 0.9375 14.0625 1.77863 14.0625 2.8125C14.0625 3.84637 13.2214 4.6875 12.1875 4.6875C11.1536 4.6875 10.3125 3.84637 10.3125 2.8125C10.3125 1.77863 11.1536 0.9375 12.1875 0.9375ZM2.8125 10.3438C1.77863 10.3438 0.9375 9.50262 0.9375 8.46875C0.9375 7.43488 1.77863 6.59375 2.8125 6.59375C3.84637 6.59375 4.6875 7.43488 4.6875 8.46875C4.6875 9.50262 3.84637 10.3438 2.8125 10.3438ZM12.1875 15.0625C11.1536 15.0625 10.3125 14.2214 10.3125 13.1875C10.3125 12.1536 11.1536 11.3125 12.1875 11.3125C13.2214 11.3125 14.0625 12.1536 14.0625 13.1875C14.0625 14.2214 13.2214 15.0625 12.1875 15.0625Z" fill="#0E2D52"/>
  </IconMarkup>
);

export const Mail = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconMarkup>
);

export const Facebook = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      d="M13.2281 14.625L13.9375 10H9.5V7C9.5 5.73438 10.1188 4.5 12.1063 4.5H14.125V0.5625C14.125 0.5625 12.2938 0.25 10.5438 0.25C6.8875 0.25 4.5 2.46563 4.5 6.475V10H0.4375V14.625H4.5V25.8062C5.31563 25.9344 6.15 26 7 26C7.85 26 8.68437 25.9344 9.5 25.8062V14.625H13.2281Z"
      //   fill="#0E2D52"
    />
  </IconMarkup>
);

export const Instagram = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </IconMarkup>
);

export const Globe = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </IconMarkup>
);

export const LinkedIn = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </IconMarkup>
);

export const Twitter = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      d="M10.0346 6.3665L15.5832 0.416504H14.1666L9.39711 5.5165L5.66656 0.416504H0.944336L6.75267 8.34984L0.944336 14.5832H2.361L7.39017 9.19984L11.3332 14.5832H16.0554L10.0346 6.3665ZM3.04572 1.36095H4.93461L13.9304 13.6387H12.0416L3.04572 1.36095Z"
      //   fill="#0E2D52"
    />
  </IconMarkup>
);
export const Tiktok = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M8.66667 4.49683V9.3335C8.66647 10.2335 8.38603 11.1112 7.86429 11.8445C7.34255 12.5779 6.6054 13.1306 5.7552 13.426C4.905 13.7213 3.98394 13.7445 3.11992 13.4925C2.2559 13.2405 1.49179 12.7257 0.93369 12.0196C0.375594 11.3135 0.0512084 10.4511 0.00557524 9.55224C-0.0400579 8.65337 0.195326 7.76259 0.679044 7.0036C1.16276 6.24461 1.87081 5.65506 2.70486 5.31683C3.53892 4.9786 4.4576 4.90846 5.33333 5.11616V7.22483C4.87655 7.00816 4.36174 6.94571 3.8664 7.04688C3.37105 7.14805 2.92197 7.40737 2.58673 7.78581C2.2515 8.16426 2.04825 8.64134 2.00757 9.14528C1.96689 9.64921 2.09098 10.1527 2.36118 10.58C2.63137 11.0073 3.03305 11.3353 3.50575 11.5147C3.97845 11.694 4.49661 11.7149 4.98224 11.5743C5.46786 11.4337 5.89469 11.1392 6.19847 10.7351C6.50226 10.3309 6.66656 9.83907 6.66667 9.3335V0.333496H8.66667C8.66667 1.21755 9.01786 2.0654 9.64298 2.69052C10.2681 3.31564 11.1159 3.66683 12 3.66683V5.66683C10.7879 5.66865 9.61171 5.25579 8.66667 4.49683Z" fill="black"/>
  </IconMarkup>
);

export const ChevronRight = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconMarkup>
);

export const ChevronLeft = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconMarkup>
);

export const ChevronDown = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="m6 9 6 6 6-6" />
  </IconMarkup>
);

export const LocationMarker = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.18799 5.375C5.46424 5.375 4.87549 5.96375 4.87549 6.68825C4.87549 7.412 5.46424 8 6.18799 8C6.91174 8 7.50049 7.412 7.50049 6.68825C7.50049 5.96375 6.91174 5.375 6.18799 5.375ZM6.18799 9.125C4.84399 9.125 3.75049 8.03225 3.75049 6.68825C3.75049 5.3435 4.84399 4.25 6.18799 4.25C7.53199 4.25 8.62549 5.3435 8.62549 6.68825C8.62549 8.03225 7.53199 9.125 6.18799 9.125Z"
      fill="#0E2D52"
    />
    <mask
      id="mask0_1144_3457"
      //   style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="13"
      height="16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.5H12.3746V15.125H0V0.5Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_1144_3457)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.18701 1.625C3.39551 1.625 1.12451 3.91775 1.12451 6.73475C1.12451 10.319 5.34251 13.811 6.18701 13.997C7.03151 13.8103 11.2495 10.3182 11.2495 6.73475C11.2495 3.91775 8.97851 1.625 6.18701 1.625ZM6.18701 15.125C4.84151 15.125 -0.000488281 10.961 -0.000488281 6.73475C-0.000488281 3.29675 2.77526 0.5 6.18701 0.5C9.59876 0.5 12.3745 3.29675 12.3745 6.73475C12.3745 10.961 7.53251 15.125 6.18701 15.125Z"
        fill="#0E2D52"
      />
    </g>
  </IconMarkup>
);

export const Calendar = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </IconMarkup>
);

export const ClosedEye = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </IconMarkup>
);

export const Eye = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconMarkup>
);

export const Loader = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
      stroke="white"
    />
  </IconMarkup>
);

export const CircleUser = (props: SvgIconProps) => (
  <IconMarkup {...props}>
      <path d="M10.0001 1.66699C5.40008 1.66699 1.66675 5.40033 1.66675 10.0003C1.66675 14.6003 5.40008 18.3337 10.0001 18.3337C14.6001 18.3337 18.3334 14.6003 18.3334 10.0003C18.3334 5.40033 14.6001 1.66699 10.0001 1.66699ZM10.0001 4.16699C11.3834 4.16699 12.5001 5.28366 12.5001 6.66699C12.5001 8.05033 11.3834 9.16699 10.0001 9.16699C8.61675 9.16699 7.50008 8.05033 7.50008 6.66699C7.50008 5.28366 8.61675 4.16699 10.0001 4.16699ZM10.0001 16.0003C9.00997 16.0003 8.03524 15.7553 7.16281 15.2871C6.29039 14.8189 5.5474 14.1421 5.00008 13.317C5.02508 11.6587 8.33342 10.7503 10.0001 10.7503C11.6584 10.7503 14.9751 11.6587 15.0001 13.317C14.4528 14.1421 13.7098 14.8189 12.8373 15.2871C11.9649 15.7553 10.9902 16.0003 10.0001 16.0003Z" fill="black"/>
  </IconMarkup>
);

export const EmptyCart = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      d="M14.1075 16.1143C15.2154 16.1143 16.1118 17.0207 16.1118 18.1286C16.1118 19.2364 15.2154 20.1428 14.1075 20.1428C12.9997 20.1428 12.0933 19.2364 12.0933 18.1286C12.0933 17.0207 12.9997 16.1143 14.1075 16.1143ZM20.1504 1.00714C20.1504 1.56107 19.6972 2.01428 19.1432 2.01428H18.1361L14.5104 9.65849L15.87 12.1159C16.6053 13.4655 15.6384 15.1071 14.1075 15.1071H3.02898C2.47505 15.1071 2.02184 14.6539 2.02184 14.1C2.02184 13.5461 2.47505 13.0928 3.02898 13.0928H14.1075L12.9997 11.0786H5.49648C4.74112 11.0786 4.07641 10.6656 3.73398 10.0412L0.128412 3.50485C-0.24423 2.84014 0.239197 2.01428 1.00462 2.01428H15.9103L16.5851 0.574071C16.7463 0.221571 17.1088 0 17.4915 0H19.1432C19.6972 0 20.1504 0.453214 20.1504 1.00714ZM4.03612 16.1143C5.14398 16.1143 6.04033 17.0207 6.04033 18.1286C6.04033 19.2364 5.14398 20.1428 4.03612 20.1428C2.92826 20.1428 2.02184 19.2364 2.02184 18.1286C2.02184 17.0207 2.92826 16.1143 4.03612 16.1143Z"
      fill="#9090A7"
    />
  </IconMarkup>
);

export const Bag = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path
      d="M13 16H11C10.45 16 10 15.55 10 15H3.01V19C3.01 20.1 3.91 21 5.01 21H19C20.1 21 21 20.1 21 19V15H14C14 15.55 13.55 16 13 16ZM20 7H16C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7H4C2.9 7 2 7.9 2 9V12C2 13.11 2.89 14 4 14H10V13C10 12.45 10.45 12 11 12H13C13.55 12 14 12.45 14 13V14H20C21.1 14 22 13.1 22 12V9C22 7.9 21.1 7 20 7ZM10 7C10 5.9 10.9 5 12 5C13.1 5 14 5.9 14 7H9.99H10Z"
      fill="#85B6FF"
    />
  </IconMarkup>
);

export const X = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconMarkup>
);

export const ArrowBigUpDash = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </IconMarkup>
);

export const MapPin = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconMarkup>
);

export const Headset = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
    <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
  </IconMarkup>
);

export const Filter = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </IconMarkup>
);

export const TriangleAlert = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </IconMarkup>
);

export const Info = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </IconMarkup>
);

export const User = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconMarkup>
);
