// Sistema de CAPTCHA com letras aleatórias
class Captcha {
  constructor(canvasId, inputId) {
    this.canvas = document.getElementById(canvasId);
    this.input = document.getElementById(inputId);
    this.ctx = this.canvas.getContext('2d');
    this.captchaText = '';
    this.generate();
  }

  // Gera texto aleatório com letras maiúsculas e minúsculas
  generateRandomText(length = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }

  // Desenha o CAPTCHA no canvas
  draw() {
    // Limpa o canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Fundo com gradiente
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Adiciona linhas de ruído
    for (let i = 0; i < 5; i++) {
      this.ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      this.ctx.beginPath();
      this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
      this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
      this.ctx.stroke();
    }

    // Desenha as letras
    const letterSpacing = this.canvas.width / (this.captchaText.length + 1);
    for (let i = 0; i < this.captchaText.length; i++) {
      this.ctx.font = `bold ${25 + Math.random() * 10}px Arial`;
      this.ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
      
      // Rotação aleatória
      const x = letterSpacing * (i + 1);
      const y = this.canvas.height / 2 + (Math.random() * 10 - 5);
      const angle = (Math.random() - 0.5) * 0.4;
      
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(angle);
      this.ctx.fillText(this.captchaText[i], 0, 0);
      this.ctx.restore();
    }

    // Adiciona pontos de ruído
    for (let i = 0; i < 50; i++) {
      this.ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      this.ctx.fillRect(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 2, 2);
    }
  }

  // Gera um novo CAPTCHA
  generate() {
    this.captchaText = this.generateRandomText();
    this.draw();
    if (this.input) {
      this.input.value = '';
    }
  }

  // Valida o CAPTCHA
  validate(userInput) {
    return userInput === this.captchaText;
  }

  // Retorna o texto do CAPTCHA (para debug, remover em produção)
  getText() {
    return this.captchaText;
  }
}

// Função para inicializar o CAPTCHA
function initCaptcha(canvasId = 'captchaCanvas', inputId = 'captchaInput') {
  return new Captcha(canvasId, inputId);
}
