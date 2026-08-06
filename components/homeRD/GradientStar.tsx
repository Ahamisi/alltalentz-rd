type GradientStarProps = {
  /** Unique gradient id — required so each star animates independently. */
  id: string;
  /** Phase offset (seconds) so a row of stars shimmers out of sync. */
  delay?: number;
  className?: string;
};

/**
 * The v26 gradient star, inlined so its fill gradient can animate.
 *
 * The gradient (userSpaceOnUse) spans wider than the 18px star, so slowly
 * translating it left/right drifts the FFAE34 → FF6B34 → FF0083 colour bands
 * across the shape — a subtle shimmer rather than a colour change. Pure SMIL,
 * no JS, GPU-cheap.
 */
const GradientStar = ({ id, delay = 0, className }: GradientStarProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M12.1323 5.12098L16.9819 5.83317C17.3889 5.901 17.728 6.17231 17.8637 6.57927C17.9993 6.95233 17.8976 7.3932 17.5924 7.66452L14.0653 11.1576L14.9132 16.109C14.981 16.516 14.8114 16.923 14.4723 17.1604C14.1332 17.4317 13.6923 17.4317 13.3192 17.2621L8.97828 14.9221L4.6034 17.2621C4.26426 17.4317 3.78947 17.4317 3.48425 17.1604C3.14511 16.923 2.97554 16.516 3.04337 16.109L3.8573 11.1576L0.330264 7.66452C0.0250404 7.3932 -0.076701 6.95233 0.0589542 6.57927C0.194609 6.17231 0.533747 5.901 0.940712 5.83317L5.8243 5.12098L7.99478 0.610448C8.16435 0.237396 8.5374 0 8.97828 0C9.38524 0 9.7583 0.237396 9.92786 0.610448L12.1323 5.12098Z"
      fill={`url(#${id})`}
    />
    <defs>
      <linearGradient
        id={id}
        x1="1.51976"
        y1="1.12962"
        x2="25.4512"
        y2="1.74554"
        gradientUnits="userSpaceOnUse"
      >
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          values="-7 0; 7 0; -7 0"
          keyTimes="0; 0.5; 1"
          calcMode="spline"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          dur="5s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <stop stopColor="#FFAE34" />
        <stop offset="0.500947" stopColor="#FF6B34" />
        <stop offset="1" stopColor="#FF0083" />
      </linearGradient>
    </defs>
  </svg>
);

export default GradientStar;
