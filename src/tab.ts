import { Widget } from '@lumino/widgets';
import { Dropzone } from './dropzone';
import { StickyContent } from './content';
import { StickyMarkdown } from './markdown';
import { StickyLand } from './stickyland';
import { NotebookPanel} from '@jupyterlab/notebook';

export class StickyTab extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  stickyLand: StickyLand;
  notebook: NotebookPanel;
  static numTabs = 0;

  constructor(
    stickyContainer: HTMLElement,
    panel: NotebookPanel,
    stickyLand: StickyLand
  ) {
    super();
    this.stickyContainer = stickyContainer;
    this.stickyLand = stickyLand;
    this.notebook = panel;

    // Add the tab element
    this.node = document.createElement('div');
    this.node.classList.add('sticky-tab-bar');

    // Add new cell button
    this.node.innerHTML += '<button class="add-cell">+</button>';

    this.stickyContainer.append(this.node);

    const addCell = document.getElementsByClassName('add-cell');
    addCell[0].addEventListener('click', this.clickAddTab);

    // Initialize the tab
    this.createFirstTab();
    StickyTab.numTabs++;
  }

  createFirstTab = () => {
    this.node.classList.add('sticky-tab');
    const addCell = this.node.lastChild;
    this.node.removeChild(addCell!);
    this.node.innerHTML += `<button class="tab" name="New ${Dropzone.numDz}">New ${Dropzone.numDz}</button>`;

    this.node.appendChild(addCell!);

    const tabs = document.getElementsByClassName('tab');
    tabs[0].className += ' current';
    tabs[0].addEventListener('click', this.clickTab);

    tabs[0].innerHTML +=
      '<svg class="delete-tab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" data-icon="ui-components:close" data-icon-id="58648a58-146c-4974-9873-7d2dfb468b8d"><g class="x-icon-circle" fill="none"><circle cx="12" cy="12" r="11"></circle></g><g class="x-icon" fill="#616161"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>'
    const deleteTab = document.getElementsByClassName('delete-tab');
    deleteTab[0].addEventListener('click', this.clickDeleteTab);
  };

  clickTab = (evt: Event) => {
    if (
      (evt.target as Element).getAttribute('class') &&
      (evt.target as Element).className.includes('tab')
    ) {
      const tabcontent = document.getElementsByClassName('sticky-content');
      for (let i = 0; i < tabcontent.length; i++) {
        (tabcontent[i] as HTMLElement).style.display = 'none';
      }

      const tabs = document.getElementsByClassName('tab');
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(' current', '');
      }

      const id = (evt.target as Element).getAttribute('name');
      document.getElementById(id!)!.style.display = 'flex';

      (evt.target as Element).className += ' current';
    } else {
      const deleteTab = document.getElementsByClassName('delete-tab');
      for (let i = 0; i < deleteTab.length; i++) {
        deleteTab[i].addEventListener('click', this.clickDeleteTab);
      }
    }
  };

  clickAddTab = () => {
    const tabs = document.getElementsByClassName('tab');
    console.log(tabs.length);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(' current', '');
    }

    const addCell = this.node.lastChild;
    this.node.removeChild(addCell!);
    const cellNum = Dropzone.numDz;
    this.node.innerHTML += `<button class="tab current" name="New ${cellNum}">New ${cellNum}</button>`;
    this.node.appendChild(addCell!);

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', this.clickTab);
    }
    tabs[StickyTab.numTabs].innerHTML +=
      '<svg class="delete-tab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" data-icon="ui-components:close" data-icon-id="58648a58-146c-4974-9873-7d2dfb468b8d"><g class="x-icon-circle" fill="none"><circle cx="12" cy="12" r="11"></circle></g><g class="x-icon" fill="#616161"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>'
    const deleteTab = document.getElementsByClassName('delete-tab');
    for (let i = 0; i < deleteTab.length; i++) {
      deleteTab[i].addEventListener('click', this.clickDeleteTab);
    }

    new StickyContent(this.stickyContainer, this.notebook, this.stickyLand);

    const tabcontent = document.getElementsByClassName('sticky-content');
    for (let i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = 'none';
    }
    document.getElementById(`New ${cellNum}`)!.style.display = 'flex';

    StickyTab.numTabs++;
  };

  clickDeleteTab = (evt: Event) => {
    const deleteTab = (evt.currentTarget as Element).parentNode;
    const deleteHTML = (evt.currentTarget as Element).parentElement;
    let deletedCurrent = false;
    if (deleteHTML!.className.includes('current')) {
      deletedCurrent = true;
    }
    const nameId = deleteHTML!.getAttribute('name');
    const deleteContent = document.getElementById(nameId!);
    this.node.removeChild(deleteTab!);
    this.stickyContainer.removeChild(deleteContent!);

    StickyTab.numTabs--;
    if (StickyTab.numTabs > 0) {
      if (deletedCurrent) {
        const tabs = document.getElementsByClassName('tab');
        if (!tabs[0].className.includes('current')) {
          tabs[0].className += ' current';
        }
        document.getElementById(tabs[0].getAttribute('name')!)!.style.display =
          'flex';
      }
    } else {
      this.clickAddTab();
    }
  };
}
