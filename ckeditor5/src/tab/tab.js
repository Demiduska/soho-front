import { Plugin } from "@ckeditor/ckeditor5-core";
import Tabediting from "./tabediting";
import Tabui from "./tabui";

export default class Tab extends Plugin {
  static get requires() {
    return [Tabediting, Tabui];
  }
}
