import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';
import { Dropzone} from './dropzone';
import { StickyContent } from './content';

export class StickyTab extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;
  static numTabs: number = 0;
  // static currentTabId: String;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the tab element
    this.node = document.createElement('div');
    this.node.classList.add('sticky-tab-bar');
    
    // Add new cell button
    // var addCell = document.createElement('div');
    // addCell.classList.add('add-cell')
    this.node.innerHTML += '<button class="add-cell">+</button>';
    // this.node.appendChild(addCell);

    this.stickyContainer.append(this.node);
    
    var addCell = document.getElementsByClassName("add-cell");
    addCell[0].addEventListener("click", this.clickAddTab);

    // Initialize the tab
    this.createFirstTab();
    StickyTab.numTabs++;

  }

  createFirstTab = () => {
    this.node.classList.add('sticky-tab');
    var addCell = this.node.lastChild;
    this.node.removeChild(addCell!);
    this.node.innerHTML += `<button class="tab" name="New Cell ${Dropzone.numDz}">New Cell ${Dropzone.numDz}</button>`;
    // this.node.innerHTML += '<button class="tab">Tab1</button>';
    // this.node.innerHTML += '<button class="tab">Tab2</button>';
    // this.node.innerHTML += '<button class="tab">Tab3</button>';
    // this.node.innerHTML += '<button class="tab">Tab4</button>';
    this.node.appendChild(addCell!);
    
    // this.node.innerHTML += '<button class="tab">Tab3</button>';

    var tabs = document.getElementsByClassName("tab");
    tabs[0].className += " current";
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", this.clickTab);
    }
    // StickyTab.currentTabId = `New Cell ${Dropzone.numDz}`;
    // document.getElementById("New Cell 0")
  }

  clickTab = ( evt: Event ) => {
    var tabcontent = document.getElementsByClassName("sticky-content");
    for (var i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" current", "");
    }

    var id = (evt.target as Element).getAttribute("name");
    document.getElementById(id!)!.style.display = "flex";
     
    (evt.target as Element).className += " current";
    // StickyTab.currentTabId = id!;
    
  }

  clickAddTab = ( evt: Event ) => {
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" current", "");
    }

    var addCell = this.node.lastChild;
    this.node.removeChild(addCell!);
    var cellNum = Dropzone.numDz;
    this.node.innerHTML += `<button class="tab current" name="New Cell ${cellNum}">New Cell ${cellNum}</button>`;
    this.node.appendChild(addCell!);

    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", this.clickTab);
    }

    new StickyContent(this.stickyContainer, StickyContent.notebook);

    var tabcontent = document.getElementsByClassName("sticky-content");
    for (var i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
    document.getElementById(`New Cell ${cellNum}`)!.style.display = "flex";
    // StickyTab.currentTabId = `New Cell ${cellNum}`;
  }

  // createNewTab = () => {
  // }
}
