import Head from "next/head";
import FullPageWrapper from "../components/full-page/fullpage-wrapper";
import {
  FeaturesIconEnum,
  FeaturesItemType,
  FormTypeEnum,
} from "../utils/ts/types";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { isAxiosError } from "axios";
import { fetcher } from "../utils/fetcher";
import { ResponseCreatePost, ResponsePosts } from "../utils/api/types";
import { useRouter } from "next/router";
import { useAppDispatch } from "../redux/hooks";

import features from "../public/images/features.png";
import world_trade from "../public/images/features/WorldTrade.png";
import random_craft from "../public/images/features/RandomCraft.png";
import olympiada from "../public/images/features/olympiada.png";
import improved from "../public/images/features/ImprovedAutoHunt.png";
import offline_farm from "../public/images/features/OfflineFarm.png";
import boost from "../public/images/features/fpsboost.png";
import { useEffect } from "react";
import { setFormType, setVisibleForm } from "../redux/slices/common";

const slidesFeatures: FeaturesItemType[] = [
  {
    title: `interface <br> features`,
    icon: FeaturesIconEnum.icon_1,
    imageBanner: features,
    linkVideo: "https://www.youtube.com/embed/VZrPy4RvhGM",
    content:
      "A separate window with information about the stages, next target for characters only, improved Enchant Window, Priority shortcuts panel, unique community board with many useful features.\n" +
      "And much more!",
  },
  {
    title: "world trade",
    icon: FeaturesIconEnum.icon_2,
    imageBanner: world_trade,
    linkVideo: "",
    content:
      "World trade on our server makes it easy to buy and sell items without the need for additional windows. You can sell items for Adena as well as for the in-game currency S-Coin (1 S-Coin = $1).",
  },
  {
    title: `random craft <br> for collections`,
    icon: FeaturesIconEnum.icon_3,
    imageBanner: random_craft,
    linkVideo: "",
    content:
      "Closing collections is now even easier! Simply rotate the special random creation and close collections with ease!",
  },
  {
    title: "Boost Fps",
    icon: FeaturesIconEnum.icon_4,
    imageBanner: boost,
    linkVideo: "",
    content:
      "We have made significant improvements to the client's optimization, which has significantly reduced the load on your computer. We have also added flexible settings to disable unnecessary animations.",
  },
  {
    title: "1x1 olympiad",
    icon: FeaturesIconEnum.icon_5,
    imageBanner: olympiada,
    linkVideo: "",
    content:
      "The three-round 1x1 Olympics are held twice a week, and the hero are handed out once a week.\n",
  },
  {
    title: "offline farm",
    icon: FeaturesIconEnum.icon_6,
    imageBanner: offline_farm,
    linkVideo: "",
    content:
      "Offline farming is a handy tool to keep your computer switched on 24/7. It only works for one window and is available to users with a premium account.",
  },
  {
    title: `improved <br> auto-hunting`,
    icon: FeaturesIconEnum.icon_7,
    imageBanner: improved,
    linkVideo: "",
    content:
      "We have significantly improved the algorithms for auto-hunting, making it even faster and adding many useful features. Note that auto-hunting does not work in Olympics and PvP if there are more than 5 players around you.",
  },
];

const slidesFeaturesRu: FeaturesItemType[] = [
  {
    title: `Особенности <br> интерфейса`,
    icon: FeaturesIconEnum.icon_1,
    imageBanner: features,
    linkVideo: "https://www.youtube.com/embed/VZrPy4RvhGM",
    content:
      "Отдельное окно с информацией о стадиях, Next-Target работающий исключительно по персонажам, улучшенное окно заточки, панель для приоритетных скиллов, уникальный Community board cо множеством полезных функций\n" +
      "И многое другое!",
  },
  {
    title: "Мировая торговля",
    icon: FeaturesIconEnum.icon_2,
    imageBanner: world_trade,
    linkVideo: "",
    content:
      "Мировая торговля на нашем сервере позволяет легко покупать и продавать предметы без необходимости дополнительных окон. Вы можете продавать предметы как за Адену, так и за внутриигровую валюту S-Coin (1 S-Coin = 1$).",
  },
  {
    title: `Случайное создание для коллекций`,
    icon: FeaturesIconEnum.icon_3,
    imageBanner: random_craft,
    linkVideo: "",
    content:
      "Теперь закрытие коллекций еще проще! Просто вращайте специальное случайное создание и закрывайте коллекции с легкостью!",
  },
  {
    title: "Boost Fps",
    icon: FeaturesIconEnum.icon_4,
    imageBanner: boost,
    linkVideo: "",
    content:
      "Мы внесли значительные улучшения в оптимизацию клиента, что позволило существенно снизить нагрузку на ваш компьютер. Кроме того, мы добавили гибкие настройки отключение ненужных вам анимаций.",
  },
  {
    title: "Олимпиада 1х1",
    icon: FeaturesIconEnum.icon_5,
    imageBanner: olympiada,
    linkVideo: "",
    content:
      "Трехраундовая олимпиада 1х1 проводится дважды в неделю, а звание героя выдается раз в неделю.",
  },
  {
    title: "Оффлайн-фарм",
    icon: FeaturesIconEnum.icon_6,
    imageBanner: offline_farm,
    linkVideo: "",
    content:
      "Оффлайн фарм - удобный инструмент, позволяющий не держать компьютер включенным 24/7. Он работает только для одного окна и доступен пользователям с премиум-аккаунтом.",
  },
  {
    title: `Улучшенная <br> авто-охота`,
    icon: FeaturesIconEnum.icon_7,
    imageBanner: improved,
    linkVideo: "",
    content:
      "Мы значительно улучшили алгоритмы работы авто-охоты, что позволило сделать ее еще быстрее и добавить множество полезных функций. Отметим, что авто-охота не работает на олимпиаде и в PvP, если вокруг вас находится более 5 игроков.",
  },
];

function Home({
  slidesNews,
  wikiPage,
}: {
  slidesNews: ResponsePosts;
  wikiPage: ResponseCreatePost;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  useEffect(() => {
    const { payment } = router?.query;
    if (payment === "success") {
      dispatch(setFormType(FormTypeEnum.successPayment));
      dispatch(setVisibleForm(true));
    } else if (payment === "failure") {
      dispatch(setFormType(FormTypeEnum.failedPayment));
      dispatch(setVisibleForm(true));
    }
  }, [router?.isReady]);

  return (
    <>
      <Head>
        <title>
          {locale === "en"
            ? "Lineage 2 Essence: Immerse yourself in an epic adventure"
            : "Lineage 2 Essence: Погрузитесь в эпическое приключение"}
        </title>
        <meta
          name="description"
          content={
            locale === "en"
              ? "Lineage 2 Essence is an enhanced version of our favourite game, where you can dive into an atmosphere of fun and endless PvP battles, where everything depends on you!"
              : "Lineage 2 Essence - это улучшенная версия нашей любимой игры, где ты можешь окунуться в атмосферу веселья и бесконечных PvP-баталий, где все зависит только от тебя!"
          }
        />
      </Head>
      <FullPageWrapper
        slidesFeatures={slidesFeatures}
        slidesFeaturesRu={slidesFeaturesRu}
        slidesNews={slidesNews?.items.filter((item) => item.slug !== "wiki")}
        wikiPage={wikiPage}
      />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  const limit = 6;
  const offset = 0;
  const startId = 1;
  let initialData = null;
  let wikiPage = null;
  try {
    initialData = await fetcher({ limit, offset, startId });
    wikiPage = await Api().post.getPostBySlug("wiki");
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      console.log(err.response?.data.message);
    }
  }
  return {
    props: { slidesNews: initialData, slidesFeatures, wikiPage },
    revalidate: 60,
  };
});

export default Home;
