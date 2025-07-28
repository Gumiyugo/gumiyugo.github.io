class LRSElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 获取属性值
    const left = this.getAttribute('left') || '0';
    const scaleX = parseFloat(this.getAttribute('scale-x') || '1');
    const scaleY = parseFloat(this.getAttribute('scale-y') || '1');
    
    // 计算 font-weight
    const fontWeight = ((1/scaleX + 1/scaleY) / 2).toFixed(2);
    
    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: absolute;
        left: ${left};
        transform: scale(${scaleX}, ${scaleY});
        font-weight: ${fontWeight};
        display: inline-block;
      }
    `;
    
    // 添加内容到 shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(document.createElement('slot'));
  }
}

// 注册自定义元素
customElements.define('lrs', LRSElement);