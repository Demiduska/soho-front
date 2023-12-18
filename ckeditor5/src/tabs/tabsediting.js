import { Plugin } from "@ckeditor/ckeditor5-core";
import InsertTabsCommand from "./inserttabscommand";
import { Widget, toWidget, toWidgetEditable } from "@ckeditor/ckeditor5-widget";

export default class TabsEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add("insertTabs", new InsertTabsCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("tabs", {
      // Behaves like a self-contained block object (e.g. a block image)
      // allowed in places where other blocks are allowed (e.g. directly in the root).
      inheritAllFrom: "$blockObject",
    });

    schema.register("tabsContent", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "tabs",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith("tabsContent") && childDefinition.name == "tabs") {
        return false;
      }
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <simpleBox> converters
    conversion.for("upcast").elementToElement({
      model: "tabs",
      view: {
        name: "div",
        classes: "tabs",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "tabs",
      view: {
        name: "div",
        classes: "tabs",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "tabs",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("div", {
          class: "tabs",
        });

        return toWidget(section, viewWriter, { label: "tabs widget" });
      },
    });

    // <simpleBoxDescription> converters
    conversion.for("upcast").elementToElement({
      model: "tabsContent",
      view: {
        name: "div",
        classes: "tabs-content",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "tabsContent",
      view: {
        name: "div",
        classes: "tabs-content",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "tabsContent",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "tabs-content",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
