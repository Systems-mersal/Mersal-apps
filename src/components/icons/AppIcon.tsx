import React from "react";
import { Image, type ImageSourcePropType } from "react-native";
import Svg, { Circle, Line, Path, Polyline, Rect } from "react-native-svg";

export type AppIconName =
  | "home"
  | "search"
  | "calendar"
  | "heart"
  | "user"
  | "bell"
  | "star"
  | "chevron-left"
  | "chevron-right"
  | "sliders"
  | "map-pin"
  | "apple"
  | "x"
  | "check"
  | "clock"
  | "shield"
  | "compass"
  | "plus";

export interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  source?: ImageSourcePropType;
}

const ICON_PATHS: Record<AppIconName, React.ReactNode> = {
  home: (
    <>
      <Path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  search: (
    <>
      <Circle cx={11} cy={11} r={7} strokeWidth={2} />
      <Line x1={16.5} y1={16.5} x2={21} y2={21} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <Rect x={3} y={5} width={18} height={16} rx={2} strokeWidth={2} />
      <Line x1={3} y1={10} x2={21} y2={10} strokeWidth={2} />
      <Line x1={8} y1={3} x2={8} y2={7} strokeWidth={2} strokeLinecap="round" />
      <Line x1={16} y1={3} x2={16} y2={7} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  heart: (
    <Path
      d="M12 20.5s-7-4.6-7-10a4 4 0 0 1 7-2.2A4 4 0 0 1 19 10.5c0 5.4-7 10-7 10z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  user: (
    <>
      <Path
        d="M20 21a8 8 0 0 0-16 0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={8} r={4} strokeWidth={2} />
    </>
  ),
  bell: (
    <>
      <Path
        d="M18 16H6l1.2-1.5A4 4 0 0 0 8 11V8a4 4 0 1 1 8 0v3a4 4 0 0 0 .8 3.5L18 16z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 19a2 2 0 0 0 4 0" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  star: (
    <Path
      d="M12 3l2.4 5.2L20 9l-4 3.8L17 19l-5-2.8L7 19l1-6.2L4 9l5.6-.8L12 3z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "chevron-left": (
    <Polyline
      points="15 6 9 12 15 18"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "chevron-right": (
    <Polyline
      points="9 6 15 12 9 18"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sliders: (
    <>
      <Line x1={4} y1={6} x2={20} y2={6} strokeWidth={2} strokeLinecap="round" />
      <Line x1={4} y1={12} x2={20} y2={12} strokeWidth={2} strokeLinecap="round" />
      <Line x1={4} y1={18} x2={20} y2={18} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={8} cy={6} r={2} fill="currentColor" stroke="none" />
      <Circle cx={16} cy={12} r={2} fill="currentColor" stroke="none" />
      <Circle cx={10} cy={18} r={2} fill="currentColor" stroke="none" />
    </>
  ),
  "map-pin": (
    <>
      <Path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={11} r={2.5} strokeWidth={2} />
    </>
  ),
  apple: (
    <Path
      d="M16.5 8.5c-.2-2.1 1.4-3.9 1.6-4.1-1.5-.9-3.4-.8-4.1-.7-1-.1-2.2.6-2.8.6s-1.5-.6-2.5-.6c-1.3.1-2.5.8-3.2 2-1.4 2.4-.4 6 1 8  .7 1 1.5 2.1 2.6 2.1 1 0 1.4-.6 2.6-.6s1.5.6 2.5.6c1.1 0 1.9-1 2.6-2.1.8-1.2 1.1-2.4 1.1-2.5-.1 0-2.2-.8-2.2-3.2zM14 4c.6-.7 1-1.7.9-2.7-1 .1-2.2.7-2.9 1.5-.6.7-1.1 1.8-.9 2.8 1 .1 2.1-.5 2.9-1.6z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  x: (
    <>
      <Path
        d="M4 4l16 16M20 4L4 20"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  check: (
    <Polyline
      points="4 12 10 18 20 6"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  clock: (
    <>
      <Circle cx={12} cy={12} r={9} strokeWidth={2} />
      <Polyline
        points="12 7 12 12 16 14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  shield: (
    <Path
      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  compass: (
    <>
      <Circle cx={12} cy={12} r={9} strokeWidth={2} />
      <Path
        d="M14.5 9.5L10 14l4.5-4.5L14.5 9.5z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  plus: (
    <>
      <Line x1={12} y1={5} x2={12} y2={19} strokeWidth={2} strokeLinecap="round" />
      <Line x1={5} y1={12} x2={19} y2={12} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
};

export function AppIcon({ name, size = 24, color = "#1f2937", source }: AppIconProps) {
  if (source) {
    return (
      <Image
        source={source}
        style={{ width: size, height: size, tintColor: color }}
        resizeMode="contain"
      />
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
      {ICON_PATHS[name]}
    </Svg>
  );
}
