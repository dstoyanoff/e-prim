import { css, Global, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
  const { palette } = useTheme();

  return (
    <Global
      styles={css({
        body: {
          margin: 0,
          padding: 0,
          background: palette.neutral[7],
          color: palette.neutral[0],
          width: "100vh",
        },
      })}
    />
  );
};
