class CustomHTMLElement extends window.HTMLElement {
  constructor() {
    super();
    this.observers = [];
    this.enabledObservers = true;
  }

  getNodes(selector) {
    const nodes = document.querySelectorAll(selector);

    nodes.addClass = (classToAdd) => {
      this.addClass(nodes, classToAdd);
      return nodes;
    };

    nodes.removeClass = (classToRemove) => {
      this.removeClass(nodes, classToRemove);
      return nodes;
    };

    return nodes;
  }

  subscribe(callback) {
    this.observers.push(callback);
  }

  unsubscribe(callback) {
    const index = this.observers.indexOf(callback);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  disableSubscription() {
    this.enabledObservers = false;
  }

  enableSubscription() {
    this.enabledObservers = true;
  }

  notifySubscription(value) {
    if (this.enabledObservers) {
      this.observers.forEach((callback) => callback(value));
    }
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      window.clearTimeout(t);
      t = window.setTimeout(() => fn.apply(this, args), wait);
    };
  }

  addClass(array, classToAdd) {
    array.forEach((element) => {
      element.classList.add(classToAdd);
    });
  }

  removeClass(array, classToRemove) {
    array.forEach((element) => {
      element.classList.remove(classToRemove);
    });
  }

  commandYoutubeApi(player, command) {
    if (player == null || command == null) {
      return;
    }
    const $jsonCommand = {
      event: "command",
      func: `${command}`,
      args: "",
    };
    player.contentWindow.postMessage(JSON.stringify($jsonCommand), "*");
  }
}