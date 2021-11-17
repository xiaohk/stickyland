import { IDisposable } from '@lumino/disposable';
import { Dropzone } from './dropzone';
import { StickyContent } from './content';
import { StickyMarkdown } from './markdown';
import { StickyCode } from './code';
import { StickyLand } from './stickyland';
import { NotebookPanel } from '@jupyterlab/notebook';
import { ContentType } from './content';
import { MyIcons } from './icons';

type Tab = {
  cellType: ContentType;
  cellIndex: number;
  tabNode: HTMLElement;
  tabContent: StickyContent;
};

export class StickyTab implements IDisposable {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  stickyLand: StickyLand;
  notebook: NotebookPanel;
  addButton: HTMLElement;
  activeTab: Tab | null = null;
  tabs: Tab[] = [];

  isDisposed = false;
  static numTabs = 0;

  constructor(
    stickyContainer: HTMLElement,
    panel: NotebookPanel,
    stickyLand: StickyLand
  ) {
    this.stickyContainer = stickyContainer;
    this.stickyLand = stickyLand;
    this.notebook = panel;

    // Add the tab element
    this.node = document.createElement('div');
    this.node.classList.add('sticky-tab', 'sticky-tab-bar');
    this.stickyContainer.append(this.node);

    // Add new cell button
    this.addButton = document.createElement('button');
    this.addButton.classList.add('add-tab');
    this.node.appendChild(this.addButton);
    MyIcons.addIcon2.element({ container: this.addButton });

    this.addButton.addEventListener('click', this.clickAddTab);

    // Create the first tab
    this.createTab();

    // StickyTab.numTabs++;
  }

  /**
   * Create a tab containing a dropzone content. The tab name is always 'new'
   * for new tabs. Creating a different content (after interacting with the
   * dropzone will update the tab name).
   * @returns New tab
   */
  createTab = (): Tab => {
    // Create a new tab node
    const tabNode = document.createElement('button');
    tabNode.classList.add('tab');

    // Add a label to the button
    const tabLabel = document.createElement('span');
    tabLabel.classList.add('tab-label');
    tabNode.appendChild(tabLabel);

    // Add a delete icon
    const tabIcon = document.createElement('div');
    tabIcon.classList.add('tab-icon');
    MyIcons.tabCloseIcon.element({ container: tabIcon });
    tabNode.appendChild(tabIcon);

    // New tab always has the dropzone content
    tabLabel.innerHTML = 'New';
    const tabContent = new StickyContent(
      this.stickyContainer,
      this.notebook,
      this.stickyLand
    );

    // Bind event handlers
    tabIcon.addEventListener('click', (event: MouseEvent) => {
      // Remove the content
      tabContent.dispose();
    });

    // Add this tab to the model and view
    const newTab: Tab = {
      cellType: ContentType.Dropzone,
      cellIndex: 0,
      tabNode: tabNode,
      tabContent: tabContent
    };

    this.tabs.push(newTab);
    this.node.insertBefore(newTab.tabNode, this.addButton);
    this.activeTab = newTab;

    // Move the current active tab to this new one
    if (this.activeTab) {
      this.activeTab.tabNode.classList.remove('current');
    }
    this.activeTab = newTab;
    newTab.tabNode.classList.add('current');
    this.stickyLand.stickyContent = newTab.tabContent;

    // Return this tab
    return newTab;
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
      '<svg class="delete-tab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" data-icon="ui-components:close" data-icon-id="58648a58-146c-4974-9873-7d2dfb468b8d"><g class="x-icon-circle" fill="none"><circle cx="12" cy="12" r="11"></circle></g><g class="x-icon" fill="#616161"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>';
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

  dispose = () => {
    this.isDisposed = true;
  };
}
