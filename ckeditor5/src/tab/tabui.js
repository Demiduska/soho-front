import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

export default class Tabui extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("tab", (locale) => {
      const command = editor.commands.get("insertTab");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Tab"),
        withText: true,
        tooltip: true,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      this.listenTo(buttonView, "execute", () => editor.execute("insertTab"));
      return buttonView;
    });
  }
}
