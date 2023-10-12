import React, { FC } from "react";
import styles from "./Pullquote.module.css";

export const Pullquote: FC<{ children?: JSX.Element }> = ({ children }) => (
  <aside className={styles.pullquote}>
    <blockquote>{children}</blockquote>
  </aside>
);
