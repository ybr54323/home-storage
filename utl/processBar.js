class ProcessBar {

  constructor() {
    this.processBar = null;
  }

  loading() {
    if (!this.processBar) {
      const node = this.processBar = document.createElement('div')
      node.classList.add('process-bar')
      document.insertBefore(node)
    } else {
      window.requestAnimationFrame(_ => {
        this.processBar.remove()
        this.processBar = null

      })
    }
  }

  hide() {
    this.processBar.style.display = 'none'
  }

  done() {
    this.processBar.classList.add('done')
    setTimeout(_ => {
      this.processBar.style.display = 'none'
    }, 200)
  }
}

export default {
  ProcessBar

}
