import { H1, styled, View } from "tamagui";

export const Wrapper = styled(View, {
  position: "relative",
  self: "center",
});

const sharedTextStyle = {
  text: "center",
  textTransform: "uppercase",
  fontWeight: "900",
  fontStyle: "italic",
  letterSpacing: 1,
  lineHeight: 38,
} as const;

export const OutlineLayer = styled(H1, {
  ...sharedTextStyle,
  position: "absolute",
  inset: 0,
  color: "black",
});

export const FillLayer = styled(H1, {
  ...sharedTextStyle,
  color: "white",
});
