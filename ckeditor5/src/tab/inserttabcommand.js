import { Command } from "@ckeditor/ckeditor5-core";

export default class InsertTabCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertObject(createTab(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "tab"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createTab(writer) {
  const tab = writer.createElement("tab");
  const tabTitle = writer.createElement("tabTitle");
  const tabDescription = writer.createElement("tabDescription");

  writer.append(tabTitle, tab);
  writer.append(tabDescription, tab);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement("paragraph", tabDescription);

  return tab;
}
