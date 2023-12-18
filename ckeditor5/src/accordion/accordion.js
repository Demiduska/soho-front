import { Plugin } from "@ckeditor/ckeditor5-core";
import AccordionEditing from "./accordionediting";
import AccordionUI from "./accordionui";

export default class Accordion extends Plugin {
  static get requires() {
    return [AccordionEditing, AccordionUI];
  }
}
