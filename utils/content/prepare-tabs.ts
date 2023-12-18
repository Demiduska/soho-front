import cheerio from "cheerio";

export const prepareTabs = (content: string) => {
  const $ = cheerio.load(content);
  const titles: any = [];
  const contents: any = [];
  $(".tabs").each((i, elem) => {
    const tabs = $(elem).find(".tab");
    $(tabs).each((i, tab) => {
      const tabTitle = $(tab).find(".tab-title");
      titles.push(tabTitle);
      const tabContent = $(tab).find(".tab-description");
      contents.push(tabContent);
    });
    $(".tab").remove();
    $(".tabs-content").append('<div class="tabs__nav"></div>');
    $(".tabs-content").append('<div class="tabs__items"></div>');
    $(".tabs-content").find(".tabs__nav").append(titles);
    $(".tabs-content").find(".tabs__items").append(contents);
  });
  return $.html().toString();
};
