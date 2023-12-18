import { Plugin } from "@ckeditor/ckeditor5-core";
import InsertTabCommand from "./inserttabcommand";
import { Widget, toWidget, toWidgetEditable } from "@ckeditor/ckeditor5-widget";

export default class Tabediting extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add("insertTab", new InsertTabCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("tab", {
      // Behaves like a self-contained block object (e.g. a block image)
      // allowed in places where other blocks are allowed (e.g. directly in the root).
      inheritAllFrom: "$blockObject",
    });

    schema.register("tabTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,
      allowIn: "tab",
      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",
    });

    schema.register("tabDescription", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "tab",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith("tabDescription") && childDefinition.name == "tab") {
        return false;
      }
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <simpleBox> converters
    conversion.for("upcast").elementToElement({
      model: "tab",
      view: {
        name: "div",
        classes: "tab",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "tab",
      view: {
        name: "div",
        classes: "tab",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "tab",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("div", {
          class: "tab",
        });

        return toWidget(section, viewWriter, { label: "tab widget" });
      },
    });

    // <simpleBoxTitle> converters
    conversion.for("upcast").elementToElement({
      model: "tabTitle",
      view: {
        name: "div",
        classes: "tab-title",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "tabTitle",
      view: {
        name: "div",
        classes: "tab-title",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "tabTitle",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "tab-title",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });

    // <simpleBoxDescription> converters
    conversion.for("upcast").elementToElement({
      model: "tabDescription",
      view: {
        name: "div",
        classes: "tab-description",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "tabDescription",
      view: {
        name: "div",
        classes: "tab-description",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "tabDescription",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "tab-description",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
