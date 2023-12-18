import { Command } from "@ckeditor/ckeditor5-core";

export default class InsertTabsCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertObject(createTabs(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "tabs"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createTabs(writer) {
  const tabs = writer.createElement("tabs");
  const tabsContent = writer.createElement("tabsContent");

  writer.append(tabsContent, tabs);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement("paragraph", tabsContent);
  writer.appendElement("paragraph", tabsContent);

  return tabs;
}
