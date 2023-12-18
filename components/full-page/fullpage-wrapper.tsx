import React, { FC, useEffect, useRef } from "react";
import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import { Home } from "../sections/Home";
import { About } from "../sections/About";
import { FeaturesItemType } from "../../utils/ts/types";
import { Features } from "../sections/Features";
import { Download } from "../sections/Download";
import { Donation } from "../sections/Donation";
import { useAppSelector } from "../../redux/hooks";
import { selectVisibleForm } from "../../redux/slices/common";
import { Wiki } from "../sections/Wiki";
import { ResponseCreatePost } from "../../utils/api/types";

interface FullPageWrapperProps {
  slidesNews: ResponseCreatePost[];
  wikiPage: ResponseCreatePost;
  slidesFeatures: FeaturesItemType[];
  slidesFeaturesRu: FeaturesItemType[];
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({
  slidesNews,
  slidesFeatures,
  slidesFeaturesRu,
  wikiPage,
}) => {
  const fullpageApiRef = useRef<fullpageApi | null>(null);
  const isVisibleForm = useAppSelector(selectVisibleForm);

  const moveToSection = (sectionAnchor: string) => {
    fullpageApiRef.current?.moveTo(sectionAnchor);
  };

  useEffect(() => {
    if (fullpageApiRef.current) {
      if (isVisibleForm) {
        if ("setAllowScrolling" in fullpageApiRef.current) {
          fullpageApiRef.current.setAllowScrolling(false);
        }
      } else {
        if ("setAllowScrolling" in fullpageApiRef.current) {
          fullpageApiRef.current.setAllowScrolling(true);
        }
      }
    }
  }, [isVisibleForm]);

  return (
    <ReactFullpage
      responsiveWidth={768} // Disable fullpage.js when the viewport width is less than 768px
      responsiveHeight={700} // Disable fullpage.js when the viewport height is less than 600px
      ref={fullpageApiRef as React.LegacyRef<ReactFullpage>}
      anchors={["home", "about", "features", "download", "donations", "wiki"]}
      menu={"#menu"}
      easingcss3={"cubic-bezier(0.42, 0, 0.58, 1)"}
      scrollingSpeed={600}
      licenseKey={"gplv3-license"}
      credits={{ enabled: false }}
      onLeave={(origin, destination, direction) => {
        // console.log("direction: ", direction);
        // console.log("destination: ", destination);
        // console.log("origin: ", origin);
      }}
      afterLoad={(origin, destination, direction) => {
        // console.log("direction: ", direction);
        // console.log("destination: ", destination);
        // console.log("origin: ", origin);
      }}
      afterResize={(width, height) => {}}
      afterResponsive={(isResponsive) => {}}
      afterRender={() => {}}
      render={({ state, fullpageApi }) => {
        fullpageApiRef.current = fullpageApi;
        return (
          <ReactFullpage.Wrapper>
            <Home key={1} anchor={"home"} />
            <About key={2} slides={slidesNews} anchor={"about"} />
            <Features
              key={3}
              anchor={"features"}
              slides={slidesFeatures}
              slidesRu={slidesFeaturesRu}
            />
            <Download key={4} anchor={"download"} moveTo={moveToSection} />
            <Donation key={5} anchor={"donations"} />
            <Wiki key={6} anchor={"wiki"} wikiPage={wikiPage} />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default FullPageWrapper;
