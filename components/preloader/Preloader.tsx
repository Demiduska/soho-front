import { FC, useEffect, useState } from "react";

import styles from "./Preloader.module.scss";

import preloaderImage from "../../public/images/preloader.svg";
import classNames from "classnames";
import Image from "next/image";

export const Preloader: FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 10); // Change the interval to control the speed of the loading line
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__image}>
        <Image
          src={"/images/preloader.svg"}
          width={192}
          height={70}
          quality={100}
          alt={"preloader"}
        />
        {/*<PreloaderImage />*/}
      </div>
      <div className={styles.preloader__progress}>Loading {progress}%</div>
      <div className={styles.preloader__bar} />
      <div
        className={classNames(
          styles.preloader__bar_active,
          "preloader__bar_active"
        )}
      />
      <div className={classNames(styles.preloader__dot, "preloader__dot")} />
      <style jsx>{`
        .preloader__bar_active {
          width: ${progress}%;
        }
        .preloader__dot {
          left: ${progress}%;
        }
      `}</style>
    </div>
  );
};
