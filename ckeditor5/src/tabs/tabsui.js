import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

export default class TabsUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("tabs", (locale) => {
      const command = editor.commands.get("insertTabs");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Tabs"),
        withText: true,
        tooltip: true,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      this.listenTo(buttonView, "execute", () => editor.execute("insertTabs"));
      return buttonView;
    });
  }
}
