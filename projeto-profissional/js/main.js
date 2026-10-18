// ============================================================================
// CONTROLADOR PRINCIPAL / ENTRADA DO SISTEMA (main.js)
// ============================================================================

import {
  TABELA_BETA,
  TABELA_IEFP,
  TABELA_IEFP_RODA_LIVRE,
  TABELA_PUCHLOWSKI_IEFP,
  TABELA_PUCHLOWSKI_BETA,
  TABELA_RODA_LIVRE_IEF,
  TABELA_RODA_LIVRE_IG_EFP,
  interpolarBeta,
  interpolarIefp,
  interpolarIefpRodaLivre,
  gerarLinhasTabelaConferencia,
  toggleTabelaBeta,
  obterPuchlowski,
  gerarTabelaPuchlowskiHTML,
  toggleTabelaPuchlowski,
  mostrarPuchlowskiAba,
  obterIefRodaLivre,
  obterIgEfpRodaLivre,
  gerarTabelaRodaLivreHTML,
  toggleTabelaRodaLivre,
  mostrarRodaLivreAba,
  toggleAbacoRLE,
  toggleAbacoIefp,
  gerarAbacoIefpSVG,
  calcularIefpParametrizado,
  gerarAbacoPuchlowskiSVG,
  gerarAbacoPuchlowskiA02SVG,
  executarCalculo
} from './calculos.js';

import {
  atualizarGrafico,
  filtrarCanais,
  exportarCSV,
  salvarOsciloscopioPNG
} from './graficos.js';

    // Submodelos por categoria
    const topologiasPorCategoria = {
      monofasicos_nao_controlados: [
        // MEIA ONDA NÃO CONTROLADA
        { id: "mono_meia_onda_r", nome: "Retificador Monofásico de Meia Onda com Carga R", grupo: "Meia Onda Não Controlada" },
        { id: "mono_meia_onda_rl", nome: "Retificador Monofásico de Meia Onda com Carga RL", grupo: "Meia Onda Não Controlada" },
        { id: "mono_meia_onda_rl_roda_livre", nome: "Retificador de Meia Onda com Diodo de Roda Livre", grupo: "Meia Onda Não Controlada" },
        { id: "mono_meia_onda_rle", nome: "Retificador de Meia Onda com Carga RLE", grupo: "Meia Onda Não Controlada" },
        { id: "mono_meia_onda_rc", nome: "Retificador de Meia Onda com Filtro Capacitivo", grupo: "Meia Onda Não Controlada" },

        // ONDA COMPLETA NÃO CONTROLADA
        { id: "mono_onda_completa_ponte_r", nome: "Retificador Monofásico em Ponte Completa Carga Resistiva", grupo: "Onda Completa Não Controlada" },
        { id: "mono_onda_completa_tap_r", nome: "Retificador de Onda Completa com Ponto Médio", grupo: "Onda Completa Não Controlada" },
        { id: "mono_onda_completa_ponte_rl", nome: "Retificador Monofásico em Ponte Completa Carga RL", grupo: "Onda Completa Não Controlada" },
        { id: "mono_onda_completa_ponte_re", nome: "Retificador Monofásico em Ponte Completa Carga RE", grupo: "Onda Completa Não Controlada" },
        { id: "mono_onda_completa_ponte_rle", nome: "Retificador Monofásico em Ponte Completa Carga RLE", grupo: "Onda Completa Não Controlada" }
      ],
      monofasicos_controlados: [
        // MEIA ONDA CONTROLADA
        { id: "mono_meia_onda_controlado_r", nome: "Retificador Controlado de Meia Onda com Carga R", grupo: "Meia Onda Controlada (Tiristor)" },
        { id: "mono_meia_onda_controlado_rl", nome: "Retificador Controlado de Meia Onda com Carga RL", grupo: "Meia Onda Controlada (Tiristor)" },
        { id: "mono_meia_onda_controlado_rl_roda_livre", nome: "Retificador Controlado de Meia Onda com Carga RL e Diodo de Roda Livre", grupo: "Meia Onda Controlada (Tiristor)" },
        { id: "mono_meia_onda_controlado_rle", nome: "Retificador Controlado de Meia Onda com Carga RLE", grupo: "Meia Onda Controlada (Tiristor)" },

        // ONDA COMPLETA CONTROLADA
        { id: "mono_onda_completa_controlado_r", nome: "Retificador Controlado de Onda Completa com Carga R", grupo: "Onda Completa Controlada (Ponte SCR)" },
        { id: "mono_onda_completa_controlado_rl", nome: "Retificador de Onda Completa com Carga RL", grupo: "Onda Completa Controlada (Ponte SCR)" },
        { id: "mono_onda_completa_controlado_rle", nome: "Retificador de Onda Completa com Carga RLE", grupo: "Onda Completa Controlada (Ponte SCR)" }
      ],
      trifasicos_nao_controlados: [
        { id: "tri_meia_onda_r", nome: "Retificador Trifásico com Ponto Médio", grupo: "Retificadores Trifásicos Não Controlados" },
        { id: "tri_ponte_completa_r", nome: "Retificador Trifásico em Ponte Completa", grupo: "Retificadores Trifásicos Não Controlados" }
      ],
      trifasicos_controlados: [
        { id: "tri_meia_onda_controlado_r", nome: "Retificador Controlado de 3 Pulsos com Carga R", grupo: "Retificadores Trifásicos Controlados" },
        { id: "tri_ponte_controlado_r", nome: "Retificador Trifásico Controlado em Ponte Completa", grupo: "Retificadores Trifásicos Controlados" }
      ],
      conversores_cc_ca: [
        { id: "inversor_meia_ponte_r", nome: "Inversor Monofásico Meia Ponte com Carga R", grupo: "Inversores Monofásicos de Tensão" },
        { id: "inversor_meia_ponte_rl", nome: "Inversor Monofásico Meia Ponte com Carga RL", grupo: "Inversores Monofásicos de Tensão" },
        { id: "inversor_ponte_completa_r", nome: "Inversor Monofásico Ponte Completa (Ponte H) com Carga R", grupo: "Inversores Monofásicos de Tensão" },
        { id: "inversor_ponte_completa_rl", nome: "Inversor Monofásico Ponte Completa (Ponte H) com Carga RL", grupo: "Inversores Monofásicos de Tensão" }
      ]
    };

    // Biblioteca de esquemáticos em SVG vetorial de alta fidelidade
    const esquematicosSVG = {
      mono_meia_onda_r: `
        <svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg">
          <!-- Linhas de condutores -->
          <path d="M 70 45 L 180 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 45 L 370 45 L 370 70" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 140 L 370 165 L 70 165 L 70 135" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 85 L 70 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Fonte CA v(t) -->
          <circle cx="70" cy="110" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 110 Q 64 98 70 110 T 82 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="115" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>

          <!-- Diodo D1 -->
          <polygon points="180,30 180,60 215,45" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="30" x2="215" y2="60" stroke="#238636" stroke-width="3" />
          <path d="M 215 45 L 235 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="190" y="22" fill="#f0f6fc" font-size="14" font-weight="bold">D1</text>

          <!-- Seta de corrente i(t) -->
          <polygon points="295,35 303,38 295,41" fill="#f0883e" />
          <line x1="260" y1="38" x2="295" y2="38" stroke="#f0883e" stroke-width="2" />
          <text x="272" y="28" fill="#f0883e" font-size="12" font-weight="bold">i(t)</text>

          <!-- Resistor R -->
          <rect x="358" y="70" width="24" height="70" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="110" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <!-- Polaridade da Tensão vo(t) -->
          <text x="340" y="65" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="342" y="160" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="395" y="60" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_rl: `
        <svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg">
          <!-- Condutores -->
          <path d="M 70 40 L 180 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 40 L 370 40 L 370 55" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 110 L 370 125" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 185 L 370 200 L 70 200 L 70 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 95 L 70 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Fonte CA v(t) -->
          <circle cx="70" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 120 Q 64 108 70 120 T 82 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="125" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>

          <!-- Diodo D1 -->
          <polygon points="180,25 180,55 215,40" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="25" x2="215" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 215 40 L 235 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="190" y="18" fill="#f0f6fc" font-size="14" font-weight="bold">D1</text>

          <!-- Seta i(t) -->
          <polygon points="295,30 303,33 295,36" fill="#f0883e" />
          <line x1="260" y1="33" x2="295" y2="33" stroke="#f0883e" stroke-width="2" />
          <text x="272" y="24" fill="#f0883e" font-size="12" font-weight="bold">i(t)</text>

          <!-- Indutor L (espiras) -->
          <path d="M 370 55 C 388 55 388 70 370 70 C 388 70 388 85 370 85 C 388 85 388 100 370 100 C 388 100 388 110 370 110" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="395" y="85" fill="#f78166" font-size="14" font-weight="bold">L</text>
          <text x="335" y="70" fill="#f78166" font-size="10">+ vL -</text>

          <!-- Resistor R -->
          <rect x="358" y="125" width="24" height="60" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="160" fill="#e3b341" font-size="14" font-weight="bold">R</text>
          <text x="335" y="145" fill="#e3b341" font-size="10">+ vR -</text>

          <text x="338" y="50" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="340" y="195" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="405" y="48" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_rl_roda_livre: `
        <svg viewBox="0 0 490 240" xmlns="http://www.w3.org/2000/svg">
          <!-- Condutores -->
          <path d="M 60 40 L 160 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 210 40 L 270 40 L 400 40 L 400 55" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 400 110 L 400 125" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 400 185 L 400 200 L 270 200 L 60 200 L 60 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 60 95 L 60 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Ramo do Diodo de Roda Livre D2 (apontando para cima) -->
          <path d="M 270 40 L 270 95" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <polygon points="255,125 285,125 270,95" fill="#da3633" stroke="#da3633" stroke-width="2" />
          <line x1="255" y1="95" x2="285" y2="95" stroke="#da3633" stroke-width="3" />
          <path d="M 270 125 L 270 200" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="270" cy="40" r="4" fill="#58a6ff" />
          <circle cx="270" cy="200" r="4" fill="#58a6ff" />
          <text x="245" y="115" fill="#da3633" font-size="12" font-weight="bold" text-anchor="end">D2 (Roda Livre)</text>

          <!-- Fonte CA v(t) -->
          <circle cx="60" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 48 120 Q 54 108 60 120 T 72 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="30" y="125" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="end">v(t)</text>

          <!-- Diodo D1 -->
          <polygon points="160,25 160,55 195,40" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="195" y1="25" x2="195" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 195 40 L 210 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="170" y="18" fill="#f0f6fc" font-size="14" font-weight="bold">D1</text>

          <!-- Indutor L e Resistor R -->
          <path d="M 400 55 C 418 55 418 70 400 70 C 418 70 418 85 400 85 C 418 85 418 100 400 100 C 418 100 418 110 400 110" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="425" y="85" fill="#f78166" font-size="14" font-weight="bold">L</text>
          <rect x="388" y="125" width="24" height="60" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="425" y="160" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <text x="375" y="50" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="377" y="195" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="335" y="115" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_rle: `
        <svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg">
          <!-- Condutores -->
          <path d="M 70 35 L 180 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 35 L 370 35 L 370 50" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 95 L 370 108" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 155 L 370 170" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 195 L 370 210 L 70 210 L 70 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 95 L 70 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Fonte CA v(t) -->
          <circle cx="70" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 120 Q 64 108 70 120 T 82 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="125" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>

          <!-- Diodo D1 -->
          <polygon points="180,20 180,50 215,35" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="20" x2="215" y2="50" stroke="#238636" stroke-width="3" />
          <path d="M 215 35 L 235 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="190" y="14" fill="#f0f6fc" font-size="14" font-weight="bold">D1</text>

          <!-- Indutor L -->
          <path d="M 370 50 C 388 50 388 65 370 65 C 388 65 388 80 370 80 C 388 80 388 95 370 95" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="395" y="75" fill="#f78166" font-size="14" font-weight="bold">L</text>

          <!-- Resistor R -->
          <rect x="358" y="108" width="24" height="47" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="136" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <!-- Bateria/FEM E -->
          <line x1="352" y1="172" x2="388" y2="172" stroke="#2da44e" stroke-width="3" />
          <line x1="360" y1="187" x2="380" y2="187" stroke="#2da44e" stroke-width="3" />
          <line x1="370" y1="187" x2="370" y2="195" stroke="#58a6ff" stroke-width="2.5" />
          <text x="395" y="185" fill="#2da44e" font-size="14" font-weight="bold">E</text>
          <text x="393" y="170" fill="#2da44e" font-size="11">+</text>

          <text x="340" y="45" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="342" y="205" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="410" y="42" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_rc: `
        <svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Condutores -->
          <path d="M 60 45 L 170 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 220 45 L 290 45 L 390 45 L 390 75" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 290 45 L 290 85" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 290 115 L 290 170" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 390 145 L 390 170 L 290 170 L 60 170 L 60 135" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 60 85 L 60 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Fonte CA v(t) -->
          <circle cx="60" cy="110" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 48 110 Q 54 98 60 110 T 72 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="30" y="115" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="end">v(t)</text>

          <!-- Diodo D1 -->
          <polygon points="170,30 170,60 205,45" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="205" y1="30" x2="205" y2="60" stroke="#238636" stroke-width="3" />
          <path d="M 205 45 L 220 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="180" y="22" fill="#f0f6fc" font-size="14" font-weight="bold">D1</text>

          <!-- Capacitor C (Placas) -->
          <circle cx="290" cy="45" r="4" fill="#58a6ff" />
          <circle cx="290" cy="170" r="4" fill="#58a6ff" />
          <line x1="272" y1="85" x2="308" y2="85" stroke="#388bfd" stroke-width="3" />
          <line x1="272" y1="115" x2="308" y2="115" stroke="#388bfd" stroke-width="3" />
          <text x="265" y="105" fill="#388bfd" font-size="13" font-weight="bold" text-anchor="end">C (Filtro)</text>
          <text x="295" y="77" fill="#388bfd" font-size="11">+</text>

          <!-- Resistor R -->
          <rect x="378" y="75" width="24" height="70" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="415" y="115" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <text x="415" y="60" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      tri_meia_onda_r: `
        <svg viewBox="0 0 520 270" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramento Vertical do Neutro (Comum das 3 fontes) -->
          <line x1="55" y1="35" x2="55" y2="215" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="55" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="85" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="135" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="215" r="3.5" fill="#58a6ff" />
          <text x="40" y="220" fill="#8b949e" font-size="12" font-weight="bold">n</text>

          <!-- Ramo Fase A -->
          <line x1="55" y1="35" x2="85" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="35" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 35 Q 100 26 105 35 T 114 35" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="66" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">va(t)</text>
          <line x1="123" y1="35" x2="195" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,23 195,47 220,35" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="23" x2="220" y2="47" stroke="#238636" stroke-width="3" />
          <text x="207" y="62" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">D1</text>
          <line x1="220" y1="35" x2="285" y2="35" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Fase B -->
          <line x1="55" y1="85" x2="85" y2="85" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="85" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 85 Q 100 76 105 85 T 114 85" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="116" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">vb(t)</text>
          <line x1="123" y1="85" x2="195" y2="85" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,73 195,97 220,85" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="73" x2="220" y2="97" stroke="#238636" stroke-width="3" />
          <text x="207" y="112" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">D2</text>
          <line x1="220" y1="85" x2="285" y2="85" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Fase C -->
          <line x1="55" y1="135" x2="85" y2="135" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="135" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 135 Q 100 126 105 135 T 114 135" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="166" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">vc(t)</text>
          <line x1="123" y1="135" x2="195" y2="135" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,123 195,147 220,135" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="123" x2="220" y2="147" stroke="#238636" stroke-width="3" />
          <text x="207" y="162" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">D3</text>
          <line x1="220" y1="135" x2="285" y2="135" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Barramento Vertical dos Catodos Comuns -->
          <line x1="285" y1="35" x2="285" y2="160" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="285" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="285" cy="85" r="3.5" fill="#58a6ff" />
          <circle cx="285" cy="135" r="3.5" fill="#58a6ff" />

          <!-- Carga R: Resistor Zigue-Zague Didatico (Modelo do Professor) -->
          <text x="270" y="166" fill="#58a6ff" font-size="13" font-weight="bold">+</text>
          <line x1="285" y1="160" x2="285" y2="168" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 285 168 L 285 171 L 293 175 L 277 181 L 293 187 L 277 193 L 293 199 L 277 205 L 285 209 L 285 215" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <text x="264" y="195" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>
          <text x="306" y="193" fill="#58a6ff" font-size="12" font-weight="bold">vR</text>
          <text x="272" y="219" fill="#58a6ff" font-size="15" font-weight="bold">-</text>

          <!-- Retorno ao Neutro pela Linha Inferior -->
          <line x1="285" y1="215" x2="55" y2="215" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Caixa Didatica com as Equacoes de Fase -->
          <rect x="345" y="35" width="160" height="110" fill="#161b22" stroke="#30363d" stroke-width="1.5" rx="6" />
          <text x="355" y="58" fill="#8b949e" font-size="11" font-weight="bold">Tensões do Sistema:</text>
          <text x="355" y="82" fill="#79c0ff" font-size="11" font-weight="bold">va(t) = Vp·sen(ωt)</text>
          <text x="355" y="106" fill="#f0883e" font-size="11" font-weight="bold">vb(t) = Vp·sen(ωt - 120°)</text>
          <text x="355" y="130" fill="#d2a8ff" font-size="11" font-weight="bold">vc(t) = Vp·sen(ωt + 120°)</text>
        </svg>
      `,

      tri_ponte_completa_r: `
        <svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramento Neutro (n) e Conexoes das Fontes a Esquerda -->
          <circle cx="34" cy="125" r="3.5" fill="#58a6ff" />
          <text x="20" y="129" fill="#8b949e" font-size="12" font-weight="bold">n</text>
          <line x1="34" y1="125" x2="50" y2="125" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="85" x2="50" y2="165" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="85" x2="70" y2="85" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="125" x2="70" y2="125" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="165" x2="70" y2="165" stroke="#58a6ff" stroke-width="2" />

          <!-- Fontes Trifasicas va(t), vb(t), vc(t) -->
          <!-- Fonte va(t) -->
          <circle cx="86" cy="85" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 85 Q 82 77 86 85 T 94 85" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="62" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">va(t)</text>

          <!-- Fonte vb(t) -->
          <circle cx="86" cy="125" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 125 Q 82 117 86 125 T 94 125" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="102" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">vb(t)</text>

          <!-- Fonte vc(t) -->
          <circle cx="86" cy="165" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 165 Q 82 157 86 165 T 94 165" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="142" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">vc(t)</text>

          <!-- Linhas Horizontais Paralelas das Fases a, b, c -->
          <!-- Linha Fase a ate Braco 1 (X=190) -->
          <line x1="102" y1="85" x2="190" y2="85" stroke="#58a6ff" stroke-width="2" />
          <circle cx="190" cy="85" r="3.5" fill="#58a6ff" />
          <text x="198" y="82" fill="#58a6ff" font-size="11" font-weight="bold">a</text>

          <!-- Linha Fase b ate Braco 2 (X=270) -->
          <line x1="102" y1="125" x2="270" y2="125" stroke="#58a6ff" stroke-width="2" />
          <circle cx="270" cy="125" r="3.5" fill="#58a6ff" />
          <text x="278" y="122" fill="#58a6ff" font-size="11" font-weight="bold">b</text>

          <!-- Linha Fase c ate Braco 3 (X=350) -->
          <line x1="102" y1="165" x2="350" y2="165" stroke="#58a6ff" stroke-width="2" />
          <circle cx="350" cy="165" r="3.5" fill="#58a6ff" />
          <text x="358" y="162" fill="#58a6ff" font-size="11" font-weight="bold">c</text>

          <!-- Barramentos CC (+) Superior (Y=25) e (-) Inferior (Y=225) -->
          <line x1="190" y1="25" x2="445" y2="25" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="190" y1="225" x2="445" y2="225" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco 1 (X=190, Fase a): D1 (topo) e D2 (base) -->
          <circle cx="190" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="190" y1="25" x2="190" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="180,62 200,62 190,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="180" y1="42" x2="200" y2="42" stroke="#238636" stroke-width="2.5" />
          <text x="206" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">D1</text>
          <line x1="190" y1="62" x2="190" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="180,208 200,208 190,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="180" y1="188" x2="200" y2="188" stroke="#238636" stroke-width="2.5" />
          <text x="206" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">D2</text>
          <line x1="190" y1="208" x2="190" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="190" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Braco 2 (X=270, Fase b): D3 (topo) e D4 (base) -->
          <circle cx="270" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="270" y1="25" x2="270" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="260,62 280,62 270,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="260" y1="42" x2="280" y2="42" stroke="#238636" stroke-width="2.5" />
          <text x="286" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">D3</text>
          <line x1="270" y1="62" x2="270" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="260,208 280,208 270,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="260" y1="188" x2="280" y2="188" stroke="#238636" stroke-width="2.5" />
          <text x="286" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">D4</text>
          <line x1="270" y1="208" x2="270" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="270" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Braco 3 (X=350, Fase c): D5 (topo) e D6 (base) -->
          <circle cx="350" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="350" y1="25" x2="350" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="340,62 360,62 350,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="340" y1="42" x2="360" y2="42" stroke="#238636" stroke-width="2.5" />
          <text x="366" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">D5</text>
          <line x1="350" y1="62" x2="350" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="340,208 360,208 350,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="340" y1="188" x2="360" y2="188" stroke="#238636" stroke-width="2.5" />
          <text x="366" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">D6</text>
          <line x1="350" y1="208" x2="350" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="350" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Carga R: Resistor Zigue-Zague Didatico -->
          <line x1="445" y1="25" x2="445" y2="75" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 445 75 L 445 80 L 455 86 L 435 95 L 455 104 L 435 113 L 455 122 L 435 131 L 455 140 L 435 149 L 445 155 L 445 175" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <line x1="445" y1="175" x2="445" y2="225" stroke="#58a6ff" stroke-width="2.5" />
          <text x="466" y="129" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <!-- Polaridade e Rotulos Didaticos -->
          <text x="425" y="55" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="427" y="205" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
          <text x="485" y="129" fill="#58a6ff" font-size="12" font-weight="bold">vo(t)</text>
          <line x1="375" y1="16" x2="415" y2="16" stroke="#f0883e" stroke-width="2" />
          <polygon points="415,13 423,16 415,19" fill="#f0883e" />
          <text x="395" y="10" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>
        </svg>
      `,

      mono_onda_completa_ponte_r: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos CC Superior (+) e Inferior (-) -->
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco Esquerdo (X = 85): D1 e D2 (apontam para CIMA) -->
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D1</text>

          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D2</text>

          <!-- Braco Direito (X = 205): D3 e D4 (apontam para CIMA) -->
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D3</text>

          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D4</text>

          <!-- Fonte CA v(t) Centralizada na Ponte H -->
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Nos de Conexao -->
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />

          <!-- Seta de Corrente io(t) -->
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>

          <!-- Carga Resistiva R (X = 350) -->
          <line x1="350" y1="35" x2="350" y2="65" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="65" width="24" height="90" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <line x1="350" y1="155" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="375" y="115" fill="#e3b341" font-size="15" font-weight="bold">R</text>

          <!-- Polaridade vo(t) -->
          <text x="415" y="65" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="425" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="416" y="165" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_onda_completa_tap_r: `
        <svg viewBox="0 0 420 225" xmlns="http://www.w3.org/2000/svg">
          <!-- Fonte CA Primario v(t) -->
          <circle cx="65" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 56 110 Q 60.5 101 65 110 T 74 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="32" y="115" fill="#f0f6fc" font-size="14" font-weight="bold" font-style="italic" text-anchor="middle">v(t)</text>
          <path d="M 65 92 L 65 55 L 115 55" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 65 128 L 65 165 L 115 165" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Enrolamento Primario (5 espiras) -->
          <path d="M 115 55 C 130 55 130 77 115 77 C 130 77 130 99 115 99 C 130 99 130 121 115 121 C 130 121 130 143 115 143 C 130 143 130 165 115 165" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- Nucleo de Ferro Magnetico T1 -->
          <line x1="138" y1="45" x2="138" y2="175" stroke="#8b949e" stroke-width="2" />
          <line x1="144" y1="45" x2="144" y2="175" stroke="#8b949e" stroke-width="2" />
          <text x="141" y="196" fill="#8b949e" font-size="13" font-weight="bold" font-style="italic" text-anchor="middle">T₁</text>

          <!-- Enrolamento Secundario (Superior e Inferior) -->
          <path d="M 167 55 C 152 55 152 73 167 73 C 152 73 152 91 167 91 C 152 91 152 110 167 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 167 110 C 152 110 152 129 167 129 C 152 129 152 147 167 147 C 152 147 152 165 167 165" stroke="#58a6ff" stroke-width="2.5" fill="none" />

          <!-- No do Ponto Medio (Tap Central) -->
          <circle cx="167" cy="110" r="3.5" fill="#58a6ff" />

          <!-- Ramo Superior: Diodo D1 -->
          <path d="M 167 55 L 167 35 L 230 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <polygon points="230,23 230,47 255,35" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="255" y1="23" x2="255" y2="47" stroke="#238636" stroke-width="3" />
          <text x="242" y="17" fill="#f0f6fc" font-size="13" font-weight="bold" font-style="italic" text-anchor="middle">D₁</text>
          <text x="216" y="27" fill="#8b949e" font-size="12" font-weight="bold">+</text>
          <text x="268" y="27" fill="#8b949e" font-size="14" font-weight="bold">-</text>
          <line x1="255" y1="35" x2="330" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="330" y1="35" x2="330" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Inferior: Diodo D2 -->
          <path d="M 167 165 L 167 185 L 230 185" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <polygon points="230,173 230,197 255,185" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="255" y1="173" x2="255" y2="197" stroke="#238636" stroke-width="3" />
          <text x="242" y="214" fill="#f0f6fc" font-size="13" font-weight="bold" font-style="italic" text-anchor="middle">D₂</text>
          <text x="216" y="197" fill="#8b949e" font-size="12" font-weight="bold">+</text>
          <text x="268" y="197" fill="#8b949e" font-size="14" font-weight="bold">-</text>
          <line x1="255" y1="185" x2="330" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="330" y1="185" x2="330" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Central: Carga R conectada ao Ponto Medio -->
          <line x1="167" y1="110" x2="220" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <!-- Resistor R horizontal (zigzag didatico) -->
          <path d="M 220 110 L 225 110 L 230 102 L 238 118 L 246 102 L 254 118 L 262 102 L 270 118 L 274 110 L 280 110" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <text x="250" y="136" fill="#e3b341" font-size="15" font-weight="bold" font-style="italic" text-anchor="middle">R</text>
          <line x1="280" y1="110" x2="330" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- No de Conexao no Barramento Direito -->
          <circle cx="330" cy="110" r="3.5" fill="#58a6ff" />

          <!-- Indicacao de Tensao e Corrente de Saida -->
          <text x="250" y="93" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="210" y="103" fill="#58a6ff" font-size="13" font-weight="bold">-</text>
          <text x="288" y="103" fill="#58a6ff" font-size="13" font-weight="bold">+</text>
          <line x1="320" y1="100" x2="300" y2="100" stroke="#f0883e" stroke-width="2" />
          <polygon points="300,97 293,100 300,103" fill="#f0883e" />
          <text x="310" y="90" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>
        </svg>
      `,

      mono_onda_completa_ponte_rl: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos CC Superior (+) e Inferior (-) -->
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco Esquerdo (X = 85): D1 (superior) e D2 (inferior) -->
          <!-- D1: anodo Y=80, catodo Y=55 (aponta para CIMA) -->
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D1</text>

          <!-- D2: anodo Y=165, catodo Y=140 (aponta para CIMA) -->
          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D2</text>

          <!-- Braco Direito (X = 205): D3 (superior) e D4 (inferior) -->
          <!-- D3: anodo Y=80, catodo Y=55 (aponta para CIMA) -->
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D3</text>

          <!-- D4: anodo Y=165, catodo Y=140 (aponta para CIMA) -->
          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D4</text>

          <!-- Fonte CA v(t) Centralizada na Ponte H -->
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Nos de Conexao -->
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />

          <!-- Seta de Corrente io(t) -->
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>

          <!-- Carga RL Serie (X = 350) -->
          <!-- Indutor L com 4 espiras -->
          <line x1="350" y1="35" x2="350" y2="48" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 350 48 C 368 48 368 61 350 61 C 368 61 368 74 350 74 C 368 74 368 87 350 87 C 368 87 368 100 350 100" stroke="#388bfd" stroke-width="2.5" fill="none" />
          <text x="330" y="75" fill="#388bfd" font-size="14" font-weight="bold" text-anchor="middle">L</text>
          
          <!-- Tensao vL a direita de L com polaridades + e - -->
          <text x="375" y="55" fill="#f0f6fc" font-size="11" font-weight="bold">+</text>
          <text x="388" y="76" fill="#388bfd" font-size="13" font-weight="bold">vL</text>
          <text x="376" y="96" fill="#f0f6fc" font-size="13" font-weight="bold">-</text>

          <!-- Condutor intermediario entre L e R -->
          <line x1="350" y1="100" x2="350" y2="115" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Resistor R -->
          <rect x="338" y="115" width="24" height="52" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="325" y="145" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>

          <!-- Tensao vR a direita de R com polaridades + e - -->
          <text x="375" y="125" fill="#f0f6fc" font-size="11" font-weight="bold">+</text>
          <text x="388" y="145" fill="#e3b341" font-size="13" font-weight="bold">vR</text>
          <text x="376" y="165" fill="#f0f6fc" font-size="13" font-weight="bold">-</text>

          <!-- Retorno para o barramento inferior -->
          <line x1="350" y1="167" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Polaridade Total vo(t) da Saida -->
          <text x="420" y="45" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="430" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="421" y="180" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_onda_completa_ponte_re: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos CC Superior (+) e Inferior (-) -->
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco Esquerdo (X = 85): D1 e D2 -->
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D1</text>

          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D2</text>

          <!-- Braco Direito (X = 205): D3 e D4 -->
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D3</text>

          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D4</text>

          <!-- Fonte CA v(t) Centralizada na Ponte H -->
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Nos de Conexao -->
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />

          <!-- Seta de Corrente io(t) -->
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>

          <!-- Carga RE Serie: R + Bateria E (X = 350) -->
          <line x1="350" y1="35" x2="350" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="55" width="24" height="58" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="375" y="88" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <line x1="350" y1="113" x2="350" y2="135" stroke="#58a6ff" stroke-width="2.5" />
          <!-- Bateria E -->
          <line x1="333" y1="135" x2="367" y2="135" stroke="#2da44e" stroke-width="3.5" />
          <line x1="340" y1="147" x2="360" y2="147" stroke="#2da44e" stroke-width="3.5" />
          <text x="378" y="145" fill="#2da44e" font-size="14" font-weight="bold">E</text>
          <text x="376" y="133" fill="#2da44e" font-size="11">+</text>

          <line x1="350" y1="147" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Polaridade vo(t) -->
          <text x="415" y="50" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="425" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="416" y="180" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_onda_completa_ponte_rle: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos CC Superior (+) e Inferior (-) -->
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco Esquerdo (X = 85): D1 e D2 -->
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D1</text>

          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="58" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D2</text>

          <!-- Braco Direito (X = 205): D3 e D4 -->
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="72" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D3</text>

          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="157" fill="#f0f6fc" font-size="14" font-weight="bold" text-anchor="middle">D4</text>

          <!-- Fonte CA v(t) Centralizada na Ponte H -->
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Nos de Conexao -->
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />

          <!-- Seta de Corrente io(t) -->
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>

          <!-- Carga RLE Serie: L + R + E (X = 350) -->
          <!-- Indutor L -->
          <line x1="350" y1="35" x2="350" y2="45" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 350 45 C 368 45 368 57 350 57 C 368 57 368 69 350 69 C 368 69 368 81 350 81 C 368 81 368 93 350 93" stroke="#388bfd" stroke-width="2.5" fill="none" />
          <text x="375" y="72" fill="#388bfd" font-size="13" font-weight="bold">L</text>

          <!-- Resistor R -->
          <line x1="350" y1="93" x2="350" y2="105" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="105" width="24" height="40" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="375" y="128" fill="#e3b341" font-size="13" font-weight="bold">R</text>

          <!-- Bateria E -->
          <line x1="350" y1="145" x2="350" y2="155" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="333" y1="155" x2="367" y2="155" stroke="#2da44e" stroke-width="3.5" />
          <line x1="340" y1="165" x2="360" y2="165" stroke="#2da44e" stroke-width="3.5" />
          <text x="378" y="163" fill="#2da44e" font-size="13" font-weight="bold">E</text>
          <text x="376" y="153" fill="#2da44e" font-size="11">+</text>

          <line x1="350" y1="165" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Polaridade vo(t) -->
          <text x="415" y="45" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="425" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="416" y="180" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_meia_onda_controlado_r: `
        <svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg">
          <path d="M 70 45 L 180 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 45 L 370 45 L 370 70" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 140 L 370 165 L 70 165 L 70 135" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 85 L 70 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="70" cy="110" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 110 Q 64 98 70 110 T 82 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="115" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>
          <polygon points="180,30 180,60 215,45" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="30" x2="215" y2="60" stroke="#238636" stroke-width="3" />
          <path d="M 205 52 L 195 68" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="188" y="76" fill="#f0883e" font-size="11" font-weight="bold">G</text>
          <path d="M 215 45 L 235 45" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="195" y="22" fill="#f0f6fc" font-size="14" font-weight="bold">T1</text>
          <polygon points="295,35 303,38 295,41" fill="#f0883e" />
          <line x1="260" y1="38" x2="295" y2="38" stroke="#f0883e" stroke-width="2" />
          <text x="272" y="28" fill="#f0883e" font-size="12" font-weight="bold">i(t)</text>
          <rect x="358" y="70" width="24" height="70" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="110" fill="#e3b341" font-size="14" font-weight="bold">R</text>
          <text x="340" y="65" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="342" y="160" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="395" y="60" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_controlado_rl: `
        <svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg">
          <path d="M 70 40 L 180 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 40 L 370 40 L 370 55" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 110 L 370 125" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 185 L 370 200 L 70 200 L 70 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 95 L 70 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="70" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 120 Q 64 108 70 120 T 82 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="125" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>
          <polygon points="180,25 180,55 215,40" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="25" x2="215" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 205 47 L 195 63" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="188" y="72" fill="#f0883e" font-size="11" font-weight="bold">G</text>
          <path d="M 215 40 L 235 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="195" y="18" fill="#f0f6fc" font-size="14" font-weight="bold">T1</text>
          <path d="M 370 55 C 388 55 388 70 370 70 C 388 70 388 85 370 85 C 388 85 388 100 370 100 C 388 100 388 110 370 110" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="395" y="85" fill="#f78166" font-size="14" font-weight="bold">L</text>
          <rect x="358" y="125" width="24" height="60" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="160" fill="#e3b341" font-size="14" font-weight="bold">R</text>
          <text x="338" y="50" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="340" y="195" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="405" y="48" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_controlado_rl_roda_livre: `
        <svg viewBox="0 0 490 240" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 40 L 160 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 210 40 L 270 40 L 400 40 L 400 55" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 400 110 L 400 125" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 400 185 L 400 200 L 270 200 L 60 200 L 60 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 60 95 L 60 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="60" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 48 120 Q 54 108 60 120 T 72 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="30" y="125" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="end">v(t)</text>
          <polygon points="160,25 160,55 195,40" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="195" y1="25" x2="195" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 185 47 L 175 63" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="168" y="72" fill="#f0883e" font-size="11" font-weight="bold">G</text>
          <path d="M 195 40 L 210 40" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="175" y="18" fill="#f0f6fc" font-size="14" font-weight="bold">T1</text>
          <path d="M 270 40 L 270 95" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <polygon points="255,125 285,125 270,95" fill="#da3633" stroke="#da3633" stroke-width="2" />
          <line x1="255" y1="95" x2="285" y2="95" stroke="#da3633" stroke-width="3" />
          <path d="M 270 125 L 270 200" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="270" cy="40" r="4" fill="#58a6ff" />
          <circle cx="270" cy="200" r="4" fill="#58a6ff" />
          <text x="245" y="115" fill="#da3633" font-size="12" font-weight="bold" text-anchor="end">D (Roda Livre)</text>
          <path d="M 400 55 C 418 55 418 70 400 70 C 418 70 418 85 400 85 C 418 85 418 100 400 100 C 418 100 418 110 400 110" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="425" y="85" fill="#f78166" font-size="14" font-weight="bold">L</text>
          <rect x="388" y="125" width="24" height="60" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="425" y="160" fill="#e3b341" font-size="14" font-weight="bold">R</text>
          <text x="375" y="50" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="377" y="195" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="335" y="115" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_meia_onda_controlado_rle: `
        <svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg">
          <path d="M 70 35 L 180 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 235 35 L 370 35 L 370 50" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 95 L 370 108" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 155 L 370 170" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 370 195 L 370 210 L 70 210 L 70 145" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <path d="M 70 95 L 70 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <circle cx="70" cy="120" r="24" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 58 120 Q 64 108 70 120 T 82 120" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="25" y="125" fill="#f0f6fc" font-size="13" font-weight="bold">v(t)</text>
          <polygon points="180,20 180,50 215,35" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="215" y1="20" x2="215" y2="50" stroke="#238636" stroke-width="3" />
          <path d="M 205 42 L 195 58" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="188" y="67" fill="#f0883e" font-size="11" font-weight="bold">G</text>
          <path d="M 215 35 L 235 35" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="195" y="14" fill="#f0f6fc" font-size="14" font-weight="bold">T1</text>
          <path d="M 370 50 C 388 50 388 65 370 65 C 388 65 388 80 370 80 C 388 80 388 95 370 95" stroke="#f78166" stroke-width="2.5" fill="none" />
          <text x="395" y="75" fill="#f78166" font-size="14" font-weight="bold">L</text>
          <rect x="358" y="108" width="24" height="47" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="395" y="136" fill="#e3b341" font-size="14" font-weight="bold">R</text>
          <line x1="352" y1="172" x2="388" y2="172" stroke="#2da44e" stroke-width="3" />
          <line x1="360" y1="187" x2="380" y2="187" stroke="#2da44e" stroke-width="3" />
          <line x1="370" y1="187" x2="370" y2="195" stroke="#58a6ff" stroke-width="2.5" />
          <text x="395" y="185" fill="#2da44e" font-size="14" font-weight="bold">E</text>
          <text x="393" y="170" fill="#2da44e" font-size="11">+</text>
          <text x="340" y="45" fill="#f0f6fc" font-size="14" font-weight="bold">+</text>
          <text x="342" y="205" fill="#f0f6fc" font-size="16" font-weight="bold">-</text>
          <text x="410" y="42" fill="#58a6ff" font-size="13" font-weight="bold">vo(t)</text>
        </svg>
      `,

      mono_onda_completa_controlado_r: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 75 62 L 65 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T1</text>
          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 75 147 L 65 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T2</text>
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 215 62 L 225 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T3</text>
          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 215 147 L 225 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T4</text>
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>
          <line x1="350" y1="35" x2="350" y2="65" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="65" width="24" height="90" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <line x1="350" y1="155" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="375" y="115" fill="#e3b341" font-size="15" font-weight="bold">R</text>
          <text x="415" y="65" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="425" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="416" y="165" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_onda_completa_controlado_rl: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 75 62 L 65 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T1</text>
          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 75 147 L 65 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T2</text>
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 215 62 L 225 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T3</text>
          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 215 147 L 225 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T4</text>
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />
          <line x1="260" y1="26" x2="295" y2="26" stroke="#f0883e" stroke-width="2" />
          <polygon points="295,23 303,26 295,29" fill="#f0883e" />
          <text x="278" y="18" fill="#f0883e" font-size="12" font-weight="bold" text-anchor="middle">io(t)</text>
          <!-- Carga RL -->
          <line x1="350" y1="35" x2="350" y2="48" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 350 48 C 368 48 368 61 350 61 C 368 61 368 74 350 74 C 368 74 368 87 350 87 C 368 87 368 100 350 100" stroke="#388bfd" stroke-width="2.5" fill="none" />
          <text x="330" y="75" fill="#388bfd" font-size="14" font-weight="bold" text-anchor="middle">L</text>
          <line x1="350" y1="100" x2="350" y2="115" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="115" width="24" height="52" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="325" y="145" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>
          <line x1="350" y1="167" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="420" y="45" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="430" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="421" y="180" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      mono_onda_completa_controlado_rle: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <line x1="85" y1="35" x2="350" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="185" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="85" y1="35" x2="85" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,80 97,80 85,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="55" x2="97" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 75 62 L 65 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="80" x2="85" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T1</text>
          <line x1="85" y1="110" x2="85" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="73,165 97,165 85,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="73" y1="140" x2="97" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 75 147 L 65 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="85" y1="165" x2="85" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="56" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T2</text>
          <line x1="205" y1="35" x2="205" y2="55" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,80 217,80 205,55" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="55" x2="217" y2="55" stroke="#238636" stroke-width="3" />
          <path d="M 215 62 L 225 67" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="80" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="58" fill="#f0f6fc" font-size="12" font-weight="bold">T3</text>
          <line x1="205" y1="110" x2="205" y2="140" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="193,165 217,165 205,140" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="193" y1="140" x2="217" y2="140" stroke="#238636" stroke-width="3" />
          <path d="M 215 147 L 225 152" stroke="#f0883e" stroke-width="1.8" />
          <line x1="205" y1="165" x2="205" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="232" y="143" fill="#f0f6fc" font-size="12" font-weight="bold">T4</text>
          <circle cx="145" cy="110" r="18" stroke="#58a6ff" stroke-width="2.5" fill="#161b22" />
          <path d="M 135 110 Q 140 100 145 110 T 155 110" stroke="#58a6ff" stroke-width="2.5" fill="none" />
          <text x="145" y="145" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="middle">v(t)</text>
          <line x1="85" y1="110" x2="127" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="163" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="85" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="110" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="205" cy="185" r="3.5" fill="#58a6ff" />
          <!-- Carga RLE -->
          <line x1="350" y1="35" x2="350" y2="45" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 350 45 C 368 45 368 57 350 57 C 368 57 368 69 350 69 C 368 69 368 81 350 81 C 368 81 368 93 350 93" stroke="#388bfd" stroke-width="2.5" fill="none" />
          <text x="375" y="72" fill="#388bfd" font-size="13" font-weight="bold">L</text>
          <line x1="350" y1="93" x2="350" y2="105" stroke="#58a6ff" stroke-width="2.5" />
          <rect x="338" y="105" width="24" height="40" fill="#161b22" stroke="#e3b341" stroke-width="2.5" rx="3" />
          <text x="375" y="128" fill="#e3b341" font-size="13" font-weight="bold">R</text>
          <line x1="350" y1="145" x2="350" y2="155" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="333" y1="155" x2="367" y2="155" stroke="#2da44e" stroke-width="3.5" />
          <line x1="340" y1="165" x2="360" y2="165" stroke="#2da44e" stroke-width="3.5" />
          <text x="378" y="163" fill="#2da44e" font-size="13" font-weight="bold">E</text>
          <text x="376" y="153" fill="#2da44e" font-size="11">+</text>
          <line x1="350" y1="165" x2="350" y2="185" stroke="#58a6ff" stroke-width="2.5" />
          <text x="415" y="45" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="425" y="115" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">vo(t)</text>
          <text x="416" y="180" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
        </svg>
      `,

      tri_meia_onda_controlado_r: `
        <svg viewBox="0 0 520 270" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramento Vertical do Neutro (Comum das 3 fontes) -->
          <line x1="55" y1="35" x2="55" y2="215" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="55" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="85" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="135" r="3.5" fill="#58a6ff" />
          <circle cx="55" cy="215" r="3.5" fill="#58a6ff" />
          <text x="40" y="220" fill="#8b949e" font-size="12" font-weight="bold">n</text>

          <!-- Ramo Fase A -->
          <line x1="55" y1="35" x2="85" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="35" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 35 Q 100 26 105 35 T 114 35" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="66" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">va(t)</text>
          <line x1="123" y1="35" x2="195" y2="35" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,23 195,47 220,35" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="23" x2="220" y2="47" stroke="#238636" stroke-width="3" />
          <path d="M 210 41 L 202 50" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="207" y="62" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">T1</text>
          <line x1="220" y1="35" x2="285" y2="35" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Fase B -->
          <line x1="55" y1="85" x2="85" y2="85" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="85" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 85 Q 100 76 105 85 T 114 85" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="116" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">vb(t)</text>
          <line x1="123" y1="85" x2="195" y2="85" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,73 195,97 220,85" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="73" x2="220" y2="97" stroke="#238636" stroke-width="3" />
          <path d="M 210 91 L 202 100" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="207" y="112" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">T2</text>
          <line x1="220" y1="85" x2="285" y2="85" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Ramo Fase C -->
          <line x1="55" y1="135" x2="85" y2="135" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="105" cy="135" r="18" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 96 135 Q 100 126 105 135 T 114 135" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="105" y="166" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="middle">vc(t)</text>
          <line x1="123" y1="135" x2="195" y2="135" stroke="#58a6ff" stroke-width="2.5" />
          <polygon points="195,123 195,147 220,135" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="220" y1="123" x2="220" y2="147" stroke="#238636" stroke-width="3" />
          <path d="M 210 141 L 202 150" stroke="#f0883e" stroke-width="2" fill="none" />
          <text x="207" y="162" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">T3</text>
          <line x1="220" y1="135" x2="285" y2="135" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Barramento Vertical dos Catodos Comuns -->
          <line x1="285" y1="35" x2="285" y2="160" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="285" cy="35" r="3.5" fill="#58a6ff" />
          <circle cx="285" cy="85" r="3.5" fill="#58a6ff" />
          <circle cx="285" cy="135" r="3.5" fill="#58a6ff" />

          <!-- Carga R: Resistor Zigue-Zague Didatico (Modelo do Professor) -->
          <text x="270" y="166" fill="#58a6ff" font-size="13" font-weight="bold">+</text>
          <line x1="285" y1="160" x2="285" y2="168" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 285 168 L 285 171 L 293 175 L 277 181 L 293 187 L 277 193 L 293 199 L 277 205 L 285 209 L 285 215" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <text x="264" y="195" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>
          <text x="306" y="193" fill="#58a6ff" font-size="12" font-weight="bold">vR</text>
          <text x="272" y="219" fill="#58a6ff" font-size="15" font-weight="bold">-</text>

          <!-- Retorno ao Neutro pela Linha Inferior -->
          <line x1="285" y1="215" x2="55" y2="215" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Caixa Didatica com as Equacoes de Fase -->
          <rect x="345" y="35" width="160" height="110" fill="#161b22" stroke="#30363d" stroke-width="1.5" rx="6" />
          <text x="355" y="58" fill="#8b949e" font-size="11" font-weight="bold">Tensões do Sistema:</text>
          <text x="355" y="82" fill="#79c0ff" font-size="11" font-weight="bold">va(t) = Vp·sen(ωt)</text>
          <text x="355" y="106" fill="#f0883e" font-size="11" font-weight="bold">vb(t) = Vp·sen(ωt - 120°)</text>
          <text x="355" y="130" fill="#d2a8ff" font-size="11" font-weight="bold">vc(t) = Vp·sen(ωt + 120°)</text>
        </svg>
      `,

      tri_ponte_controlado_r: `
        <svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramento Neutro (n) e Conexoes das Fontes a Esquerda -->
          <circle cx="34" cy="125" r="3.5" fill="#58a6ff" />
          <text x="20" y="129" fill="#8b949e" font-size="12" font-weight="bold">n</text>
          <line x1="34" y1="125" x2="50" y2="125" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="85" x2="50" y2="165" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="85" x2="70" y2="85" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="125" x2="70" y2="125" stroke="#58a6ff" stroke-width="2" />
          <line x1="50" y1="165" x2="70" y2="165" stroke="#58a6ff" stroke-width="2" />

          <!-- Fontes Trifasicas va(t), vb(t), vc(t) -->
          <!-- Fonte va(t) -->
          <circle cx="86" cy="85" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 85 Q 82 77 86 85 T 94 85" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="62" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">va(t)</text>

          <!-- Fonte vb(t) -->
          <circle cx="86" cy="125" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 125 Q 82 117 86 125 T 94 125" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="102" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">vb(t)</text>

          <!-- Fonte vc(t) -->
          <circle cx="86" cy="165" r="16" stroke="#58a6ff" stroke-width="2" fill="#161b22" />
          <path d="M 78 165 Q 82 157 86 165 T 94 165" stroke="#58a6ff" stroke-width="2" fill="none" />
          <text x="86" y="142" fill="#f0f6fc" font-size="11" font-weight="bold" text-anchor="middle">vc(t)</text>

          <!-- Linhas Horizontais Paralelas das Fases a, b, c -->
          <!-- Linha Fase a ate Braco 1 (X=190) -->
          <line x1="102" y1="85" x2="190" y2="85" stroke="#58a6ff" stroke-width="2" />
          <circle cx="190" cy="85" r="3.5" fill="#58a6ff" />
          <text x="198" y="82" fill="#58a6ff" font-size="11" font-weight="bold">a</text>

          <!-- Linha Fase b ate Braco 2 (X=270) -->
          <line x1="102" y1="125" x2="270" y2="125" stroke="#58a6ff" stroke-width="2" />
          <circle cx="270" cy="125" r="3.5" fill="#58a6ff" />
          <text x="278" y="122" fill="#58a6ff" font-size="11" font-weight="bold">b</text>

          <!-- Linha Fase c ate Braco 3 (X=350) -->
          <line x1="102" y1="165" x2="350" y2="165" stroke="#58a6ff" stroke-width="2" />
          <circle cx="350" cy="165" r="3.5" fill="#58a6ff" />
          <text x="358" y="162" fill="#58a6ff" font-size="11" font-weight="bold">c</text>

          <!-- Barramentos CC (+) Superior (Y=25) e (-) Inferior (Y=225) -->
          <line x1="190" y1="25" x2="445" y2="25" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="190" y1="225" x2="445" y2="225" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Braco 1 (X=190, Fase a): T1 (topo) e T2 (base) -->
          <circle cx="190" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="190" y1="25" x2="190" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="180,62 200,62 190,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="180" y1="42" x2="200" y2="42" stroke="#238636" stroke-width="2.5" />
          <path d="M 183 50 L 175 55" stroke="#f0883e" stroke-width="1.8" />
          <text x="206" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">T1</text>
          <line x1="190" y1="62" x2="190" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="180,208 200,208 190,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="180" y1="188" x2="200" y2="188" stroke="#238636" stroke-width="2.5" />
          <path d="M 183 196 L 175 201" stroke="#f0883e" stroke-width="1.8" />
          <text x="206" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">T2</text>
          <line x1="190" y1="208" x2="190" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="190" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Braco 2 (X=270, Fase b): T3 (topo) e T4 (base) -->
          <circle cx="270" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="270" y1="25" x2="270" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="260,62 280,62 270,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="260" y1="42" x2="280" y2="42" stroke="#238636" stroke-width="2.5" />
          <path d="M 263 50 L 255 55" stroke="#f0883e" stroke-width="1.8" />
          <text x="286" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">T3</text>
          <line x1="270" y1="62" x2="270" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="260,208 280,208 270,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="260" y1="188" x2="280" y2="188" stroke="#238636" stroke-width="2.5" />
          <path d="M 263 196 L 255 201" stroke="#f0883e" stroke-width="1.8" />
          <text x="286" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">T4</text>
          <line x1="270" y1="208" x2="270" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="270" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Braco 3 (X=350, Fase c): T5 (topo) e T6 (base) -->
          <circle cx="350" cy="25" r="3.5" fill="#58a6ff" />
          <line x1="350" y1="25" x2="350" y2="42" stroke="#58a6ff" stroke-width="2" />
          <polygon points="340,62 360,62 350,42" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="340" y1="42" x2="360" y2="42" stroke="#238636" stroke-width="2.5" />
          <path d="M 343 50 L 335 55" stroke="#f0883e" stroke-width="1.8" />
          <text x="366" y="56" fill="#f0f6fc" font-size="11" font-weight="bold">T5</text>
          <line x1="350" y1="62" x2="350" y2="188" stroke="#58a6ff" stroke-width="2" />
          <polygon points="340,208 360,208 350,188" fill="#238636" stroke="#238636" stroke-width="2" />
          <line x1="340" y1="188" x2="360" y2="188" stroke="#238636" stroke-width="2.5" />
          <path d="M 343 196 L 335 201" stroke="#f0883e" stroke-width="1.8" />
          <text x="366" y="202" fill="#f0f6fc" font-size="11" font-weight="bold">T6</text>
          <line x1="350" y1="208" x2="350" y2="225" stroke="#58a6ff" stroke-width="2" />
          <circle cx="350" cy="225" r="3.5" fill="#58a6ff" />

          <!-- Carga R: Resistor Zigue-Zague Didatico -->
          <line x1="445" y1="25" x2="445" y2="75" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 445 75 L 445 80 L 455 86 L 435 95 L 455 104 L 435 113 L 455 122 L 435 131 L 455 140 L 435 149 L 445 155 L 445 175" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <line x1="445" y1="175" x2="445" y2="225" stroke="#58a6ff" stroke-width="2.5" />
          <text x="466" y="129" fill="#e3b341" font-size="14" font-weight="bold">R</text>

          <!-- Polaridade e Rotulos Didaticos -->
          <text x="425" y="55" fill="#58a6ff" font-size="14" font-weight="bold">+</text>
          <text x="427" y="205" fill="#58a6ff" font-size="16" font-weight="bold">-</text>
          <text x="485" y="129" fill="#58a6ff" font-size="12" font-weight="bold">vo(t)</text>
          <line x1="375" y1="16" x2="415" y2="16" stroke="#f0883e" stroke-width="2" />
          <polygon points="415,13 423,16 415,19" fill="#f0883e" />
          <text x="395" y="10" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>
        </svg>
      `,
      inversor_meia_ponte_r: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos Superior (+) e Inferior (-) -->
          <line x1="90" y1="30" x2="340" y2="30" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="90" y1="190" x2="340" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Fontes CC em Série Vcc/2 com Ponto Médio 0 -->
          <line x1="90" y1="30" x2="90" y2="58" stroke="#58a6ff" stroke-width="2.5" />
          <!-- Fonte Superior Vcc/2: Placa Longa (+) e Placa Curta (-) -->
          <line x1="72" y1="58" x2="108" y2="58" stroke="#58a6ff" stroke-width="3" />
          <line x1="80" y1="68" x2="100" y2="68" stroke="#58a6ff" stroke-width="4.5" />
          <text x="62" y="66" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="end">Vcc / 2</text>

          <!-- Ponto Médio 0 entre as duas fontes -->
          <line x1="90" y1="68" x2="90" y2="152" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="90" cy="110" r="3.5" fill="#58a6ff" />
          <text x="75" y="114" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="end">0</text>

          <!-- Fonte Inferior Vcc/2: Placa Longa (+) e Placa Curta (-) -->
          <line x1="72" y1="152" x2="108" y2="152" stroke="#58a6ff" stroke-width="3" />
          <line x1="80" y1="162" x2="100" y2="162" stroke="#58a6ff" stroke-width="4.5" />
          <text x="62" y="160" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="end">Vcc / 2</text>
          <line x1="90" y1="162" x2="90" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Carga Resistiva R Central na Horizontal entre nó 0 e nó a -->
          <line x1="90" y1="110" x2="180" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 180 110 L 185 110 L 192 98 L 204 122 L 216 98 L 228 122 L 238 98 L 244 110 L 250 110" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <line x1="250" y1="110" x2="340" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="215" y="88" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>

          <!-- Seta de Corrente iR apontando para a esquerda (Conforme Modelo do Professor) -->
          <line x1="230" y1="128" x2="202" y2="128" stroke="#f0883e" stroke-width="1.8" />
          <polygon points="202,125 194,128 202,131" fill="#f0883e" />
          <text x="215" y="144" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">iR</text>

          <!-- Nó a de Saída do Inversor -->
          <circle cx="340" cy="110" r="3.5" fill="#58a6ff" />
          <text x="352" y="114" fill="#58a6ff" font-size="13" font-weight="bold">a</text>

          <!-- Braço Superior: Transistor S1 e Diodo Antiparalelo D1 -->
          <!-- Transistor S1 (Coletor para cima, Emissor para baixo) -->
          <line x1="340" y1="30" x2="340" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="340" y1="48" x2="328" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="328" y1="56" x2="328" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="322" y1="60" x2="322" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="328" y1="82" x2="340" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="338,87 342,93 335,93" fill="#58a6ff" />
          <line x1="340" y1="92" x2="340" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="312" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S1</text>

          <!-- Diodo Antiparalelo D1 (Apontando para CIMA) -->
          <line x1="340" y1="45" x2="368" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="45" x2="368" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="359" y1="55" x2="377" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="359,75 377,75 368,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="368" y1="75" x2="368" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="95" x2="340" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="382" y="69" fill="#238636" font-size="11" font-weight="bold">D1</text>

          <!-- Braço Inferior: Transistor S2 e Diodo Antiparalelo D2 -->
          <!-- Transistor S2 (Coletor para cima, Emissor para baixo) -->
          <line x1="340" y1="110" x2="340" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="340" y1="128" x2="328" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="328" y1="136" x2="328" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="322" y1="140" x2="322" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="328" y1="162" x2="340" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="338,167 342,173 335,173" fill="#58a6ff" />
          <line x1="340" y1="172" x2="340" y2="190" stroke="#58a6ff" stroke-width="2" />
          <text x="312" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S2</text>

          <!-- Diodo Antiparalelo D2 (Apontando para CIMA) -->
          <line x1="340" y1="125" x2="368" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="125" x2="368" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="359" y1="135" x2="377" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="359,155 377,155 368,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="368" y1="155" x2="368" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="175" x2="340" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="382" y="149" fill="#238636" font-size="11" font-weight="bold">D2</text>
        </svg>
      `,
      inversor_meia_ponte_rl: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos Superior (+) e Inferior (-) -->
          <line x1="90" y1="30" x2="340" y2="30" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="90" y1="190" x2="340" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Fontes CC em Série Vcc/2 com Ponto Médio 0 -->
          <line x1="90" y1="30" x2="90" y2="58" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="72" y1="58" x2="108" y2="58" stroke="#58a6ff" stroke-width="3" />
          <line x1="80" y1="68" x2="100" y2="68" stroke="#58a6ff" stroke-width="4.5" />
          <text x="62" y="66" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="end">Vcc / 2</text>

          <line x1="90" y1="68" x2="90" y2="152" stroke="#58a6ff" stroke-width="2.5" />
          <circle cx="90" cy="110" r="3.5" fill="#58a6ff" />
          <text x="75" y="114" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="end">0</text>

          <line x1="72" y1="152" x2="108" y2="152" stroke="#58a6ff" stroke-width="3" />
          <line x1="80" y1="162" x2="100" y2="162" stroke="#58a6ff" stroke-width="4.5" />
          <text x="62" y="160" fill="#f0f6fc" font-size="12" font-weight="bold" text-anchor="end">Vcc / 2</text>
          <line x1="90" y1="162" x2="90" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Carga RL Série Central na Horizontal entre nó 0 e nó a -->
          <line x1="90" y1="110" x2="155" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 155 110 L 160 110 L 167 98 L 179 122 L 191 98 L 203 122 L 210 110 L 215 110" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <text x="185" y="88" fill="#e3b341" font-size="13" font-weight="bold" text-anchor="middle">R</text>

          <path d="M 215 110 A 7.5 7.5 0 0 1 230 110 A 7.5 7.5 0 0 1 245 110 A 7.5 7.5 0 0 1 260 110 A 7.5 7.5 0 0 1 275 110" stroke="#a371f7" stroke-width="2.5" fill="none" />
          <text x="245" y="88" fill="#a371f7" font-size="13" font-weight="bold" text-anchor="middle">L</text>
          <line x1="275" y1="110" x2="340" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Seta de Corrente iR apontando para a esquerda -->
          <line x1="230" y1="128" x2="202" y2="128" stroke="#f0883e" stroke-width="1.8" />
          <polygon points="202,125 194,128 202,131" fill="#f0883e" />
          <text x="215" y="144" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>

          <!-- Nó a de Saída do Inversor -->
          <circle cx="340" cy="110" r="3.5" fill="#58a6ff" />
          <text x="352" y="114" fill="#58a6ff" font-size="13" font-weight="bold">a</text>

          <!-- Braço Superior: Transistor S1 e Diodo Antiparalelo D1 -->
          <line x1="340" y1="30" x2="340" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="340" y1="48" x2="328" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="328" y1="56" x2="328" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="322" y1="60" x2="322" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="328" y1="82" x2="340" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="338,87 342,93 335,93" fill="#58a6ff" />
          <line x1="340" y1="92" x2="340" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="312" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S1</text>

          <line x1="340" y1="45" x2="368" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="45" x2="368" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="359" y1="55" x2="377" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="359,75 377,75 368,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="368" y1="75" x2="368" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="95" x2="340" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="382" y="69" fill="#238636" font-size="11" font-weight="bold">D1</text>

          <!-- Braço Inferior: Transistor S2 e Diodo Antiparalelo D2 -->
          <line x1="340" y1="110" x2="340" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="340" y1="128" x2="328" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="328" y1="136" x2="328" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="322" y1="140" x2="322" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="328" y1="162" x2="340" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="338,167 342,173 335,173" fill="#58a6ff" />
          <line x1="340" y1="172" x2="340" y2="190" stroke="#58a6ff" stroke-width="2" />
          <text x="312" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S2</text>

          <line x1="340" y1="125" x2="368" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="125" x2="368" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="359" y1="135" x2="377" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="359,155 377,155 368,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="368" y1="155" x2="368" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="368" y1="175" x2="340" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="382" y="149" fill="#238636" font-size="11" font-weight="bold">D2</text>
        </svg>
      `,
      inversor_ponte_completa_r: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos Vcc (+) e GND (-) -->
          <line x1="55" y1="30" x2="365" y2="30" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="55" y1="190" x2="365" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Fonte CC Vcc à Esquerda -->
          <line x1="55" y1="30" x2="55" y2="105" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="38" y1="105" x2="72" y2="105" stroke="#58a6ff" stroke-width="3" />
          <line x1="45" y1="115" x2="65" y2="115" stroke="#58a6ff" stroke-width="4.5" />
          <line x1="55" y1="115" x2="55" y2="190" stroke="#58a6ff" stroke-width="2.5" />
          <text x="28" y="114" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="end">Vcc</text>
          <text x="78" y="100" fill="#58a6ff" font-size="12" font-weight="bold">+</text>
          <text x="78" y="125" fill="#58a6ff" font-size="14" font-weight="bold">-</text>

          <!-- Perna 1 (X=175): S1/D1 (Superior) e S4/D4 (Inferior) -->
          <circle cx="175" cy="30" r="3.5" fill="#58a6ff" />
          <line x1="175" y1="30" x2="175" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="175" y1="48" x2="163" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="163" y1="56" x2="163" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="157" y1="60" x2="157" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="163" y1="82" x2="175" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="173,87 177,93 170,93" fill="#58a6ff" />
          <line x1="175" y1="92" x2="175" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="147" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S1</text>

          <line x1="175" y1="45" x2="200" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="45" x2="200" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="191" y1="55" x2="209" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="191,75 209,75 200,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="200" y1="75" x2="200" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="95" x2="175" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="214" y="69" fill="#238636" font-size="11" font-weight="bold">D1</text>

          <!-- Nó a -->
          <circle cx="175" cy="110" r="3.5" fill="#58a6ff" />
          <text x="160" y="105" fill="#58a6ff" font-size="12" font-weight="bold">a</text>

          <line x1="175" y1="110" x2="175" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="175" y1="128" x2="163" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="163" y1="136" x2="163" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="157" y1="140" x2="157" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="163" y1="162" x2="175" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="173,167 177,173 170,173" fill="#58a6ff" />
          <line x1="175" y1="172" x2="175" y2="190" stroke="#58a6ff" stroke-width="2" />
          <circle cx="175" cy="190" r="3.5" fill="#58a6ff" />
          <text x="147" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S4</text>

          <line x1="175" y1="125" x2="200" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="125" x2="200" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="191" y1="135" x2="209" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="191,155 209,155 200,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="200" y1="155" x2="200" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="175" x2="175" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="214" y="149" fill="#238636" font-size="11" font-weight="bold">D4</text>

          <!-- Perna 2 (X=335): S3/D3 (Superior) e S2/D2 (Inferior) -->
          <circle cx="335" cy="30" r="3.5" fill="#58a6ff" />
          <line x1="335" y1="30" x2="335" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="335" y1="48" x2="323" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="323" y1="56" x2="323" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="317" y1="60" x2="317" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="323" y1="82" x2="335" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="333,87 337,93 330,93" fill="#58a6ff" />
          <line x1="335" y1="92" x2="335" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="307" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S3</text>

          <line x1="335" y1="45" x2="360" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="45" x2="360" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="351" y1="55" x2="369" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="351,75 369,75 360,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="360" y1="75" x2="360" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="95" x2="335" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="374" y="69" fill="#238636" font-size="11" font-weight="bold">D3</text>

          <!-- Nó b -->
          <circle cx="335" cy="110" r="3.5" fill="#58a6ff" />
          <text x="345" y="105" fill="#58a6ff" font-size="12" font-weight="bold">b</text>

          <line x1="335" y1="110" x2="335" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="335" y1="128" x2="323" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="323" y1="136" x2="323" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="317" y1="140" x2="317" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="323" y1="162" x2="335" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="333,167 337,173 330,173" fill="#58a6ff" />
          <line x1="335" y1="172" x2="335" y2="190" stroke="#58a6ff" stroke-width="2" />
          <circle cx="335" cy="190" r="3.5" fill="#58a6ff" />
          <text x="307" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S2</text>

          <line x1="335" y1="125" x2="360" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="125" x2="360" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="351" y1="135" x2="369" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="351,155 369,155 360,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="360" y1="155" x2="360" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="175" x2="335" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="374" y="149" fill="#238636" font-size="11" font-weight="bold">D2</text>

          <!-- Carga R Central Horizontal entre Nó a e Nó b -->
          <line x1="175" y1="110" x2="225" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 225 110 L 230 110 L 237 98 L 249 122 L 261 98 L 273 122 L 280 110 L 285 110" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <line x1="285" y1="110" x2="335" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <text x="255" y="88" fill="#e3b341" font-size="14" font-weight="bold" text-anchor="middle">R</text>

          <text x="188" y="103" fill="#58a6ff" font-size="13" font-weight="bold">+</text>
          <text x="322" y="103" fill="#58a6ff" font-size="15" font-weight="bold">-</text>
          <text x="255" y="142" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">vo(t)</text>
          <line x1="240" y1="126" x2="270" y2="126" stroke="#f0883e" stroke-width="1.8" />
          <polygon points="270,123 278,126 270,129" fill="#f0883e" />
          <text x="255" y="122" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>
        </svg>
      `,
      inversor_ponte_completa_rl: `
        <svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Barramentos Vcc (+) e GND (-) -->
          <line x1="55" y1="30" x2="365" y2="30" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="55" y1="190" x2="365" y2="190" stroke="#58a6ff" stroke-width="2.5" />

          <!-- Fonte CC Vcc à Esquerda -->
          <line x1="55" y1="30" x2="55" y2="105" stroke="#58a6ff" stroke-width="2.5" />
          <line x1="38" y1="105" x2="72" y2="105" stroke="#58a6ff" stroke-width="3" />
          <line x1="45" y1="115" x2="65" y2="115" stroke="#58a6ff" stroke-width="4.5" />
          <line x1="55" y1="115" x2="55" y2="190" stroke="#58a6ff" stroke-width="2.5" />
          <text x="28" y="114" fill="#f0f6fc" font-size="13" font-weight="bold" text-anchor="end">Vcc</text>
          <text x="78" y="100" fill="#58a6ff" font-size="12" font-weight="bold">+</text>
          <text x="78" y="125" fill="#58a6ff" font-size="14" font-weight="bold">-</text>

          <!-- Perna 1 (X=175): S1/D1 e S4/D4 -->
          <circle cx="175" cy="30" r="3.5" fill="#58a6ff" />
          <line x1="175" y1="30" x2="175" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="175" y1="48" x2="163" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="163" y1="56" x2="163" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="157" y1="60" x2="157" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="163" y1="82" x2="175" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="173,87 177,93 170,93" fill="#58a6ff" />
          <line x1="175" y1="92" x2="175" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="147" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S1</text>

          <line x1="175" y1="45" x2="200" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="45" x2="200" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="191" y1="55" x2="209" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="191,75 209,75 200,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="200" y1="75" x2="200" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="95" x2="175" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="214" y="69" fill="#238636" font-size="11" font-weight="bold">D1</text>

          <circle cx="175" cy="110" r="3.5" fill="#58a6ff" />
          <text x="160" y="105" fill="#58a6ff" font-size="12" font-weight="bold">a</text>

          <line x1="175" y1="110" x2="175" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="175" y1="128" x2="163" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="163" y1="136" x2="163" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="157" y1="140" x2="157" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="163" y1="162" x2="175" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="173,167 177,173 170,173" fill="#58a6ff" />
          <line x1="175" y1="172" x2="175" y2="190" stroke="#58a6ff" stroke-width="2" />
          <circle cx="175" cy="190" r="3.5" fill="#58a6ff" />
          <text x="147" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S4</text>

          <line x1="175" y1="125" x2="200" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="125" x2="200" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="191" y1="135" x2="209" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="191,155 209,155 200,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="200" y1="155" x2="200" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="200" y1="175" x2="175" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="214" y="149" fill="#238636" font-size="11" font-weight="bold">D4</text>

          <!-- Perna 2 (X=335): S3/D3 e S2/D2 -->
          <circle cx="335" cy="30" r="3.5" fill="#58a6ff" />
          <line x1="335" y1="30" x2="335" y2="48" stroke="#58a6ff" stroke-width="2" />
          <line x1="335" y1="48" x2="323" y2="58" stroke="#58a6ff" stroke-width="2" />
          <line x1="323" y1="56" x2="323" y2="84" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="317" y1="60" x2="317" y2="80" stroke="#f0f6fc" stroke-width="2" />
          <line x1="323" y1="82" x2="335" y2="92" stroke="#58a6ff" stroke-width="2" />
          <polygon points="333,87 337,93 330,93" fill="#58a6ff" />
          <line x1="335" y1="92" x2="335" y2="110" stroke="#58a6ff" stroke-width="2" />
          <text x="307" y="74" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S3</text>

          <line x1="335" y1="45" x2="360" y2="45" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="45" x2="360" y2="55" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="351" y1="55" x2="369" y2="55" stroke="#238636" stroke-width="2.5" />
          <polygon points="351,75 369,75 360,55" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="360" y1="75" x2="360" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="95" x2="335" y2="95" stroke="#58a6ff" stroke-width="1.8" />
          <text x="374" y="69" fill="#238636" font-size="11" font-weight="bold">D3</text>

          <circle cx="335" cy="110" r="3.5" fill="#58a6ff" />
          <text x="345" y="105" fill="#58a6ff" font-size="12" font-weight="bold">b</text>

          <line x1="335" y1="110" x2="335" y2="128" stroke="#58a6ff" stroke-width="2" />
          <line x1="335" y1="128" x2="323" y2="138" stroke="#58a6ff" stroke-width="2" />
          <line x1="323" y1="136" x2="323" y2="164" stroke="#f0f6fc" stroke-width="2.5" />
          <line x1="317" y1="140" x2="317" y2="160" stroke="#f0f6fc" stroke-width="2" />
          <line x1="323" y1="162" x2="335" y2="172" stroke="#58a6ff" stroke-width="2" />
          <polygon points="333,167 337,173 330,173" fill="#58a6ff" />
          <line x1="335" y1="172" x2="335" y2="190" stroke="#58a6ff" stroke-width="2" />
          <circle cx="335" cy="190" r="3.5" fill="#58a6ff" />
          <text x="307" y="154" fill="#2ea043" font-size="12" font-weight="bold" text-anchor="end">S2</text>

          <line x1="335" y1="125" x2="360" y2="125" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="125" x2="360" y2="135" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="351" y1="135" x2="369" y2="135" stroke="#238636" stroke-width="2.5" />
          <polygon points="351,155 369,155 360,135" fill="#238636" stroke="#238636" stroke-width="1.8" />
          <line x1="360" y1="155" x2="360" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <line x1="360" y1="175" x2="335" y2="175" stroke="#58a6ff" stroke-width="1.8" />
          <text x="374" y="149" fill="#238636" font-size="11" font-weight="bold">D2</text>

          <!-- Carga RL Série Central Horizontal entre Nó a e Nó b -->
          <line x1="175" y1="110" x2="205" y2="110" stroke="#58a6ff" stroke-width="2.5" />
          <path d="M 205 110 L 210 110 L 217 98 L 229 122 L 241 98 L 246 110 L 250 110" stroke="#e3b341" stroke-width="2.5" fill="none" />
          <text x="228" y="88" fill="#e3b341" font-size="13" font-weight="bold" text-anchor="middle">R</text>

          <path d="M 250 110 A 7 7 0 0 1 264 110 A 7 7 0 0 1 278 110 A 7 7 0 0 1 292 110 A 7 7 0 0 1 305 110" stroke="#a371f7" stroke-width="2.5" fill="none" />
          <text x="278" y="88" fill="#a371f7" font-size="13" font-weight="bold" text-anchor="middle">L</text>
          <line x1="305" y1="110" x2="335" y2="110" stroke="#58a6ff" stroke-width="2.5" />

          <text x="188" y="103" fill="#58a6ff" font-size="13" font-weight="bold">+</text>
          <text x="322" y="103" fill="#58a6ff" font-size="15" font-weight="bold">-</text>
          <text x="255" y="142" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">vo(t)</text>
          <line x1="240" y1="126" x2="270" y2="126" stroke="#f0883e" stroke-width="1.8" />
          <polygon points="270,123 278,126 270,129" fill="#f0883e" />
          <text x="255" y="122" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">io(t)</text>
        </svg>
      `
    };

    const descricoesTopologias = {
      mono_meia_onda_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Carga Resistiva (R)</div>
        <div>Converte tensão alternada em contínua pulsante unidirecional. O diodo conduz apenas no semiciclo positivo \\([0, \\pi]\\) e bloqueia no semiciclo negativo \\([\\pi, 2\\pi]\\). A corrente acompanha exatamente a forma da tensão (\\(i_o = v_o / R\\)) e se anula em \\(\\omega t = \\pi\\).</div>
      `,
      mono_meia_onda_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Carga Indutiva (RL)</div>
        <div>O indutor armazena energia no campo magnético e sustenta a corrente forçando o diodo a conduzir além de \\(180^\\circ\\), até o ângulo de extinção \\(\\beta > \\pi\\). A saída apresenta tensão momentaneamente negativa no trecho \\([\\pi, \\beta]\\), diminuindo o valor médio \\(V_{o,méd}\\).</div>
      `,
      mono_meia_onda_rl_roda_livre: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Carga RL com Diodo de Roda Livre</div>
        <div>O diodo de roda livre \\(D_2\\) entra em condução em \\(\\omega t = \\pi\\), grampeando a saída em \\(0\\text{ V}\\) e bloqueando excursões negativas. A energia do indutor circula pela malha fechada \\(L-R-D_2\\), elevando \\(V_{o,méd}\\) para \\(V_p/\\pi\\) e permitindo condução contínua (MCC).</div>
      `,
      mono_meia_onda_rle: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Carga RLE (Bateria / FEM)</div>
        <div>Modela carregadores de bateria e motores CC com força contra-eletromotriz (\\(E\\)). O diodo só conduz quando a tensão da rede supera a tensão interna (\\(v_i(t) > E\\)), iniciando a condução no ângulo \\(\\alpha = \\arcsin(E/V_p)\\). Fora de \\([\\alpha, \\beta]\\), a tensão na carga é a própria bateria \\(E\\).</div>
      `,
      mono_meia_onda_rc: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Filtro Capacitivo (RC)</div>
        <div>O capacitor em paralelo opera como filtro de pico: carrega no topo da senoide (\\(V_p\\)) e descarrega suavemente na carga durante o restante do período, reduzindo drasticamente a oscilação de ripple (\\(\\Delta V_o\\)). O diodo conduz apenas em pulsos breves e intensos de recarga.</div>
      `,

      mono_onda_completa_ponte_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte com Carga R</div>
        <div>Retifica ambos os semiciclos da tensão alternada. Os pares de diodos comutam alternadamente: \\(D_1-D_4\\) conduzem no semiciclo positivo \\([0, \\pi]\\) e \\(D_2-D_3\\) no semiciclo negativo \\([\\pi, 2\\pi]\\). A tensão média na saída é dobrada em relação à meia-onda (\\(V_{o,méd} = 2V_p/\\pi\\)) e o fator de potência na entrada é unitário (\\(FP = 1\\)).</div>
      `,
      mono_onda_completa_tap_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa Ponto Médio (Tap Central)</div>
        <div>Utiliza transformador com derivação central e apenas 2 diodos para retificar ambos os semiciclos. Proporciona isolamento galvânico e adaptação de tensão via relação de espiras \\(N = N_1/N_2\\), mas cada diodo suporta o dobro da tensão de pico reversa da perna do secundário (\\(V_{RRM} = 2V_{2p}\\)).</div>
      `,
      mono_onda_completa_ponte_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte com Carga RL</div>
        <div>A ponte retificadora impede que a tensão na carga se torne negativa; a comutação natural entre os pares de diodos mantém corrente contínua contínua (MCC) na carga. A decomposição harmônica de Fourier determina com exatidão a corrente eficaz e o ripple nas frequências pares \\(2\\omega, 4\\omega, 6\\omega\\).</div>
      `,
      mono_onda_completa_ponte_re: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte com Carga RE</div>
        <div>Modela recarga de baterias ou acionamento CC puramente resistivo. A condução é pulsada e ocorre nos dois semiciclos sempre que \\(|v_i(t)| > E\\), nos intervalos \\([\\theta_1, \\pi - \\theta_1]\\) e \\([\\pi + \\theta_1, 2\\pi - \\theta_1]\\). Fora desses trechos, a tensão na saída fixa-se no potencial da bateria \\(E\\).</div>
      `,
      mono_onda_completa_ponte_rle: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte com Carga RLE</div>
        <div>Modela carregadores de bateria com filtro indutivo e motores CC. O indutor armazena energia e pode operar em Modo Descontínuo (MCD, se \\(\\beta < \\pi + \\alpha\\)) ou Modo Contínuo (MCC, se \\(\\beta \\ge \\pi + \\alpha\\)), garantindo corrente ininterrupta com ondulação reduzida sobre a bateria \\(E\\).</div>
      `,

      mono_meia_onda_controlado_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Meia Onda Controlado com Carga R</div>
        <div>Controla a potência entregue à carga por meio do atraso no disparo do tiristor (\\(\\alpha\\)). A condução inicia em \\(\\omega t = \\alpha\\) e se extingue naturalmente na passagem por zero (\\(\\pi\\)). A tensão média varia conforme \\(V_{o,méd} = 0{,}225 V_{ef}(1 + \\cos\\alpha)\\).</div>
      `,
      mono_meia_onda_controlado_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Meia Onda Controlado com Carga RL</div>
        <div>O tiristor é disparado no ângulo \\(\\alpha\\) e a corrente conduz até o ângulo de extinção \\(\\beta > \\pi\\), sustentada pela energia do indutor. No intervalo \\([\\pi, \\beta]\\), a tensão instantânea de saída torna-se negativa. A tensão média é dada por \\(V_{o,méd} = 0{,}225 V_{ef}(\\cos\\alpha - \\cos\\beta)\\).</div>
      `,
      mono_meia_onda_controlado_rl_roda_livre: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Meia Onda Controlado com Roda Livre</div>
        <div>Em \\(\\omega t = \\pi\\), o diodo de roda livre entra em condução, grampeando a tensão na carga em \\(0\\text{ V}\\) e bloqueando valores negativos. A tensão média independe do ângulo de extinção: \\(V_{o,méd} = 0{,}225 V_{ef}(1 + \\cos\\alpha)\\). Se \\(5\\tau > (\\pi+\\alpha)/\\omega\\), a condução é contínua (MCC).</div>
      `,
      mono_meia_onda_controlado_rle: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Meia Onda Controlado com Carga RLE</div>
        <div>Combina disparo controlado por tiristor com carga contendo indutor e força contra-eletromotriz \\(E\\). O disparo é eficaz para \\(\\alpha \\ge \\arcsin(E/V_p)\\). Fora do pulso de condução \\([\\alpha, \\beta]\\), a tensão na carga assume o valor da bateria \\(E\\).</div>
      `,
      mono_onda_completa_controlado_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte Controlado com Carga R</div>
        <div>Ponte monofásica com 4 tiristores acionados em pares: \\(T_1-T_4\\) no semiciclo positivo em \\(\\alpha\\), e \\(T_2-T_3\\) no semiciclo negativo em \\(\\pi + \\alpha\\). A tensão média é controlável na faixa \\([0, 2V_p/\\pi]\\), com \\(V_{o,méd} = \\frac{\\sqrt{2}V_{ef}}{\\pi}(1 + \\cos\\alpha)\\).</div>
      `,
      mono_onda_completa_controlado_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte Controlado com Carga RL</div>
        <div>Apresenta três modos de operação: Condução Descontínua (MCD, \\(\\alpha > \\phi\\)), Crítica (\\(\\alpha = \\phi\\), \\(L = L_{crit}\\)) e Contínua (MCC, \\(\\alpha < \\phi\\)). Em regime contínuo, \\(V_{o,méd} = \\frac{2\\sqrt{2}V_{ef}}{\\pi}\\cos\\alpha\\), permitindo controle suave da tensão de saída.</div>
      `,
      mono_onda_completa_controlado_rle: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Onda Completa em Ponte Controlado com Carga RLE</div>
        <div>Aplica-se ao controle bidirecional de potência em máquinas de corrente contínua e baterias. Opera como retificador para \\(\\alpha < 90^\\circ\\) e inversor não autônomo (regenerativo) para \\(\\alpha > 90^\\circ\\), devolvendo energia da fonte CC \\(E\\) à rede de corrente alternada.</div>
      `,
      tri_meia_onda_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Retificador Trifásico com Ponto Médio</div>
        <div>Alimentado por sistema trifásico com neutro. Cada diodo conduz durante um terço do período (\\(120^\\circ\\)) na fase de maior potencial instantâneo. A frequência de ondulação na carga é \\(3f = 180\\text{ Hz}\\), com tensão média elevada \\(V_{o,méd} \\approx 1{,}17 V_{F,ef}\\).</div>
      `,
      tri_ponte_completa_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Retificador Trifásico em Ponte Completa</div>
        <div>Ponte de 6 diodos onde sempre conduzem dois diodos simultaneamente (um do grupo superior e um do grupo inferior), aplicando a tensão entre fases à carga. Possui 6 etapas por ciclo (\\(6f = 360\\text{ Hz}\\)), tensão média \\(V_{o,méd} = 2{,}339 V_{F,ef} = 1{,}35 V_{L,ef}\\) e excelente fator de potência (\\(FP \\approx 0{,}96\\)).</div>
      `,
      tri_meia_onda_controlado_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Retificador Controlado de 3 Pulsos com Carga R</div>
        <div>O ângulo de disparo \\(\\alpha\\) é referenciado ao ponto de cruzamento natural das tensões de fase (\\(\\omega t = 30^\\circ\\)). Opera em condução contínua para \\(0 \\le \\alpha \\le 30^\\circ\\) com \\(V_{o,méd} = 1{,}17 V_{F,ef}\\cos\\alpha\\), e em condução descontínua para \\(\\alpha > 30^\\circ\\).</div>
      `,
      tri_ponte_controlado_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Retificador Trifásico Controlado em Ponte Completa</div>
        <div>Ponte de Graetz com 6 tiristores. Disparo comutado em pares a cada \\(60^\\circ\\). A condução é contínua para \\(0 \\le \\alpha \\le 60^\\circ\\), com \\(V_{o,méd} = \\frac{3\\sqrt{2}}{\\pi}V_{L,ef}\\cos\\alpha \\approx 1{,}35 V_{L,ef}\\cos\\alpha\\), e descontínua para \\(60^\\circ < \\alpha \\le 120^\\circ\\). Padrão da indústria para acionamentos CC de alta potência.</div>
      `,
      inversor_meia_ponte_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Inversor Monofásico Meia Ponte com Carga Resistiva</div>
        <div>Converte tensão contínua \\(V_{CC}\\) em corrente alternada através de duas chaves semicondutoras ativas (\\(S_1\\) e \\(S_2\\)) e divisor capacitivo central com capacitores idênticos \\(C_1 = C_2\\). No semiciclo positivo \\(S_1\\) conduz e aplica \\(+V_{CC}/2\\) à carga; no semiciclo negativo \\(S_2\\) conduz e aplica \\(-V_{CC}/2\\). Produz onda quadrada pura de valor eficaz \\(V_{o,ef} = V_{CC}/2\\) e fundamental \\(V_{o1,ef} = \\frac{\\sqrt{2}}{\\pi}V_{CC} \\approx 0{,}45 V_{CC}\\).</div>
      `,
      inversor_meia_ponte_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Inversor Monofásico Meia Ponte com Carga Indutiva RL</div>
        <div>A presença de indutância na carga impede descontinuidade brusca de corrente. Diodos em antiparalelo (\\(D_1\\) e \\(D_2\\)) fornecem caminho de roda livre e regeneração de energia para a fonte CC quando os transistores bloqueiam. A corrente \\(i_o(t)\\) possui forma exponencial suave defasada de \\(\\phi\\) radianos em relação à tensão de onda quadrada.</div>
      `,
      inversor_ponte_completa_r: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Inversor Monofásico Ponte Completa (Ponte H) com Carga R</div>
        <div>Circuito clássico com 4 interruptores semicondutores. No primeiro semiciclo, fecham-se \\(S_1\\) e \\(S_2\\), aplicando \\(+V_{CC}\\) diretamente sobre a carga; no semiciclo seguinte fecham-se \\(S_3\\) e \\(S_4\\), invertendo o fluxo com \\(-V_{CC}\\). Dobra a tensão e quadruplica a potência em relação à meia ponte: \\(V_{o,ef} = V_{CC}\\) e fundamental \\(V_{o1,ef} = \\frac{2\\sqrt{2}}{\\pi}V_{CC} \\approx 0{,}90 V_{CC}\\).</div>
      `,
      inversor_ponte_completa_rl: `
        <div style="font-weight: 600; color: #58a6ff; margin-bottom: 4px;">Funcionamento &bull; Inversor Monofásico Ponte Completa com Carga RL</div>
        <div>Ponte H completa com diodos antiparalelo \\(D_1-D_4\\). Ao comutar as chaves, a energia reativa armazenada no campo magnético do indutor \\(L\\) é devolvida à fonte CC através dos diodos, antes dos novos transistores assumirem a condução direta. THD harmônica de tensão de \\(48{,}34\\%\\) composta estritamente de harmônicos ímpares (\\(3^o, 5^o, 7^o, 9^o\\dots\\)).</div>
      `
    };

    function toggleGuiaCircuitos() {
      const box = document.getElementById("guia-circuitos-container");
      if (box) {
        const isHidden = (box.style.display === "none");
        box.style.display = isHidden ? "block" : "none";
        if (isHidden && window.renderMathInElement) {
          renderMathInElement(box, {
            delimiters: [
              {left: "\\(", right: "\\)", display: false},
              {left: "\\[", right: "\\]", display: true}
            ]
          });
        }
      }
    }

    function atualizarSubmodelos() {
      const catSelect = document.getElementById("select-categoria");
      const cat = catSelect ? catSelect.value : "";
      const subSelect = document.getElementById("select-topologia");
      const containerTopologia = document.getElementById("container-topologia");
      const gridCircuito = document.getElementById("grid-circuito");
      const cardResultados = document.getElementById("card-resultados");
      const cardGrafico = document.getElementById("card-grafico");
      const msgDiv = document.getElementById("status-mensagem");

      if (!cat) {
        if (containerTopologia) containerTopologia.style.display = "none";
        if (gridCircuito) gridCircuito.style.display = "none";
        if (cardResultados) cardResultados.style.display = "none";
        if (cardGrafico) cardGrafico.style.display = "none";
        if (subSelect) subSelect.innerHTML = "";
        if (msgDiv) msgDiv.innerHTML = "";
        return;
      }

      subSelect.innerHTML = "";

      const optPrompt = document.createElement("option");
      optPrompt.value = "";
      optPrompt.textContent = "-- Selecione a Topologia Específica --";
      optPrompt.disabled = true;
      optPrompt.selected = true;
      subSelect.appendChild(optPrompt);

      const lista = topologiasPorCategoria[cat] || [];

      const grupos = {};
      lista.forEach(item => {
        const g = item.grupo || "";
        if (!grupos[g]) grupos[g] = [];
        grupos[g].push(item);
      });

      for (const [gNome, items] of Object.entries(grupos)) {
        if (gNome) {
          const grp = document.createElement("optgroup");
          grp.label = gNome;
          items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.nome;
            grp.appendChild(opt);
          });
          subSelect.appendChild(grp);
        } else {
          items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.nome;
            subSelect.appendChild(opt);
          });
        }
      }

      if (containerTopologia) containerTopologia.style.display = "";
      if (gridCircuito) gridCircuito.style.display = "none";
      if (cardResultados) cardResultados.style.display = "none";
      if (cardGrafico) cardGrafico.style.display = "none";
      if (msgDiv) msgDiv.innerHTML = "";
    }

    function atualizarEsquematico(topologiaId) {
      const container = document.getElementById("schematic-display");
      if (esquematicosSVG[topologiaId]) {
        container.innerHTML = esquematicosSVG[topologiaId];
      } else {
        container.innerHTML = esquematicosSVG.trifasico_placeholder;
      }
    }

    // Executado IMEDIATAMENTE sempre que uma topologia for selecionada
    function atualizarInterface() {
      const cat = document.getElementById("select-categoria").value;
      const topologia = document.getElementById("select-topologia").value;
      const gridCircuito = document.getElementById("grid-circuito");
      const cardResultados = document.getElementById("card-resultados");
      const cardGrafico = document.getElementById("card-grafico");

      if (!topologia) {
        if (gridCircuito) gridCircuito.style.display = "none";
        if (cardResultados) cardResultados.style.display = "none";
        if (cardGrafico) cardGrafico.style.display = "none";
        return;
      }

      if (gridCircuito) gridCircuito.style.display = "";

      const container = document.getElementById("dynamic-inputs");

      // 1. ATUALIZA O ESQUEMÁTICO VISUAL INSTANTANEAMENTE
      atualizarEsquematico(topologia);

      // Atualiza o resumo didático de funcionamento do circuito selecionado
      const descBox = document.getElementById("circuit-summary-desc");
      if (descBox) {
        descBox.innerHTML = descricoesTopologias[topologia] || "";
        if (window.renderMathInElement) {
          renderMathInElement(descBox, {
            delimiters: [
              {left: "\\(", right: "\\)", display: false},
              {left: "\\[", right: "\\]", display: true}
            ]
          });
        }
      }

      container.innerHTML = "";

      // 2. ATUALIZA OS CAMPOS DO FORMULÁRIO COM VALORES PADRÃO
      let def_vrms = 220;
      let def_vp = 311.13;
      let def_freq = 60;
      let def_omega = 376.99;
      let def_alpha = 60;
      let label_vrms = "Tensão Eficaz V<sub>ef</sub> [V]";
      let label_vp = "Tensão de Pico V<sub>p</sub> [V]";

      if (topologia === "mono_meia_onda_r") {
        def_vrms = 220; def_vp = 311.13;
      } else if (topologia === "mono_meia_onda_rl") {
        def_vrms = 120; def_vp = 169.71;
      } else if (topologia === "mono_meia_onda_rl_roda_livre") {
        def_vrms = 220; def_vp = 311.13;
      } else if (topologia === "mono_meia_onda_rle") {
        def_vrms = 127; def_vp = 179.61;
      } else if (topologia === "mono_meia_onda_rc") {
        def_vp = 100; def_vrms = 70.71;
      } else if (topologia === "mono_onda_completa_ponte_r") {
        def_vrms = 127.28; def_vp = 180;
      } else if (topologia === "mono_onda_completa_tap_r") {
        def_vrms = 127; def_vp = 179.61;
      } else if (topologia === "mono_onda_completa_ponte_rl") {
        def_vrms = 127.28; def_vp = 180;
      } else if (topologia === "mono_onda_completa_ponte_re") {
        def_vrms = 127.28; def_vp = 180;
      } else if (topologia === "mono_onda_completa_ponte_rle") {
        def_vrms = 127.28; def_vp = 180;
      } else if (topologia === "mono_meia_onda_controlado_r") {
        def_vrms = 127; def_vp = 179.61; def_alpha = 60;
      } else if (topologia === "mono_meia_onda_controlado_rl") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 60;
      } else if (topologia === "mono_meia_onda_controlado_rl_roda_livre") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 60;
      } else if (topologia === "mono_meia_onda_controlado_rle") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 45;
      } else if (topologia === "mono_onda_completa_controlado_r") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 60;
      } else if (topologia === "mono_onda_completa_controlado_rl") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 40;
      } else if (topologia === "mono_onda_completa_controlado_rle") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 60;
      } else if (topologia === "tri_meia_onda_r") {
        def_vrms = 127; def_vp = 179.61;
        label_vrms = "Tensão de Fase Eficaz V<sub>F,ef</sub> [V]";
        label_vp = "Tensão de Fase de Pico V<sub>F,p</sub> [V]";
      } else if (topologia === "tri_ponte_completa_r") {
        def_vrms = 220; def_vp = 311.13;
        label_vrms = "Tensão de Linha Eficaz V<sub>L,ef</sub> [V]";
        label_vp = "Tensão de Linha de Pico V<sub>L,p</sub> [V]";
      } else if (topologia === "tri_meia_onda_controlado_r") {
        def_vrms = 127; def_vp = 179.61; def_alpha = 20;
        label_vrms = "Tensão de Fase Eficaz V<sub>F,ef</sub> [V]";
        label_vp = "Tensão de Fase de Pico V<sub>F,p</sub> [V]";
      } else if (topologia === "tri_ponte_controlado_r") {
        def_vrms = 220; def_vp = 311.13; def_alpha = 40;
        label_vrms = "Tensão de Linha Eficaz V<sub>L,ef</sub> [V]";
        label_vp = "Tensão de Linha de Pico V<sub>L,p</sub> [V]";
      }

      let inputsHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label for="input-vrms">${label_vrms}</label>
            <input type="number" id="input-vrms" step="any" value="${def_vrms}" required>
          </div>
          <div class="form-group">
            <label for="input-vp">${label_vp}</label>
            <input type="number" id="input-vp" step="any" value="${def_vp}" required>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label for="input-freq">Frequência da Rede f [Hz]</label>
            <input type="number" id="input-freq" step="any" value="${def_freq}" required>
          </div>
          <div class="form-group">
            <label for="input-omega">Freq. Angular ω [rad/s]</label>
            <input type="number" id="input-omega" step="any" value="${def_omega}" required>
          </div>
        </div>
      `;

      if (cat === "conversores_cc_ca") {
        inputsHTML = `
          <div class="form-group">
            <label for="input-vrms">Tensão CC de Alimentação V<sub>CC</sub> [V]</label>
            <input type="number" id="input-vrms" step="any" value="100" required>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label for="input-freq">Frequência de Saída f [Hz]</label>
              <input type="number" id="input-freq" step="any" value="${def_freq}" required>
            </div>
            <div class="form-group">
              <label for="input-omega">Freq. Angular ω [rad/s]</label>
              <input type="number" id="input-omega" step="any" value="${def_omega}" required>
            </div>
          </div>
        `;
      }

      if (topologia === "mono_meia_onda_r") {
        inputsHTML += `
          <div class="form-group">
            <label for="input-r">Resistência de Carga R [Ω]</label>
            <input type="number" id="input-r" step="any" value="12" required>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_rl") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="100" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.1" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_rl_roda_livre") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="100" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.1" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_rle") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="12" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.1" required>
            </div>
          </div>
          <div class="form-group">
            <label for="input-e">Tensão da Bateria/FEM E [V]</label>
            <input type="number" id="input-e" step="any" value="36" required>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_rc") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-p0">Potência Desejada na Carga P<sub>o</sub> [W]</label>
              <input type="number" id="input-p0" step="any" value="100" required>
            </div>
            <div class="form-group">
              <label for="input-ripple">Ondulação Desejada ΔV<sub>o</sub> [% de V<sub>p</sub>]</label>
              <input type="number" id="input-ripple" step="any" value="5" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_r") {
        inputsHTML += `
          <div class="form-group">
            <label for="input-r">Resistência de Carga R [Ω]</label>
            <input type="number" id="input-r" step="any" value="80" required>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_tap_r") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-n">Relação de Espiras N = N1 / N2</label>
              <input type="number" id="input-n" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_rl") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.06" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_re") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-e">Tensão da Bateria/FEM E [V]</label>
              <input type="number" id="input-e" step="any" value="100" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_rle") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.1" required>
            </div>
          </div>
          <div class="form-group">
            <label for="input-e">Tensão da Bateria/FEM E [V]</label>
            <input type="number" id="input-e" step="any" value="72" required>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_r") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rl") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.0607" required>
            </div>
          </div>
          <div class="form-group">
            <label for="input-alpha">Ângulo de Disparo α [°]</label>
            <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rl_roda_livre") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.06" required>
            </div>
          </div>
          <div class="form-group">
            <label for="input-alpha">Ângulo de Disparo α [°]</label>
            <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rle") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.05" required>
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label for="input-e">Tensão da Bateria/FEM E [V]</label>
              <input type="number" id="input-e" step="any" value="50" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_r") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="20" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
            </div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_rl") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label for="input-l" style="margin-bottom: 0;">Indutância L [H]</label>
                <button type="button" class="btn-table-tag" onclick="aplicarIndutorCritico()" style="font-size: 0.72rem; padding: 2px 7px; background: rgba(56, 139, 253, 0.15); border: 1px solid #388bfd; color: #58a6ff; font-weight: 600; cursor: pointer; border-radius: 4px;" title="Calcular o indutor crítico (Lcrit) e resolver o memorial no modo de condução crítico">
                  🎯 Calcular Lcrit e Resolver
                </button>
              </div>
              <input type="number" id="input-l" step="any" value="0.06" required>
            </div>
          </div>
          <div class="form-group">
            <label for="input-alpha">Ângulo de Disparo α [°]</label>
            <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_rle") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância L [H]</label>
              <input type="number" id="input-l" step="any" value="0.06" required>
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label for="input-e">Tensão da Bateria/FEM E [V]</label>
              <input type="number" id="input-e" step="any" value="50" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="180" required>
            </div>
          </div>
        `;
      } else if (topologia === "tri_meia_onda_r") {
        inputsHTML += `
          <div class="form-group">
            <label for="input-r">Resistência de Carga R [Ω]</label>
            <input type="number" id="input-r" step="any" value="14" required>
          </div>
        `;
      } else if (topologia === "tri_ponte_completa_r") {
        inputsHTML += `
          <div class="form-group">
            <label for="input-r">Resistência de Carga R [Ω]</label>
            <input type="number" id="input-r" step="any" value="20" required>
          </div>
        `;
      } else if (topologia === "tri_meia_onda_controlado_r") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="20" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="150" required>
            </div>
          </div>
        `;
      } else if (topologia === "tri_ponte_controlado_r") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="14" required>
            </div>
            <div class="form-group">
              <label for="input-alpha">Ângulo de Disparo α [°]</label>
              <input type="number" id="input-alpha" step="any" value="${def_alpha}" min="0" max="120" required>
            </div>
          </div>
        `;
      } else if (topologia === "inversor_meia_ponte_r" || topologia === "inversor_ponte_completa_r") {
        inputsHTML += `
          <div class="form-group">
            <label for="input-r">Resistência de Carga R [Ω]</label>
            <input type="number" id="input-r" step="any" value="10" required>
          </div>
        `;
      } else if (topologia === "inversor_meia_ponte_rl" || topologia === "inversor_ponte_completa_rl") {
        inputsHTML += `
          <div class="grid-2">
            <div class="form-group">
              <label for="input-r">Resistência de Carga R [Ω]</label>
              <input type="number" id="input-r" step="any" value="10" required>
            </div>
            <div class="form-group">
              <label for="input-l">Indutância de Carga L [H]</label>
              <input type="number" id="input-l" step="any" value="0.025" required>
            </div>
          </div>
        `;
      }

      // Parâmetros do diodo opcionais com caixa de seleção (checkbox)
      inputsHTML += `
        <div class="form-group" style="margin-top: 10px; margin-bottom: 8px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #58a6ff; font-weight: 600; font-size: 0.9rem; user-select: none;">
            <input type="checkbox" id="check-diodo" style="width: 16px; height: 16px; cursor: pointer; accent-color: #238636;">
            Informar parâmetros reais dos semicondutores (V<sub>T0</sub>, R<sub>D</sub>, R<sub>JA</sub>, T<sub>A</sub>)
          </label>
        </div>

        <div id="container-diodo-real" style="display: none; padding: 12px; background: rgba(22, 27, 34, 0.7); border: 1px dashed var(--input-border); border-radius: 6px; margin-bottom: 14px;">
          <div class="grid-2">
            <div class="form-group">
              <label for="input-vto">Tensão de Limiar V<sub>T0</sub> [V]</label>
              <input type="number" id="input-vto" step="any" value="1.2">
            </div>
            <div class="form-group">
              <label for="input-rd">Resistência Interna R<sub>D</sub> [Ω]</label>
              <input type="number" id="input-rd" step="any" value="0.5">
            </div>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label for="input-rja">Resistência Térmica R<sub>JA</sub> [°C/W]</label>
              <input type="number" id="input-rja" step="any" value="20">
            </div>
            <div class="form-group">
              <label for="input-ta">Temperatura Ambiente T<sub>A</sub> [°C]</label>
              <input type="number" id="input-ta" step="any" value="25">
            </div>
          </div>
        </div>
      `;

      container.innerHTML = inputsHTML;
      configurarSincronizacaoEntradas();

      // 3. EXECUTA O CÁLCULO E PLOTA O GRÁFICO AUTOMATICAMENTE NA SELEÇÃO
      executarCalculo();
    }

    function configurarSincronizacaoEntradas() {
      const inputVrms = document.getElementById("input-vrms");
      const inputVp = document.getElementById("input-vp");
      const inputFreq = document.getElementById("input-freq");
      const inputOmega = document.getElementById("input-omega");
      const chkDiodo = document.getElementById("check-diodo");

      if (inputVrms && inputVp) {
        inputVrms.addEventListener("input", function() {
          const v = parseFloat(this.value);
          if (!isNaN(v)) {
            inputVp.value = (v * Math.SQRT2).toFixed(2);
          }
        });
        inputVp.addEventListener("input", function() {
          const v = parseFloat(this.value);
          if (!isNaN(v)) {
            inputVrms.value = (v / Math.SQRT2).toFixed(2);
          }
        });
      }

      if (inputFreq && inputOmega) {
        inputFreq.addEventListener("input", function() {
          const f = parseFloat(this.value);
          if (!isNaN(f)) {
            inputOmega.value = (2 * Math.PI * f).toFixed(2);
          }
        });
        inputOmega.addEventListener("input", function() {
          const w = parseFloat(this.value);
          if (!isNaN(w)) {
            inputFreq.value = (w / (2 * Math.PI)).toFixed(2);
          }
        });
      }

      if (chkDiodo) {
        chkDiodo.addEventListener("change", function() {
          const box = document.getElementById("container-diodo-real");
          if (box) {
            box.style.display = this.checked ? "block" : "none";
          }
        });
      }
    }

// Expor handlers inline para o DOM
window.toggleGuiaCircuitos = toggleGuiaCircuitos;
window.atualizarSubmodelos = atualizarSubmodelos;
window.atualizarInterface = atualizarInterface;
window.executarCalculo = executarCalculo;
window.toggleTabelaBeta = toggleTabelaBeta;
window.toggleTabelaPuchlowski = toggleTabelaPuchlowski;
window.mostrarPuchlowskiAba = mostrarPuchlowskiAba;
window.gerarTabelaPuchlowskiHTML = gerarTabelaPuchlowskiHTML;
window.obterPuchlowski = obterPuchlowski;
window.filtrarCanais = filtrarCanais;
window.exportarCSV = exportarCSV;
window.salvarOsciloscopioPNG = salvarOsciloscopioPNG;
window.TABELA_BETA = TABELA_BETA;
window.TABELA_IEFP = TABELA_IEFP;
window.TABELA_IEFP_RODA_LIVRE = TABELA_IEFP_RODA_LIVRE;
window.TABELA_PUCHLOWSKI_IEFP = TABELA_PUCHLOWSKI_IEFP;
window.TABELA_PUCHLOWSKI_BETA = TABELA_PUCHLOWSKI_BETA;
window.TABELA_RODA_LIVRE_IEF = TABELA_RODA_LIVRE_IEF;
window.TABELA_RODA_LIVRE_IG_EFP = TABELA_RODA_LIVRE_IG_EFP;
window.toggleTabelaRodaLivre = toggleTabelaRodaLivre;
window.mostrarRodaLivreAba = mostrarRodaLivreAba;
window.gerarTabelaRodaLivreHTML = gerarTabelaRodaLivreHTML;
window.obterIefRodaLivre = obterIefRodaLivre;
window.obterIgEfpRodaLivre = obterIgEfpRodaLivre;
window.toggleAbacoRLE = toggleAbacoRLE;
window.toggleAbacoIefp = toggleAbacoIefp;
window.gerarAbacoIefpSVG = gerarAbacoIefpSVG;
window.calcularIefpParametrizado = calcularIefpParametrizado;
window.gerarAbacoPuchlowskiSVG = gerarAbacoPuchlowskiSVG;
function aplicarIndutorCritico() {
  const rInput = document.getElementById("input-r");
  const aInput = document.getElementById("input-alpha");
  const fInput = document.getElementById("input-f");
  const lInput = document.getElementById("input-l");
  if (!rInput || !aInput || !lInput) return;

  const R = parseFloat(rInput.value) || 10;
  const alpha = parseFloat(aInput.value) || 40;
  const f = fInput ? (parseFloat(fInput.value) || 60) : 60;
  const omega = 2 * Math.PI * f;
  const a_rad = (alpha * Math.PI) / 180;

  // Condição de condução crítica para onda completa RL: phi = alpha -> Lcrit = (R * tan(alpha)) / omega
  const L_crit = (R * Math.tan(a_rad)) / omega;
  lInput.value = L_crit.toFixed(5);

  // Executa o cálculo e gera o memorial completo
  executarCalculo();

  // Scroll suave até o memorial de cálculo
  setTimeout(() => {
    const mem = document.getElementById("box-memorial");
    if (mem) {
      mem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 60);
}
window.aplicarIndutorCritico = aplicarIndutorCritico;

// Disparo inicial garantido
atualizarSubmodelos();