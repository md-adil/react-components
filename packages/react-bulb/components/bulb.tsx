import React, { CSSProperties } from "react";
import Color from "color";

type Styles = Record<string, CSSProperties>;

export interface BulbProps {
  size?: number;
  reflection?: number;
  color?: string;
  state?: boolean;
  degree?: number;
  ring?: number;
}

export function Bulb(props: BulbProps) {
  const { size, color = "#ffff54", state: isOn } = props;
  const styles: Styles = {
    container: { width: size, position: "relative" },
    light: {
      position: "relative",
      height: size,
      width: size,
      borderRadius: "60%",
      backgroundColor: "#d6d6d6",
    },
    glow: {
      background: "rgba(255,255,255,0.3)",
      position: "absolute",
      transform: "translate(-50%,-50%)",
      top: "40%",
      left: "50%",
      width: "30%",
      height: "30%",
      borderRadius: "50%",
      filter: `blur(${size! * 0.07}px)`,
    },
  };
  if (isOn) {
    const boxShadow = `0px 0px ${size! * 0.2}px ${size! * 0.05}px ${Color(
      color
    ).fade(0.5)}`;
    Object.assign(styles.light, {
      boxShadow,
      backgroundColor: color,
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.light}>
        {isOn && <Reflections {...props} />}
        <div style={styles.glow} />
      </div>
      <Holder size={size!} ring={props.ring} />
    </div>
  );
}

interface IHolderProps {
  size: number;
  ring?: number;
}
function Holder({ size, ring = 3 }: IHolderProps) {
  const r = size * 0.05;
  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stand: {
      backgroundColor: "#6f6f6f",
      width: "50%",
      zIndex: 1000,
      marginTop: size * -0.06,
      borderRadius: 7,
    },
    ring: {
      backgroundColor: "#b9b9b9",
      width: "110%",
      margin: `${size * 0.03}px -5%`,
      height: r,
      borderRadius: size * 0.1,
    },
    knob: {
      height: r,
      width: "25%",
      background: "#2a2a2e",
      marginTop: 0,
      borderRadius: `0 0 ${r}px ${r}px`,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.stand}>
        {range(ring).map((i) => (
          <div key={i} style={styles.ring}></div>
        ))}
      </div>
      <div style={styles.knob}></div>
    </div>
  );
}

interface IReflectionProps extends BulbProps {}

function Reflections({
  reflection = 12,
  degree = 280,
  color,
  size,
}: IReflectionProps) {
  const styles: Styles = {
    line: {
      height: 1,
      width: "20%",
      position: "absolute",
      top: "50%",
      background: color,
      left: "39%",
      zIndex: -1,
    },
  };
  const array = [...new Array(reflection)];
  return (
    <>
      {array.map((_, i) => (
        <div
          style={{
            ...styles.line,
            transform: `rotate(${
              (i * degree) / reflection + (360 - degree) * 1.75
            }deg) translateX(${size! * 0.7}px)`,
          }}
          key={i}
        />
      ))}
    </>
  );
}

function range(i: number) {
  return Array(i)
    .fill("")
    .map((_, i) => i);
}

Bulb.defaultProps = {
    size: 120
}