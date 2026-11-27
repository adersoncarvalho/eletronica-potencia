// ============================================================================
// MÓDULO DE ESTUDO — LISTA 1 P2 (CONVERSORES CC-CC)
// ============================================================================

const SVGS_LISTA1_P2 = {
  fonte_linear: `
    <svg viewBox="0 0 460 155" class="study-svg" role="img" aria-label="Fonte Linear com TBJ">
      <!-- Fonte Vg -->
      <circle cx="55" cy="80" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="55" y="75" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">+</text>
      <text x="55" y="92" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">−</text>
      <text x="20" y="84" fill="var(--text-title)" font-size="11" font-weight="bold" text-anchor="middle">Vg=36V</text>
      <!-- Fios superior e inferior -->
      <line x1="55" y1="60" x2="55" y2="30" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="55" y1="30" x2="180" y2="30" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="55" y1="100" x2="55" y2="130" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="55" y1="130" x2="365" y2="130" stroke="var(--text-main)" stroke-width="2"/>
      <!-- TBJ em série -->
      <line x1="180" y1="30" x2="205" y2="52" stroke="#f0883e" stroke-width="2.2"/>
      <line x1="205" y1="52" x2="235" y2="52" stroke="#f0883e" stroke-width="3"/>
      <line x1="235" y1="52" x2="260" y2="30" stroke="#f0883e" stroke-width="2.2"/>
      <polygon points="256,34 246,35 253,43" fill="#f0883e"/>
      <text x="220" y="20" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">TBJ (Região Ativa)</text>
      <text x="184" y="46" fill="var(--text-muted)" font-size="10">C</text>
      <text x="252" y="46" fill="var(--text-muted)" font-size="10">E</text>
      <!-- Bloco Controle -->
      <line x1="220" y1="52" x2="220" y2="78" stroke="var(--text-muted)" stroke-width="1.6"/>
      <rect x="182" y="78" width="76" height="26" rx="4" fill="var(--input-bg)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="220" y="95" fill="var(--text-title)" font-size="10" font-weight="600" text-anchor="middle">Controle</text>
      <line x1="258" y1="91" x2="310" y2="91" stroke="var(--text-muted)" stroke-width="1.2" stroke-dasharray="3,3"/>
      <!-- Carga R -->
      <line x1="260" y1="30" x2="365" y2="30" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="365" y1="30" x2="365" y2="52" stroke="var(--text-main)" stroke-width="2"/>
      <polyline points="365,52 357,58 373,66 357,74 373,82 357,90 373,98 365,104" fill="none" stroke="#2ea043" stroke-width="2"/>
      <line x1="365" y1="104" x2="365" y2="130" stroke="var(--text-main)" stroke-width="2"/>
      <text x="410" y="78" fill="#2ea043" font-size="11" font-weight="bold" text-anchor="middle">R = 4 Ω</text>
      <text x="410" y="94" fill="var(--text-title)" font-size="11" text-anchor="middle">Vo = 24 V</text>
      <!-- Seta Io -->
      <line x1="295" y1="22" x2="335" y2="22" stroke="#58a6ff" stroke-width="1.8"/>
      <polygon points="335,22 327,18 327,26" fill="#58a6ff"/>
      <text x="315" y="15" fill="#58a6ff" font-size="10" font-weight="bold" text-anchor="middle">Io = 6 A</text>
    </svg>
  `,

  buck_circuito: `
    <svg viewBox="0 0 500 185" class="study-svg" role="img" aria-label="Circuito do Conversor Buck">
      <!-- Fonte Vg -->
      <circle cx="48" cy="95" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="48" y="90" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">+</text>
      <text x="48" y="107" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">−</text>
      <text x="16" y="99" fill="var(--text-title)" font-size="11" font-weight="bold" text-anchor="middle">Vg</text>
      <!-- Malha superior/inferior -->
      <line x1="48" y1="75" x2="48" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="40" x2="115" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="115" x2="48" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="152" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Chave Q1 -->
      <circle cx="115" cy="40" r="3" fill="#f0883e"/>
      <line x1="115" y1="40" x2="155" y2="22" stroke="#f0883e" stroke-width="2.4"/>
      <circle cx="160" cy="40" r="3" fill="#f0883e"/>
      <text x="137" y="16" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">Q1</text>
      <text x="90" y="32" fill="#f0883e" font-size="10" text-anchor="middle">iQ1 →</text>
      <!-- Nó Q1-D1-L -->
      <line x1="160" y1="40" x2="225" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <circle cx="190" cy="40" r="3.5" fill="var(--text-title)"/>
      <!-- Diodo D1 (catodo em cima) -->
      <line x1="190" y1="40" x2="190" y2="78" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="178" y1="78" x2="202" y2="78" stroke="#e3b341" stroke-width="2.2"/>
      <polygon points="190,78 178,104 202,104" fill="none" stroke="#e3b341" stroke-width="2"/>
      <line x1="190" y1="104" x2="190" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="166" y="96" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="end">D1</text>
      <text x="206" y="124" fill="#e3b341" font-size="10">↑ iD1</text>
      <!-- Indutor L -->
      <path d="M225,40 Q235,20 245,40 Q255,20 265,40 Q275,20 285,40 Q295,20 305,40" fill="none" stroke="#58a6ff" stroke-width="2.4"/>
      <text x="265" y="18" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">L</text>
      <text x="265" y="56" fill="#58a6ff" font-size="10" text-anchor="middle">iL →</text>
      <line x1="305" y1="40" x2="420" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Capacitor C -->
      <circle cx="345" cy="40" r="3.5" fill="var(--text-title)"/>
      <line x1="345" y1="40" x2="345" y2="86" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="330" y1="86" x2="360" y2="86" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="330" y1="98" x2="360" y2="98" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="345" y1="98" x2="345" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="323" y="96" fill="#a371f7" font-size="11" font-weight="bold" text-anchor="end">C</text>
      <text x="352" y="70" fill="#a371f7" font-size="10">↓ iC</text>
      <!-- Carga Ro -->
      <line x1="420" y1="40" x2="420" y2="66" stroke="var(--text-main)" stroke-width="2"/>
      <polyline points="420,66 412,72 428,80 412,88 428,96 412,104 428,112 420,118" fill="none" stroke="#2ea043" stroke-width="2"/>
      <line x1="420" y1="118" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="444" y="96" fill="#2ea043" font-size="11" font-weight="bold">Ro</text>
      <text x="430" y="60" fill="#2ea043" font-size="10">↓ Io</text>
      <!-- Polaridade Vo -->
      <text x="470" y="55" fill="var(--text-title)" font-size="12" font-weight="bold">+</text>
      <text x="470" y="98" fill="var(--text-title)" font-size="11" font-weight="bold">Vo</text>
      <text x="470" y="142" fill="var(--text-title)" font-size="12" font-weight="bold">−</text>
    </svg>
  `,

  buck_etapas: `
    <svg viewBox="0 0 560 155" class="study-svg" role="img" aria-label="Etapas 1 e 2 do Conversor Buck">
      <!-- Etapa 1 -->
      <rect x="6" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="140" y="23" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 1 (0 a DT): Q1 ON, D1 OFF</text>
      <circle cx="36" cy="84" r="15" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="36" y="88" fill="var(--accent)" font-size="10" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="36" y1="69" x2="36" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="46" x2="110" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <text x="73" y="40" fill="#2ea043" font-size="9" text-anchor="middle">Q1 fechado →</text>
      <path d="M110,46 Q118,32 126,46 Q134,32 142,46 Q150,32 158,46" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <text x="134" y="62" fill="#58a6ff" font-size="9.5" text-anchor="middle">vL = Vg − Vo &gt; 0</text>
      <line x1="158" y1="46" x2="232" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <rect x="218" y="68" width="28" height="36" rx="3" fill="none" stroke="#2ea043" stroke-width="1.8"/>
      <text x="232" y="90" fill="#2ea043" font-size="9.5" font-weight="bold" text-anchor="middle">Vo</text>
      <line x1="232" y1="46" x2="232" y2="68" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="232" y1="104" x2="232" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="99" x2="36" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="128" x2="232" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <text x="134" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">iL cresce linearmente (fonte carrega L e carga)</text>

      <!-- Etapa 2 -->
      <rect x="286" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="420" y="23" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="middle">Etapa 2 (DT a T): Q1 OFF, D1 ON</text>
      <line x1="348" y1="46" x2="390" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="348" y1="46" x2="348" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <text x="336" y="90" fill="#e3b341" font-size="9" text-anchor="end">D1 ON ↑</text>
      <path d="M390,46 Q398,32 406,46 Q414,32 422,46 Q430,32 438,46" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <text x="414" y="62" fill="#f85149" font-size="9.5" text-anchor="middle">vL = −Vo &lt; 0</text>
      <line x1="438" y1="46" x2="512" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <rect x="498" y="68" width="28" height="36" rx="3" fill="none" stroke="#2ea043" stroke-width="1.8"/>
      <text x="512" y="90" fill="#2ea043" font-size="9.5" font-weight="bold" text-anchor="middle">Vo</text>
      <line x1="512" y1="46" x2="512" y2="68" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="512" y1="104" x2="512" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="348" y1="128" x2="512" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <text x="420" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">iL decresce linearmente (roda livre via D1)</text>
    </svg>
  `,

  buck_ondas_vl_il: `
    <svg viewBox="0 0 540 215" class="study-svg" role="img" aria-label="Formas de onda vL e iL no Buck">
      <!-- Eixos vL -->
      <text x="14" y="20" fill="#58a6ff" font-size="11" font-weight="bold">vL(t)</text>
      <line x1="55" y1="58" x2="515" y2="58" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="55" y1="14" x2="55" y2="96" stroke="var(--text-muted)" stroke-width="1.2"/>
      <!-- Onda vL -->
      <polyline points="55,24 175,24 175,86 325,86 325,24 445,24 445,86 510,86" fill="none" stroke="#58a6ff" stroke-width="2.4"/>
      <text x="50" y="28" fill="#58a6ff" font-size="9.5" text-anchor="end">Vg−Vo</text>
      <text x="50" y="61" fill="var(--text-muted)" font-size="9.5" text-anchor="end">0</text>
      <text x="50" y="89" fill="#f85149" font-size="9.5" text-anchor="end">−Vo</text>

      <!-- Eixos iL -->
      <text x="14" y="122" fill="#2ea043" font-size="11" font-weight="bold">iL(t)</text>
      <line x1="55" y1="194" x2="515" y2="194" stroke="var(--text-muted)" stroke-width="1.2"/>
      <line x1="55" y1="112" x2="55" y2="194" stroke="var(--text-muted)" stroke-width="1.2"/>
      <line x1="55" y1="150" x2="510" y2="150" stroke="#e3b341" stroke-width="1.2" stroke-dasharray="4,4"/>
      <!-- Onda iL -->
      <polyline points="55,170 175,130 325,170 445,130 510,152" fill="none" stroke="#2ea043" stroke-width="2.4"/>
      <text x="50" y="133" fill="#2ea043" font-size="9.5" text-anchor="end">ILmax</text>
      <text x="50" y="153" fill="#e3b341" font-size="9.5" text-anchor="end">IL=Io</text>
      <text x="50" y="173" fill="#2ea043" font-size="9.5" text-anchor="end">ILmin</text>
      <!-- Guias verticais -->
      <line x1="175" y1="18" x2="175" y2="194" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="325" y1="18" x2="325" y2="194" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="445" y1="18" x2="445" y2="194" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <text x="55" y="208" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">0</text>
      <text x="175" y="208" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">DT</text>
      <text x="325" y="208" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">T</text>
      <text x="445" y="208" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">T+DT</text>
    </svg>
  `,

  buck_ondas_cap: `
    <svg viewBox="0 0 540 250" class="study-svg" role="img" aria-label="Formas de onda iQ1, iD1, iC e vC no Buck">
      <!-- iQ1 e iD1 -->
      <text x="10" y="20" fill="#f0883e" font-size="10.5" font-weight="bold">iQ1 / iD1</text>
      <line x1="65" y1="68" x2="510" y2="68" stroke="var(--text-muted)" stroke-width="1"/>
      <polyline points="65,68 65,42 185,22 185,68 335,68 335,42 455,22 455,68" fill="none" stroke="#f0883e" stroke-width="2.2"/>
      <polyline points="65,68 185,68 185,22 335,42 335,68 455,68 455,22 510,31" fill="none" stroke="#e3b341" stroke-width="2.2" stroke-dasharray="5,2"/>
      <text x="125" y="20" fill="#f0883e" font-size="9.5" text-anchor="middle">iQ1 (0 a DT)</text>
      <text x="260" y="20" fill="#e3b341" font-size="9.5" text-anchor="middle">iD1 (DT a T)</text>

      <!-- iC -->
      <text x="10" y="100" fill="#a371f7" font-size="10.5" font-weight="bold">iC(t)</text>
      <line x1="65" y1="126" x2="510" y2="126" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
      <polyline points="65,150 185,102 335,150 455,102 510,124" fill="none" stroke="#a371f7" stroke-width="2.2"/>
      <text x="60" y="105" fill="#a371f7" font-size="9" text-anchor="end">+ΔiL/2</text>
      <text x="60" y="153" fill="#a371f7" font-size="9" text-anchor="end">−ΔiL/2</text>

      <!-- vC (parábolas) -->
      <text x="10" y="182" fill="#2ea043" font-size="10.5" font-weight="bold">vC(t)</text>
      <line x1="65" y1="205" x2="510" y2="205" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
      <path d="M65,205 Q125,235 185,205 Q260,175 335,205 Q395,235 455,205 Q482,190 510,192" fill="none" stroke="#2ea043" stroke-width="2.4"/>
      <text x="60" y="208" fill="var(--text-muted)" font-size="9" text-anchor="end">Vo</text>
      <text x="125" y="232" fill="#2ea043" font-size="9" text-anchor="middle">Mín (DT/2)</text>
      <text x="260" y="182" fill="#2ea043" font-size="9" text-anchor="middle">Máx ((1+D)T/2)</text>

      <!-- Guias -->
      <line x1="185" y1="14" x2="185" y2="236" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="335" y1="14" x2="335" y2="236" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="455" y1="14" x2="455" y2="236" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <text x="65" y="246" fill="var(--text-muted)" font-size="9" text-anchor="middle">0</text>
      <text x="185" y="246" fill="var(--text-muted)" font-size="9" text-anchor="middle">DT</text>
      <text x="335" y="246" fill="var(--text-muted)" font-size="9" text-anchor="middle">T</text>
      <text x="455" y="246" fill="var(--text-muted)" font-size="9" text-anchor="middle">T+DT</text>
    </svg>
  `,

  boost_circuito: `
    <svg viewBox="0 0 500 185" class="study-svg" role="img" aria-label="Circuito do Conversor Boost">
      <!-- Fonte Vg -->
      <circle cx="48" cy="95" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="48" y="90" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">+</text>
      <text x="48" y="107" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">−</text>
      <text x="16" y="99" fill="var(--text-title)" font-size="11" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="48" y1="75" x2="48" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="40" x2="95" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="115" x2="48" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="152" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Indutor L na entrada -->
      <path d="M95,40 Q105,20 115,40 Q125,20 135,40 Q145,20 155,40 Q165,20 175,40" fill="none" stroke="#58a6ff" stroke-width="2.4"/>
      <text x="135" y="18" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">L</text>
      <text x="135" y="56" fill="#58a6ff" font-size="10" text-anchor="middle">iL = ig →</text>
      <line x1="175" y1="40" x2="235" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Chave Q1 para terra -->
      <circle cx="205" cy="40" r="3.5" fill="var(--text-title)"/>
      <line x1="205" y1="40" x2="205" y2="75" stroke="var(--text-main)" stroke-width="2"/>
      <circle cx="205" cy="75" r="3" fill="#f0883e"/>
      <line x1="205" y1="75" x2="188" y2="112" stroke="#f0883e" stroke-width="2.4"/>
      <circle cx="205" cy="115" r="3" fill="#f0883e"/>
      <line x1="205" y1="115" x2="205" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="180" y="98" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="end">Q1</text>
      <text x="215" y="100" fill="#f0883e" font-size="10">↓ iQ1</text>
      <!-- Diodo D1 em série -->
      <polygon points="235,28 235,52 262,40" fill="none" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="262" y1="28" x2="262" y2="52" stroke="#e3b341" stroke-width="2.2"/>
      <text x="248" y="18" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="middle">D1</text>
      <text x="292" y="32" fill="#e3b341" font-size="10" text-anchor="middle">iD1 →</text>
      <line x1="262" y1="40" x2="420" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Capacitor C -->
      <circle cx="345" cy="40" r="3.5" fill="var(--text-title)"/>
      <line x1="345" y1="40" x2="345" y2="86" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="330" y1="86" x2="360" y2="86" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="330" y1="98" x2="360" y2="98" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="345" y1="98" x2="345" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="323" y="96" fill="#a371f7" font-size="11" font-weight="bold" text-anchor="end">C</text>
      <text x="352" y="70" fill="#a371f7" font-size="10">↓ iC</text>
      <!-- Carga Ro -->
      <line x1="420" y1="40" x2="420" y2="66" stroke="var(--text-main)" stroke-width="2"/>
      <polyline points="420,66 412,72 428,80 412,88 428,96 412,104 428,112 420,118" fill="none" stroke="#2ea043" stroke-width="2"/>
      <line x1="420" y1="118" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="444" y="96" fill="#2ea043" font-size="11" font-weight="bold">Ro</text>
      <text x="430" y="60" fill="#2ea043" font-size="10">↓ Io</text>
      <text x="470" y="55" fill="var(--text-title)" font-size="12" font-weight="bold">+</text>
      <text x="470" y="98" fill="var(--text-title)" font-size="11" font-weight="bold">Vo</text>
      <text x="470" y="142" fill="var(--text-title)" font-size="12" font-weight="bold">−</text>
    </svg>
  `,

  boost_etapas: `
    <svg viewBox="0 0 560 155" class="study-svg" role="img" aria-label="Etapas 1 e 2 do Conversor Boost">
      <!-- Etapa 1 -->
      <rect x="6" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="140" y="23" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 1 (0 a DT): Q1 ON, D1 OFF</text>
      <circle cx="36" cy="84" r="15" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="36" y="88" fill="var(--accent)" font-size="10" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="36" y1="69" x2="36" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="46" x2="68" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <path d="M68,46 Q76,32 84,46 Q92,32 100,46 Q108,32 116,46" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <text x="92" y="64" fill="#58a6ff" font-size="9.5" text-anchor="middle">vL = Vg &gt; 0</text>
      <line x1="116" y1="46" x2="145" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="145" y1="46" x2="145" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="99" x2="36" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="36" y1="128" x2="145" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <text x="152" y="90" fill="#f0883e" font-size="9">Q1 ON</text>
      <rect x="205" y="56" width="52" height="64" rx="4" fill="none" stroke="#a371f7" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="231" y="84" fill="#a371f7" font-size="9" text-anchor="middle">C supre</text>
      <text x="231" y="98" fill="#a371f7" font-size="9" text-anchor="middle">Ro (Io)</text>
      <text x="140" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">Fonte carrega L; C alimenta a carga sozinho</text>

      <!-- Etapa 2 -->
      <rect x="286" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="420" y="23" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="middle">Etapa 2 (DT a T): Q1 OFF, D1 ON</text>
      <circle cx="316" cy="84" r="15" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="316" y="88" fill="var(--accent)" font-size="10" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="316" y1="69" x2="316" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="316" y1="46" x2="352" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <path d="M352,46 Q360,32 368,46 Q376,32 384,46 Q392,32 400,46" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <text x="376" y="64" fill="#f85149" font-size="9.5" text-anchor="middle">vL = Vg − Vo &lt; 0</text>
      <line x1="400" y1="46" x2="512" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <text x="456" y="40" fill="#e3b341" font-size="9" text-anchor="middle">D1 ON →</text>
      <rect x="498" y="68" width="28" height="36" rx="3" fill="none" stroke="#2ea043" stroke-width="1.8"/>
      <text x="512" y="90" fill="#2ea043" font-size="9.5" font-weight="bold" text-anchor="middle">Vo</text>
      <line x1="512" y1="46" x2="512" y2="68" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="512" y1="104" x2="512" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="316" y1="99" x2="316" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="316" y1="128" x2="512" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <text x="420" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">Vg + L transferem energia para C e carga</text>
    </svg>
  `,

  boost_ondas_cap: `
    <svg viewBox="0 0 540 245" class="study-svg" role="img" aria-label="Formas de onda iC e vC no Boost e Buck-Boost">
      <!-- iD1 -->
      <text x="10" y="20" fill="#e3b341" font-size="10.5" font-weight="bold">iD1(t)</text>
      <line x1="72" y1="62" x2="510" y2="62" stroke="var(--text-muted)" stroke-width="1"/>
      <polyline points="72,62 212,62 212,20 332,36 332,62 472,62 472,20 510,25" fill="none" stroke="#e3b341" stroke-width="2.2"/>
      <text x="66" y="24" fill="#e3b341" font-size="9" text-anchor="end">ILmax</text>
      <text x="66" y="40" fill="#e3b341" font-size="9" text-anchor="end">ILmin</text>

      <!-- iC -->
      <text x="10" y="96" fill="#a371f7" font-size="10.5" font-weight="bold">iC(t)</text>
      <line x1="72" y1="126" x2="510" y2="126" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
      <polyline points="72,148 212,148 212,92 332,108 332,148 472,148 472,92 510,97" fill="none" stroke="#a371f7" stroke-width="2.2"/>
      <text x="66" y="95" fill="#a371f7" font-size="8.5" text-anchor="end">ILmax−Io</text>
      <text x="66" y="151" fill="#a371f7" font-size="9" text-anchor="end">−Io</text>

      <!-- vC (reta na Etapa 1, parábola na Etapa 2) -->
      <text x="10" y="182" fill="#2ea043" font-size="10.5" font-weight="bold">vC(t)</text>
      <line x1="72" y1="204" x2="510" y2="204" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
      <path d="M72,184 L212,224 Q272,190 332,184 L472,224 Q492,208 510,198" fill="none" stroke="#2ea043" stroke-width="2.4"/>
      <text x="66" y="187" fill="#2ea043" font-size="9" text-anchor="end">Máx</text>
      <text x="66" y="207" fill="var(--text-muted)" font-size="9" text-anchor="end">|Vo|</text>
      <text x="66" y="227" fill="#2ea043" font-size="9" text-anchor="end">Mín</text>
      <text x="142" y="198" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">Reta</text>
      <text x="272" y="184" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">Parábola</text>

      <line x1="212" y1="14" x2="212" y2="234" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="332" y1="14" x2="332" y2="234" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <line x1="472" y1="14" x2="472" y2="234" stroke="var(--card-border)" stroke-dasharray="2,3"/>
      <text x="72" y="242" fill="var(--text-muted)" font-size="9" text-anchor="middle">0</text>
      <text x="212" y="242" fill="var(--text-muted)" font-size="9" text-anchor="middle">DT</text>
      <text x="332" y="242" fill="var(--text-muted)" font-size="9" text-anchor="middle">T</text>
      <text x="472" y="242" fill="var(--text-muted)" font-size="9" text-anchor="middle">T+DT</text>
    </svg>
  `,

  buckboost_circuito: `
    <svg viewBox="0 0 500 185" class="study-svg" role="img" aria-label="Circuito do Conversor Buck-Boost">
      <!-- Fonte Vg -->
      <circle cx="48" cy="95" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text x="48" y="90" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">+</text>
      <text x="48" y="107" fill="var(--accent)" font-size="13" font-weight="bold" text-anchor="middle">−</text>
      <text x="16" y="99" fill="var(--text-title)" font-size="11" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="48" y1="75" x2="48" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="40" x2="108" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="115" x2="48" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="48" y1="152" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Chave Q1 -->
      <circle cx="108" cy="40" r="3" fill="#f0883e"/>
      <line x1="108" y1="40" x2="148" y2="22" stroke="#f0883e" stroke-width="2.4"/>
      <circle cx="152" cy="40" r="3" fill="#f0883e"/>
      <text x="130" y="16" fill="#f0883e" font-size="11" font-weight="bold" text-anchor="middle">Q1</text>
      <text x="82" y="32" fill="#f0883e" font-size="10" text-anchor="middle">iQ1 →</text>
      <line x1="152" y1="40" x2="232" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Indutor L em derivação para terra -->
      <circle cx="192" cy="40" r="3.5" fill="var(--text-title)"/>
      <line x1="192" y1="40" x2="192" y2="62" stroke="var(--text-main)" stroke-width="2"/>
      <path d="M192,62 Q210,70 192,78 Q210,86 192,94 Q210,102 192,110 Q210,118 192,126" fill="none" stroke="#58a6ff" stroke-width="2.4"/>
      <line x1="192" y1="126" x2="192" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="174" y="98" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="end">L</text>
      <text x="212" y="98" fill="#58a6ff" font-size="10">↓ iL</text>
      <!-- Diodo D1 apontando para a esquerda -->
      <line x1="232" y1="28" x2="232" y2="52" stroke="#e3b341" stroke-width="2.2"/>
      <polygon points="232,40 260,28 260,52" fill="none" stroke="#e3b341" stroke-width="2.2"/>
      <text x="246" y="18" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="middle">D1</text>
      <text x="292" y="32" fill="#e3b341" font-size="10" text-anchor="middle">← iD1</text>
      <line x1="260" y1="40" x2="420" y2="40" stroke="var(--text-main)" stroke-width="2"/>
      <!-- Capacitor C -->
      <circle cx="345" cy="40" r="3.5" fill="var(--text-title)"/>
      <line x1="345" y1="40" x2="345" y2="86" stroke="var(--text-main)" stroke-width="2"/>
      <line x1="330" y1="86" x2="360" y2="86" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="330" y1="98" x2="360" y2="98" stroke="#a371f7" stroke-width="2.4"/>
      <line x1="345" y1="98" x2="345" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="323" y="96" fill="#a371f7" font-size="11" font-weight="bold" text-anchor="end">C</text>
      <text x="352" y="72" fill="#a371f7" font-size="10">↑ iC</text>
      <!-- Carga Ro -->
      <line x1="420" y1="40" x2="420" y2="66" stroke="var(--text-main)" stroke-width="2"/>
      <polyline points="420,66 412,72 428,80 412,88 428,96 412,104 428,112 420,118" fill="none" stroke="#2ea043" stroke-width="2"/>
      <line x1="420" y1="118" x2="420" y2="152" stroke="var(--text-main)" stroke-width="2"/>
      <text x="444" y="96" fill="#2ea043" font-size="11" font-weight="bold">Ro</text>
      <text x="430" y="60" fill="#2ea043" font-size="10">↑ Io</text>
      <!-- Polaridade invertida Vo -->
      <text x="472" y="55" fill="#f85149" font-size="12" font-weight="bold">−</text>
      <text x="472" y="98" fill="var(--text-title)" font-size="11" font-weight="bold">|Vo|</text>
      <text x="472" y="142" fill="#2ea043" font-size="12" font-weight="bold">+</text>
    </svg>
  `,

  buckboost_etapas: `
    <svg viewBox="0 0 560 155" class="study-svg" role="img" aria-label="Etapas 1 e 2 do Conversor Buck-Boost">
      <!-- Etapa 1 -->
      <rect x="6" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="140" y="23" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 1 (0 a DT): Q1 ON, D1 OFF</text>
      <circle cx="38" cy="84" r="15" fill="none" stroke="var(--accent)" stroke-width="1.8"/>
      <text x="38" y="88" fill="var(--accent)" font-size="10" font-weight="bold" text-anchor="middle">Vg</text>
      <line x1="38" y1="69" x2="38" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="38" y1="46" x2="140" y2="46" stroke="#2ea043" stroke-width="2.2"/>
      <text x="89" y="40" fill="#2ea043" font-size="9" text-anchor="middle">Q1 ON →</text>
      <path d="M140,62 Q154,70 140,78 Q154,86 140,94 Q154,102 140,110" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <line x1="140" y1="46" x2="140" y2="62" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="140" y1="110" x2="140" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="38" y1="99" x2="38" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <line x1="38" y1="128" x2="140" y2="128" stroke="#2ea043" stroke-width="2.2"/>
      <text x="104" y="90" fill="#58a6ff" font-size="9.5" text-anchor="middle">vL = Vg</text>
      <rect x="196" y="56" width="62" height="64" rx="4" fill="none" stroke="#a371f7" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="227" y="84" fill="#a371f7" font-size="9" text-anchor="middle">C supre</text>
      <text x="227" y="98" fill="#a371f7" font-size="9" text-anchor="middle">Ro (Io)</text>
      <text x="140" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">Fonte carrega apenas L; carga isolada</text>

      <!-- Etapa 2 -->
      <rect x="286" y="6" width="268" height="142" rx="6" fill="var(--input-bg)" stroke="var(--card-border)"/>
      <text x="420" y="23" fill="#e3b341" font-size="11" font-weight="bold" text-anchor="middle">Etapa 2 (DT a T): Q1 OFF, D1 ON</text>
      <path d="M356,62 Q370,70 356,78 Q370,86 356,94 Q370,102 356,110" fill="none" stroke="#58a6ff" stroke-width="2.2"/>
      <line x1="356" y1="46" x2="356" y2="62" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="356" y1="110" x2="356" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="356" y1="46" x2="495" y2="46" stroke="#e3b341" stroke-width="2.2"/>
      <text x="426" y="40" fill="#e3b341" font-size="9" text-anchor="middle">← D1 ON (inverte polaridade)</text>
      <rect x="480" y="68" width="32" height="36" rx="3" fill="none" stroke="#2ea043" stroke-width="1.8"/>
      <text x="496" y="90" fill="#2ea043" font-size="9.5" font-weight="bold" text-anchor="middle">|Vo|</text>
      <line x1="495" y1="46" x2="495" y2="68" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="495" y1="104" x2="495" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <line x1="356" y1="128" x2="495" y2="128" stroke="#e3b341" stroke-width="2.2"/>
      <text x="320" y="90" fill="#f85149" font-size="9.5" text-anchor="middle">vL = −|Vo|</text>
      <text x="420" y="142" fill="var(--text-muted)" font-size="9.5" text-anchor="middle">Fonte isolada; L transfere energia para C e Ro</text>
    </svg>
  `
};

const EXERCICIOS_LISTA1_P2 = [
  {
    id: 1,
    grupo: "linear",
    tag: "Fonte Linear",
    titulo: "Exercício 1 — Fonte Linear Série com TBJ",
    enunciado: `
      <p>A fonte linear alimenta uma carga resistiva \\(R = 4\\,\\Omega\\) a partir de uma fonte \\(V_g = 36\\text{ V}\\). O TBJ está em série entre a fonte e a carga e é ajustado por um circuito de controle para manter a tensão \\(V_o\\) na carga.</p>
      <ul class="study-items">
        <li><strong>a)</strong> Em que região de operação o TBJ trabalha nessa fonte?</li>
        <li><strong>b)</strong> Para \\(V_o = 24\\text{ V}\\), calcule a corrente na carga, a potência na carga (\\(P_o\\)), a potência fornecida pela fonte (\\(P_g\\)), a perda no transistor (\\(P_T\\)) e o rendimento \\(\\eta = P_o / P_g\\). Despreze a corrente de base do TBJ.</li>
      </ul>
      ${SVGS_LISTA1_P2.fonte_linear}
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> Região <strong>Ativa (Linear)</strong></div>
        <div><strong>b)</strong> \\(I_o = 6{,}0\\text{ A}\\) | \\(P_o = 144\\text{ W}\\) | \\(P_g = 216\\text{ W}\\) | \\(P_T = 72\\text{ W}\\) | \\(\\eta = 66{,}67\\%\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Região de Operação do TBJ</div>
        <div class="step-desc">O TBJ atua como um resistor variável controlado em série com a carga, absorvendo a diferença de tensão \\(V_{CE} = V_g - V_o > 0\\) enquanto conduz continuamente a corrente da carga \\(I_C \\approx I_o > 0\\). Portanto, opera na <strong>região ativa (linear)</strong>, dissipando energia em forma de calor (ao contrário dos conversores chaveados, onde o transistor opera em corte e saturação).</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Corrente, Potências e Rendimento (Vo = 24 V)</div>
        <div class="step-desc">1. Corrente na carga (Lei de Ohm):</div>
        <div class="math-block">\\[ I_o = \\frac{V_o}{R} = \\frac{24}{4} = 6{,}0\\text{ A} \\]</div>
        <div class="step-desc">2. Potência entregue à carga:</div>
        <div class="math-block">\\[ P_o = V_o \\cdot I_o = 24 \\cdot 6{,}0 = 144\\text{ W} \\]</div>
        <div class="step-desc">3. Potência fornecida pela fonte (desprezando \\(I_B\\), temos \\(I_g = I_C \\approx I_E = I_o = 6{,}0\\text{ A}\\)):</div>
        <div class="math-block">\\[ P_g = V_g \\cdot I_g = 36 \\cdot 6{,}0 = 216\\text{ W} \\]</div>
        <div class="step-desc">4. Perda dissipada no transistor (\\(V_{CE} = V_g - V_o = 36 - 24 = 12\\text{ V}\\)):</div>
        <div class="math-block">\\[ P_T = V_{CE} \\cdot I_o = 12 \\cdot 6{,}0 = 72\\text{ W} \\qquad (\\text{ou } P_T = P_g - P_o = 216 - 144 = 72\\text{ W}) \\]</div>
        <div class="step-desc">5. Rendimento da fonte linear:</div>
        <div class="math-block">\\[ \\eta = \\frac{P_o}{P_g} = \\frac{144}{216} = \\frac{V_o}{V_g} = \\frac{24}{36} = 0{,}6667 = 66{,}67\\% \\]</div>
      </div>
    `
  },
  {
    id: 2,
    grupo: "buck",
    tag: "Conversor Buck",
    titulo: "Exercício 2 — Topologia e Funcionamento do Conversor Buck",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor CC-CC Buck, com fonte \\(V_g\\), interruptor \\(Q_1\\), diodo \\(D_1\\), indutor \\(L\\), capacitor \\(C\\) e carga \\(R_o\\). Indique a polaridade das tensões \\(V_g\\) e \\(V_o\\) e o sentido das correntes \\(i_L\\), \\(i_{Q1}\\), \\(i_{D1}\\), \\(i_C\\) e \\(I_o\\).</li>
        <li><strong>b)</strong> Explique o funcionamento do conversor Buck e descreva a relação entre \\(V_o\\) e \\(V_g\\) e a polaridade da saída.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> Circuito Buck com \\(Q_1\\) em série, \\(D_1\\) em derivação (catodo no nó \\(Q_1\\text{–}L\\)) e filtro \\(LC\\) na saída.</div>
        <div><strong>b)</strong> Conversor <strong>abaixador não inversor</strong>: \\(V_o = D \\cdot V_g\\) (\\(0 \\le V_o \\le V_g\\)), mesma polaridade da entrada.</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Esquemático Completo do Conversor Buck</div>
        ${SVGS_LISTA1_P2.buck_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Princípio de Funcionamento, Relação Vo/Vg e Polaridade</div>
        <div class="step-desc">
          <p>• <strong>Chaveamento e filtragem:</strong> O interruptor \\(Q_1\\) liga e desliga em alta frequência \\(f_s = 1/T\\) com razão cíclica \\(D = t_{on}/T\\), gerando uma onda pulsada de tensão (amplitude \\(V_g\\)) na entrada do filtro passa-baixas \\(LC\\), que extrai seu valor médio na carga.</p>
          <p>• <strong>Etapa 1 (\\(Q_1\\) fechado):</strong> \\(D_1\\) fica reversamente polarizado e a fonte \\(V_g\\) transfere energia ao indutor \\(L\\) e à carga \\(R_o\\), fazendo \\(i_L\\) crescer linearmente.</p>
          <p>• <strong>Etapa 2 (\\(Q_1\\) aberto):</strong> A energia magnética em \\(L\\) força \\(D_1\\) a conduzir (roda livre), mantendo a continuidade de \\(i_L\\) na carga enquanto \\(i_L\\) decresce linearmente.</p>
          <p>• <strong>Relação e polaridade:</strong> \\(V_o = D \\cdot V_g\\), com \\(0 \\le D \\le 1\\). Portanto \\(0 \\le V_o \\le V_g\\) (<strong>abaixador</strong>) e <strong>mesma polaridade</strong> da fonte de entrada (não inversor).</p>
        </div>
      </div>
    `
  },
  {
    id: 3,
    grupo: "buck",
    tag: "Conversor Buck",
    titulo: "Exercício 3 — Análise Completa do Buck em MCC (Etapas, LTK, Balanço Volt-Segundo e L)",
    enunciado: `
      <p>Considere o conversor Buck operando em MCC e a tensão de saída constante (ondulação desprezível nesta questão).</p>
      <ul class="study-items">
        <li><strong>a)</strong> Circuitos equivalentes da Etapa 1 e Etapa 2 indicando o caminho da corrente.</li>
        <li><strong>b)</strong> Equação de \\(v_L\\) em cada etapa via LTK.</li>
        <li><strong>c)</strong> Gráfico de \\(v_L(t)\\) indicando os níveis de tensão.</li>
        <li><strong>d)</strong> Inclinação \\(di_L/dt\\) em cada etapa (crescente/decrescente, linear/exponencial).</li>
        <li><strong>e)</strong> Gráfico de \\(i_L(t)\\) e dedução de \\(\\Delta i_L = (V_g - V_o)DT/L\\).</li>
        <li><strong>f)</strong> Valor médio de \\(i_L\\) justificado pela LKC no nó de saída.</li>
        <li><strong>g)</strong> Ganho estático \\(M = V_o/V_g\\) pelo balanço volt-segundo.</li>
        <li><strong>h)</strong> Por que o Buck é abaixador e qual a faixa possível de \\(V_o\\).</li>
        <li><strong>i)</strong> Expressão para \\(L\\) em função de \\(V_g, V_o, D, f_s\\) e \\(\\Delta i_L\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b)</strong> Etapa 1: \\(v_L = V_g - V_o\\) | Etapa 2: \\(v_L = -V_o\\)</div>
        <div><strong>d)</strong> \\(\\frac{di_L}{dt} = \\frac{V_g - V_o}{L} > 0\\) (linear crescente) e \\(\\frac{-V_o}{L} < 0\\) (linear decrescente)</div>
        <div><strong>e, f)</strong> \\(\\Delta i_L = \\frac{(V_g - V_o)DT}{L}\\) | \\(I_L = I_o\\)</div>
        <div><strong>g, h, i)</strong> \\(M = \\frac{V_o}{V_g} = D\\) | \\(0 \\le V_o \\le V_g\\) | \\(L = \\frac{(V_g - V_o)D}{f_s \\Delta i_L}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a) Circuitos Equivalentes das Etapas 1 e 2</div>
        ${SVGS_LISTA1_P2.buck_etapas}
      </div>
      <div class="step-box">
        <div class="step-title">b) Equações de vL pela Lei das Tensões de Kirchhoff (LTK)</div>
        <div class="math-block">\\[ \\text{Etapa 1 } (0 \\le t < DT):\\quad -V_g + v_L + V_o = 0 \\implies v_L = V_g - V_o > 0 \\]</div>
        <div class="math-block">\\[ \\text{Etapa 2 } (DT \\le t < T):\\quad v_L + V_o = 0 \\implies v_L = -V_o < 0 \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">c, d, e) Formas de Onda vL(t) e iL(t), Inclinações e Dedução de ΔiL</div>
        ${SVGS_LISTA1_P2.buck_ondas_vl_il}
        <div class="step-desc"><strong>d) Inclinações:</strong> Aplicando \\(v_L = L\\frac{di_L}{dt}\\):</div>
        <div class="math-block">\\[ \\text{Etapa 1: } \\frac{di_L}{dt} = \\frac{V_g - V_o}{L} > 0\\;(\\text{crescente}) \\qquad \\text{Etapa 2: } \\frac{di_L}{dt} = \\frac{-V_o}{L} < 0\\;(\\text{decrescente}) \\]</div>
        <div class="step-desc">Como \\(V_g\\), \\(V_o\\) e \\(L\\) são constantes em cada intervalo, a derivada \\(di_L/dt\\) é constante; logo, a corrente varia de forma <strong>linear</strong> (segmentos de reta, não exponencial).</div>
        <div class="step-desc"><strong>e) Dedução de \\(\\Delta i_L\\) pela Etapa 1 (\\(\\Delta t = DT\\)):</strong></div>
        <div class="math-block">\\[ V_g - V_o = L\\frac{\\Delta i_L}{DT} \\implies \\Delta i_L = \\frac{(V_g - V_o)\\cdot DT}{L} \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">f, g, h, i) Corrente Média IL, Balanço Volt-Segundo e Fórmula de L</div>
        <div class="step-desc"><strong>f)</strong> Pela LKC no nó de saída: \\(i_L(t) = i_C(t) + i_o(t)\\). Em regime permanente, a corrente média no capacitor é nula (\\(\\langle i_C \\rangle = 0\\)), portanto:</div>
        <div class="math-block">\\[ I_L = \\langle i_L \\rangle = \\langle i_C \\rangle + \\langle i_o \\rangle = 0 + I_o = I_o \\]</div>
        <div class="step-desc"><strong>g) Balanço Volt-Segundo (\\(\\langle v_L \\rangle = 0\\)):</strong></div>
        <div class="math-block">\\[ \\frac{1}{T}\\left[(V_g - V_o)DT + (-V_o)(1 - D)T\\right] = 0 \\implies V_g D - V_o D - V_o + V_o D = 0 \\implies M = \\frac{V_o}{V_g} = D \\]</div>
        <div class="step-desc"><strong>h)</strong> Como \\(0 \\le D \\le 1\\), tem-se \\(M = D \\le 1\\), garantindo \\(0 \\le V_o \\le V_g\\) (conversor estritamente abaixador).</div>
        <div class="step-desc"><strong>i) Indutância \\(L\\):</strong> Substituindo \\(T = 1/f_s\\) em \\(\\Delta i_L = (V_g - V_o)DT/L\\):</div>
        <div class="math-block">\\[ L = \\frac{(V_g - V_o)\\cdot D}{f_s \\cdot \\Delta i_L} \\]</div>
      </div>
    `
  },
  {
    id: 4,
    grupo: "buck",
    tag: "Conversor Buck",
    titulo: "Exercício 4 — Correntes em Q1/D1 e Ondulação no Capacitor (Buck)",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Reproduza \\(i_L\\) e desenhe alinhadas \\(i_{Q1}\\) e \\(i_{D1}\\), indicando valores de pico e degraus nas comutações.</li>
        <li><strong>b)</strong> Escreva \\(i_C\\) em função de \\(i_L\\) e \\(I_o\\). Justifique a hipótese comparando \\(X_C\\) na frequência de comutação com \\(R_o\\).</li>
        <li><strong>c)</strong> Desenhe \\(i_C\\) alinhada a \\(i_L\\), indicando os picos em função de \\(\\Delta i_L\\).</li>
        <li><strong>d)</strong> Desenhe \\(v_C = v_o\\) alinhada a \\(i_C\\), indicando \\(V_o\\), máximo, mínimo e instantes.</li>
        <li><strong>e)</strong> Qual o formato de \\(v_C\\) em cada trecho (reta, parábola ou exponencial)? Justifique.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> \\(i_{Q1} = i_L\\) em \\([0, DT]\\); \\(i_{D1} = i_L\\) em \\([DT, T]\\); pico \\(I_{L,máx}\\)</div>
        <div><strong>b, c)</strong> \\(i_C = i_L - I_o\\) (pois \\(X_C \\ll R_o\\) em \\(f_s\\)); picos \\(\\pm \\Delta i_L / 2\\)</div>
        <div><strong>d, e)</strong> Mínimo em \\(DT/2\\), máximo em \\((1+D)T/2\\); formato de <strong>parábolas</strong> nos dois trechos</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a, c, d) Formas de Onda Alinhadas (iQ1, iD1, iC e vC)</div>
        ${SVGS_LISTA1_P2.buck_ondas_cap}
      </div>
      <div class="step-box">
        <div class="step-title">b, e) Equação de iC, Justificativa de Reatância e Formato de vC</div>
        <div class="step-desc"><strong>b)</strong> Pela LKC no nó de saída:</div>
        <div class="math-block">\\[ i_C(t) = i_L(t) - I_o \\]</div>
        <div class="step-desc">Na frequência de comutação \\(f_s\\), a reatância capacitiva \\(X_C = \\frac{1}{2\\pi f_s C}\\) é muito menor que \\(R_o\\) (\\(X_C \\ll R_o\\)). Assim, praticamente toda a componente alternada (ondulação \\(\\Delta i_L\\)) desvia-se pelo capacitor, enquanto a componente contínua \\(I_o\\) flui integralmente pela carga \\(R_o\\).</div>
        <div class="step-desc"><strong>c)</strong> Como \\(i_L\\) oscila simetricamente em torno de \\(I_L = I_o\\), \\(i_C = i_L - I_o\\) é triangular de média nula com picos \\(+\\frac{\\Delta i_L}{2}\\) (em \\(t = DT\\)) e \\(-\\frac{\\Delta i_L}{2}\\) (em \\(t = 0\\) e \\(T\\)).</div>
        <div class="step-desc"><strong>d, e)</strong> Como \\(v_C(t) = v_C(t_0) + \\frac{1}{C}\\int_{t_0}^t i_C(\\tau)\\,d\\tau\\) e \\(i_C(t)\\) varia <strong>linearmente</strong> em cada etapa, sua integral gera funções do 2º grau (<strong>parábolas</strong>) em ambos os trechos. Os extremos ocorrem nos cruzamentos por zero de \\(i_C\\): mínimo em \\(t = DT/2\\) e máximo em \\(t = (1+D)T/2\\).</div>
      </div>
    `
  },
  {
    id: 5,
    grupo: "buck",
    tag: "Projeto Buck",
    titulo: "Exercício 5 — Projeto Completo de Conversor Buck",
    simular: { topologia: "buck_mcc", vg: 30, vo: 12, po: 25, fs: 60, dil: 20, dvo: 1 },
    enunciado: `
      <p>Projete um conversor Buck com os requisitos: \\(V_g = 30\\text{ V}\\), \\(V_o = 12\\text{ V}\\), \\(P_o = 25\\text{ W}\\), \\(f_s = 60\\text{ kHz}\\), \\(\\Delta i_L = 20\\%\\text{ de }I_L\\) e \\(\\Delta V_o = 1\\%\\text{ de }V_o\\).</p>
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor Buck.</li>
        <li><strong>b)</strong> Calcule a razão cíclica \\(D\\), a corrente de carga \\(I_o\\) e a resistência de carga \\(R_o\\).</li>
        <li><strong>c)</strong> Calcule a indutância \\(L\\).</li>
        <li><strong>d)</strong> Calcule a capacitância \\(C\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b)</strong> \\(D = 0{,}40\\;(40\\%)\\) | \\(I_o = 2{,}083\\text{ A}\\) | \\(R_o = 5{,}76\\,\\Omega\\)</div>
        <div><strong>c)</strong> \\(L = 288{,}0\\,\\mu\\text{H}\\) (\\(0{,}288\\text{ mH}\\))</div>
        <div><strong>d)</strong> \\(C = 7{,}23\\,\\mu\\text{F}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Circuito do Conversor Buck</div>
        ${SVGS_LISTA1_P2.buck_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Razão Cíclica D, Corrente Io e Resistência Ro</div>
        <div class="math-block">\\[ D = \\frac{V_o}{V_g} = \\frac{12}{30} = 0{,}40\\quad (40\\%) \\]</div>
        <div class="math-block">\\[ I_o = \\frac{P_o}{V_o} = \\frac{25}{12} = 2{,}0833\\text{ A} \\qquad R_o = \\frac{V_o}{I_o} = \\frac{V_o^2}{P_o} = \\frac{12^2}{25} = 5{,}76\\,\\Omega \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item c) Dimensionamento da Indutância L</div>
        <div class="step-desc">No Buck em MCC, \\(I_L = I_o = 2{,}0833\\text{ A}\\). Calculando \\(\\Delta i_L = 20\\%\\) de \\(I_L\\):</div>
        <div class="math-block">\\[ \\Delta i_L = 0{,}20 \\cdot I_L = 0{,}20 \\cdot 2{,}0833 = 0{,}4167\\text{ A} \\]</div>
        <div class="math-block">\\[ L = \\frac{(V_g - V_o)\\cdot D}{f_s \\cdot \\Delta i_L} = \\frac{(30 - 12)\\cdot 0{,}40}{60\\,000 \\cdot 0{,}4167} = \\frac{7{,}2}{25\\,000} = 288{,}0\\,\\mu\\text{H} \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item d) Dimensionamento da Capacitância C</div>
        <div class="step-desc">Ondulação de tensão permitida (\\(1\\%\\) de \\(V_o\\)): \\(\\Delta V_o = 0{,}01 \\cdot 12 = 0{,}12\\text{ V}\\).</div>
        <div class="math-block">\\[ C = \\frac{\\Delta i_L}{8 \\cdot f_s \\cdot \\Delta V_o} = \\frac{0{,}4167}{8 \\cdot 60\\,000 \\cdot 0{,}12} = \\frac{0{,}4167}{57\\,600} = 7{,}23\\,\\mu\\text{F} \\]</div>
      </div>
    `
  },
  {
    id: 6,
    grupo: "boost",
    tag: "Conversor Boost",
    titulo: "Exercício 6 — Topologia e Funcionamento do Conversor Boost",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor CC-CC Boost (\\(V_g, L, Q_1, D_1, C, R_o\\)), polaridades \\(V_g, V_o\\) e sentidos de \\(i_L, i_{Q1}, i_{D1}, i_C, I_o\\).</li>
        <li><strong>b)</strong> Explique o funcionamento, descreva a relação entre \\(V_o\\) e \\(V_g\\), a polaridade da saída e compare a posição do indutor com a do Buck.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> Indutor \\(L\\) em série na entrada, \\(Q_1\\) em derivação para o terra, \\(D_1\\) em série com a saída \\(C \\parallel R_o\\).</div>
        <div><strong>b)</strong> Elevador não inversor: \\(V_o = \\frac{V_g}{1 - D} \\ge V_g\\). No Boost \\(L\\) fica na <strong>entrada</strong> (corrente de entrada contínua), ao contrário do Buck (\\(L\\) na saída).</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Esquemático Completo do Conversor Boost</div>
        ${SVGS_LISTA1_P2.boost_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Funcionamento, Relação Vo/Vg e Comparação com o Buck</div>
        <div class="step-desc">
          <p>• <strong>Etapa 1 (\\(Q_1\\) fechado):</strong> \\(D_1\\) bloqueia e a fonte \\(V_g\\) aplica tensão diretamente sobre \\(L\\), armazenando energia magnética enquanto o capacitor \\(C\\) sustenta a carga \\(R_o\\).</p>
          <p>• <strong>Etapa 2 (\\(Q_1\\) aberto):</strong> A corrente em \\(L\\) força \\(D_1\\) a conduzir; a tensão induzida em \\(L\\) soma-se em série com \\(V_g\\), entregando tensão superior à de entrada (\\(V_o > V_g\\)) para \\(C\\) e \\(R_o\\).</p>
          <p>• <strong>Relação e polaridade:</strong> \\(V_o = \\frac{V_g}{1 - D}\\), com \\(V_o \\ge V_g\\) (<strong>elevador</strong>) e <strong>mesma polaridade</strong> da entrada.</p>
          <p>• <strong>Posição de \\(L\\) vs Buck:</strong> No Buck, \\(L\\) está na <strong>saída</strong> (corrente de saída contínua, entrada pulsada). No Boost, \\(L\\) está na <strong>entrada</strong> (corrente de entrada \\(i_g = i_L\\) contínua, corrente ao nó de saída \\(i_{D1}\\) pulsada).</p>
        </div>
      </div>
    `
  },
  {
    id: 7,
    grupo: "boost",
    tag: "Conversor Boost",
    titulo: "Exercício 7 — Análise Completa do Boost em MCC (a–i)",
    enunciado: `
      <p>Considere o conversor Boost operando em MCC e tensão de saída constante.</p>
      <ul class="study-items">
        <li><strong>a, b, c)</strong> Circuitos das Etapas 1 e 2, equações de \\(v_L\\) via LTK e gráfico de \\(v_L(t)\\).</li>
        <li><strong>d, e)</strong> Inclinação \\(di_L/dt\\), gráfico de \\(i_L(t)\\) e dedução de \\(\\Delta i_L = V_g DT / L\\).</li>
        <li><strong>f)</strong> Valor médio de \\(i_L\\) pela corrente média no diodo e relação com \\(I_g\\).</li>
        <li><strong>g, h)</strong> Ganho estático \\(M = V_o/V_g\\), por que é elevador e comportamento para \\(D \\to 1\\).</li>
        <li><strong>i)</strong> Expressão para \\(L\\) em função de \\(V_g, D, f_s\\) e \\(\\Delta i_L\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b, d)</strong> Etapa 1: \\(v_L = V_g\\) (\\(+V_g/L\\), linear crescente) | Etapa 2: \\(v_L = V_g - V_o\\) (linear decrescente)</div>
        <div><strong>e, f)</strong> \\(\\Delta i_L = \\frac{V_g DT}{L}\\) | \\(I_L = I_g = \\frac{I_o}{1 - D}\\)</div>
        <div><strong>g, h, i)</strong> \\(M = \\frac{1}{1 - D} \\ge 1\\) (\\(D \\to 1 \\Rightarrow M \\to \\infty\\) ideal) | \\(L = \\frac{V_g D}{f_s \\Delta i_L}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a, b, c) Circuitos das Etapas 1 e 2 e Equações de vL</div>
        ${SVGS_LISTA1_P2.boost_etapas}
        <div class="math-block">\\[ \\text{Etapa 1 } (0 \\le t < DT):\\quad v_L = V_g > 0 \\qquad \\text{Etapa 2 } (DT \\le t < T):\\quad v_L = V_g - V_o < 0 \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">d, e, f) Inclinações, ΔiL e Corrente Média IL = Ig</div>
        <div class="math-block">\\[ \\text{Etapa 1: } \\frac{di_L}{dt} = \\frac{V_g}{L} > 0\\;(\\text{linear crescente}) \\qquad \\text{Etapa 2: } \\frac{di_L}{dt} = \\frac{V_g - V_o}{L} < 0\\;(\\text{linear decrescente}) \\]</div>
        <div class="math-block">\\[ \\text{Na Etapa 1 } (\\Delta t = DT):\\quad V_g = L\\frac{\\Delta i_L}{DT} \\implies \\Delta i_L = \\frac{V_g \\cdot DT}{L} \\]</div>
        <div class="step-desc"><strong>f)</strong> Como \\(\\langle i_C \\rangle = 0\\), a corrente média no diodo iguala \\(I_o\\). Como \\(D_1\\) conduz \\(i_L\\) apenas durante \\((1 - D)T\\):</div>
        <div class="math-block">\\[ I_{D1} = I_L (1 - D) = I_o \\implies I_L = \\frac{I_o}{1 - D} \\]</div>
        <div class="step-desc">Como \\(L\\) está em série com a fonte \\(V_g\\), a corrente média de entrada é exatamente igual a \\(I_L\\): \\(I_g = I_L = \\frac{P_o}{V_g}\\).</div>
      </div>
      <div class="step-box">
        <div class="step-title">g, h, i) Balanço Volt-Segundo, Comportamento D → 1 e Fórmula de L</div>
        <div class="math-block">\\[ \\langle v_L \\rangle = V_g D + (V_g - V_o)(1 - D) = 0 \\implies V_g = V_o(1 - D) \\implies M = \\frac{V_o}{V_g} = \\frac{1}{1 - D} \\]</div>
        <div class="step-desc"><strong>h)</strong> Para \\(0 \\le D < 1\\), \\(0 < 1 - D \\le 1 \\implies M \\ge 1\\) (elevador). Quando \\(D \\to 1\\), idealmente \\(V_o \\to \\infty\\); na prática, resistências parasitas (como \\(R_L\\)) causam quedas crescentes de tensão e perdas elevadas, fazendo \\(V_o\\) cair abruptamente perto de \\(D = 1\\).</div>
        <div class="step-desc"><strong>i) Indutância \\(L\\) (com \\(T = 1/f_s\\)):</strong></div>
        <div class="math-block">\\[ L = \\frac{V_g \\cdot D}{f_s \\cdot \\Delta i_L} \\]</div>
      </div>
    `
  },
  {
    id: 8,
    grupo: "boost",
    tag: "Conversor Boost",
    titulo: "Exercício 8 — Correntes em Q1/D1 e Ondulação no Capacitor (Boost)",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe \\(i_L\\), \\(i_{Q1}\\) e \\(i_{D1}\\). Qual delas é entregue ao nó de saída?</li>
        <li><strong>b)</strong> Escreva \\(i_C\\) em função de \\(i_{D1}\\) e \\(I_o\\). Em qual etapa o capacitor alimenta a carga sozinho?</li>
        <li><strong>c, d)</strong> Desenhe \\(i_C\\) e \\(v_C = v_o\\) indicando valores em função de \\(I_o, I_{L,mín}, I_{L,máx}\\) e instantes de máximo e mínimo.</li>
        <li><strong>e)</strong> Formato de \\(v_C\\) em cada etapa (reta, parábola ou exponencial) e comparação com o Buck.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a, b)</strong> Corrente entregue à saída: \\(i_{D1}\\) | \\(i_C = i_{D1} - I_o\\) | Capacitor sustenta a carga sozinho na <strong>Etapa 1 (0 a DT)</strong></div>
        <div><strong>c, d)</strong> Etapa 1: \\(i_C = -I_o\\); Etapa 2: \\(I_{L,máx}-I_o\\) a \\(I_{L,mín}-I_o\\) | \\(v_C\\) máx em \\(t = 0, T\\) e mín em \\(t = DT\\)</div>
        <div><strong>e)</strong> <strong>Reta</strong> na Etapa 1 e <strong>parábola</strong> na Etapa 2 (no Buck são parábolas nas duas etapas)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a, c, d) Formas de Onda iD1(t), iC(t) e vC(t)</div>
        ${SVGS_LISTA1_P2.boost_ondas_cap}
      </div>
      <div class="step-box">
        <div class="step-title">b, e) Equação de iC e Análise do Formato de vC vs Buck</div>
        <div class="math-block">\\[ i_C(t) = i_{D1}(t) - I_o \\]</div>
        <div class="step-desc">
          <p>• Na <strong>Etapa 1 (\\(0 \\le t < DT\\))</strong>, \\(D_1\\) bloqueia (\\(i_{D1} = 0\\)), logo \\(i_C = -I_o\\) (constante): o capacitor fornece sozinho toda a corrente da carga. Como \\(dv_C/dt = -I_o/C\\) é constante, \\(v_C(t)\\) decresce em <strong>reta</strong> de \\(V_{o,máx}\\) (em \\(0\\)) até \\(V_{o,mín}\\) (em \\(DT\\)).</p>
          <p>• Na <strong>Etapa 2 (\\(DT \\le t < T\\))</strong>, \\(i_C(t) = i_L(t) - I_o\\) decresce linearmente de \\(I_{L,máx} - I_o\\) até \\(I_{L,mín} - I_o\\). A integral de uma função linear produz uma <strong>parábola</strong> crescente de \\(V_{o,mín}\\) até \\(V_{o,máx}\\) (em \\(T\\)).</p>
          <p>• <strong>Comparação com o Buck:</strong> No Buck, \\(i_C\\) é triangular (linear nas duas etapas), gerando parábolas nos dois trechos. No Boost, \\(i_{D1}\\) é pulsada, gerando reta na Etapa 1 e parábola na Etapa 2.</p>
        </div>
      </div>
    `
  },
  {
    id: 9,
    grupo: "boost",
    tag: "Projeto Boost",
    titulo: "Exercício 9 — Projeto Completo de Conversor Boost",
    simular: { topologia: "boost_mcc", vg: 12, vo: 30, po: 30, fs: 60, dil: 20, dvo: 1 },
    enunciado: `
      <p>Projete um conversor Boost com os requisitos: \\(V_g = 12\\text{ V}\\), \\(V_o = 30\\text{ V}\\), \\(P_o = 30\\text{ W}\\), \\(f_s = 60\\text{ kHz}\\), \\(\\Delta i_L = 20\\%\\text{ de }I_L\\) e \\(\\Delta V_o = 1\\%\\text{ de }V_o\\).</p>
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor Boost.</li>
        <li><strong>b)</strong> Calcule \\(D\\), \\(I_o\\), \\(R_o\\) e \\(I_L\\).</li>
        <li><strong>c)</strong> Calcule a indutância \\(L\\).</li>
        <li><strong>d)</strong> Calcule a capacitância \\(C\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b)</strong> \\(D = 0{,}60\\;(60\\%)\\) | \\(I_o = 1{,}00\\text{ A}\\) | \\(R_o = 30\\,\\Omega\\) | \\(I_L = 2{,}50\\text{ A}\\)</div>
        <div><strong>c)</strong> \\(L = 240{,}0\\,\\mu\\text{H}\\) (\\(0{,}24\\text{ mH}\\))</div>
        <div><strong>d)</strong> \\(C = 33{,}33\\,\\mu\\text{F}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Circuito do Conversor Boost</div>
        ${SVGS_LISTA1_P2.boost_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Razão Cíclica D, Correntes Io, IL e Resistência Ro</div>
        <div class="math-block">\\[ D = 1 - \\frac{V_g}{V_o} = 1 - \\frac{12}{30} = 0{,}60\\quad (60\\%) \\]</div>
        <div class="math-block">\\[ I_o = \\frac{P_o}{V_o} = \\frac{30}{30} = 1{,}00\\text{ A} \\qquad R_o = \\frac{V_o}{I_o} = \\frac{30}{1{,}00} = 30\\,\\Omega \\]</div>
        <div class="math-block">\\[ I_L = I_g = \\frac{I_o}{1 - D} = \\frac{1{,}00}{1 - 0{,}60} = 2{,}50\\text{ A} \\qquad \\left(\\text{ou } I_L = \\frac{P_o}{V_g} = \\frac{30}{12} = 2{,}50\\text{ A}\\right) \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item c) Dimensionamento da Indutância L</div>
        <div class="math-block">\\[ \\Delta i_L = 0{,}20 \\cdot I_L = 0{,}20 \\cdot 2{,}50 = 0{,}50\\text{ A} \\]</div>
        <div class="math-block">\\[ L = \\frac{V_g \\cdot D}{f_s \\cdot \\Delta i_L} = \\frac{12 \\cdot 0{,}60}{60\\,000 \\cdot 0{,}50} = \\frac{7{,}2}{30\\,000} = 240{,}0\\,\\mu\\text{H} \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item d) Dimensionamento da Capacitância C</div>
        <div class="step-desc">Ondulação de tensão permitida: \\(\\Delta V_o = 0{,}01 \\cdot 30 = 0{,}30\\text{ V}\\).</div>
        <div class="math-block">\\[ C = \\frac{I_o \\cdot D}{f_s \\cdot \\Delta V_o} = \\frac{1{,}00 \\cdot 0{,}60}{60\\,000 \\cdot 0{,}30} = \\frac{0{,}60}{18\\,000} = 33{,}33\\,\\mu\\text{F} \\]</div>
      </div>
    `
  },
  {
    id: 10,
    grupo: "buckboost",
    tag: "Conversor Buck-Boost",
    titulo: "Exercício 10 — Topologia e Funcionamento do Conversor Buck-Boost",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor Buck-Boost (\\(V_g, Q_1, L, D_1, C, R_o\\)), polaridades \\(V_g, V_o\\) e sentidos das correntes.</li>
        <li><strong>b)</strong> Explique o funcionamento, a relação entre \\(V_o\\) e \\(V_g\\), a polaridade da saída e por que a fonte nunca entrega energia diretamente à carga.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> \\(Q_1\\) em série na entrada, \\(L\\) em derivação para o terra, \\(D_1\\) apontando para o nó \\(Q_1\\text{–}L\\), saída \\(C \\parallel R_o\\) invertida.</div>
        <div><strong>b)</strong> \\(\\frac{V_o}{V_g} = -\\frac{D}{1-D}\\) (abaixador/elevador com <strong>polaridade invertida</strong>). A fonte nunca alimenta a carga diretamente porque \\(Q_1\\) e \\(D_1\\) nunca conduzem juntos (toda energia passa por \\(L\\)).</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Esquemático Completo do Conversor Buck-Boost</div>
        ${SVGS_LISTA1_P2.buckboost_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Funcionamento, Relação Vo/Vg e Transferência Indireta</div>
        <div class="step-desc">
          <p>• <strong>Etapa 1 (\\(Q_1\\) ON, \\(D_1\\) OFF):</strong> A fonte \\(V_g\\) conecta-se apenas ao indutor \\(L\\), armazenando energia magnética. O diodo bloqueado isola a carga, que é alimentada exclusivamente pelo capacitor \\(C\\).</p>
          <p>• <strong>Etapa 2 (\\(Q_1\\) OFF, \\(D_1\\) ON):</strong> A fonte fica desconectada. A corrente \\(i_L\\) força \\(D_1\\) a conduzir, transferindo a energia de \\(L\\) para \\(C \\parallel R_o\\) com <strong>polaridade invertida</strong>.</p>
          <p>• <strong>Relação estática:</strong> \\(V_o/V_g = -D/(1-D)\\). Opera como abaixador (\\(D < 0{,}5\\)) ou elevador (\\(D > 0{,}5\\)).</p>
          <p>• <strong>Por que a fonte nunca entrega energia diretamente à carga:</strong> Como \\(Q_1\\) e \\(D_1\\) operam de forma complementar, não existe caminho simultâneo entre \\(V_g\\) e \\(R_o\\). Toda energia é primeiro armazenada em \\(L\\) e depois transferida à saída.</p>
        </div>
      </div>
    `
  },
  {
    id: 11,
    grupo: "buckboost",
    tag: "Conversor Buck-Boost",
    titulo: "Exercício 11 — Análise Completa do Buck-Boost em MCC (a–i)",
    enunciado: `
      <p>Considere o conversor Buck-Boost operando em MCC e tensão de saída constante.</p>
      <ul class="study-items">
        <li><strong>a, b, c)</strong> Circuitos das Etapas 1 e 2, equações de \\(v_L\\) via LTK (respeitando a polaridade) e gráfico de \\(v_L\\).</li>
        <li><strong>d, e)</strong> Inclinação \\(di_L/dt\\), gráfico de \\(i_L\\) e dedução de \\(\\Delta i_L = V_g DT / L\\).</li>
        <li><strong>f)</strong> Valor médio de \\(i_L\\) pela corrente média no diodo e demonstração de que \\(I_L = I_g + I_o\\).</li>
        <li><strong>g, h)</strong> Ganho estático \\(M = V_o/V_g\\), justificativa da inversão de polaridade e faixas de \\(D\\) (abaixador/elevador).</li>
        <li><strong>i)</strong> Expressão para \\(L\\) em função de \\(V_g, D, f_s\\) e \\(\\Delta i_L\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b, d)</strong> Etapa 1: \\(v_L = V_g\\) (linear crescente) | Etapa 2: \\(v_L = V_o = -|V_o|\\) (linear decrescente)</div>
        <div><strong>e, f)</strong> \\(\\Delta i_L = \\frac{V_g DT}{L}\\) | \\(I_L = \\frac{I_o}{1 - D} = I_g + I_o\\)</div>
        <div><strong>g, h, i)</strong> \\(M = -\\frac{D}{1-D}\\) (\\(D<0{,}5\\) abaixador; \\(D>0{,}5\\) elevador) | \\(L = \\frac{V_g D}{f_s \\Delta i_L}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a, b, c) Circuitos Equivalentes e Equações de vL</div>
        ${SVGS_LISTA1_P2.buckboost_etapas}
        <div class="math-block">\\[ \\text{Etapa 1 } (0 \\le t < DT):\\quad v_L = V_g > 0 \\qquad \\text{Etapa 2 } (DT \\le t < T):\\quad v_L = V_o = -|V_o| < 0 \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">d, e, f) Inclinações, ΔiL e Demonstração de IL = Ig + Io (Método do Professor)</div>
        <div class="math-block">\\[ \\text{Etapa 1: } \\frac{di_L}{dt} = \\frac{V_g}{L} > 0\\;(\\text{linear crescente}) \\qquad \\text{Etapa 2: } \\frac{di_L}{dt} = -\\frac{|V_o|}{L} < 0\\;(\\text{linear decrescente}) \\]</div>
        <div class="math-block">\\[ \\text{Etapa 1 } (\\Delta t = DT):\\quad \\Delta i_L = \\frac{V_g \\cdot DT}{L} \\]</div>
        <div class="step-desc"><strong>f) Corrente média no indutor:</strong> O diodo conduz \\(i_L\\) em \\((1 - D)T\\) e \\(I_{D1} = I_o\\); a chave conduz \\(i_L\\) em \\(DT\\) e \\(I_{Q1} = I_g\\):</div>
        <div class="math-block">\\[ I_o = I_L(1 - D) \\implies I_L = \\frac{I_o}{1 - D} \\qquad \\text{e} \\qquad I_g = I_L \\cdot D \\]</div>
        <div class="step-desc">Somando as duas parcelas (método direto do quadro):</div>
        <div class="math-block">\\[ I_g + I_o = I_L \\cdot D + I_L(1 - D) = I_L \\implies I_L = I_g + I_o = \\frac{P_o}{V_g} + \\frac{P_o}{|V_o|} \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">g, h, i) Balanço Volt-Segundo, Regimes de D e Fórmula de L</div>
        <div class="math-block">\\[ \\langle v_L \\rangle = V_g D + V_o(1 - D) = 0 \\implies M = \\frac{V_o}{V_g} = -\\frac{D}{1 - D} \\]</div>
        <div class="step-desc"><strong>h)</strong> O sinal negativo indica <strong>polaridade invertida</strong> (a corrente \\(i_L\\) retorna pelo terminal inferior da carga na Etapa 2). Para \\(0 < D < 0{,}5\\), \\(|M| < 1\\) (<strong>abaixador</strong>); para \\(D = 0{,}5\\), \\(|M| = 1\\); para \\(0{,}5 < D < 1\\), \\(|M| > 1\\) (<strong>elevador</strong>).</div>
        <div class="step-desc"><strong>i) Indutância \\(L\\) (com \\(T = 1/f_s\\)):</strong></div>
        <div class="math-block">\\[ L = \\frac{V_g \\cdot D}{f_s \\cdot \\Delta i_L} \\]</div>
      </div>
    `
  },
  {
    id: 12,
    grupo: "buckboost",
    tag: "Conversor Buck-Boost",
    titulo: "Exercício 12 — Correntes em Q1/D1 e Ondulação no Capacitor (Buck-Boost)",
    enunciado: `
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe \\(i_L\\), \\(i_{Q1}\\) e \\(i_{D1}\\). Qual é a corrente de entrada e qual é entregue ao nó de saída? São contínuas ou pulsadas?</li>
        <li><strong>b)</strong> Escreva \\(i_C\\) em função de \\(i_{D1}\\) e \\(I_o\\). Em qual etapa o capacitor alimenta a carga sozinho?</li>
        <li><strong>c, d)</strong> Desenhe \\(i_C\\) e \\(|v_C|\\) indicando valores em função de \\(I_o, I_{L,mín}, I_{L,máx}\\) e instantes de máximo/mínimo.</li>
        <li><strong>e)</strong> Formato de \\(v_C\\) em cada etapa e comparação com Buck e Boost.</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>a)</strong> Entrada: \\(i_{Q1}\\); saída: \\(i_{D1}\\). <strong>Ambas são pulsadas</strong>.</div>
        <div><strong>b, c, d)</strong> \\(i_C = i_{D1} - I_o\\); capacitor sustenta \\(I_o\\) sozinho na <strong>Etapa 1 (0 a DT)</strong>; máx em \\(0, T\\) e mín em \\(DT\\).</div>
        <div><strong>e)</strong> <strong>Reta</strong> na Etapa 1 e <strong>parábola</strong> na Etapa 2 (igual ao Boost; diferente do Buck).</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">a, c, d) Formas de Onda iD1(t), iC(t) e |vC(t)|</div>
        ${SVGS_LISTA1_P2.boost_ondas_cap}
      </div>
      <div class="step-box">
        <div class="step-title">b, e) Análise Completa e Comparação com Buck e Boost</div>
        <div class="step-desc">
          <p>• <strong>a)</strong> \\(i_{Q1}(t)\\) é a corrente de entrada (conduz só em \\([0, DT]\\)) e \\(i_{D1}(t)\\) é a corrente entregue ao nó de saída (conduz só em \\([DT, T]\\)). <strong>Ambas são pulsadas</strong>, o que exige filtragem tanto na entrada quanto na saída em aplicações práticas.</p>
          <p>• <strong>b, c, d)</strong> \\(i_C(t) = i_{D1}(t) - I_o\\). Na Etapa 1 (\\(0\\) a \\(DT\\)), \\(D_1\\) bloqueia e \\(i_C = -I_o\\) (capacitor fornece sozinho toda a corrente da carga). Na Etapa 2 (\\(DT\\) a \\(T\\)), \\(i_C\\) decresce linearmente de \\(I_{L,máx} - I_o\\) até \\(I_{L,mín} - I_o\\). Assim, \\(|v_C|\\) é máximo em \\(t = 0\\) e \\(T\\) e mínimo em \\(t = DT\\).</p>
          <p>• <strong>e)</strong> <strong>Reta decrescente</strong> na Etapa 1 (\\(i_C = -I_o\\) constante) e <strong>parábola crescente</strong> na Etapa 2 (integral de \\(i_C\\) linear). Tem o <strong>mesmo comportamento do Boost</strong> e difere do <strong>Buck</strong> (parábola em ambas as etapas).</p>
        </div>
      </div>
    `
  },
  {
    id: 13,
    grupo: "buckboost",
    tag: "Projeto Buck-Boost",
    titulo: "Exercício 13 — Projeto Completo de Conversor Buck-Boost",
    simular: { topologia: "buck_boost_mcc", vg: 24, vo: 36, po: 36, fs: 60, dil: 20, dvo: 1 },
    enunciado: `
      <p>Projete um conversor Buck-Boost com os requisitos: \\(V_g = 24\\text{ V}\\), \\(|V_o| = 36\\text{ V}\\), \\(P_o = 36\\text{ W}\\), \\(f_s = 60\\text{ kHz}\\), \\(\\Delta i_L = 20\\%\\text{ de }I_L\\) e \\(\\Delta V_o = 1\\%\\text{ de }|V_o|\\).</p>
      <ul class="study-items">
        <li><strong>a)</strong> Desenhe o circuito do conversor Buck-Boost.</li>
        <li><strong>b)</strong> Calcule \\(D\\), \\(I_o\\), \\(R_o\\) e \\(I_L\\). O conversor opera como abaixador ou elevador?</li>
        <li><strong>c)</strong> Calcule a indutância \\(L\\).</li>
        <li><strong>d)</strong> Calcule a capacitância \\(C\\).</li>
      </ul>
    `,
    resultado: `
      <div class="study-res-grid">
        <div><strong>b)</strong> \\(D = 0{,}60\\;(60\\%)\\) | \\(I_o = 1{,}00\\text{ A}\\) | \\(R_o = 36\\,\\Omega\\) | \\(I_L = 2{,}50\\text{ A}\\) | <strong>Elevador</strong> (\\(D > 0{,}5\\))</div>
        <div><strong>c)</strong> \\(L = 480{,}0\\,\\mu\\text{H}\\) (\\(0{,}48\\text{ mH}\\))</div>
        <div><strong>d)</strong> \\(C = 27{,}78\\,\\mu\\text{F}\\)</div>
      </div>
    `,
    passos: `
      <div class="step-box">
        <div class="step-title">Item a) Circuito do Conversor Buck-Boost</div>
        ${SVGS_LISTA1_P2.buckboost_circuito}
      </div>
      <div class="step-box">
        <div class="step-title">Item b) Razão Cíclica D, Correntes Io, Ig, IL, Resistência Ro e Regime</div>
        <div class="math-block">\\[ D = \\frac{|V_o|}{V_g + |V_o|} = \\frac{36}{24 + 36} = \\frac{36}{60} = 0{,}60\\quad (60\\%) \\]</div>
        <div class="math-block">\\[ I_o = \\frac{P_o}{|V_o|} = \\frac{36}{36} = 1{,}00\\text{ A} \\qquad R_o = \\frac{|V_o|}{I_o} = \\frac{36}{1{,}00} = 36\\,\\Omega \\]</div>
        <div class="step-desc">Pelo método do professor (\\(I_g = P_o/V_g\\) e \\(I_L = I_g + I_o\\)):</div>
        <div class="math-block">\\[ I_g = \\frac{P_o}{V_g} = \\frac{36}{24} = 1{,}50\\text{ A} \\qquad I_L = I_g + I_o = 1{,}50 + 1{,}00 = 2{,}50\\text{ A} \\]</div>
        <div class="math-block">\\[ \\text{Conferência:}\\quad I_L = \\frac{I_o}{1 - D} = \\frac{1{,}00}{1 - 0{,}60} = 2{,}50\\text{ A} \\]</div>
        <div class="step-desc">Como \\(D = 0{,}60 > 0{,}5\\) (e \\(|V_o| = 36\\text{ V} > V_g = 24\\text{ V}\\)), opera como <strong>Elevador (Boost)</strong> com polaridade invertida.</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item c) Dimensionamento da Indutância L</div>
        <div class="math-block">\\[ \\Delta i_L = 0{,}20 \\cdot I_L = 0{,}20 \\cdot 2{,}50 = 0{,}50\\text{ A} \\]</div>
        <div class="math-block">\\[ L = \\frac{V_g \\cdot D}{f_s \\cdot \\Delta i_L} = \\frac{24 \\cdot 0{,}60}{60\\,000 \\cdot 0{,}50} = \\frac{14{,}4}{30\\,000} = 480{,}0\\,\\mu\\text{H} \\]</div>
      </div>
      <div class="step-box">
        <div class="step-title">Item d) Dimensionamento da Capacitância C</div>
        <div class="step-desc">Ondulação de tensão permitida: \\(\\Delta V_o = 0{,}01 \\cdot 36 = 0{,}36\\text{ V}\\).</div>
        <div class="math-block">\\[ C = \\frac{I_o \\cdot D}{f_s \\cdot \\Delta V_o} = \\frac{1{,}00 \\cdot 0{,}60}{60\\,000 \\cdot 0{,}36} = \\frac{0{,}60}{21\\,600} = 27{,}78\\,\\mu\\text{F} \\]</div>
      </div>
    `
  }
];

let estadoLista1P2 = {
  ocultarPassos: false,
  filtro: "todos",
  abertosIndividuais: new Set()
};

function renderizarMathLista(el) {
  if (typeof renderMathInElement === "function" && el) {
    renderMathInElement(el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }
}

export function renderizarLista1P2() {
  const container = document.getElementById("secao-lista1-p2");
  if (!container) return;

  const filtrados = EXERCICIOS_LISTA1_P2.filter(ex =>
    estadoLista1P2.filtro === "todos" || ex.grupo === estadoLista1P2.filtro
  );

  const cardsHTML = filtrados.map(ex => {
    const mostrarPassos = !estadoLista1P2.ocultarPassos || estadoLista1P2.abertosIndividuais.has(ex.id);
    const btnSimularHTML = ex.simular
      ? `<button type="button" class="btn-study-sim" onclick="simularExercicioLista1P2(${ex.id})">Simular no Osciloscópio</button>`
      : "";

    return `
      <article class="card study-ex-card" data-ex-id="${ex.id}">
        <div class="study-ex-header">
          <div class="study-ex-title-group">
            <span class="study-tag study-tag-${ex.grupo}">${ex.tag}</span>
            <h3 class="study-ex-title">${ex.titulo}</h3>
          </div>
          <div class="study-ex-actions">
            ${btnSimularHTML}
            <button type="button" class="btn-study-step-toggle" onclick="togglePassoIndividualLista1P2(${ex.id})">
              ${mostrarPassos ? "Ocultar Passo a Passo" : "Ver Passo a Passo"}
            </button>
          </div>
        </div>

        <div class="study-enunciado">${ex.enunciado}</div>

        <div class="study-resultado-box">
          <div class="study-resultado-label">Gabarito / Resultado Final</div>
          ${ex.resultado}
        </div>

        <div class="study-passos-wrapper ${mostrarPassos ? "" : "oculto"}">
          <div class="study-passos-header">Resolução Passo a Passo (Método do Professor)</div>
          ${ex.passos}
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = `
    <div class="card study-toolbar-card">
      <div class="study-toolbar-top">
        <div>
          <div class="card-title" style="margin-bottom: 4px;">Lista 1 P2 — Conversores CC-CC (Estudo Guiado)</div>
          <div style="font-size: 0.86rem; color: var(--text-muted);">
            Regime permanente, componentes ideais e Modo de Condução Contínua (MCC) • 13 exercícios resolvidos passo a passo.
          </div>
        </div>
        <button type="button" id="btn-toggle-global-passos" class="btn-study-global ${estadoLista1P2.ocultarPassos ? "ativo" : ""}" onclick="togglePassosGlobalLista1P2()">
          ${estadoLista1P2.ocultarPassos ? "Mostrar Todo Passo a Passo" : "Ocultar Passo a Passo (Só Resultados)"}
        </button>
      </div>

      <div class="study-filter-bar">
        <button type="button" class="btn-ch-filter ${estadoLista1P2.filtro === "todos" ? "active" : ""}" onclick="filtrarLista1P2('todos')">Todos (13)</button>
        <button type="button" class="btn-ch-filter ${estadoLista1P2.filtro === "linear" ? "active" : ""}" onclick="filtrarLista1P2('linear')">Fonte Linear (Ex. 1)</button>
        <button type="button" class="btn-ch-filter ${estadoLista1P2.filtro === "buck" ? "active" : ""}" onclick="filtrarLista1P2('buck')">Buck (Ex. 2–5)</button>
        <button type="button" class="btn-ch-filter ${estadoLista1P2.filtro === "boost" ? "active" : ""}" onclick="filtrarLista1P2('boost')">Boost (Ex. 6–9)</button>
        <button type="button" class="btn-ch-filter ${estadoLista1P2.filtro === "buckboost" ? "active" : ""}" onclick="filtrarLista1P2('buckboost')">Buck-Boost (Ex. 10–13)</button>
      </div>
    </div>

    <div class="study-list-container">
      ${cardsHTML}
    </div>
  `;

  renderizarMathLista(container);
}

export function togglePassosGlobalLista1P2() {
  estadoLista1P2.ocultarPassos = !estadoLista1P2.ocultarPassos;
  estadoLista1P2.abertosIndividuais.clear();
  renderizarLista1P2();
}

export function togglePassoIndividualLista1P2(id) {
  const estaVisivel = !estadoLista1P2.ocultarPassos || estadoLista1P2.abertosIndividuais.has(id);
  if (estadoLista1P2.ocultarPassos) {
    if (estaVisivel) estadoLista1P2.abertosIndividuais.delete(id);
    else estadoLista1P2.abertosIndividuais.add(id);
  } else {
    // Se global está aberto e usuário clicou para ocultar um específico, alterna diretamente no DOM
    const card = document.querySelector(`.study-ex-card[data-ex-id="${id}"]`);
    if (card) {
      const box = card.querySelector(".study-passos-wrapper");
      const btn = card.querySelector(".btn-study-step-toggle");
      if (box && btn) {
        const ocultou = box.classList.toggle("oculto");
        btn.textContent = ocultou ? "Ver Passo a Passo" : "Ocultar Passo a Passo";
      }
    }
    return;
  }
  renderizarLista1P2();
}

export function filtrarLista1P2(grupo) {
  estadoLista1P2.filtro = grupo;
  renderizarLista1P2();
}

export function obterConfigSimulacaoLista1P2(id) {
  const ex = EXERCICIOS_LISTA1_P2.find(item => item.id === id);
  return ex ? ex.simular : null;
}
