import { Plugin } from "@ckeditor/ckeditor5-core";
import TabsEditing from "./tabsediting";
import TabsUI from "./tabsui";

export default class Tabs extends Plugin {
  static get requires() {
    return [TabsEditing, TabsUI];
  }
}
