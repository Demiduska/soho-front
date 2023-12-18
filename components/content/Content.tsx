import { FC, useEffect, useRef } from "react";
import classNames from "classnames";
import { getElementById } from "domutils";

interface ContentProps {
  className?: string;
  content: string;
}

export const Content: FC<ContentProps> = ({ className, content }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const tabs: HTMLElement[] | null = Array.from(
      container?.querySelectorAll(".tabs") || []
    );

    if (tabs && tabs.length > 0) {
      Array.from(tabs).map((item, index) => {
        const tabTitle = item.querySelector(".tab-title");
        const tabDescription = item.querySelector(
          ".tab-description"
        ) as HTMLElement;

        if (tabTitle) {
          tabTitle.classList.add("open");
        }

        if (tabDescription) {
          tabDescription.classList.add("active");
        }
      });
    }

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("accordion-title")) {
        const description = target.nextElementSibling as HTMLElement;

        if (description) {
          target.classList.toggle("open");
          if (description.style.maxHeight) {
            description.style.maxHeight = "";
          } else {
            description.style.maxHeight = `${description.scrollHeight}px`;
          }
        }
      }
    };

    const tabClickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("tab-title")) {
        const tabTitles: HTMLElement[] = Array.from(
          container?.querySelectorAll(".tab-title") || []
        );

        const tabIndex = tabTitles.indexOf(target);

        const tabItems: HTMLElement[] = Array.from(
          target.parentElement?.parentElement?.querySelectorAll(
            ".tab-description"
          ) || []
        );

        tabTitles.map((item, index) => {
          if (index !== tabIndex) {
            item.classList.remove("open");
          } else {
            item.classList.add("open");
          }
        });

        tabItems.map((item, index) => {
          if (index !== tabIndex) {
            item.classList.remove("active");
          } else {
            item.classList.add("active");
          }
        });
      }
    };

    if (container) {
      container.addEventListener("click", clickHandler);
      container.addEventListener("click", tabClickHandler);

      // Clean up function
      return () => {
        container.removeEventListener("click", clickHandler);
        container.removeEventListener("click", tabClickHandler);
      };
    }
  }, [content]); // The effect depends on 'content'

  return (
    <div
      ref={containerRef}
      className={classNames(className && className, "ck-content", "content")}
      dangerouslySetInnerHTML={{ __html: content }}
      id={"content"}
    />
  );
};
