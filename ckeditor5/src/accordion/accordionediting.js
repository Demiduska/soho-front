import { Plugin } from "@ckeditor/ckeditor5-core";
import { Widget, toWidget, toWidgetEditable } from "@ckeditor/ckeditor5-widget";
import InsertAccordionCommand from "./insertaccordioncommand";

export default class AccordionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertAccordion",
      new InsertAccordionCommand(this.editor)
    );
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("accordion", {
      // Behaves like a self-contained block object (e.g. a block image)
      // allowed in places where other blocks are allowed (e.g. directly in the root).
      inheritAllFrom: "$blockObject",
    });

    schema.register("accordionTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "accordion",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",
    });

    schema.register("accordionDescription", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "accordion",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith("accordionDescription") &&
        childDefinition.name == "accordion"
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <simpleBox> converters
    conversion.for("upcast").elementToElement({
      model: "accordion",
      view: {
        name: "div",
        classes: "accordion",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordion",
      view: {
        name: "div",
        classes: "accordion",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordion",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("div", {
          class: "accordion",
        });

        return toWidget(section, viewWriter, { label: "accordion widget" });
      },
    });

    // <simpleBoxTitle> converters
    conversion.for("upcast").elementToElement({
      model: "accordionTitle",
      view: {
        name: "div",
        classes: "accordion-title",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordionTitle",
      view: {
        name: "div",
        classes: "accordion-title",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordionTitle",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "accordion-title",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });

    // <simpleBoxDescription> converters
    conversion.for("upcast").elementToElement({
      model: "accordionDescription",
      view: {
        name: "div",
        classes: "accordion-description",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordionDescription",
      view: {
        name: "div",
        classes: "accordion-description",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordionDescription",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "accordion-description",
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
