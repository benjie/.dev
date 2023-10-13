import React, { FC } from "react";
import styles from "./Tldr.module.css";

export const Tldr: FC<{ children?: JSX.Element }> = ({ children }) => (
  <aside className={styles.tldr}>
    <div className={styles.inner}>{children}</div>
  </aside>
);
