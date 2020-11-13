export class ProcessBar {

  constructor() {
    this.processBar = null;
  }

  static loading() {
    if (!this.processBar) {
      const node = this.processBar = document.createElement('div');
      node.classList.add('process-bar');
      node.style.height = '20px';
      const app = document.getElementById('app');
      const firstChild = app.firstChild;
      firstChild.parentElement.insertBefore(node, firstChild);
    } else {
      window.requestAnimationFrame(_ => {
        this.processBar.style.display = 'block'
      })
    }
  }

  static hide() {
    this.processBar.style.display = 'none'
    this.processBar.classList.remove('done')
  }

  static done() {
    this.processBar.classList.add('done')
    setTimeout(_ => {
      this.processBar.style.display = 'none'
    }, 600)
  }
}

