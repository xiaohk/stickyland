import { Widget } from '@lumino/widgets';
import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { Drag, IDragEvent } from '@lumino/dragdrop';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { toArray } from '@lumino/algorithm';

export class StickyTab extends Widget {
  stickyContainer: HTMLElement;
  node: HTMLElement;

  constructor(stickyContainer: HTMLElement) {
    super();
    this.stickyContainer = stickyContainer;

    // Add the tab element
    this.node = document.createElement('div');
    this.node.classList.add('sticky-tab-bar');
    
    // this.node.innerHTML += '<button >Tab1</button>';
    // this.node.innerHTML += '<button>Tab2</button>';
    this.stickyContainer.append(this.node);
    
    // Initialize the tab
    this.createFirstTab();

  }

  createFirstTab = () => {
    this.node.classList.add('sticky-tab');
    this.node.innerHTML += '<button class="tab" name="New Cell 0">New Cell 0</button>';
    this.node.innerHTML += '<button class="tab">Tab1</button>';
    this.node.innerHTML += '<button class="tab">Tab2</button>';

    var tabs = document.getElementsByClassName("tab");
    tabs[0].className += " current";
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", this.clickTab);
    }

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

    var id = (evt.target as Element).textContent;
    if (id != null && document.getElementById(id) != null) {
      document.getElementById(id)!.style.display = "flex";
    }
    
    (evt.target as Element).className += " current";
    
  }

  // createNewTab = () => {
  // }
}
