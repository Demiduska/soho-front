import { Container } from "../components/common/container/container";
import { useRouter } from "next/router";
import { ButtonBack } from "../components/buttons/ButtonBack";
import { localization } from "../utils/localization";

import styles from "../components/sections/SimpleSection.module.scss";
import back from "../public/images/back-privacy.png";
import Image from "next/image";

export default function Privacy() {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "";

  return (
    <section className={styles.section}>
      <Image
        src={back}
        quality={100}
        className={styles.section__back}
        alt={"back"}
      />
      <Container>
        <div className={styles.section__head}>
          <ButtonBack />
        </div>
        <h1 className={styles.section__title}>
          {localization[locale].policyTitle}
        </h1>
        <div
          className={styles.section__content}
          dangerouslySetInnerHTML={{
            __html: localization[locale].policyContent,
          }}
        />
      </Container>
    </section>
  );
}
