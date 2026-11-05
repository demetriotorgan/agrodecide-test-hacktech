// assets/weather-icons/RainIcon.jsx

const RainIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      className="clima-svg-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.36 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.36 10.04Z"
        fill="var(--color-primary)"
      />
      <path
        d="M8 22L7 24"
        stroke="var(--color-primary-light)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 22L11 24"
        stroke="var(--color-primary-light)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 22L15 24"
        stroke="var(--color-primary-light)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RainIcon;