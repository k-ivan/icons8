class VideoModal {
  constructor(url) {
    this.body = document.body;
    this.active = false;
    this.tpl = `
      <div class="video__dialog">
        <div class="responsive-embed responsive-embed--16-9">
          <iframe width="560" height="315" src="" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    this.url = url;
    this.closeBtn = null;
    this.iframe = null;
    this.modal = null;
    this.overlay = null;
  }

  _create() {
    this.modal = document.createElement('div');
    this.modal.className = 'video';
    this.modal.innerHTML = this.tpl;

    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';

    this.body.appendChild(this.modal);
    this.body.appendChild(overlay);

    this.iframe = this.modal.querySelector('iframe');
    this.closeBtn = this.modal.querySelector('.video__close');
    this.overlay = this.body.querySelector('.video-overlay');
  }

  _attachEvents() {
    this._closeHandler = this._closeHandler.bind(this);
    this._keyHandler = this._keyHandler.bind(this);

    this.modal.addEventListener('click', this._closeHandler);
    this.body.addEventListener('keyup', this._keyHandler);
  }

  _dettachEvents() {
    this.modal.removeEventListener('click', this._closeHandler);
    this.body.removeEventListener('keyup', this._keyHandler);
  }

  _closeHandler(e) {
    e.preventDefault();
    console.log(e);

    this.close();
  }

  _keyHandler(e) {
    if (e.which === 27) {
      this.close();
    }
  }

  _getScrollBar() {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = `
      width: 100px;
      height: 100px;
      overflow: scroll;
      position: absolute;
      top: -9999px;
    `;
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }

  _toggleScroll(state) {
    if (state === 'open') {
      const scrollBarWidth = this._getScrollBar();
      this.body.style.marginRight = `${scrollBarWidth}px`;
      this.body.classList.add('video-open');
    } else {
      this.body.style.marginRight = '';
      this.body.classList.remove('video-open');
    }
  }

  open() {
    if (this.active) return;

    this._toggleScroll('open');
    this._create();
    this._attachEvents();
    this.iframe.src = this.url;

    setTimeout(() => {
      this.body.classList.add('video-open');
      this.overlay.classList.add('is-open');
      this.modal.classList.add('is-open');
    }, 0);
    this.active = true;
  }

  close() {
    if (!this.active) return;

    this._dettachEvents();
    this.overlay.classList.remove('is-open');
    this.modal.parentNode.removeChild(this.modal)

    const self = this;
    const overlay = this.overlay;

    overlay.addEventListener('transitionend', function handlerModal(e) {
      overlay.removeEventListener(e.type, handlerModal);
      overlay.parentNode.removeChild(overlay);
      self._toggleScroll();
    });
    this.active = false;
  }

}

export default VideoModal;
