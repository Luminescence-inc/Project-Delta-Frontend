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

export const Phone = (props: SvgIconProps) => (
  <IconMarkup {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
    <path
      d="M9.00008 0.666687C4.40008 0.666687 0.666748 4.40002 0.666748 9.00002C0.666748 13.6 4.40008 17.3334 9.00008 17.3334C13.6001 17.3334 17.3334 13.6 17.3334 9.00002C17.3334 4.40002 13.6001 0.666687 9.00008 0.666687ZM9.00008 3.16669C10.3834 3.16669 11.5001 4.28335 11.5001 5.66669C11.5001 7.05002 10.3834 8.16669 9.00008 8.16669C7.61675 8.16669 6.50008 7.05002 6.50008 5.66669C6.50008 4.28335 7.61675 3.16669 9.00008 3.16669ZM9.00008 15C8.00997 15 7.03524 14.755 6.16281 14.2868C5.29039 13.8186 4.5474 13.1418 4.00008 12.3167C4.02508 10.6584 7.33342 9.75002 9.00008 9.75002C10.6584 9.75002 13.9751 10.6584 14.0001 12.3167C13.4528 13.1418 12.7098 13.8186 11.8373 14.2868C10.9649 14.755 9.9902 15 9.00008 15Z"
      fill="black"
    />
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
