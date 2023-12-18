import React, { FC, useEffect, useRef, useState } from "react";
import { Heading } from "../../utils/api/types";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { localization } from "../../utils/localization";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./SidebarTOC.module.scss";

import ChevronDown from "../../public/images/icons/chevron-down.svg";

interface SidebarTOCProps {
  items: Heading[];
}

export const SidebarTOC: FC<SidebarTOCProps> = ({ items }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [sidebarFixed, setSidebarFixed] = useState<boolean>(false);
  const [width, height] = useWindowSize();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const variants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    router.push(`#${id}`, undefined, { shallow: true });
    const element = document.getElementById(id);
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const visibleHeadings = items.filter(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
      });
      if (visibleHeadings.length > 0) {
        setActiveHeading(visibleHeadings[0].id);
        // router.replace(`#${visibleHeadings[0].id}`, undefined, {
        //   shallow: true,
        // });
      } else {
        setActiveHeading("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  useEffect(() => {
    const contentElement = document.getElementById("content");

    const handleScroll = () => {
      if (contentElement && contentElement.getBoundingClientRect().top < 0) {
        setSidebarFixed(true);
      } else {
        setSidebarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const { asPath } = router;
    const hash = new URL(asPath, process.env.NEXT_PUBLIC_FRONTEND_URL).hash;
    const id = decodeURI(hash.substring(1));
    const element = document.getElementById(id);
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [router, items]);

  return (
    <div ref={sidebarRef} className={classNames(styles.sidebar)}>
      {width <= endpoints.md && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            styles.sidebar__button,
            isOpen && styles.sidebar__button_open
          )}
        >
          {localization[locale].tableOfContent}{" "}
          <ChevronDown width={20} height={20} />
        </button>
      )}
      <AnimatePresence initial={true}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.8 }}
          >
            <ul className={classNames(sidebarFixed && styles.sidebar__fixed)}>
              {items.map(({ id, text, image }, index) => (
                <li
                  className={classNames(
                    activeHeading === id && styles.sidebar__item
                  )}
                  key={index}
                >
                  <a
                    className={classNames(
                      styles.sidebar__link,
                      activeHeading === id && styles.sidebar__link_active
                    )}
                    onClick={(e) => handleSmoothScroll(e, id)}
                  >
                    {image && (
                      <Image
                        className={styles.sidebar__image}
                        width={24}
                        height={24}
                        quality={100}
                        src={image}
                        alt={text}
                      />
                    )}
                    <span className={styles.sidebar__text}>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
