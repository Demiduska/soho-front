import { Container } from "../components/common/container/container";
import { useRouter } from "next/router";
import { ButtonBack } from "../components/buttons/ButtonBack";
import { localization } from "../utils/localization";

import styles from "../components/sections/SimpleSection.module.scss";

export default function Terms() {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "";

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.section__head}>
          <ButtonBack />
        </div>
        <h1 className={styles.section__title}>
          {localization[locale].termsTitle}
        </h1>
        <div
          className={styles.section__content}
          dangerouslySetInnerHTML={{
            __html: localization[locale].termsContent,
          }}
        />
      </Container>
    </section>
  );
}
