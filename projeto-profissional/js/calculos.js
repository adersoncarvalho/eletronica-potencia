// ============================================================================
// MÃ“DULO DE CÃLCULOS MATEMÃTICOS E ELETRÃ”NICA DE POTÃŠNCIA (calculos.js)
// ============================================================================

import { atualizarGrafico } from './graficos.js';

    // Tabela numérica para ângulo de carga phi (graus) vs ângulo de extinção beta (graus)
    const TABELA_BETA = {
      1: 181, 2: 182, 3: 183, 4: 184, 5: 185, 6: 187, 7: 188, 8: 189, 9: 190, 10: 191,
      11: 192, 12: 193, 13: 194, 14: 195, 15: 196, 16: 197, 17: 198, 18: 199, 19: 200, 20: 201,
      21: 202, 22: 203, 23: 204, 24: 205, 25: 206, 26: 207, 27: 208, 28: 209, 29: 210, 30: 211,
      31: 212, 32: 213, 33: 214, 34: 215, 35: 216, 36: 217, 37: 218, 38: 219, 39: 220, 40: 221,
      41: 222, 42: 223, 43: 224, 44: 225, 45: 226, 46: 227, 47: 229, 48: 230, 49: 231, 50: 232,
      51: 233, 52: 234, 53: 236, 54: 237, 55: 238, 56: 239, 57: 241, 58: 242, 59: 243, 60: 245,
      61: 246, 62: 248, 63: 249, 64: 251, 65: 252, 66: 254, 67: 256, 68: 257, 69: 259, 70: 261,
      71: 263, 72: 265, 73: 267, 74: 269, 75: 271, 76: 274, 77: 276, 78: 279, 79: 282, 80: 285,
      81: 288, 82: 292, 83: 295, 84: 300, 85: 304, 86: 310, 87: 316, 88: 324, 89: 334, 90: 360
    };

    // Tabela de corrente eficaz normalizada Iefp(phi)
    const TABELA_IEFP = {
      1: 0.5000, 2: 0.5000, 3: 0.5000, 4: 0.5000, 5: 0.5001, 6: 0.5002, 7: 0.5002, 8: 0.5004, 9: 0.5005, 10: 0.5007,
      11: 0.5009, 12: 0.5012, 13: 0.5015, 14: 0.5019, 15: 0.5024, 16: 0.5029, 17: 0.5034, 18: 0.5041, 19: 0.5048, 20: 0.5056,
      21: 0.5064, 22: 0.5074, 23: 0.5084, 24: 0.5095, 25: 0.5108, 26: 0.5121, 27: 0.5135, 28: 0.5150, 29: 0.5167, 30: 0.5184,
      31: 0.5203, 32: 0.5223, 33: 0.5244, 34: 0.5266, 35: 0.5290, 36: 0.5315, 37: 0.5341, 38: 0.5369, 39: 0.5399, 40: 0.5430,
      41: 0.5462, 42: 0.5497, 43: 0.5533, 44: 0.5570, 45: 0.5610, 46: 0.5651, 47: 0.5695, 48: 0.5740, 49: 0.5788, 50: 0.5838,
      51: 0.5890, 52: 0.5944, 53: 0.6001, 54: 0.6061, 55: 0.6123, 56: 0.6188, 57: 0.6256, 58: 0.6327, 59: 0.6402, 60: 0.6480,
      61: 0.6561, 62: 0.6646, 63: 0.6735, 64: 0.6829, 65: 0.6926, 66: 0.7029, 67: 0.7136, 68: 0.7248, 69: 0.7366, 70: 0.7490,
      71: 0.7620, 72: 0.7756, 73: 0.7900, 74: 0.8051, 75: 0.8211, 76: 0.8379, 77: 0.8556, 78: 0.8744, 79: 0.8942, 80: 0.9153,
      81: 0.9376, 82: 0.9614, 83: 0.9867, 84: 1.0137, 85: 1.0426, 86: 1.0736, 87: 1.1069, 88: 1.1430, 89: 1.1820, 90: 1.2000
    };

    // Tabela de corrente eficaz no diodo D1 / fonte CA para carga RL com roda livre
    const TABELA_IEFP_RODA_LIVRE = {
      1: 0.5000, 2: 0.5000, 3: 0.5000, 4: 0.5000, 5: 0.5001, 6: 0.5001, 7: 0.5001, 8: 0.5002, 9: 0.5003, 10: 0.5004,
      11: 0.5006, 12: 0.5007, 13: 0.5009, 14: 0.5012, 15: 0.5014, 16: 0.5017, 17: 0.5021, 18: 0.5025, 19: 0.5029, 20: 0.5034,
      21: 0.5039, 22: 0.5045, 23: 0.5051, 24: 0.5058, 25: 0.5066, 26: 0.5074, 27: 0.5083, 28: 0.5092, 29: 0.5103, 30: 0.5114,
      31: 0.5125, 32: 0.5138, 33: 0.5151, 34: 0.5165, 35: 0.5180, 36: 0.5196, 37: 0.5213, 38: 0.5230, 39: 0.5249, 40: 0.5269,
      41: 0.5289, 42: 0.5311, 43: 0.5334, 44: 0.5357, 45: 0.5383, 46: 0.5409, 47: 0.5436, 48: 0.5465, 49: 0.5495, 50: 0.5526,
      51: 0.5559, 52: 0.5593, 53: 0.5628, 54: 0.5665, 55: 0.5704, 56: 0.5744, 57: 0.5786, 58: 0.5829, 59: 0.5874, 60: 0.5921,
      61: 0.5970, 62: 0.6021, 63: 0.6074, 64: 0.6129, 65: 0.6186, 66: 0.6246, 67: 0.6307, 68: 0.6371, 69: 0.6438, 70: 0.6507,
      71: 0.6579, 72: 0.6654, 73: 0.6732, 74: 0.6813, 75: 0.6897, 76: 0.6984, 77: 0.7075, 78: 0.7169, 79: 0.7268, 80: 0.7370,
      81: 0.7476, 82: 0.7587, 83: 0.7703, 84: 0.7823, 85: 0.7948, 86: 0.8079, 87: 0.8215, 88: 0.8357, 89: 0.8505, 90: 0.8600
    };

    function interpolarBeta(phiGraus) {
      const phiInt = Math.round(phiGraus);
      if (phiInt <= 1) return TABELA_BETA[1];
      if (phiInt >= 90) return TABELA_BETA[90];
      return TABELA_BETA[phiInt] || (180 + phiGraus);
    }

    function interpolarIefp(phiGraus) {
      const phiInt = Math.round(phiGraus);
      if (phiInt <= 1) return TABELA_IEFP[1];
      if (phiInt >= 90) return TABELA_IEFP[90];
      return TABELA_IEFP[phiInt] || 0.5000;
    }

    function interpolarIefpRodaLivre(phiGraus) {
      const phiInt = Math.round(phiGraus);
      if (phiInt <= 1) return TABELA_IEFP_RODA_LIVRE[1];
      if (phiInt >= 90) return TABELA_IEFP_RODA_LIVRE[90];
      return TABELA_IEFP_RODA_LIVRE[phiInt] || 0.5000;
    }

    function gerarLinhasTabelaConferencia(phiAtual) {
      let rows = "";
      for (let p = 1; p <= 90; p++) {
        const bDeg = TABELA_BETA[p] || (180 + p);
        const bRad = (bDeg * Math.PI / 180).toFixed(3);
        const iefpVal = (TABELA_IEFP[p] !== undefined ? TABELA_IEFP[p] : 0.5).toFixed(4);
        const isSelected = (p === phiAtual);
        rows += `
          <tr class="${isSelected ? 'row-destaque' : ''}">
            <td>${p}°</td>
            <td>${bDeg}°</td>
            <td>${bRad}</td>
            <td>${iefpVal}</td>
            <td>${isSelected ? '<span style="color: #e3b341; font-weight: bold;">● Selecionado</span>' : '-'}</td>
          </tr>
        `;
      }
      return rows;
    }

    function toggleTabelaBeta() {
      const box = document.getElementById("tabela-beta-container");
      if (box) {
        const isHidden = (box.style.display === "none");
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) {
          setTimeout(() => {
            const row = box.querySelector(".row-destaque");
            if (row) {
              row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 40);
        }
      }
    }

    // ============================================================================
    // MATRIZES E ÁBACOS DE PUCHLOWSKI (UTFPR - Prof. Francisco José Viglus)
    // Carga RL Monofásica Controlada (a = 0)
    // ============================================================================
    const ALPHAS_PUCHLOWSKI = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
    const COS_PHIS_PUCHLOWSKI = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

    const TABELA_PUCHLOWSKI_IEFP = {
      1:   [1.2246, 1.0209, 0.8834, 0.7833, 0.7073, 0.6479, 0.6009, 0.5633, 0.5338, 0.5119, 0.5000],
      10:  [1.2124, 1.0121, 0.8765, 0.7778, 0.7028, 0.6443, 0.5978, 0.5608, 0.5318, 0.5105, 0.4997],
      20:  [1.1759, 0.9852, 0.8555, 0.7607, 0.6887, 0.6324, 0.5879, 0.5525, 0.5250, 0.5053, 0.4978],
      30:  [1.1173, 0.9413, 0.8205, 0.7320, 0.6646, 0.6119, 0.5703, 0.5375, 0.5124, 0.4951, 0.4927],
      40:  [1.0394, 0.8818, 0.7726, 0.6921, 0.6306, 0.5827, 0.5449, 0.5154, 0.4933, 0.4792, 0.4834],
      50:  [0.9458, 0.8090, 0.7131, 0.6420, 0.5875, 0.5451, 0.5118, 0.4862, 0.4676, 0.4572, 0.4688],
      60:  [0.8407, 0.7257, 0.6440, 0.5831, 0.5364, 0.5000, 0.4717, 0.4503, 0.4355, 0.4290, 0.4485],
      70:  [0.7284, 0.6351, 0.5679, 0.5175, 0.4787, 0.4486, 0.4255, 0.4084, 0.3976, 0.3950, 0.4223],
      80:  [0.6133, 0.5406, 0.4875, 0.4473, 0.4164, 0.3926, 0.3745, 0.3618, 0.3547, 0.3558, 0.3905],
      90:  [0.5000, 0.4457, 0.4056, 0.3751, 0.3516, 0.3337, 0.3204, 0.3117, 0.3081, 0.3124, 0.3536],
      100: [0.3924, 0.3540, 0.3252, 0.3033, 0.2865, 0.2739, 0.2650, 0.2598, 0.2592, 0.2661, 0.3123],
      110: [0.2941, 0.2686, 0.2493, 0.2346, 0.2235, 0.2154, 0.2102, 0.2079, 0.2096, 0.2183, 0.2677],
      120: [0.2080, 0.1924, 0.1805, 0.1716, 0.1650, 0.1605, 0.1580, 0.1579, 0.1611, 0.1707, 0.2211],
      130: [0.1362, 0.1277, 0.1212, 0.1164, 0.1131, 0.1111, 0.1106, 0.1118, 0.1157, 0.1251, 0.1740],
      140: [0.0801, 0.0760, 0.0731, 0.0710, 0.0698, 0.0693, 0.0698, 0.0716, 0.0753, 0.0835, 0.1280],
      150: [0.0398, 0.0383, 0.0373, 0.0367, 0.0365, 0.0368, 0.0375, 0.0391, 0.0420, 0.0481, 0.0849],
      160: [0.0147, 0.0143, 0.0141, 0.0141, 0.0142, 0.0145, 0.0150, 0.0160, 0.0176, 0.0210, 0.0469],
      170: [0.0026, 0.0026, 0.0026, 0.0026, 0.0027, 0.0028, 0.0029, 0.0032, 0.0036, 0.0046, 0.0167],
      180: [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000]
    };

    const TABELA_PUCHLOWSKI_BETA = {
      1:   [359.0, 300.2, 279.7, 265.4, 254.0, 244.2, 235.2, 226.4, 217.1, 205.9, 180.0],
      10:  [350.0, 299.6, 279.3, 265.2, 253.9, 244.2, 235.2, 226.4, 217.1, 205.9, 180.0],
      20:  [340.0, 297.9, 278.3, 264.5, 253.5, 243.9, 235.0, 226.3, 217.0, 205.8, 180.0],
      30:  [330.0, 294.9, 276.6, 263.4, 252.7, 243.3, 234.7, 226.1, 217.0, 205.8, 180.0],
      40:  [320.0, 291.0, 274.1, 261.7, 251.5, 242.5, 234.2, 225.8, 216.8, 205.8, 180.0],
      50:  [310.0, 286.1, 271.0, 259.5, 250.0, 241.4, 233.4, 225.4, 216.6, 205.8, 180.0],
      60:  [300.0, 280.5, 267.2, 256.8, 248.0, 240.0, 232.4, 224.7, 216.3, 205.7, 180.0],
      70:  [290.0, 274.2, 262.7, 253.5, 245.5, 238.2, 231.1, 223.9, 215.8, 205.5, 180.0],
      80:  [280.0, 267.3, 257.6, 249.6, 242.5, 235.9, 229.5, 222.8, 215.2, 205.3, 180.0],
      90:  [270.0, 260.0, 252.0, 245.2, 239.0, 233.2, 227.4, 221.3, 214.3, 205.0, 180.0],
      100: [260.0, 252.3, 245.9, 240.2, 235.0, 230.0, 225.0, 219.5, 213.2, 204.6, 180.0],
      110: [250.0, 244.2, 239.2, 234.7, 230.4, 226.3, 222.0, 217.3, 211.7, 203.9, 180.0],
      120: [240.0, 235.8, 232.0, 228.6, 225.3, 221.9, 218.4, 214.6, 209.8, 203.0, 180.0],
      130: [230.0, 227.1, 224.5, 222.0, 219.5, 217.0, 214.3, 211.2, 207.4, 201.6, 180.0],
      140: [220.0, 218.2, 216.4, 214.8, 213.1, 211.3, 209.4, 207.1, 204.3, 199.8, 180.0],
      150: [210.0, 209.0, 208.0, 207.0, 206.0, 204.9, 203.7, 202.2, 200.3, 197.1, 180.0],
      160: [200.0, 199.5, 199.1, 198.6, 198.1, 197.6, 197.0, 196.3, 195.2, 193.4, 180.0],
      170: [190.0, 189.9, 189.8, 189.6, 189.5, 189.4, 189.2, 189.0, 188.7, 188.1, 180.0],
      180: [180.0, 180.0, 180.0, 180.0, 180.0, 180.0, 180.0, 180.0, 180.0, 180.0, 180.0]
    };

    function obterPuchlowski(alphaDeg, cosPhi) {
      let closestAlpha = ALPHAS_PUCHLOWSKI[0];
      let minDiffA = Math.abs(alphaDeg - closestAlpha);
      for (let a of ALPHAS_PUCHLOWSKI) {
        let diff = Math.abs(alphaDeg - a);
        if (diff < minDiffA) {
          minDiffA = diff;
          closestAlpha = a;
        }
      }

      let clampedCos = Math.max(0.0, Math.min(1.0, cosPhi));
      let closestColIdx = 0;
      let minDiffC = Math.abs(clampedCos - COS_PHIS_PUCHLOWSKI[0]);
      for (let idx = 0; idx < COS_PHIS_PUCHLOWSKI.length; idx++) {
        let diff = Math.abs(clampedCos - COS_PHIS_PUCHLOWSKI[idx]);
        if (diff < minDiffC) {
          minDiffC = diff;
          closestColIdx = idx;
        }
      }

      const iefpVal = TABELA_PUCHLOWSKI_IEFP[closestAlpha][closestColIdx];
      const betaVal = TABELA_PUCHLOWSKI_BETA[closestAlpha][closestColIdx];
      return {
        alphaMatch: closestAlpha,
        cosMatch: COS_PHIS_PUCHLOWSKI[closestColIdx],
        colIdx: closestColIdx,
        iefp: iefpVal,
        beta: betaVal
      };
    }

    function gerarTabelaPuchlowskiHTML(alphaAtual, cosPhiAtual) {
      const pMatch = obterPuchlowski(alphaAtual, cosPhiAtual);

      let headerCols = '<th>α [°]</th>';
      for (let c of COS_PHIS_PUCHLOWSKI) {
        const isColMatch = (c === pMatch.cosMatch);
        headerCols += `<th class="${isColMatch ? 'col-destaque' : ''}">cosφ=${c.toFixed(1)}</th>`;
      }

      let bodyRows = '';
      for (let a of ALPHAS_PUCHLOWSKI) {
        const isRowMatch = (a === pMatch.alphaMatch);
        let rowCells = `<td><strong>${a}°</strong></td>`;
        for (let cIdx = 0; cIdx < COS_PHIS_PUCHLOWSKI.length; cIdx++) {
          const isCellMatch = isRowMatch && (cIdx === pMatch.colIdx);
          const val = TABELA_PUCHLOWSKI_IEFP[a][cIdx].toFixed(4);
          const bVal = TABELA_PUCHLOWSKI_BETA[a][cIdx].toFixed(1);
          if (isCellMatch) {
            rowCells += `<td class="cell-destaque" style="background: rgba(227, 179, 65, 0.3) !important; border: 2px solid #e3b341 !important; color: #fff !important; font-weight: bold;" title="α=${a}°, cosφ=${pMatch.cosMatch.toFixed(1)} → β=${bVal}°, Iefp=${val}">
              <span style="color: #e3b341; font-weight: 700; display: block; font-size: 0.82rem;">${val}</span>
              <span style="color: #79c0ff; font-size: 0.70rem; display: block;">β=${Math.round(bVal)}°</span>
            </td>`;
          } else {
            rowCells += `<td title="α=${a}°, cosφ=${COS_PHIS_PUCHLOWSKI[cIdx].toFixed(1)} → β=${bVal}°">${val}</td>`;
          }
        }
        bodyRows += `<tr class="${isRowMatch ? 'row-destaque' : ''}">${rowCells}</tr>`;
      }

      return `
        <div style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="font-size: 0.88rem; font-weight: 700; color: #58a6ff;">Tabela de Corrente Eficaz Parametrizada (Iefp) e Ábaco de Puchlowski (a = 0)</span>
            <div style="font-size: 0.76rem; color: #8b949e;">Fonte: UTFPR (Prof. Francisco José Viglus) / K. P. Puchlowski</div>
          </div>
          <div style="font-size: 0.8rem; background: rgba(227, 179, 65, 0.15); border: 1px solid #e3b341; padding: 4px 10px; border-radius: 4px; color: #f0e6c5;">
            Cruzamento: <strong>α = ${pMatch.alphaMatch}°</strong> e <strong>cos(φ) = ${pMatch.cosMatch.toFixed(1)}</strong> ➔ 
            <span style="color: #e3b341; font-weight: bold;">Iefp = ${pMatch.iefp.toFixed(4)}</span> | 
            <span style="color: #58a6ff; font-weight: bold;">β = ${Math.round(pMatch.beta)}°</span>
          </div>
        </div>
        <div style="max-height: 260px; overflow-x: auto; overflow-y: auto; border: 1px solid #30363d; border-radius: 6px;">
          <table class="tabela-conferencia tabela-puchlowski">
            <thead>
              <tr>${headerCols}</tr>
            </thead>
            <tbody>
              ${bodyRows}
            </tbody>
          </table>
        </div>
      `;
    }

    function toggleTabelaPuchlowski() {
      const box = document.getElementById("tabela-puchlowski-container");
      if (box) {
        const isHidden = (box.style.display === "none");
        box.style.display = isHidden ? "block" : "none";
        if (isHidden) {
          setTimeout(() => {
            const row = box.querySelector(".row-destaque");
            if (row) {
              row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 40);
        }
      }
    }


    function executarCalculo() {
      const topologia = document.getElementById("select-topologia").value;
      const cat = document.getElementById("select-categoria").value;

      let V_rms = parseFloat(document.getElementById("input-vrms")?.value);
      let V_p = parseFloat(document.getElementById("input-vp")?.value);
      if (isNaN(V_rms) && !isNaN(V_p)) {
        V_rms = V_p / Math.SQRT2;
      } else if (isNaN(V_p) && !isNaN(V_rms)) {
        V_p = V_rms * Math.SQRT2;
      }

      let freq = parseFloat(document.getElementById("input-freq")?.value);
      let omega = parseFloat(document.getElementById("input-omega")?.value);
      if (isNaN(freq) && !isNaN(omega)) {
        freq = omega / (2 * Math.PI);
      } else if (isNaN(omega) && !isNaN(freq)) {
        omega = 2 * Math.PI * freq;
      }

      const considerarDiodo = document.getElementById("check-diodo")?.checked || false;
      const V_T0 = parseFloat(document.getElementById("input-vto")?.value || 0);
      const R_D = parseFloat(document.getElementById("input-rd")?.value || 0);
      const R_JA = parseFloat(document.getElementById("input-rja")?.value || 0);
      const T_A = parseFloat(document.getElementById("input-ta")?.value || 25);

      let summaryHTML = "";
      let stepsHTML = "";
      let plotTitle = "";

      if (topologia === "mono_meia_onda_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        plotTitle = `Retificador monofásico de meia onda com carga R = ${R} Ω`;
        const I_p = V_p / R;
        const V_o_med = V_p / Math.PI;
        const I_o_med = V_o_med / R;
        const V_o_ef = V_p / 2;
        const I_o_ef = I_p / 2;
        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = P_R / S;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS)</div><div class="stat-value">${I_o_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Po (Ativa)</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão de Pico da Fonte CA</div>
            <div class="step-desc">A fonte senoidal alternada possui valor de pico dado por:</div>
            <div class="math-block">\\[ V_p = V_{ef} \\cdot \\sqrt{2} = ${V_rms.toFixed(2)} \\cdot \\sqrt{2} = ${V_p.toFixed(2)}\\text{ V} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média na Carga (VR,med)</div>
            <div class="step-desc">Como o diodo conduz apenas durante o semiciclo positivo de 0 a \\(\\pi\\) radianos:</div>
            <div class="math-block">\\[ V_{R,med} = \\frac{1}{2\\pi} \\int_{0}^{\\pi} V_p \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{V_p}{\\pi} = \\frac{${V_p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Média e Eficaz na Carga</div>
            <div class="step-desc">Para uma carga puramente resistiva, a corrente é proporcional à tensão pela Lei de Ohm:</div>
            <div class="math-block">\\[ I_{R,med} = \\frac{V_{R,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
            <div class="math-block">\\[ I_p = \\frac{V_p}{R} = \\frac{${V_p.toFixed(2)}}{${R}} = ${I_p.toFixed(3)}\\text{ A} \\]</div>
            <div class="math-block">\\[ I_{R,ef} = \\frac{I_p}{2} = \\frac{${I_p.toFixed(3)}}{2} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência Ativa, Aparente e Fator de Potência</div>
            <div class="step-desc">A potência ativa dissipada depende estritamente do valor eficaz da corrente na carga:</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{R,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="step-desc">A potência aparente drenada da fonte CA é o produto das grandezas eficazes da entrada:</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="step-desc">O fator de potência é a razão direta entre a potência ativa e a potência aparente:</div>
            <div class="math-block">\\[ F_p = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}\\text{ W}}{${S.toFixed(2)}\\text{ VA}} = ${FP.toFixed(3)} \\quad \\left( \\text{dedução analítica: } \\frac{R I_p^2 / 4}{(V_p / \\sqrt{2})(I_p / 2)} = \\frac{\\sqrt{2}}{2} \\approx 0{,}707 \\right) \\]</div>
            <div class="step-desc">
              <strong>Nota didática:</strong> Embora a carga seja puramente resistiva (\\(\\cos\\phi = 1\\)), o fator de potência na entrada é limitado a \\(0{,}707\\). Isso ocorre porque a comutação não linear do diodo bloqueia o semiciclo negativo, distorcendo fortemente a forma de onda da corrente. Em eletrônica de potência, o fator de potência é composto por \\(F_p = F_{\\text{deslocamento}} \\times F_{\\text{distorção}}\\). Como \\(F_{\\text{deslocamento}} = 1\\) e \\(F_{\\text{distorção}} = \\frac{I_{1,ef}}{I_{ef}} = \\frac{\\sqrt{2}}{2}\\), a distorção harmônica reduz a eficiência de aproveitamento da rede CA.
            </div>
          </div>
        `;

      } else if (topologia === "mono_meia_onda_rl") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        plotTitle = `Retificador monofásico de meia onda com carga RL: R = ${R} Ω, L = ${L} H`;


        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);
        const phi_deg = (phi_rad * 180) / Math.PI;

        const beta_deg = interpolarBeta(phi_deg);
        const beta_rad = (beta_deg * Math.PI) / 180;

        const V_o_med = (V_p / (2 * Math.PI)) * (1 - Math.cos(beta_rad));
        const I_o_med = V_o_med / R;

        const Iefp = interpolarIefp(phi_deg);
        const I_o_ef = (V_p / Z) * Iefp;

        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = P_R / S;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Extinção β</div><div class="stat-value">${beta_deg.toFixed(1)}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Po (Ativa)</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
        `;

        if (considerarDiodo) {
          const P_D = (V_T0 * I_o_med) + (R_D * Math.pow(I_o_ef, 2));
          const T_J = T_A + (P_D * R_JA);
          summaryHTML += `
            <div class="stat-box"><div class="stat-label">Pd (Diodo)</div><div class="stat-value">${P_D.toFixed(2)} W</div></div>
            <div class="stat-box"><div class="stat-label">Tj (Junção)</div><div class="stat-value">${T_J.toFixed(1)} °C</div></div>
          `;
        }

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Impedância e Ângulo de Defasagem da Carga</div>
            <div class="step-desc">Calcula-se a reatância indutiva \\(X_L\\), a impedância complexa total \\(Z\\) e o ângulo \\(\\phi\\):</div>
            <div class="math-block">\\[ X_L = 2\\pi f L = 2\\pi \\cdot ${freq} \\cdot ${L} = ${XL.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ |Z| = \\sqrt{R^2 + X_L^2} = \\sqrt{${R}^2 + (${XL.toFixed(2)})^2} = ${Z.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ \\phi = \\arctan\\left(\\frac{X_L}{R}\\right) = \\arctan\\left(\\frac{${XL.toFixed(2)}}{${R}}\\right) = ${phi_deg.toFixed(2)}^\\circ \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title" style="display: flex; justify-content: space-between; align-items: center;">
              <span>Etapa 2: Obtenção do Ângulo de Extinção \\(\\beta\\)</span>
              <button type="button" class="btn-table-tag" onclick="toggleTabelaBeta()" title="Visualizar tabela numérica de Beta e Iefp">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                </svg>
                Tabela de Valores (β e Iefp)
              </button>
            </div>
            <div class="step-desc">
              A corrente se extingue quando \\(i(\\beta) = 0\\). Pela tabela de cálculo numérico para \\(\\phi \\approx ${Math.round(phi_deg)}^\\circ\\):
              <button type="button" class="btn-table-tag" style="margin-left: 6px; padding: 2px 7px; font-size: 0.74rem;" onclick="toggleTabelaBeta()">📊 Ver Tabela</button>
            </div>
            <div class="math-block">\\[ \\beta = ${beta_deg}^\\circ \\quad (${beta_rad.toFixed(3)}\\text{ rad}) \\]</div>
            <div class="step-desc">Observe que \\(\\beta > 180^\\circ\\), demonstrando que a tensão na carga se torna negativa antes do diodo bloquear.</div>

            <!-- Painel Expansível da Tabela de Conferência -->
            <div id="tabela-beta-container" style="display: none; margin-top: 12px; background: #0d1117; border: 1px solid var(--card-border); border-radius: 6px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 0.85rem; font-weight: 600; color: #58a6ff;">Tabela Numérica: Ângulo de Carga \\(\\phi\\) vs \\(\\beta\\) e \\(I_{efp}\\)</span>
                <span style="font-size: 0.78rem; color: #e3b341; font-weight: 600;">Linha Destacada: \\(\\phi = ${Math.round(phi_deg)}^\\circ \\implies \\beta = ${beta_deg}^\\circ, I_{efp} = ${Iefp}\\)</span>
              </div>
              <div style="max-height: 240px; overflow-y: auto; border: 1px solid #21262d; border-radius: 4px;">
                <table class="tabela-conferencia">
                  <thead>
                    <tr>
                      <th>φ [°]</th>
                      <th>β [°]</th>
                      <th>β [rad]</th>
                      <th>Iefp(φ)</th>
                      <th>Indicação</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${gerarLinhasTabelaConferencia(Math.round(phi_deg))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">Integrando a senoide de \\(0\\) até \\(\\beta\\):</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{V_p}{2\\pi}[1 - \\cos(\\beta)] = \\frac{${V_p.toFixed(2)}}{2\\pi}[1 - \\cos(${beta_deg}^\\circ)] = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="step-desc">Como o indutor possui tensão média nula em regime permanente (\\(V_{L,med} = 0\\)):</div>
            <div class="math-block">\\[ I_{med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title" style="display: flex; justify-content: space-between; align-items: center;">
              <span>Etapa 4: Corrente Eficaz na Carga, Potências e Fator de Potência</span>
              <button type="button" class="btn-table-tag" onclick="toggleTabelaBeta()" title="Visualizar tabela de Iefp">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                </svg>
                Tabela de Iefp
              </button>
            </div>
            <div class="step-desc">
              Utilizando o fator \\(I_{efp}(\\phi)\\) tabulado para \\(\\phi \\approx ${Math.round(phi_deg)}^\\circ\\) (\\(I_{efp} = ${Iefp}\\)):
              <button type="button" class="btn-table-tag" style="margin-left: 6px; padding: 2px 7px; font-size: 0.74rem;" onclick="toggleTabelaBeta()">📊 Ver Tabela</button>
            </div>
            <div class="math-block">\\[ I_{ef} = \\frac{V_p}{|Z|} \\cdot I_{efp}(\\phi) = \\frac{${V_p.toFixed(2)}\\text{ V}}{${Z.toFixed(2)}\\,\\Omega} \\cdot ${Iefp} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}\\text{ W}}{${S.toFixed(2)}\\text{ VA}} = ${FP.toFixed(3)} \\]</div>
            <div class="step-desc">
              <strong>Nota didática:</strong> Com a presença da indutância, o fator de potência é reduzido tanto pela distorção harmônica da forma de onda quanto pelo ângulo de defasagem indutivo \\(\\phi\\).
            </div>
          </div>
        `;

        if (considerarDiodo) {
          const P_D = (V_T0 * I_o_med) + (R_D * Math.pow(I_o_ef, 2));
          const T_J = T_A + (P_D * R_JA);
          stepsHTML += `
            <div class="step-box">
              <div class="step-title">Etapa 5: Perdas no Diodo e Temperatura de Junção</div>
              <div class="step-desc">Dimensionamento térmico com base no modelo do semicondutor:</div>
              <div class="math-block">\\[ P_D = V_{T0} \\cdot I_{med} + R_D \\cdot (I_{ef})^2 = ${V_T0} \\cdot ${I_o_med.toFixed(3)} + ${R_D} \\cdot (${I_o_ef.toFixed(3)})^2 = ${P_D.toFixed(3)}\\text{ W} \\]</div>
              <div class="math-block">\\[ T_J = T_A + P_D \\cdot R_{JA} = ${T_A} + (${P_D.toFixed(3)} \\cdot ${R_JA}) = ${T_J.toFixed(1)}^\\circ\\text{C} \\]</div>
            </div>
          `;
        }

      } else if (topologia === "mono_meia_onda_rl_roda_livre") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        plotTitle = `Retificador monofásico de meia onda com carga RL e diodo de roda livre: R = ${R} Ω, L = ${L} H`;

        const tau = L / R;
        const cinco_omega_tau = 5 * omega * tau;
        const isMCC = cinco_omega_tau >= Math.PI;

        const V_o_med = V_p / Math.PI;
        const I_o_med = V_o_med / R;

        // Análise Harmônica de Fourier
        const XL1 = omega * L;
        const Z1 = Math.sqrt(R * R + XL1 * XL1);
        const phi1_rad = Math.atan(XL1 / R);
        const phi1_deg = (phi1_rad * 180) / Math.PI;
        const I1 = V_p / (2 * Math.SQRT2 * Z1);

        const XL2 = 2 * omega * L;
        const Z2 = Math.sqrt(R * R + XL2 * XL2);
        const I2 = (2 * V_p) / (3 * Math.SQRT2 * Math.PI * Z2);

        const XL4 = 4 * omega * L;
        const Z4 = Math.sqrt(R * R + XL4 * XL4);
        const I4 = (2 * V_p) / (15 * Math.SQRT2 * Math.PI * Z4);

        const XL6 = 6 * omega * L;
        const Z6 = Math.sqrt(R * R + XL6 * XL6);
        const I6 = (2 * V_p) / (35 * Math.SQRT2 * Math.PI * Z6);

        // Corrente eficaz na carga Io,ef
        const I_o_ef = Math.sqrt(Math.pow(I_o_med, 2) + Math.pow(I1, 2) + Math.pow(I2, 2) + Math.pow(I4, 2) + Math.pow(I6, 2));

        // Potência dissipada no resistor (Carga)
        const P_R = R * Math.pow(I_o_ef, 2);
        const P_aprox = V_o_med * I_o_med; // Modelo aproximado de indutância elevada

        // Corrente eficaz na fonte CA / D1
        const iefpD1 = interpolarIefpRodaLivre(phi1_deg);
        const I_in_ef_tabela = (V_p / Z1) * iefpD1;
        const I_in_ef_aprox = I_o_med / Math.SQRT2;
        const I_in_ef = isMCC && (cinco_omega_tau > 10) ? I_in_ef_aprox : I_in_ef_tabela;

        // Potência aparente e Fator de Potência
        const S = V_rms * I_in_ef;
        const FP = S > 0 ? (P_R / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Modo de Condução</div><div class="stat-value">${isMCC ? "MCC" : "MCD"}</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Carga PR</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Potência Aparente S</div><div class="stat-value">${S.toFixed(2)} VA</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência Fp</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Verificação do Modo de Condução (MCC vs MCD)</div>
            <div class="step-desc">O diodo de roda livre conduz no intervalo em que \\(v(t) < 0\\), grampeando a saída em 0 V. Critério de condução:</div>
            <div class="math-block">\\[ \\tau = \\frac{L}{R} = \\frac{${L}\\text{ H}}{${R}\\,\\Omega} = ${(tau * 1000).toFixed(2)}\\text{ ms} \\]</div>
            <div class="math-block">\\[ 5\\tau = ${(5 * tau * 1000).toFixed(2)}\\text{ ms} \\quad \\text{vs} \\quad \\frac{\\pi}{\\omega} = \\frac{\\pi}{${omega.toFixed(1)}\\text{ rad/s}} = ${( (Math.PI / omega) * 1000 ).toFixed(3)}\\text{ ms} \\]</div>
            <div class="step-desc">
              ${isMCC 
                ? `Como \\(5\\tau > \\frac{\\pi}{\\omega}\\) (${(5 * tau * 1000).toFixed(2)} ms > ${( (Math.PI / omega) * 1000 ).toFixed(3)} ms ou \\(5\\omega\\tau > \\pi\\)), o indutor não descarrega completamente &rarr; <strong>Modo de Condução Contínuo (MCC)</strong>.` 
                : `Como \\(5\\tau < \\frac{\\pi}{\\omega}\\) (${(5 * tau * 1000).toFixed(2)} ms < ${( (Math.PI / omega) * 1000 ).toFixed(3)} ms ou \\(5\\omega\\tau < \\pi\\)), a corrente se extingue antes de \\(\\omega t = 2\\pi\\) &rarr; <strong>Modo de Condução Descontínuo (MCD)</strong>.`}
            </div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">O diodo de roda livre impede que a tensão de saída se torne negativa:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{V_p}{\\pi} = \\frac{${V_p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="step-desc">Como a tensão média no indutor em regime permanente é nula (\\(V_{L,med} = 0\\)):</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Decomposição Harmônica de Fourier da Corrente</div>

            <div class="step-desc"><strong>• Componente Fundamental (${freq.toFixed(0)} Hz):</strong></div>
            <div class="math-block">\\[ X_1 = 2\\pi f_1 L = 2\\pi \\cdot ${freq.toFixed(0)} \\cdot ${L} = ${XL1.toFixed(2)}\\,\\Omega \\qquad Z_1 = \\sqrt{R^2 + X_1^2} = \\sqrt{${R}^2 + (${XL1.toFixed(2)})^2} = ${Z1.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ I_1 = \\frac{V_p}{2\\sqrt{2} Z_1} = \\frac{${V_p.toFixed(2)}}{2\\sqrt{2} \\cdot ${Z1.toFixed(2)}} = ${I1.toFixed(3)}\\text{ A} \\]</div>

            <div class="step-desc"><strong>• Segunda Harmônica (${(2 * freq).toFixed(0)} Hz):</strong></div>
            <div class="math-block">\\[ X_2 = 2\\pi f_2 L = 2\\pi \\cdot ${(2 * freq).toFixed(0)} \\cdot ${L} = ${XL2.toFixed(2)}\\,\\Omega \\qquad Z_2 = \\sqrt{R^2 + X_2^2} = \\sqrt{${R}^2 + (${XL2.toFixed(2)})^2} = ${Z2.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ I_2 = \\frac{2V_p}{3\\sqrt{2}\\pi Z_2} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{3\\sqrt{2}\\pi \\cdot ${Z2.toFixed(2)}} = ${I2.toFixed(3)}\\text{ A} \\]</div>

            <div class="step-desc"><strong>• Quarta Harmônica (${(4 * freq).toFixed(0)} Hz):</strong></div>
            <div class="math-block">\\[ X_4 = 2\\pi f_4 L = 2\\pi \\cdot ${(4 * freq).toFixed(0)} \\cdot ${L} = ${XL4.toFixed(2)}\\,\\Omega \\qquad Z_4 = \\sqrt{R^2 + X_4^2} = \\sqrt{${R}^2 + (${XL4.toFixed(2)})^2} = ${Z4.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ I_4 = \\frac{2V_p}{15\\sqrt{2}\\pi Z_4} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{15\\sqrt{2}\\pi \\cdot ${Z4.toFixed(2)}} = ${I4.toFixed(3)}\\text{ A} \\]</div>

            <div class="step-desc"><strong>• Sexta Harmônica (${(6 * freq).toFixed(0)} Hz):</strong></div>
            <div class="math-block">\\[ X_6 = 2\\pi f_6 L = 2\\pi \\cdot ${(6 * freq).toFixed(0)} \\cdot ${L} = ${XL6.toFixed(2)}\\,\\Omega \\qquad Z_6 = \\sqrt{R^2 + X_6^2} = \\sqrt{${R}^2 + (${XL6.toFixed(2)})^2} = ${Z6.toFixed(2)}\\,\\Omega \\]</div>
            <div class="math-block">\\[ I_6 = \\frac{2V_p}{35\\sqrt{2}\\pi Z_6} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{35\\sqrt{2}\\pi \\cdot ${Z6.toFixed(2)}} = ${I6.toFixed(3)}\\text{ A} \\]</div>

            <div class="step-desc"><strong>• Composição da Corrente Eficaz Total na Carga (RMS):</strong></div>
            <div class="math-block">\\[ I_{o,ef} = \\sqrt{I_{med}^2 + I_1^2 + I_2^2 + I_4^2 + I_6^2} = \\sqrt{${I_o_med.toFixed(3)}^2 + ${I1.toFixed(3)}^2 + ${I2.toFixed(3)}^2 + ${I4.toFixed(3)}^2 + ${I6.toFixed(3)}^2} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência Ativa Absorvida pela Carga (Resistor)</div>
            <div class="step-desc">A potência média absorvida pela carga é dissipada unicamente no resistor (\\(P_L = 0\\)):</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="step-desc"><strong>Aproximação de Indutância Elevada:</strong> Considerando corrente contínua pura (\\(L \\to \\infty\\)):</div>
            <div class="math-block">\\[ P_{o,aprox} = V_{o,med} \\cdot I_{o,med} = R \\cdot (I_{o,med})^2 = ${P_aprox.toFixed(2)}\\text{ W} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 5: Corrente Eficaz na Fonte, Potência Aparente e Fator de Potência</div>
            ${isMCC && (cinco_omega_tau > 10) ? `
              <div class="step-desc">A corrente na rede CA é igual à do diodo \\(D_1\\) (\\(i_{in} = i_{D1}\\)). Em modo contínuo (MCC), \\(D_1\\) conduz a corrente contínua \\(I_o\\) em \\([0, \\pi]\\) e bloqueia em \\([\\pi, 2\\pi]\\) quando \\(D_2\\) assume a condução:</div>
              <div class="math-block">\\[ I_{in,ef} = \\sqrt{\\frac{1}{2\\pi}\\left[\\int_{0}^{\\pi} (I_o)^2\\,d(\\omega t) + \\int_{\\pi}^{2\\pi} 0^2\\,d(\\omega t)\\right]} = \\frac{I_{o,med}}{\\sqrt{2}} = \\frac{${I_o_med.toFixed(3)}\\text{ A}}{\\sqrt{2}} = ${I_in_ef.toFixed(3)}\\text{ A} \\]</div>
            ` : `
              <div class="step-desc">A corrente na rede CA é igual à do diodo \\(D_1\\). Pela tabela de \\(I_{efp}(\\phi)\\) para \\(\\phi \\approx ${Math.round(phi1_deg)}^\\circ\\) (\\(I_{efp} = ${iefpD1}\\)):</div>
              <div class="math-block">\\[ I_{in,ef} = \\frac{V_p}{Z_1} \\cdot I_{efp}(\\phi) = \\frac{${V_p.toFixed(2)}\\text{ V}}{${Z1.toFixed(2)}\\,\\Omega} \\cdot ${iefpD1} = ${I_in_ef.toFixed(3)}\\text{ A} \\]</div>
            `}
            <div class="step-desc">Potência Aparente \\(S\\) e Fator de Potência \\(F_p\\):</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{in,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_in_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}\\text{ W}}{${S.toFixed(2)}\\text{ VA}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;

        if (considerarDiodo) {
          const I_D1_med = I_o_med / 2;
          const I_D2_med = I_o_med / 2;
          const I_D1_ef = I_in_ef;
          const I_D2_ef = Math.sqrt(Math.max(0, Math.pow(I_o_ef, 2) - Math.pow(I_D1_ef, 2)));
          const P_D1 = (V_T0 * I_D1_med) + (R_D * Math.pow(I_D1_ef, 2));
          const P_D2 = (V_T0 * I_D2_med) + (R_D * Math.pow(I_D2_ef, 2));
          const P_D_total = P_D1 + P_D2;
          const T_J = T_A + (P_D_total * R_JA);
          stepsHTML += `
            <div class="step-box">
              <div class="step-title">Etapa 6: Perdas nos Diodos e Temperatura de Junção</div>
              <div class="step-desc">Considerando condução dividida entre \\(D_1\\) e \\(D_2\\):</div>
              <div class="math-block">\\[ P_{D1} = V_{T0} I_{D1,med} + R_D (I_{D1,ef})^2 = ${P_D1.toFixed(3)}\\text{ W} \\]</div>
              <div class="math-block">\\[ P_{D2} = V_{T0} I_{D2,med} + R_D (I_{D2,ef})^2 = ${P_D2.toFixed(3)}\\text{ W} \\]</div>
              <div class="math-block">\\[ P_{D,total} = ${P_D_total.toFixed(3)}\\text{ W} \\implies T_J = ${T_A} + (${P_D_total.toFixed(3)} \\cdot ${R_JA}) = ${T_J.toFixed(1)}^\\circ\\text{C} \\]</div>
            </div>
          `;
        }

      } else if (topologia === "mono_meia_onda_rle") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const E = parseFloat(document.getElementById("input-e").value);
        plotTitle = `Retificador monofásico de meia onda com carga RLE: E = ${E} V`;

        const alpha_rad = Math.asin(E / V_p);
        const alpha_deg = (alpha_rad * 180) / Math.PI;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const beta_deg = 239;
        const beta_rad = (beta_deg * Math.PI) / 180;

        const V_o_med = (V_p * (Math.cos(alpha_rad) - Math.cos(beta_rad)) + E * (2 * Math.PI + alpha_rad - beta_rad)) / (2 * Math.PI);
        const I_o_med = (V_o_med - E) / R;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha_deg.toFixed(2)}°</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Extinção β</div><div class="stat-value">${beta_deg}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Ângulo de Início de Condução (\\(\\alpha\\))</div>
            <div class="step-desc">O diodo só entra em condução quando a tensão da rede supera a força contra-eletromotriz \\(E\\):</div>
            <div class="math-block">\\[ \\alpha = \\operatorname{arcsen}\\left(\\frac{E}{V_p}\\right) = \\operatorname{arcsen}\\left(\\frac{${E}}{${V_p.toFixed(2)}}\\right) = ${alpha_deg.toFixed(2)}^\\circ \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão e Corrente Média na Carga</div>
            <div class="step-desc">No intervalo bloqueado, a tensão de saída é mantida em \\(E\\). Assim:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{V_p[\\cos(\\alpha) - \\cos(\\beta)] + E(2\\pi + \\alpha - \\beta)}{2\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>
        `;

      } else if (topologia === "mono_meia_onda_rc") {
        const Po = parseFloat(document.getElementById("input-p0").value);
        const ripplePct = parseFloat(document.getElementById("input-ripple").value);
        const delta_Vo = (ripplePct / 100) * V_p;
        const Ro = Math.pow(V_p - delta_Vo / 2, 2) / Po;

        const theta1_rad = Math.asin((V_p - delta_Vo) / V_p);
        const theta1_deg = (theta1_rad * 180) / Math.PI;

        const C = V_p * ((1.5 * Math.PI + theta1_rad) / (omega * Ro * delta_Vo));
        plotTitle = `Retificador monofásico de meia onda com filtro capacitivo: C = ${(C * 1000).toFixed(2)} mF`;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Capacitância C</div><div class="stat-value">${(C * 1000).toFixed(2)} mF</div></div>
          <div class="stat-box"><div class="stat-label">Resistência Carga</div><div class="stat-value">${Ro.toFixed(1)} Ω</div></div>
          <div class="stat-box"><div class="stat-label">Ondulação ΔVo</div><div class="stat-value">${delta_Vo.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo θ1</div><div class="stat-value">${theta1_deg.toFixed(1)}°</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Resistência Equivalente e Ondulação</div>
            <div class="step-desc">Dimensionamento conforme equacionamento por aproximação de série de Taylor:</div>
            <div class="math-block">\\[ \\Delta V_o = ${ripplePct}\\% \\cdot ${V_p.toFixed(2)}\\text{ V} = ${delta_Vo.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ R_o = \\frac{(V_p - \\Delta V_o / 2)^2}{P_o} = \\frac{(${V_p.toFixed(2)} - ${(delta_Vo/2).toFixed(2)})^2}{${Po}} = ${Ro.toFixed(2)}\\,\\Omega \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Ângulo de Condução e Capacitância do Filtro</div>
            <div class="math-block">\\[ \\theta_1 = \\operatorname{arcsen}\\left(\\frac{V_p - \\Delta V_o}{V_p}\\right) = ${theta1_deg.toFixed(2)}^\\circ \\quad (${theta1_rad.toFixed(3)}\\text{ rad}) \\]</div>
            <div class="math-block">\\[ C = V_p \\left( \\frac{3\\pi/2 + \\theta_1}{\\omega R_o \\Delta V_o} \\right) = ${(C * 1000).toFixed(2)}\\text{ mF} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        plotTitle = `Retificador em ponte completa com carga R = ${R} Ω`;

        const V_o_med = (2 * V_p) / Math.PI;
        const I_o_med = V_o_med / R;
        const V_o_ef = V_p / Math.SQRT2;
        const I_o_ef = V_o_ef / R;
        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_R / S) : 1;

        const I_D_med = I_o_med / 2;
        const I_D_ef = I_o_ef / Math.SQRT2;
        const V_RRM = V_p;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa PR</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
          <div class="stat-box"><div class="stat-label">VRRM (Diodos)</div><div class="stat-value">${V_RRM.toFixed(1)} V</div></div>
        `;

        if (considerarDiodo) {
          const P_D_total = 4 * ((V_T0 * I_D_med) + (R_D * Math.pow(I_D_ef, 2)));
          const T_J = T_A + ((P_D_total / 4) * R_JA);
          summaryHTML += `
            <div class="stat-box"><div class="stat-label">Pd (4 Diodos)</div><div class="stat-value">${P_D_total.toFixed(2)} W</div></div>
            <div class="stat-box"><div class="stat-label">Tj (Junção)</div><div class="stat-value">${T_J.toFixed(1)} °C</div></div>
          `;
        }

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão e Corrente Média na Carga</div>
            <div class="step-desc">Como ambos os semiciclos são retificados (período de repetição \\(T = \\pi\\)):</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{1}{\\pi} \\int_{0}^{\\pi} V_p \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{2V_p}{\\pi} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="step-desc">Para carga puramente resistiva, a corrente média segue a Lei de Ohm:</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão e Corrente Eficaz na Carga</div>
            <div class="step-desc">O valor eficaz de uma senoide retificada em onda completa é idêntico ao da senoide original:</div>
            <div class="math-block">\\[ V_{o,ef} = \\sqrt{\\frac{1}{\\pi} \\int_{0}^{\\pi} [V_p \\operatorname{sen}(\\omega t)]^2\\,d(\\omega t)} = \\frac{V_p}{\\sqrt{2}} = \\frac{${V_p.toFixed(2)}}{\\sqrt{2}} = ${V_o_ef.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,ef} = \\frac{V_{o,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Potência Ativa, Potência Aparente e Fator de Potência</div>
            <div class="step-desc">Potência média ativa consumida pelo resistor:</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="step-desc">A corrente da fonte CA \\(i_s(t)\\) é alternada pura e possui valor eficaz \\(I_{s,ef} = I_{o,ef}\\):</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{s,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
            <div class="step-desc"><strong>Nota didática:</strong> O fator de potência é rigorosamente unitário (\\(F_p = 1\\)) para carga resistiva em onda completa em ponte, pois a corrente na fonte é puramente senoidal e perfeitamente em fase com a tensão de entrada.</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Dimensionamento dos Diodos da Ponte</div>
            <div class="step-desc">Cada par de diodos (\\(D_1-D_4\\) e \\(D_2-D_3\\)) conduz durante meio ciclo:</div>
            <div class="math-block">\\[ I_{D,med} = \\frac{I_{o,med}}{2} = \\frac{${I_o_med.toFixed(3)}}{2} = ${I_D_med.toFixed(3)}\\text{ A} \\qquad I_{D,ef} = \\frac{I_{o,ef}}{\\sqrt{2}} = \\frac{${I_o_ef.toFixed(3)}}{\\sqrt{2}} = ${I_D_ef.toFixed(3)}\\text{ A} \\]</div>
            <div class="step-desc">Tensão de pico reversa máxima suportada por cada semicondutor:</div>
            <div class="math-block">\\[ V_{RRM} = V_p = ${V_RRM.toFixed(2)}\\text{ V} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_tap_r") {
        const N = parseFloat(document.getElementById("input-n").value) || 1;
        const R = parseFloat(document.getElementById("input-r").value);
        plotTitle = `Retificador com transformador de ponto médio (Tap Central): N = ${N}, R = ${R} Ω`;

        const V_1p = V_p;
        const V_2p = V_1p / N;
        const V_2_ef = V_2p / Math.SQRT2;

        const V_o_med = (2 * V_2p) / Math.PI;
        const I_o_med = V_o_med / R;
        const V_o_ef = V_2p / Math.SQRT2;
        const I_o_ef = V_o_ef / R;
        const P_R = R * Math.pow(I_o_ef, 2);

        const I_D_med = I_o_med / 2;
        const I_D_ef = I_o_ef / Math.SQRT2;
        const V_RRM = 2 * V_2p;

        const S_sec = 2 * V_2_ef * I_D_ef;
        const I_1_ef = I_o_ef / N;
        const S_pri = V_rms * I_1_ef;
        const FP = S_pri > 0 ? (P_R / S_pri) : 1;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">V2,pico (Secundário)</div><div class="stat-value">${V_2p.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa PR</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">VRRM Diodos (2·V2p)</div><div class="stat-value" style="color: #f85149;">${V_RRM.toFixed(1)} V</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Relação de Transformação e Tensão no Secundário</div>
            <div class="step-desc">A relação de espiras \\(N = \\frac{N_1}{N_2}\\) define a tensão de pico em cada perna do enrolamento secundário:</div>
            <div class="math-block">\\[ V_{1p} = V_{1,ef} \\cdot \\sqrt{2} = ${V_1p.toFixed(2)}\\text{ V} \\implies V_{2p} = \\frac{V_{1p}}{N} = \\frac{${V_1p.toFixed(2)}}{${N}} = ${V_2p.toFixed(2)}\\text{ V} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão e Corrente Média na Carga</div>
            <div class="step-desc">Cada metade do secundário alimenta a carga em semiciclos alternados com derivação central em 0 V:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{2V_{2p}}{\\pi} = \\frac{2 \\cdot ${V_2p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Eficaz e Potência Ativa</div>
            <div class="math-block">\\[ V_{o,ef} = \\frac{V_{2p}}{\\sqrt{2}} = ${V_o_ef.toFixed(2)}\\text{ V} \\qquad I_{o,ef} = \\frac{V_{o,ef}}{R} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Tensão Reversa de Pico nos Diodos (VRRM)</div>
            <div class="step-desc">Quando um diodo conduz (curto ideal), o outro diodo é submetido à soma das tensões dos dois enrolamentos secundários:</div>
            <div class="math-block">\\[ V_{RRM} = 2 \\cdot V_{2p} = 2 \\cdot ${V_2p.toFixed(2)}\\text{ V} = ${V_RRM.toFixed(2)}\\text{ V} \\]</div>
            <div class="step-desc"><strong>Desvantagem estrutural:</strong> Os semicondutores precisam suportar o dobro da tensão de pico em relação à ponte completa (\\(2V_{2p}\\) contra \\(V_p\\)). Além disso, o secundário do transformador conduz corrente contínua pulsada unidirecional em cada enrolamento.</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_rl") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        plotTitle = `Retificador em ponte com carga RL: R = ${R} Ω, L = ${L} H`;

        const V_o_med = (2 * V_p) / Math.PI;
        const I_o_med = V_o_med / R;

        // Harmônicas pares de Fourier N = 2, 4, 6, 8
        const harm = [2, 4, 6, 8].map(N => {
          const X_N = N * omega * L;
          const Z_N = Math.sqrt(R * R + X_N * X_N);
          const phi_N_rad = Math.atan(X_N / R);
          const phi_N_deg = (phi_N_rad * 180) / Math.PI;
          const I_N_pico = (4 * V_p) / (Math.PI * (N * N - 1) * Z_N);
          const I_N_ef = I_N_pico / Math.SQRT2;
          return { N, X_N, Z_N, phi_N_deg, I_N_pico, I_N_ef };
        });

        const somaQuadHarm = harm.reduce((acc, h) => acc + Math.pow(h.I_N_ef, 2), 0);
        const I_o_ef = Math.sqrt(Math.pow(I_o_med, 2) + somaQuadHarm);

        const P_R = R * Math.pow(I_o_ef, 2);
        const I_in_ef = I_o_ef;
        const S = V_rms * I_in_ef;
        const FP = S > 0 ? (P_R / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Total)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa PR</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Potência Aparente S</div><div class="stat-value">${S.toFixed(2)} VA</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">A ponte completa não permite que a tensão de saída se torne negativa:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{2V_p}{\\pi} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="step-desc">Como a tensão média no indutor em regime permanente é zero (\\(V_{L,med} = 0\\)):</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Decomposição Harmônica de Fourier da Corrente</div>
            <div class="step-desc">A série de Fourier da tensão na carga contém exclusivamente harmônicas pares (\\(N = 2, 4, 6, 8\\)):</div>
            <div class="math-block">\\[ v_o(\\omega t) = V_p \\left[ \\frac{2}{\\pi} - \\frac{4}{3\\pi}\\cos(2\\omega t) - \\frac{4}{15\\pi}\\cos(4\\omega t) - \\frac{4}{35\\pi}\\cos(6\\omega t) - \\dots \\right] \\]</div>
            <div class="step-desc">Cálculo das componentes de impedância e corrente harmônica:</div>
            <div class="math-block">\\[ \\mathbf{N = 2}:\\; X_2 = ${harm[0].X_N.toFixed(2)}\\,\\Omega,\\; Z_2 = ${harm[0].Z_N.toFixed(2)}\\,\\Omega \\implies I_{2,pico} = \\frac{4V_p}{3\\pi Z_2} = ${harm[0].I_N_pico.toFixed(3)}\\text{ A} \\;\\left(I_{2,ef} = ${harm[0].I_N_ef.toFixed(3)}\\text{ A}\\right) \\]</div>
            <div class="math-block">\\[ \\mathbf{N = 4}:\\; X_4 = ${harm[1].X_N.toFixed(2)}\\,\\Omega,\\; Z_4 = ${harm[1].Z_N.toFixed(2)}\\,\\Omega \\implies I_{4,pico} = \\frac{4V_p}{15\\pi Z_4} = ${harm[1].I_N_pico.toFixed(3)}\\text{ A} \\;\\left(I_{4,ef} = ${harm[1].I_N_ef.toFixed(3)}\\text{ A}\\right) \\]</div>
            <div class="math-block">\\[ \\mathbf{N = 6}:\\; X_6 = ${harm[2].X_N.toFixed(2)}\\,\\Omega,\\; Z_6 = ${harm[2].Z_N.toFixed(2)}\\,\\Omega \\implies I_{6,pico} = \\frac{4V_p}{35\\pi Z_6} = ${harm[2].I_N_pico.toFixed(3)}\\text{ A} \\;\\left(I_{6,ef} = ${harm[2].I_N_ef.toFixed(3)}\\text{ A}\\right) \\]</div>
            <div class="math-block">\\[ \\mathbf{N = 8}:\\; X_8 = ${harm[3].X_N.toFixed(2)}\\,\\Omega,\\; Z_8 = ${harm[3].Z_N.toFixed(2)}\\,\\Omega \\implies I_{8,pico} = \\frac{4V_p}{63\\pi Z_8} = ${harm[3].I_N_pico.toFixed(3)}\\text{ A} \\;\\left(I_{8,ef} = ${harm[3].I_N_ef.toFixed(3)}\\text{ A}\\right) \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Eficaz Total na Carga (RMS)</div>
            <div class="math-block">\\[ I_{o,ef} = \\sqrt{I_{o,med}^2 + \\left(\\frac{I_2}{\\sqrt{2}}\\right)^2 + \\left(\\frac{I_4}{\\sqrt{2}}\\right)^2 + \\left(\\frac{I_6}{\\sqrt{2}}\\right)^2 + \\left(\\frac{I_8}{\\sqrt{2}}\\right)^2} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência Ativa, Potência Aparente e Fator de Potência</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{s,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_re") {
        const R = parseFloat(document.getElementById("input-r").value);
        const E = parseFloat(document.getElementById("input-e").value);
        plotTitle = `Retificador em ponte com carga RE: R = ${R} Ω, E = ${E} V`;

        const theta1_rad = Math.asin(Math.min(1, E / V_p));
        const theta1_deg = (theta1_rad * 180) / Math.PI;
        const theta2_rad = Math.PI - theta1_rad;
        const theta2_deg = 180 - theta1_deg;

        const V_o_med = (2 * V_p * (Math.cos(theta1_rad) + theta1_rad * Math.sin(theta1_rad))) / Math.PI;
        const V_R_med = V_o_med - E;
        const I_o_med = Math.max(0, V_R_med / R);

        const termo1 = (Math.pow(V_p, 2) / 4) * (2 * (theta2_rad - theta1_rad) + Math.sin(2 * theta1_rad) - Math.sin(2 * theta2_rad));
        const termo2 = 2 * V_p * E * (Math.cos(theta2_rad) - Math.cos(theta1_rad));
        const termo3 = Math.pow(E, 2) * (theta2_rad - theta1_rad);
        const radicando = (termo1 + termo2 + termo3);
        const I_o_ef = (1 / (R * Math.sqrt(Math.PI))) * Math.sqrt(Math.max(0, radicando));

        const P_R = R * Math.pow(I_o_ef, 2);
        const P_E = E * I_o_med;
        const P_M = P_R + P_E;
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_M / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo θ1</div><div class="stat-value">${theta1_deg.toFixed(2)}°</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Extinção θ2</div><div class="stat-value">${theta2_deg.toFixed(2)}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Total PM</div><div class="stat-value">${P_M.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Ângulos de Condução (\\(\\theta_1\\) e \\(\\theta_2\\))</div>
            <div class="step-desc">Os diodos só conduzem nos dois semiciclos quando a tensão alternada é superior à FEM \\(E\\):</div>
            <div class="math-block">\\[ \\theta_1 = \\operatorname{arcsen}\\left(\\frac{E}{V_p}\\right) = \\operatorname{arcsen}\\left(\\frac{${E}}{${V_p.toFixed(2)}}\\right) = ${theta1_deg.toFixed(2)}^\\circ \\quad (${theta1_rad.toFixed(3)}\\text{ rad}) \\]</div>
            <div class="math-block">\\[ \\theta_2 = \\pi - \\theta_1 = ${theta2_deg.toFixed(2)}^\\circ \\quad (${theta2_rad.toFixed(3)}\\text{ rad}) \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">A tensão na saída é \\(v_i(t)\\) durante a condução e \\(E\\) durante o bloqueio:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{2V_p(\\cos\\theta_1 + \\theta_1\\operatorname{sen}\\theta_1)}{\\pi} = \\frac{2 \\cdot ${V_p.toFixed(2)}(\\cos(${theta1_deg.toFixed(2)}^\\circ) + ${theta1_rad.toFixed(3)}\\operatorname{sen}(${theta1_deg.toFixed(2)}^\\circ))}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Eficaz por Integral Analítica</div>
            <div class="step-desc">Dedução analítica exata da integral quadrática nos pulsos de condução:</div>
            <div class="math-block">\\[ I_{o,ef} = \\frac{1}{R\\sqrt{\\pi}} \\sqrt{ \\frac{V_p^2}{4}[2(\\theta_2 - \\theta_1) + \\operatorname{sen}(2\\theta_1) - \\operatorname{sen}(2\\theta_2)] + 2V_p E(\\cos\\theta_2 - \\cos\\theta_1) + E^2(\\theta_2 - \\theta_1) } = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência na Carga, Potência Aparente e Fator de Potência</div>
            <div class="step-desc">A potência total fornecida à carga compõe-se das perdas Joule no resistor e do carregamento da bateria:</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R} \\cdot (${I_o_ef.toFixed(3)})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad P_E = E \\cdot I_{o,med} = ${E} \\cdot ${I_o_med.toFixed(3)} = ${P_E.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ P_M = P_R + P_E = ${P_R.toFixed(2)} + ${P_E.toFixed(2)} = ${P_M.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{s,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_M}{S} = \\frac{${P_M.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_ponte_rle") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const E = parseFloat(document.getElementById("input-e").value);
        plotTitle = `Retificador em ponte com carga RLE: R = ${R} Ω, L = ${L} H, E = ${E} V`;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);
        const phi_deg = (phi_rad * 180) / Math.PI;
        const cos_phi = R / Z;
        const a_param = Math.min(0.999, E / V_p);
        const alpha_rad = Math.asin(a_param);
        const alpha_deg = (alpha_rad * 180) / Math.PI;

        function f_corrente(theta) {
          const tan_phi = Math.tan(phi_rad);
          const term1 = (V_p / Z) * (Math.sin(theta - phi_rad) - Math.sin(alpha_rad - phi_rad) * Math.exp(-(theta - alpha_rad) / tan_phi));
          const term2 = (E / R) * (1 - Math.exp(-(theta - alpha_rad) / tan_phi));
          return term1 - term2;
        }

        const i_na_fronteira = f_corrente(Math.PI + alpha_rad);
        const isMCC = i_na_fronteira > 0;

        let beta_rad = Math.PI + alpha_rad;
        let beta_deg = (beta_rad * 180) / Math.PI;
        let V_o_med = 0;
        let I_o_med = 0;
        let I_o_ef = 0;

        if (isMCC) {
          V_o_med = (2 * V_p) / Math.PI;
          I_o_med = (V_o_med - E) / R;
          I_o_ef = I_o_med;
        } else {
          let bMin = alpha_rad + 0.001;
          let bMax = Math.PI + alpha_rad;
          for (let iter = 0; iter < 40; iter++) {
            const bMid = (bMin + bMax) / 2;
            if (f_corrente(bMid) > 0) {
              bMin = bMid;
            } else {
              bMax = bMid;
            }
          }
          beta_rad = (bMin + bMax) / 2;
          beta_deg = (beta_rad * 180) / Math.PI;

          V_o_med = (V_p * (Math.cos(alpha_rad) - Math.cos(beta_rad)) + E * (Math.PI + alpha_rad - beta_rad)) / Math.PI;
          I_o_med = (V_o_med - E) / R;

          let soma_i2 = 0;
          const nPassos = 100;
          const dTheta = (beta_rad - alpha_rad) / nPassos;
          for (let p = 0; p < nPassos; p++) {
            const th = alpha_rad + (p + 0.5) * dTheta;
            const i_val = Math.max(0, f_corrente(th));
            soma_i2 += i_val * i_val * dTheta;
          }
          I_o_ef = Math.sqrt((1 / Math.PI) * soma_i2);
        }

        const P_R = R * Math.pow(I_o_ef, 2);
        const P_E = E * I_o_med;
        const P_M = P_R + P_E;
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_M / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Modo de Condução</div><div class="stat-value" style="color: ${isMCC ? '#2ea043' : '#e3b341'};">${isMCC ? "MCC (Contínuo)" : "MCD (Descontínuo)"}</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha_deg.toFixed(2)}°</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Extinção β</div><div class="stat-value">${beta_deg.toFixed(1)}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Total PM</div><div class="stat-value">${P_M.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Parâmetros da Carga e Verificação do Modo de Condução</div>
            <div class="step-desc">Ângulo de carga \\(\\phi\\), parâmetro \\(a = E/V_p\\) e ângulo de condução natural \\(\\alpha\\):</div>
            <div class="math-block">\\[ X_L = \\omega L = ${XL.toFixed(2)}\\,\\Omega \\qquad |Z| = \\sqrt{R^2 + X_L^2} = ${Z.toFixed(2)}\\,\\Omega \\qquad \\cos\\phi = ${cos_phi.toFixed(3)} \\]</div>
            <div class="math-block">\\[ a = \\frac{E}{V_p} = \\frac{${E}}{${V_p.toFixed(2)}} = ${a_param.toFixed(3)} \\qquad \\alpha = \\operatorname{arcsen}(a) = ${alpha_deg.toFixed(2)}^\\circ \\quad (${alpha_rad.toFixed(3)}\\text{ rad}) \\]</div>
            <div class="step-desc">
              ${isMCC
                ? `Como a corrente não se anula antes de \\(\\omega t = \\pi + \\alpha\\) (\\(\\beta = ${beta_deg.toFixed(1)}^\\circ > ${(180 + alpha_deg).toFixed(1)}^\\circ\\)), o circuito opera em <strong>Modo de Condução Contínuo (MCC)</strong>.`
                : `Como a corrente se anula em \\(\\beta = ${beta_deg.toFixed(1)}^\\circ < ${(180 + alpha_deg).toFixed(1)}^\\circ\\), o circuito opera em <strong>Modo de Condução Descontínuo (MCD)</strong>.`}
            </div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            ${isMCC ? `
              <div class="step-desc">Em condução contínua, a tensão é retificada em onda completa sem intervalos de nível contínuo \\(E\\):</div>
              <div class="math-block">\\[ V_{o,med} = \\frac{2V_p}{\\pi} = \\frac{2 \\cdot ${V_p.toFixed(2)}}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
              <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
            ` : `
              <div class="step-desc">Em condução descontínua, a tensão na saída integra a senoide de \\(\\alpha\\) a \\(\\beta\\) e fixa-se em \\(E\\) no restante:</div>
              <div class="math-block">\\[ V_{o,med} = \\frac{V_p[\\cos(\\alpha) - \\cos(\\beta)] + E(\\pi + \\alpha - \\beta)}{\\pi} = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
              <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
            `}
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Eficaz na Carga</div>
            ${isMCC ? `
              <div class="step-desc">Em regime contínuo (MCC) com indutância significativa, a ondulação da corrente é reduzida, aproximando o valor eficaz do valor médio:</div>
              <div class="math-block">\\[ I_{o,ef} \\approx I_{o,med} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
            ` : `
              <div class="step-desc">Cálculo pela integral numérica da equação de corrente \\(i(\\omega t)\\) no pulso \\([\\alpha, \\beta]\\):</div>
              <div class="math-block">\\[ I_{o,ef} = \\sqrt{\\frac{1}{\\pi} \\int_{\\alpha}^{\\beta} [i(\\omega t)]^2\\,d(\\omega t)} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
            `}
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência na Carga, Potência Aparente e Fator de Potência</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad P_E = E \\cdot I_{o,med} = ${P_E.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ P_M = P_R + P_E = ${P_M.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{s,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ F_p = \\frac{P_M}{S} = \\frac{${P_M.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador monofásico de meia onda controlado com carga R = ${R} Ω (α = ${alpha}°)`;

        const V_o_med = (V_p / (2 * Math.PI)) * (1 + Math.cos(a_rad));
        const I_o_med = V_o_med / R;

        const V_o_ef = V_rms * Math.sqrt(0.5 - (a_rad / (2 * Math.PI)) + (Math.sin(2 * a_rad) / (4 * Math.PI)));
        const I_o_ef = V_o_ef / R;

        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_R / S) : 0;
        const V_RRM = V_p;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Vo,ef (RMS)</div><div class="stat-value">${V_o_ef.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa Po</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão de Pico da Fonte CA</div>
            <div class="step-desc">A amplitude máxima da senoide é calculada por:</div>
            <div class="math-block">\\[ V_p = V_{ef} \\cdot \\sqrt{2} = ${V_rms.toFixed(2)} \\cdot \\sqrt{2} = ${V_p.toFixed(2)}\\text{ V} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">O tiristor é disparado no ângulo \\(\\alpha = ${alpha}^\\circ\\) e conduz até a passagem por zero da tensão em \\(\\pi\\) radianos:</div>
            <div class="math-block">\\[ V_{R,med} = \\frac{1}{2\\pi} \\int_{\\alpha}^{\\pi} V_p \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{V_p}{2\\pi}(1 + \\cos\\alpha) \\approx 0{,}225 V_{ef}(1 + \\cos\\alpha) \\]</div>
            <div class="math-block">\\[ V_{R,med} = \\frac{${V_p.toFixed(2)}}{2\\pi}(1 + \\cos(${alpha}^\\circ)) = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{R,med} = \\frac{V_{R,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Tensão Eficaz e Corrente Eficaz na Carga</div>
            <div class="step-desc">Valor eficaz analítico deduzido pela integração quadrática da forma de onda:</div>
            <div class="math-block">\\[ V_{R,ef} = V_{ef} \\sqrt{\\frac{1}{2} - \\frac{\\alpha}{2\\pi} + \\frac{\\operatorname{sen}(2\\alpha)}{4\\pi}} = ${V_rms.toFixed(2)} \\cdot \\sqrt{0{,}5 - \\frac{${a_rad.toFixed(3)}}{2\\pi} + \\frac{\\operatorname{sen}(${(2*alpha).toFixed(0)}^\\circ)}{4\\pi}} = ${V_o_ef.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{R,ef} = \\frac{V_{R,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência Ativa, Potência Aparente e Fator de Potência</div>
            <div class="math-block">\\[ P = R \\cdot (I_{R,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{R,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P}{S} = \\frac{${P_R.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rl") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador monofásico de meia onda controlado com carga RL: R = ${R} Ω, L = ${L} H (α = ${alpha}°)`;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);
        const phi_deg = (phi_rad * 180) / Math.PI;
        const cos_phi = R / Z;
        const tan_phi = XL / R;

        // Metodologia Oficial UTFPR / Puchlowski (Ábacos e Tabela Parametrizada)
        const pMatch = obterPuchlowski(alpha, cos_phi);
        const beta_tab = pMatch.beta;
        const beta_tab_rad = (beta_tab * Math.PI) / 180;
        const I_efp_tab = pMatch.iefp;

        // Cálculos formais analíticos
        const V_o_med = 0.225 * V_rms * (Math.cos(a_rad) - Math.cos(beta_tab_rad));
        const I_o_med = V_o_med / R;
        const I_o_ef = (Math.SQRT2 * V_rms / Z) * I_efp_tab;
        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_R / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Extinção β (Ábaco)</div><div class="stat-value">${Math.round(beta_tab)}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Carga)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Tabela)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa Po</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Parâmetros da Carga (Reatância, Impedância e Fator de Potência)</div>
            <div class="step-desc">Para frequência de \(${freq.toFixed(1)}\text{ Hz}\) (\(\omega = ${omega.toFixed(2)}\text{ rad/s}\)):</div>
            <div class="math-block">\[ X_L = \omega L = ${omega.toFixed(2)} \cdot ${L} = ${XL.toFixed(3)}\,\Omega \qquad Z = \sqrt{R^2 + X_L^2} = \sqrt{${R}^2 + (${XL.toFixed(3)})^2} = ${Z.toFixed(3)}\,\Omega \]</div>
            <div class="math-block">\[ \cos(\phi) = \frac{R}{Z} = \frac{${R}}{${Z.toFixed(3)}} \approx ${cos_phi.toFixed(3)} \implies \phi = ${phi_deg.toFixed(2)}^\circ \]</div>
          </div>

          <div class="step-box">
            <div class="step-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
              <span>Etapa 2: Obtenção do Ângulo de Extinção (\(\beta\)) via Ábaco de Puchlowski</span>
              <button type="button" class="btn-table-tag" onclick="toggleTabelaPuchlowski()" title="Visualizar Ábaco e Tabela de Puchlowski">
                📊 Ábaco / Tabela de Puchlowski
              </button>
            </div>
            <div class="step-desc">
              Como não há força contraeletromotriz na carga (\(E = 0\)), temos \(a = \frac{E}{\sqrt{2}V_{ef}} = 0\).
              Consultando o <strong>Ábaco de Puchlowski</strong> para \(a = 0\) com \(\alpha = ${alpha}^\circ\) e \(\cos\phi \approx ${pMatch.cosMatch.toFixed(1)}\):
              <button type="button" class="btn-table-tag" style="margin-left: 6px; padding: 2px 7px; font-size: 0.74rem;" onclick="toggleTabelaPuchlowski()">📊 Ver Tabela</button>
            </div>
            <div class="math-block">\[ \beta \approx ${Math.round(beta_tab)}^\circ \quad (${beta_tab_rad.toFixed(3)}\text{ rad}) \]</div>
            <div class="step-desc">
              <strong>Nota Física:</strong> O tiristor conduz além de \(180^\circ\) (atingindo \(\beta = ${Math.round(beta_tab)}^\circ\)) porque a força contraeletromotriz induzida no indutor (\(-L\frac{di}{dt}\)) polariza o tiristor diretamente, sustentando a circulação de corrente mesmo enquanto a tensão da fonte é negativa.
            </div>

            <!-- Painel Expansível da Tabela de Puchlowski -->
            <div id="tabela-puchlowski-container" style="display: none; margin-top: 12px; background: #0d1117; border: 1px solid var(--card-border); border-radius: 6px; padding: 12px;">
              ${gerarTabelaPuchlowskiHTML(alpha, cos_phi)}
            </div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">A tensão na saída é positiva de \(\alpha\) a \(180^\circ\) e negativa de \(180^\circ\) a \(\beta\):</div>
            <div class="math-block">\[ V_{o,med} = 0{,}225 \cdot V_{ef} \cdot [\cos(\alpha) - \cos(\beta)] \]</div>
            <div class="math-block">\[ V_{o,med} = 0{,}225 \cdot ${V_rms.toFixed(1)} \cdot [\cos(${alpha}^\circ) - \cos(${Math.round(beta_tab)}^\circ)] = 0{,}225 \cdot ${V_rms.toFixed(1)} \cdot [${Math.cos(a_rad).toFixed(4)} - (${Math.cos(beta_tab_rad).toFixed(4)})] = ${V_o_med.toFixed(2)}\text{ V} \]</div>
            <div class="step-desc">Como o indutor em regime permanente tem tensão média nula (\(\bar{v}_L = 0\)):</div>
            <div class="math-block">\[ I_{o,med} = \frac{V_{o,med}}{R} = \frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\text{ A} \]</div>
          </div>

          <div class="step-box">
            <div class="step-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
              <span>Etapa 4: Corrente Eficaz na Carga (Tabela Parametrizada \(I_{efp}\))</span>
              <button type="button" class="btn-table-tag" onclick="toggleTabelaPuchlowski()" title="Visualizar Tabela de Iefp">
                📊 Consultar Tabela
              </button>
            </div>
            <div class="step-desc">
              Consultando a <strong>Tabela de Corrente Eficaz Parametrizada</strong> (Slide 13 da UTFPR) para \(\alpha = ${alpha}^\circ\) e \(\cos\phi \approx ${pMatch.cosMatch.toFixed(1)}\):
            </div>
            <div class="math-block">\[ I_{efp} = ${I_efp_tab.toFixed(4)} \]</div>
            <div class="step-desc">Calculando a corrente eficaz na carga:</div>
            <div class="math-block">\[ I_{o,ef} = \frac{\sqrt{2} \cdot V_{ef}}{Z} \cdot I_{efp} = \frac{\sqrt{2} \cdot ${V_rms.toFixed(1)}}{${Z.toFixed(3)}} \cdot ${I_efp_tab.toFixed(4)} = ${I_o_ef.toFixed(3)}\text{ A} \]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 5: Potências e Fator de Potência</div>
            <div class="step-desc">Potência ativa real dissipada no resistor \(R\):</div>
            <div class="math-block">\[ P = R \cdot (I_{o,ef})^2 = ${R}\,\Omega \cdot (${I_o_ef.toFixed(3)}\text{ A})^2 = ${P_R.toFixed(2)}\text{ W} \]</div>
            <div class="step-desc">Potência aparente total entregue pela rede CA:</div>
            <div class="math-block">\[ S = V_{ef} \cdot I_{o,ef} = ${V_rms.toFixed(1)}\text{ V} \cdot ${I_o_ef.toFixed(3)}\text{ A} = ${S.toFixed(2)}\text{ VA} \]</div>
            <div class="step-desc">Fator de potência do sistema:</div>
            <div class="math-block">\[ F_P = \frac{P}{S} = \frac{${P_R.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \]</div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rl_roda_livre") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador monofásico de meia onda controlado com roda livre: R = ${R} Ω, L = ${L} H (α = ${alpha}°)`;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);
        const wtau = XL / R;

        const V_o_med = (V_p / (2 * Math.PI)) * (1 + Math.cos(a_rad));
        const I_o_med = V_o_med / R;

        const V2_p = (V_p / Math.PI) * Math.sqrt(Math.pow((Math.PI - a_rad) * Math.cos(a_rad) + Math.sin(a_rad), 2) + Math.pow(Math.sin(a_rad), 2));
        const I_o_ef = Math.sqrt(Math.pow(I_o_med, 2) + Math.pow(V2_p / (Math.SQRT2 * Z), 2));
        const I_T_ef = I_o_ef * Math.sqrt((Math.PI - a_rad) / (2 * Math.PI));

        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_T_ef;
        const FP = S > 0 ? (P_R / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">IT,ef (Tiristor)</div><div class="stat-value">${I_T_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa Po</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Ação Grampeadora do Diodo de Roda Livre</div>
            <div class="step-desc">Em \\(\\omega t = \\pi\\), a tensão da rede inverte polaridade, polarizando diretamente o diodo de roda livre e grampeando a saída em zero:</div>
            <div class="math-block">\\[ v_o(\\omega t) = \\begin{cases} V_p \\operatorname{sen}(\\omega t), & \\alpha \\le \\omega t \\le \\pi \\\\ 0, & \\pi < \\omega t < 2\\pi + \\alpha \\end{cases} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">Como a excursão negativa de tensão é bloqueada pelo diodo de roda livre:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{1}{2\\pi} \\int_{\\alpha}^{\\pi} V_p \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{V_p}{2\\pi}(1 + \\cos\\alpha) \\approx 0{,}225 V_{ef}(1 + \\cos\\alpha) \\]</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{${V_p.toFixed(2)}}{2\\pi}(1 + \\cos(${alpha}^\\circ)) = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente Eficaz na Carga e nos Semicondutores</div>
            <div class="math-block">\\[ I_{o,ef} = ${I_o_ef.toFixed(3)}\\text{ A} \\qquad I_{T,ef} = ${I_T_ef.toFixed(3)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P = R \\cdot (I_{o,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad S = V_{ef} \\cdot I_{T,ef} = ${S.toFixed(2)}\\text{ VA} \\qquad FP = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_meia_onda_controlado_rle") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const E = parseFloat(document.getElementById("input-e").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador monofásico de meia onda controlado com carga RLE: R = ${R} Ω, L = ${L} H, E = ${E} V (α = ${alpha}°)`;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);
        const tan_phi = XL / R;
        const theta1_rad = Math.asin(Math.min(1, E / V_p));
        const theta1_deg = (theta1_rad * 180) / Math.PI;

        function i_rle(th) {
          const t1 = (V_p / Z) * (Math.sin(th - phi_rad) - Math.sin(a_rad - phi_rad) * Math.exp(-(th - a_rad) / tan_phi));
          const t2 = (E / R) * (1 - Math.exp(-(th - a_rad) / tan_phi));
          return t1 - t2;
        }

        let bMin = a_rad + 0.001;
        let bMax = 2 * Math.PI;
        for (let iter = 0; iter < 50; iter++) {
          const bMid = (bMin + bMax) / 2;
          if (i_rle(bMid) > 0) bMin = bMid; else bMax = bMid;
        }
        const beta_rad = (bMin + bMax) / 2;
        const beta_deg = (beta_rad * 180) / Math.PI;

        const V_o_med = (1 / (2 * Math.PI)) * (V_p * (Math.cos(a_rad) - Math.cos(beta_rad)) + E * (2 * Math.PI - (beta_rad - a_rad)));
        const I_o_med = Math.max(0, (V_o_med - E) / R);

        let soma_i2 = 0;
        const nSteps = 200;
        const dTh = (beta_rad - a_rad) / nSteps;
        for (let p = 0; p < nSteps; p++) {
          const th = a_rad + (p + 0.5) * dTh;
          const i_val = Math.max(0, i_rle(th));
          soma_i2 += i_val * i_val * dTh;
        }
        const I_o_ef = Math.sqrt(soma_i2 / (2 * Math.PI));

        const P_R = R * Math.pow(I_o_ef, 2);
        const P_E = E * I_o_med;
        const P_M = P_R + P_E;
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_M / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Extinção β</div><div class="stat-value">${beta_deg.toFixed(1)}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Total PM</div><div class="stat-value">${P_M.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Condição de Disparo do Tiristor com Bateria</div>
            <div class="step-desc">O disparo só é eficaz quando a tensão alternada é superior ao potencial da bateria:</div>
            <div class="math-block">\\[ \\theta_1 = \\operatorname{arcsen}\\left(\\frac{E}{V_p}\\right) = ${theta1_deg.toFixed(2)}^\\circ \\]</div>
            <div class="step-desc">Ângulo de disparo selecionado: \\(\\alpha = ${alpha}^\\circ \\ge ${theta1_deg.toFixed(2)}^\\circ\\).</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Ângulo de Extinção da Corrente (\\(\\beta\\))</div>
            <div class="step-desc">Raiz numérica calculada pela equação diferencial completa da carga RLE:</div>
            <div class="math-block">\\[ \\beta = ${beta_deg.toFixed(1)}^\\circ \\quad (${beta_rad.toFixed(3)}\\text{ rad}) \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Tensão Média e Corrente Média</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{1}{2\\pi} \\left[ V_p(\\cos\\alpha - \\cos\\beta) + E(2\\pi - (\\beta - \\alpha)) \\right] = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 4: Potência Total Fornecida e Fator de Potência</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad P_E = E \\cdot I_{o,med} = ${P_E.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ P_M = P_R + P_E = ${P_M.toFixed(2)}\\text{ W} \\qquad S = ${S.toFixed(2)}\\text{ VA} \\qquad FP = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador em ponte de onda completa controlado com carga R = ${R} Ω (α = ${alpha}°)`;

        const V_o_med = ((Math.SQRT2 * V_rms) / Math.PI) * (1 + Math.cos(a_rad));
        const I_o_med = V_o_med / R;

        const V_o_ef = V_p * Math.sqrt(0.5 - (a_rad / (2 * Math.PI)) + (Math.sin(2 * a_rad) / (4 * Math.PI)));
        const I_o_ef = V_o_ef / R;

        const P_R = R * Math.pow(I_o_ef, 2);
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? (P_R / S) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Vo,ef (RMS)</div><div class="stat-value">${V_o_ef.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS)</div><div class="stat-value">${I_o_ef.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa PR</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média na Carga (VR,Med)</div>
            <div class="step-desc">Como ambos os semiciclos são retificados com ângulo de disparo \\(\\alpha = ${alpha}^\\circ\\):</div>
            <div class="math-block">\\[ V_{R,Med} = \\frac{1}{\\pi} \\int_{\\alpha}^{\\pi} V_p \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{\\sqrt{2}V_{g,ef}}{\\pi}(1 + \\cos\\alpha) \\]</div>
            <div class="math-block">\\[ V_{R,Med} = \\frac{\\sqrt{2} \\cdot ${V_rms.toFixed(2)}}{\\pi}(1 + \\cos(${alpha}^\\circ)) = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{R,Med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Eficaz e Corrente Eficaz na Carga</div>
            <div class="step-desc">Valor eficaz analítico com período de repetição \\(\\pi\\):</div>
            <div class="math-block">\\[ V_{R,ef} = V_p \\sqrt{\\frac{1}{2} - \\frac{\\alpha}{2\\pi} + \\frac{\\operatorname{sen}(2\\alpha)}{4\\pi}} = ${V_p.toFixed(2)} \\cdot \\sqrt{0{,}5 - \\frac{${a_rad.toFixed(3)}}{2\\pi} + \\frac{\\operatorname{sen}(${(2*alpha).toFixed(0)}^\\circ)}{4\\pi}} = ${V_o_ef.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,ef} = \\frac{V_{R,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Potência Ativa, Potência Aparente e Fator de Potência</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(3)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S = V_{ef} \\cdot I_{o,ef} = ${V_rms.toFixed(2)}\\text{ V} \\cdot ${I_o_ef.toFixed(3)}\\text{ A} = ${S.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P_R}{S} = \\frac{${P_R.toFixed(2)}}{${S.toFixed(2)}} = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_rl") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador em ponte de onda completa controlado com carga RL: R = ${R} Ω, L = ${L} H (α = ${alpha}°)`;

        const XL = omega * L;
        const Z = Math.sqrt(R * R + XL * XL);
        const phi_rad = Math.atan(XL / R);

        const L_crit = (R * Math.tan(a_rad)) / omega;
        const L_crit_mH = L_crit * 1000;

        const isMCC = (L >= L_crit);
        const isCritico = Math.abs(L - L_crit) < 0.001;

        let modoTexto = "MCC (Condução Contínua)";
        if (isCritico) modoTexto = "Condução Crítica (L = Lcrit)";
        else if (!isMCC) modoTexto = "MCD (Condução Descontínua)";

        let V_o_med = 0;
        let I_o_med = 0;
        let FP = 0;

        if (isMCC) {
          V_o_med = ((2 * Math.SQRT2 * V_rms) / Math.PI) * Math.cos(a_rad);
          I_o_med = V_o_med / R;
          FP = (2 * Math.SQRT2 / Math.PI) * Math.cos(a_rad);
        } else {
          let bMin = a_rad + 0.001, bMax = Math.PI + a_rad;
          const tan_phi = XL / R;
          function i_mcd(th) {
            return (V_p / Z) * (Math.sin(th - phi_rad) - Math.sin(a_rad - phi_rad) * Math.exp(-(th - a_rad) / tan_phi));
          }
          for (let iter = 0; iter < 40; iter++) {
            const bMid = (bMin + bMax) / 2;
            if (i_mcd(bMid) > 0) bMin = bMid; else bMax = bMid;
          }
          const beta_rad = (bMin + bMax) / 2;
          V_o_med = (V_p / Math.PI) * (Math.cos(a_rad) - Math.cos(beta_rad));
          I_o_med = V_o_med / R;
          FP = 0.90 * Math.cos(a_rad) * ((beta_rad - a_rad) / Math.PI);
        }

        const I_o_ef = I_o_med;
        const P_R = R * Math.pow(I_o_ef, 2);

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Modo Operação</div><div class="stat-value" style="color: #58a6ff;">${modoTexto}</div></div>
          <div class="stat-box"><div class="stat-label">Indutância Crítica Lcrit</div><div class="stat-value">${L_crit_mH.toFixed(2)} mH</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Ativa Po</div><div class="stat-value">${P_R.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Indutância Crítica para Modo Contínuo (Lcrit)</div>
            <div class="step-desc">O limite entre condução contínua e descontínua ocorre quando \\(\\phi = \\alpha\\):</div>
            <div class="math-block">\\[ \\operatorname{tg}\\phi = \\operatorname{tg}\\alpha = \\frac{\\omega L_{crit}}{R} \\implies L_{crit} = \\frac{R \\operatorname{tg}\\alpha}{\\omega} \\]</div>
            <div class="math-block">\\[ L_{crit} = \\frac{${R} \\cdot \\operatorname{tg}(${alpha}^\\circ)}{${omega.toFixed(2)}} = \\frac{${(R * Math.tan(a_rad)).toFixed(3)}}{${omega.toFixed(2)}} = ${L_crit.toFixed(5)}\\text{ H} = ${L_crit_mH.toFixed(2)}\\text{ mH} \\]</div>
            <div class="step-desc">
              ${L >= L_crit
                ? `Como \\(L = ${(L*1000).toFixed(1)}\\text{ mH} \\ge L_{crit} = ${L_crit_mH.toFixed(2)}\\text{ mH}\\), a corrente é ininterrupta (<strong>Modo Contínuo / Crítico</strong>).`
                : `Como \\(L = ${(L*1000).toFixed(1)}\\text{ mH} < L_{crit} = ${L_crit_mH.toFixed(2)}\\text{ mH}\\), o indutor descarrega completamente (<strong>Modo Descontínuo</strong>).`}
            </div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="step-desc">Em condução contínua (MCC), a tensão média depende estritamente do cosseno do ângulo de disparo:</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{2\\sqrt{2}V_{ef}}{\\pi}\\cos\\alpha = \\frac{2\\sqrt{2} \\cdot ${V_rms.toFixed(2)}}{\\pi}\\cos(${alpha}^\\circ) = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Fator de Potência na Rede CA</div>
            <div class="step-desc">Para regime contínuo:</div>
            <div class="math-block">\\[ FP = \\frac{2\\sqrt{2}}{\\pi}\\cos\\alpha \\approx 0{,}90 \\cdot \\cos(${alpha}^\\circ) = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "mono_onda_completa_controlado_rle") {
        const R = parseFloat(document.getElementById("input-r").value);
        const L = parseFloat(document.getElementById("input-l").value);
        const E = parseFloat(document.getElementById("input-e").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador em ponte de onda completa controlado com carga RLE: R = ${R} Ω, L = ${L} H, E = ${E} V (α = ${alpha}°)`;

        const isRetificador = (alpha < 90);
        const modoOperacao = isRetificador ? "Modo Retificador (Fluxo CA → CC)" : "Modo Inversor Não Autônomo (Fluxo CC → CA)";

        const V_o_med = ((2 * Math.SQRT2 * V_rms) / Math.PI) * Math.cos(a_rad);
        const I_o_med = Math.max(0, (V_o_med - E) / R);
        const I_o_ef = I_o_med;

        const P_R = R * Math.pow(I_o_ef, 2);
        const P_E = E * I_o_med;
        const P_M = P_R + P_E;
        const S = V_rms * I_o_ef;
        const FP = S > 0 ? Math.min(1, Math.abs(P_M / S)) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Regime Operação</div><div class="stat-value" style="color: #58a6ff;">${isRetificador ? "Retificador" : "Inversor Regenerativo"}</div></div>
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${V_o_med.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(3)} A</div></div>
          <div class="stat-box"><div class="stat-label">Potência Total PM</div><div class="stat-value">${P_M.toFixed(2)} W</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(3)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Classificação do Quadrante de Operação</div>
            <div class="step-desc">O conversor opera em 2 quadrantes:</div>
            <div class="step-desc"><strong>${modoOperacao}</strong> (para \\(\\alpha = ${alpha}^\\circ\\)).</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Média e Corrente Média na Carga</div>
            <div class="math-block">\\[ V_{o,med} = \\frac{2\\sqrt{2}V_{ef}}{\\pi}\\cos\\alpha = \\frac{2\\sqrt{2} \\cdot ${V_rms.toFixed(2)}}{\\pi}\\cos(${alpha}^\\circ) = ${V_o_med.toFixed(2)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med} - E}{R} = \\frac{${V_o_med.toFixed(2)} - ${E}}{${R}} = ${I_o_med.toFixed(3)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Balanço de Potência e Fator de Potência</div>
            <div class="math-block">\\[ P_R = R \\cdot (I_{o,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad P_E = E \\cdot I_{o,med} = ${P_E.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ P_M = P_R + P_E = ${P_M.toFixed(2)}\\text{ W} \\qquad S = ${S.toFixed(2)}\\text{ VA} \\qquad FP = ${FP.toFixed(3)} \\]</div>
          </div>
        `;
      } else if (topologia === "tri_meia_onda_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        plotTitle = `Retificador trifásico com ponto médio com carga R = ${R} Ω`;

        const V_F_ef = V_rms;
        const V_F_p = V_p;

        const V_o_med = (3 * Math.sqrt(3) / (2 * Math.PI)) * V_F_p;
        const V_o_ef = V_F_p * Math.sqrt((4 * Math.PI + 3 * Math.sqrt(3)) / (8 * Math.PI));

        const I_o_med = V_o_med / R;
        const I_o_ef = V_o_ef / R;

        const P_R = R * Math.pow(I_o_ef, 2);
        const I_D_ef = I_o_ef / Math.sqrt(3);
        const S_3f = 3 * V_F_ef * I_D_ef;
        const FP = S_3f > 0 ? (P_R / S_3f) : 0;
        const V_RRM = Math.sqrt(3) * V_F_p;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">VF,ef (Tensão Fase)</div><div class="stat-value">${V_F_ef.toFixed(2)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${Math.round(V_o_med)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,rms (Eficaz)</div><div class="stat-value">${Math.round(V_o_ef)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">ID,ef (Por Diodo)</div><div class="stat-value">${I_D_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(2)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média na Carga (VR,med)</div>
            <div class="step-desc">Cada diodo conduz durante \\(120^\\circ\\) (\\(2\\pi/3\\)) na fase de maior potencial instantâneo no intervalo de \\(\\pi/6\\) a \\(5\\pi/6\\):</div>
            <div class="math-block">\\[ V_{R,med} = \\frac{3}{2\\pi} \\int_{\\pi/6}^{5\\pi/6} V_{F,p} \\operatorname{sen}(\\omega t)\\,d(\\omega t) = \\frac{3\\sqrt{3}}{2\\pi} V_{F,p} \\approx 1{,}17 V_{F,ef} \\]</div>
            <div class="math-block">\\[ V_{R,med} = 1{,}17 \\cdot ${V_F_ef.toFixed(2)}\\text{ V} = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{R,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Eficaz na Carga (VR,ef)</div>
            <div class="step-desc">Cálculo pela raiz média quadrática com 3 pulsos por ciclo da rede:</div>
            <div class="math-block">\\[ V_{R,ef} = V_{F,p} \\sqrt{\\frac{4\\pi + 3\\sqrt{3}}{8\\pi}} \\approx 0{,}841 V_{F,p} \\approx 1{,}19 V_{F,ef} \\]</div>
            <div class="math-block">\\[ V_{R,ef} = 1{,}19 \\cdot ${V_F_ef.toFixed(2)}\\text{ V} = ${V_o_ef.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_ef)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{R,ef} = \\frac{V_{R,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente nos Diodos e Fator de Potência Trifásico</div>
            <div class="step-desc">A corrente eficaz em cada diodo (e fase da fonte) corresponde à fração cíclica \\(1/3\\):</div>
            <div class="math-block">\\[ I_{D,ef} = \\sqrt{\\frac{(I_{R,ef})^2}{3}} = \\frac{${I_o_ef.toFixed(2)}}{\\sqrt{3}} = ${I_D_ef.toFixed(2)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P = R \\cdot (I_{R,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(2)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S_{3\\phi} = 3 \\cdot V_{F,ef} \\cdot I_{D,ef} = 3 \\cdot ${V_F_ef.toFixed(2)} \\cdot ${I_D_ef.toFixed(2)} = ${S_3f.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P}{S_{3\\phi}} = \\frac{${P_R.toFixed(2)}}{${S_3f.toFixed(2)}} = ${FP.toFixed(2)} \\]</div>
            <div class="step-desc">Tensão reversa máxima de pico sobre os diodos: \\(V_{RRM} = \\sqrt{3}V_{F,p} = ${V_RRM.toFixed(1)}\\text{ V}\\).</div>
          </div>
        `;
      } else if (topologia === "tri_ponte_completa_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        plotTitle = `Retificador trifásico em ponte completa com carga R = ${R} Ω`;

        const V_L_ef = V_rms;
        const V_F_ef = V_L_ef / Math.sqrt(3);
        const V_L_p = V_p;

        const V_o_med = (3 * Math.sqrt(6) / Math.PI) * V_F_ef;
        const V_o_ef = 2.34 * V_F_ef;

        const I_o_med = V_o_med / R;
        const I_o_ef = V_o_ef / R;

        const P_R = R * Math.pow(I_o_ef, 2);
        const I_s_ef = Math.sqrt(2 / 3) * I_o_ef;
        const S_3f = Math.sqrt(3) * V_L_ef * I_s_ef;
        const FP = S_3f > 0 ? (P_R / S_3f) : 0;
        const V_RRM = V_L_p;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">VL,ef (Linha)</div><div class="stat-value">${V_L_ef.toFixed(1)} V</div></div>
          <div class="stat-box"><div class="stat-label">VF,ef (Fase)</div><div class="stat-value">${V_F_ef.toFixed(1)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${Math.round(V_o_med)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,rms (Eficaz)</div><div class="stat-value">${Math.round(V_o_ef)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Is,ef (Linha CA)</div><div class="stat-value">${I_s_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(2)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média na Carga (VR,med)</div>
            <div class="step-desc">Ponte com 6 etapas de condução por período da rede (frequência de ripple \\(6f = 360\\text{ Hz}\\)):</div>
            <div class="math-block">\\[ V_{R,med} = \\frac{3\\sqrt{6}}{\\pi} V_{F,ef} \\approx 2{,}339 V_{F,ef} = 1{,}35 V_{linha,ef} \\]</div>
            <div class="math-block">\\[ V_{R,med} = 1{,}35 \\cdot ${V_L_ef.toFixed(1)}\\text{ V} = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{R,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Eficaz na Carga (VR,ef)</div>
            <div class="step-desc">Valor eficaz analítico para 6 pulsos:</div>
            <div class="math-block">\\[ V_{R,ef} = 2{,}34 \\cdot V_{F,ef} = 2{,}34 \\cdot ${V_F_ef.toFixed(2)}\\text{ V} = ${V_o_ef.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_ef)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,ef} = \\frac{V_{R,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente de Linha e Fator de Potência Trifásico</div>
            <div class="step-desc">A corrente da rede conduz dois terços do ciclo:</div>
            <div class="math-block">\\[ I_{s,ef} = I_{o,ef} \\sqrt{\\frac{2}{3}} = ${I_o_ef.toFixed(2)} \\cdot \\sqrt{\\frac{2}{3}} = ${I_s_ef.toFixed(2)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P = R \\cdot (I_{o,ef})^2 = ${R}\\,\\Omega \\cdot (${I_o_ef.toFixed(2)}\\text{ A})^2 = ${P_R.toFixed(2)}\\text{ W} \\]</div>
            <div class="math-block">\\[ S_{3\\phi} = \\sqrt{3} \\cdot V_{linha,ef} \\cdot I_{s,ef} = \\sqrt{3} \\cdot ${V_L_ef.toFixed(1)} \\cdot ${I_s_ef.toFixed(2)} = ${S_3f.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P}{S_{3\\phi}} = \\frac{${P_R.toFixed(2)}}{${S_3f.toFixed(2)}} = ${FP.toFixed(2)} \\]</div>
          </div>
        `;
      } else if (topologia === "tri_meia_onda_controlado_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador controlado de 3 pulsos com carga R = ${R} Ω (α = ${alpha}°)`;

        const V_F_ef = V_rms;
        const V_F_p = V_p;

        const isMCC = (alpha <= 30);
        let V_o_med = 0;
        let I_o_ef = 0;

        if (isMCC) {
          V_o_med = 1.17 * V_F_ef * Math.cos(a_rad);
          I_o_ef = (V_F_p / R) * Math.sqrt((4 * Math.PI + 3 * Math.sqrt(3) * Math.cos(2 * a_rad)) / (8 * Math.PI));
        } else {
          V_o_med = (3 * V_F_p / (2 * Math.PI)) * (1 + Math.cos(a_rad + Math.PI / 6));
          const th_start = a_rad + Math.PI / 6;
          const th_end = Math.PI;
          const integral = 0.5 * (th_end - th_start - 0.5 * (Math.sin(2 * th_end) - Math.sin(2 * th_start)));
          I_o_ef = (V_F_p / R) * Math.sqrt((3 / (2 * Math.PI)) * Math.max(0, integral));
        }

        const V_o_ef = R * I_o_ef;
        const I_o_med = V_o_med / R;

        const I_a_ef = I_o_ef / Math.sqrt(3);
        const P_R = R * Math.pow(I_o_ef, 2);
        const S_3f = 3 * V_F_ef * I_a_ef;
        const FP = S_3f > 0 ? (P_R / S_3f) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${Math.round(V_o_med)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,rms (Eficaz)</div><div class="stat-value">${Math.round(V_o_ef)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Ia,ef (Fase CA)</div><div class="stat-value">${I_a_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(2)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média na Carga (Vo,med)</div>
            <div class="step-desc">O ângulo de disparo \\(\\alpha\\) é referenciado ao cruzamento natural das tensões de fase (\\(\\omega t = 30^\\circ\\)):</div>
            ${isMCC ? `
              <div class="step-desc">Como \\(\\alpha = ${alpha}^\\circ \\le 30^\\circ\\), o circuito opera em <strong>Condução Contínua (MCC)</strong>:</div>
              <div class="math-block">\\[ V_{o,med} = 1{,}17 V_{g,ef} \\cos\\alpha = 1{,}17 \\cdot ${V_F_ef.toFixed(2)}\\text{ V} \\cdot \\cos(${alpha}^\\circ) = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            ` : `
              <div class="step-desc">Como \\(\\alpha = ${alpha}^\\circ > 30^\\circ\\), a condução é <strong>Descontínua (MCD)</strong> com a tensão indo a zero:</div>
              <div class="math-block">\\[ V_{o,med} = \\frac{3V_{F,p}}{2\\pi}\\left[1 + \\cos\\left(\\alpha + \\frac{\\pi}{6}\\right)\\right] = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            `}
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Eficaz e Corrente Eficaz na Carga</div>
            <div class="step-desc">Formulação analítica paramétrica em função de \\(\\alpha\\):</div>
            <div class="math-block">\\[ I_{R,ef} = \\frac{V_p}{R} \\sqrt{\\frac{4\\pi + 3\\sqrt{3}\\cos(2\\alpha)}{8\\pi}} = \\frac{${V_F_p.toFixed(2)}}{${R}} \\cdot \\sqrt{\\frac{4\\pi + 3\\sqrt{3}\\cos(${2*alpha}^\\circ)}{8\\pi}} = ${I_o_ef.toFixed(2)}\\text{ A} \\]</div>
            <div class="math-block">\\[ V_{o,ef} = R \\cdot I_{R,ef} = ${R} \\cdot ${I_o_ef.toFixed(2)} = ${V_o_ef.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_ef)}\\text{ V} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente de Linha e Fator de Potência Trifásico</div>
            <div class="math-block">\\[ I_{a,ef} = \\frac{I_{R,ef}}{\\sqrt{3}} = \\frac{${I_o_ef.toFixed(2)}}{\\sqrt{3}} = ${I_a_ef.toFixed(2)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P = R \\cdot (I_{R,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad S_{3\\phi} = 3 \\cdot V_{F,ef} \\cdot I_{a,ef} = ${S_3f.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P}{S_{3\\phi}} = \\frac{${P_R.toFixed(2)}}{${S_3f.toFixed(2)}} = ${FP.toFixed(2)} \\]</div>
          </div>
        `;
      } else if (topologia === "tri_ponte_controlado_r") {
        const R = parseFloat(document.getElementById("input-r").value);
        const alpha = parseFloat(document.getElementById("input-alpha").value);
        const a_rad = (alpha * Math.PI) / 180;
        plotTitle = `Retificador trifásico controlado em ponte completa com carga R = ${R} Ω (α = ${alpha}°)`;

        const V_L_ef = V_rms;
        const V_F_ef = V_L_ef / Math.sqrt(3);
        const V_L_p = V_p;

        const isMCC = (alpha <= 60);
        let V_o_med = 0;
        let V_o_ef = 0;

        if (isMCC) {
          V_o_med = ((3 * Math.sqrt(6)) / Math.PI) * V_F_ef * Math.cos(a_rad);
          V_o_ef = Math.sqrt(6) * V_F_ef * Math.sqrt((2 * Math.PI + 3 * Math.sqrt(3) * Math.cos(2 * a_rad)) / (4 * Math.PI));
        } else {
          V_o_med = ((3 * V_L_p) / Math.PI) * (1 + Math.cos(a_rad + Math.PI / 3));
          const th_start = a_rad + Math.PI / 3;
          const th_end = Math.PI;
          const integral = 0.5 * (th_end - th_start - 0.5 * (Math.sin(2 * th_end) - Math.sin(2 * th_start)));
          V_o_ef = V_L_p * Math.sqrt((6 / Math.PI) * Math.max(0, integral));
        }

        const I_o_med = V_o_med / R;
        const I_o_ef = V_o_ef / R;

        const I_a_ef = I_o_ef * Math.sqrt(2 / 3);
        const P_R = R * Math.pow(I_o_ef, 2);
        const S_3f = Math.sqrt(3) * V_L_ef * I_a_ef;
        const FP = S_3f > 0 ? (P_R / S_3f) : 0;

        summaryHTML = `
          <div class="stat-box"><div class="stat-label">Ângulo Disparo α</div><div class="stat-value">${alpha}°</div></div>
          <div class="stat-box"><div class="stat-label">Vo,méd (Saída)</div><div class="stat-value">${Math.round(V_o_med)} V</div></div>
          <div class="stat-box"><div class="stat-label">Vo,rms (Eficaz)</div><div class="stat-value">${Math.round(V_o_ef)} V</div></div>
          <div class="stat-box"><div class="stat-label">Io,méd (Carga)</div><div class="stat-value">${I_o_med.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Io,ef (RMS Carga)</div><div class="stat-value">${I_o_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Ia,ef (Linha CA)</div><div class="stat-value">${I_a_ef.toFixed(2)} A</div></div>
          <div class="stat-box"><div class="stat-label">Fator de Potência</div><div class="stat-value">${FP.toFixed(2)}</div></div>
        `;

        stepsHTML = `
          <div class="step-box">
            <div class="step-title">Etapa 1: Tensão Média na Carga (Vo,med)</div>
            <div class="step-desc">Ponte de Graetz com 6 tiristores referenciada ao cruzamento das tensões de linha (\\(60^\\circ\\)):</div>
            ${isMCC ? `
              <div class="step-desc">Como \\(\\alpha = ${alpha}^\\circ \\le 60^\\circ\\), a operação é em <strong>Condução Contínua (MCC)</strong>:</div>
              <div class="math-block">\\[ V_{o,med} = \\frac{3\\sqrt{6}}{\\pi} V_{g,ef} \\cos\\alpha = 1{,}35 V_{linha,ef} \\cos\\alpha \\]</div>
              <div class="math-block">\\[ V_{o,med} = 1{,}35 \\cdot ${V_L_ef.toFixed(1)}\\text{ V} \\cdot \\cos(${alpha}^\\circ) = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            ` : `
              <div class="step-desc">Como \\(\\alpha = ${alpha}^\\circ > 60^\\circ\\), a operação é em <strong>Condução Descontínua (MCD)</strong>:</div>
              <div class="math-block">\\[ V_{o,med} = \\frac{3V_{L,p}}{\\pi}\\left[1 + \\cos\\left(\\alpha + \\frac{\\pi}{3}\\right)\\right] = ${V_o_med.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_med)}\\text{ V} \\]</div>
            `}
            <div class="math-block">\\[ I_{o,med} = \\frac{V_{o,med}}{R} = \\frac{${V_o_med.toFixed(2)}}{${R}} = ${I_o_med.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 2: Tensão Eficaz na Carga (Vo,ef)</div>
            <div class="step-desc">Expressão paramétrica da tensão RMS para 6 tiristores:</div>
            <div class="math-block">\\[ V_{o,ef} = \\sqrt{6} V_{g,ef} \\sqrt{\\frac{2\\pi + 3\\sqrt{3}\\cos(2\\alpha)}{4\\pi}} = \\sqrt{6} \\cdot ${V_F_ef.toFixed(2)} \\cdot \\sqrt{\\frac{2\\pi + 3\\sqrt{3}\\cos(${2*alpha}^\\circ)}{4\\pi}} = ${V_o_ef.toFixed(2)}\\text{ V} \\approx ${Math.round(V_o_ef)}\\text{ V} \\]</div>
            <div class="math-block">\\[ I_{o,ef} = \\frac{V_{o,ef}}{R} = \\frac{${V_o_ef.toFixed(2)}}{${R}} = ${I_o_ef.toFixed(2)}\\text{ A} \\]</div>
          </div>

          <div class="step-box">
            <div class="step-title">Etapa 3: Corrente de Linha e Fator de Potência Trifásico</div>
            <div class="math-block">\\[ I_{a,ef} = I_{o,ef} \\sqrt{\\frac{2}{3}} = ${I_o_ef.toFixed(2)} \\cdot \\sqrt{\\frac{2}{3}} = ${I_a_ef.toFixed(2)}\\text{ A} \\]</div>
            <div class="math-block">\\[ P = R \\cdot (I_{o,ef})^2 = ${P_R.toFixed(2)}\\text{ W} \\qquad S_{3\\phi} = \\sqrt{3} \\cdot V_{linha,ef} \\cdot I_{a,ef} = ${S_3f.toFixed(2)}\\text{ VA} \\]</div>
            <div class="math-block">\\[ FP = \\frac{P}{S_{3\\phi}} = \\frac{${P_R.toFixed(2)}}{${S_3f.toFixed(2)}} = ${FP.toFixed(2)} \\]</div>
          </div>
        `;
      }

      // Geração unificada de dados temporais para exatamente 2 PERÍODOS (t em ms)
      const T_periodo = 1000 / freq;  // Período em ms (~16.67 ms para 60Hz)
      const t_max = 2 * T_periodo;    // 2 ciclos completos (~33.33 ms)
      const numPontos = 360;
      const dt = t_max / numPontos;

      let diodeCaption = "diodo ideal (sem perdas)";
      if (considerarDiodo) {
        diodeCaption = `diodo real (VT0 = ${V_T0} V, RD = ${R_D} Ω)`;
      }

      const isOndaCompleta = topologia.includes("_onda_completa_") || topologia.includes("_ponte_");
      const isControlado = topologia.includes("_controlado");
      const isTrifasico = topologia.startsWith("tri_");
      const temDiodos = (isOndaCompleta || isTrifasico || isControlado || topologia === "mono_meia_onda_rl_roda_livre" || topologia === "mono_meia_onda_rc");
      const temD2 = (isOndaCompleta || isTrifasico || topologia === "mono_meia_onda_rl_roda_livre" || topologia === "mono_meia_onda_controlado_rl_roda_livre");
      const temD3 = isTrifasico;
      const temVlinha = (topologia === "tri_ponte_completa_r" || topologia === "tri_ponte_controlado_r");
      const temGate = isControlado;
      const temVD = true;
      const temIg = (isOndaCompleta || isTrifasico);

      const plotData = {
        topologia: topologia,
        freq: freq,
        title: plotTitle,
        caption: `Fonte: ${V_rms.toFixed(1)} Vef (${V_p.toFixed(1)} Vp), ${freq.toFixed(1)} Hz (ω = ${omega.toFixed(1)} rad/s) • ${diodeCaption}`,
        t: [],
        v_in: [],
        v_a: [],
        v_b: [],
        v_c: [],
        v_ab: [],
        v_bc: [],
        v_ca: [],
        v_out: [],
        v_d: [],
        gate: [],
        gate2: [],
        gate3: [],
        i_out: [],
        i_d1: [],
        i_d2: [],
        i_d3: [],
        i_fonte: [],
        tem_diodos: temDiodos,
        tem_d2: temD2,
        tem_d3: temD3,
        tem_vlinha: temVlinha,
        tem_gate: temGate,
        tem_vd: temVD,
        tem_ig: temIg,
        is_onda_completa: isOndaCompleta,
        is_controlado: isControlado,
        is_trifasico: isTrifasico
      };

      for (let k = 0; k <= numPontos; k++) {
        const t_ms = k * dt;
        const omega_t = 2 * Math.PI * freq * (t_ms / 1000);
        const theta = omega_t % (2 * Math.PI); // Ângulo no ciclo atual [0, 2pi)
        const theta_deg = (theta * 180) / Math.PI;

        const v_in_val = V_p * Math.sin(omega_t);
        let v_out_val = 0;
        let i_out_val = 0;
        let i_d1_val = 0;
        let i_d2_val = 0;
        let i_d3_val = 0;
        let v_a_val = 0, v_b_val = 0, v_c_val = 0;
        let v_ab_val = 0, v_bc_val = 0, v_ca_val = 0;
        let v_d_val = 0;
        let gate_val = 0, gate2_val = 0, gate3_val = 0;
        let i_fonte_val = 0;

        if (topologia === "mono_meia_onda_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          if (theta <= Math.PI) {
            v_out_val = v_in_val;
            i_out_val = v_out_val / R;
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_meia_onda_rl") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi_rad = Math.atan(XL / R);
          const phi_deg = (phi_rad * 180) / Math.PI;
          const beta_deg = interpolarBeta(phi_deg);
          const beta_rad = (beta_deg * Math.PI) / 180;

          if (theta <= beta_rad) {
            v_out_val = v_in_val;
            const exp_term = Math.exp(-theta / Math.tan(phi_rad));
            i_out_val = (V_p / Z) * (Math.sin(theta - phi_rad) - Math.sin(-phi_rad) * exp_term);
            if (i_out_val < 0) i_out_val = 0;
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_meia_onda_rl_roda_livre") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const wtau = XL / R;
          const isMCC = (5 * wtau) >= Math.PI;

          if (isMCC) {
            const exp_half = Math.exp(Math.PI / wtau);
            const i0 = (V_p / Z) * Math.sin(phi) / (exp_half - 1);
            const ipi = i0 * exp_half;

            if (theta <= Math.PI) {
              v_out_val = v_in_val;
              i_d1_val = (V_p / Z) * Math.sin(theta - phi) + (i0 + (V_p / Z) * Math.sin(phi)) * Math.exp(-theta / wtau);
              if (i_d1_val < 0) i_d1_val = 0;
              i_d2_val = 0;
              i_out_val = i_d1_val;
            } else {
              v_out_val = 0;
              i_d1_val = 0;
              i_d2_val = ipi * Math.exp(-(theta - Math.PI) / wtau);
              if (i_d2_val < 0) i_d2_val = 0;
              i_out_val = i_d2_val;
            }
          } else {
            if (theta <= Math.PI) {
              v_out_val = v_in_val;
              i_d1_val = (V_p / Z) * (Math.sin(theta - phi) - Math.sin(-phi) * Math.exp(-theta / wtau));
              if (i_d1_val < 0) i_d1_val = 0;
              i_d2_val = 0;
              i_out_val = i_d1_val;
            } else {
              v_out_val = 0;
              i_d1_val = 0;
              const ipi = (V_p / Z) * (Math.sin(Math.PI - phi) - Math.sin(-phi) * Math.exp(-Math.PI / wtau));
              i_d2_val = Math.max(0, ipi * Math.exp(-(theta - Math.PI) / wtau));
              if (i_d2_val < 0.005) i_d2_val = 0;
              i_out_val = i_d2_val;
            }
          }
        } else if (topologia === "mono_meia_onda_rle") {
          const R = parseFloat(document.getElementById("input-r").value);
          const E = parseFloat(document.getElementById("input-e").value);
          const alpha_rad = Math.asin(E / V_p);
          const beta_rad = (239 * Math.PI) / 180;

          if (theta >= alpha_rad && theta <= beta_rad) {
            v_out_val = v_in_val;
            i_out_val = Math.max(0, (v_out_val - E) / R);
          } else {
            v_out_val = E;
            i_out_val = 0;
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_meia_onda_rc") {
          const Po = parseFloat(document.getElementById("input-p0").value);
          const ripplePct = parseFloat(document.getElementById("input-ripple").value);
          const delta_Vo = (ripplePct / 100) * V_p;
          const Ro = Math.pow(V_p - delta_Vo / 2, 2) / Po;
          const theta1_rad = Math.asin((V_p - delta_Vo) / V_p);
          const theta1_deg = (theta1_rad * 180) / Math.PI;

          if (theta_deg >= theta1_deg && theta_deg <= 90) {
            v_out_val = v_in_val;
            i_d1_val = (omega * (V_p / (omega * Ro * delta_Vo)) * V_p * Math.cos(theta) + (v_out_val / Ro)) * 0.4;
            if (i_d1_val < 0) i_d1_val = 0;
            i_out_val = v_out_val / Ro;
          } else {
            const decay = (theta_deg > 90) ? (theta_deg - 90) / 270 : (theta_deg + 270) / 360;
            v_out_val = V_p - delta_Vo * Math.min(1, Math.max(0, decay));
            i_d1_val = 0;
            i_out_val = v_out_val / Ro;
          }
        } else if (topologia === "mono_onda_completa_ponte_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          v_out_val = Math.abs(v_in_val);
          i_out_val = v_out_val / R;
          if (v_in_val >= 0) {
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "mono_onda_completa_tap_r") {
          const N = parseFloat(document.getElementById("input-n").value) || 1;
          const R = parseFloat(document.getElementById("input-r").value);
          v_out_val = Math.abs(v_in_val) / N;
          i_out_val = v_out_val / R;
          if (v_in_val >= 0) {
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "mono_onda_completa_ponte_rl") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          v_out_val = Math.abs(v_in_val);

          const I_o_med_calc = ((2 * V_p) / Math.PI) / R;
          const X2 = 2 * omega * L;
          const Z2 = Math.sqrt(R * R + X2 * X2);
          const phi2 = Math.atan(X2 / R);
          const I2_p = (4 * V_p) / (3 * Math.PI * Z2);

          const X4 = 4 * omega * L;
          const Z4 = Math.sqrt(R * R + X4 * X4);
          const phi4 = Math.atan(X4 / R);
          const I4_p = (4 * V_p) / (15 * Math.PI * Z4);

          const X6 = 6 * omega * L;
          const Z6 = Math.sqrt(R * R + X6 * X6);
          const phi6 = Math.atan(X6 / R);
          const I6_p = (4 * V_p) / (35 * Math.PI * Z6);

          i_out_val = Math.max(0, I_o_med_calc - I2_p * Math.cos(2 * theta - phi2) - I4_p * Math.cos(4 * theta - phi4) - I6_p * Math.cos(6 * theta - phi6));

          if (v_in_val >= 0) {
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "mono_onda_completa_ponte_re") {
          const R = parseFloat(document.getElementById("input-r").value);
          const E = parseFloat(document.getElementById("input-e").value);
          const v_abs = Math.abs(v_in_val);
          if (v_abs > E) {
            v_out_val = v_abs;
            i_out_val = (v_out_val - E) / R;
          } else {
            v_out_val = E;
            i_out_val = 0;
          }
          if (v_in_val >= 0) {
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "mono_onda_completa_ponte_rle") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const E = parseFloat(document.getElementById("input-e").value);
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const a = Math.min(0.999, E / V_p);
          const alpha = Math.asin(a);

          function f_i(th) {
            const tan_p = Math.tan(phi);
            const t1 = (V_p / Z) * (Math.sin(th - phi) - Math.sin(alpha - phi) * Math.exp(-(th - alpha) / tan_p));
            const t2 = (E / R) * (1 - Math.exp(-(th - alpha) / tan_p));
            return t1 - t2;
          }

          const isMCC = f_i(Math.PI + alpha) > 0;
          const th_cyc = theta % Math.PI;

          if (isMCC) {
            v_out_val = Math.abs(v_in_val);
            const I_o_med_calc = (((2 * V_p) / Math.PI) - E) / R;
            const X2 = 2 * omega * L;
            const Z2 = Math.sqrt(R * R + X2 * X2);
            const phi2 = Math.atan(X2 / R);
            const I2_p = (4 * V_p) / (3 * Math.PI * Z2);
            i_out_val = Math.max(0, I_o_med_calc - I2_p * Math.cos(2 * theta - phi2));
          } else {
            let bMin = alpha + 0.001, bMax = Math.PI + alpha;
            for (let iter = 0; iter < 20; iter++) {
              const bM = (bMin + bMax) / 2;
              if (f_i(bM) > 0) bMin = bM; else bMax = bM;
            }
            const beta = (bMin + bMax) / 2;
            if (th_cyc >= alpha && th_cyc <= beta) {
              v_out_val = Math.abs(v_in_val);
              i_out_val = Math.max(0, f_i(th_cyc));
            } else {
              v_out_val = E;
              i_out_val = 0;
            }
          }

          if (v_in_val >= 0) {
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "mono_meia_onda_controlado_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          if (theta >= a_val && theta <= Math.PI) {
            v_out_val = v_in_val;
            i_out_val = v_out_val / R;
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_meia_onda_controlado_rl") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const tan_p = XL / R;
          if (theta >= a_val) {
            const cur = (V_p / Z) * (Math.sin(theta - phi) - Math.sin(a_val - phi) * Math.exp(-(theta - a_val) / tan_p));
            if (cur > 0) {
              v_out_val = v_in_val;
              i_out_val = cur;
            }
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_meia_onda_controlado_rl_roda_livre") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const wtau = XL / R;
          if (theta >= a_val && theta <= Math.PI) {
            v_out_val = v_in_val;
            i_d1_val = Math.max(0, (V_p / Z) * (Math.sin(theta - phi) - Math.sin(a_val - phi) * Math.exp(-(theta - a_val) / wtau)));
            i_out_val = i_d1_val;
          } else if (theta > Math.PI) {
            v_out_val = 0;
            const ipi = Math.max(0, (V_p / Z) * (Math.sin(Math.PI - phi) - Math.sin(a_val - phi) * Math.exp(-(Math.PI - a_val) / wtau)));
            i_d2_val = Math.max(0, ipi * Math.exp(-(theta - Math.PI) / wtau));
            i_out_val = i_d2_val;
          }
        } else if (topologia === "mono_meia_onda_controlado_rle") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const E = parseFloat(document.getElementById("input-e").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const tan_p = XL / R;
          let cur = 0;
          if (theta >= a_val) {
            const t1 = (V_p / Z) * (Math.sin(theta - phi) - Math.sin(a_val - phi) * Math.exp(-(theta - a_val) / tan_p));
            const t2 = (E / R) * (1 - Math.exp(-(theta - a_val) / tan_p));
            cur = t1 - t2;
          }
          if (cur > 0) {
            v_out_val = v_in_val;
            i_out_val = cur;
          } else {
            v_out_val = E;
            i_out_val = 0;
          }
          i_d1_val = i_out_val;
        } else if (topologia === "mono_onda_completa_controlado_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          if (theta >= a_val && theta <= Math.PI) {
            v_out_val = v_in_val;
            i_out_val = v_out_val / R;
            i_d1_val = i_out_val;
          } else if (theta >= Math.PI + a_val && theta <= 2 * Math.PI) {
            v_out_val = -v_in_val;
            i_out_val = v_out_val / R;
            i_d2_val = i_out_val;
          } else {
            v_out_val = 0;
            i_out_val = 0;
          }
        } else if (topologia === "mono_onda_completa_controlado_rl") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const XL = omega * L;
          const Z = Math.sqrt(R * R + XL * XL);
          const phi = Math.atan(XL / R);
          const L_crit = (R * Math.tan(a_val)) / omega;
          const isMCC = (L >= L_crit);

          if (isMCC) {
            if (theta >= a_val && theta < Math.PI + a_val) {
              v_out_val = v_in_val;
              i_d1_val = Math.max(0, (((2 * V_p) / Math.PI) * Math.cos(a_val)) / R);
              i_d2_val = 0;
            } else {
              v_out_val = -v_in_val;
              i_d1_val = 0;
              i_d2_val = Math.max(0, (((2 * V_p) / Math.PI) * Math.cos(a_val)) / R);
            }
            i_out_val = i_d1_val + i_d2_val;
          } else {
            const tan_p = XL / R;
            const th_cyc = theta % Math.PI;
            let cur = 0;
            if (th_cyc >= a_val) {
              cur = (V_p / Z) * (Math.sin(th_cyc - phi) - Math.sin(a_val - phi) * Math.exp(-(th_cyc - a_val) / tan_p));
            }
            if (cur > 0) {
              v_out_val = (theta < Math.PI) ? v_in_val : -v_in_val;
              i_out_val = cur;
            } else {
              v_out_val = 0;
              i_out_val = 0;
            }
            if (theta < Math.PI) { i_d1_val = i_out_val; i_d2_val = 0; }
            else { i_d1_val = 0; i_d2_val = i_out_val; }
          }
        } else if (topologia === "mono_onda_completa_controlado_rle") {
          const R = parseFloat(document.getElementById("input-r").value);
          const L = parseFloat(document.getElementById("input-l").value);
          const E = parseFloat(document.getElementById("input-e").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          if (theta >= a_val && theta < Math.PI + a_val) {
            v_out_val = v_in_val;
            i_out_val = Math.max(0, (((2 * V_p) / Math.PI) * Math.cos(a_val) - E) / R);
            i_d1_val = i_out_val;
            i_d2_val = 0;
          } else {
            v_out_val = -v_in_val;
            i_out_val = Math.max(0, (((2 * V_p) / Math.PI) * Math.cos(a_val) - E) / R);
            i_d1_val = 0;
            i_d2_val = i_out_val;
          }
        } else if (topologia === "tri_meia_onda_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const va = V_p * Math.sin(omega_t);
          const vb = V_p * Math.sin(omega_t - (2 * Math.PI / 3));
          const vc = V_p * Math.sin(omega_t - (4 * Math.PI / 3));
          v_a_val = va;
          v_b_val = vb;
          v_c_val = vc;
          v_ab_val = va - vb;
          v_bc_val = vb - vc;
          v_ca_val = vc - va;
          v_out_val = Math.max(va, vb, vc);
          i_out_val = v_out_val / R;
          i_d1_val = (va >= vb && va >= vc) ? i_out_val : 0;
          i_d2_val = (vb > va && vb >= vc) ? i_out_val : 0;
          i_d3_val = (vc > va && vc > vb) ? i_out_val : 0;
          v_d_val = va - v_out_val;
          i_fonte_val = i_d1_val;
        } else if (topologia === "tri_ponte_completa_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const VF_p = V_p / Math.sqrt(3);
          const va = VF_p * Math.sin(omega_t);
          const vb = VF_p * Math.sin(omega_t - (2 * Math.PI / 3));
          const vc = VF_p * Math.sin(omega_t - (4 * Math.PI / 3));
          v_a_val = va;
          v_b_val = vb;
          v_c_val = vc;
          v_ab_val = va - vb;
          v_bc_val = vb - vc;
          v_ca_val = vc - va;
          const v_max = Math.max(va, vb, vc);
          const v_min = Math.min(va, vb, vc);
          v_out_val = v_max - v_min;
          i_out_val = v_out_val / R;
          i_d1_val = (va >= vb && va >= vc) ? i_out_val : 0;
          i_d2_val = (vb > va && vb >= vc) ? i_out_val : 0;
          i_d3_val = (vc > va && vc > vb) ? i_out_val : 0;
          v_d_val = va - v_max;
          i_fonte_val = (va >= vb && va >= vc) ? i_out_val : ((va <= vb && va <= vc) ? -i_out_val : 0);
        } else if (topologia === "tri_meia_onda_controlado_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const va = V_p * Math.sin(omega_t);
          const vb = V_p * Math.sin(omega_t - (2 * Math.PI / 3));
          const vc = V_p * Math.sin(omega_t - (4 * Math.PI / 3));
          v_a_val = va;
          v_b_val = vb;
          v_c_val = vc;
          v_ab_val = va - vb;
          v_bc_val = vb - vc;
          v_ca_val = vc - va;

          const delta_cond = (a_val <= Math.PI / 6) ? (2 * Math.PI / 3) : Math.max(0, (5 * Math.PI / 6) - a_val);
          const d_a = (omega_t - (Math.PI / 6 + a_val) + 10 * Math.PI) % (2 * Math.PI);
          const d_b = (omega_t - (5 * Math.PI / 6 + a_val) + 10 * Math.PI) % (2 * Math.PI);
          const d_c = (omega_t - (9 * Math.PI / 6 + a_val) + 10 * Math.PI) % (2 * Math.PI);

          if (d_a < delta_cond) {
            v_out_val = Math.max(0, va);
            i_d1_val = v_out_val / R;
          } else if (d_b < delta_cond) {
            v_out_val = Math.max(0, vb);
            i_d2_val = v_out_val / R;
          } else if (d_c < delta_cond) {
            v_out_val = Math.max(0, vc);
            i_d3_val = v_out_val / R;
          } else {
            v_out_val = 0;
          }
          i_out_val = v_out_val / R;
          v_d_val = va - v_out_val;
          gate_val = (d_a <= (8 * Math.PI / 180)) ? 5 : 0;
          gate2_val = (d_b <= (8 * Math.PI / 180)) ? 5 : 0;
          gate3_val = (d_c <= (8 * Math.PI / 180)) ? 5 : 0;
          i_fonte_val = i_d1_val;
        } else if (topologia === "tri_ponte_controlado_r") {
          const R = parseFloat(document.getElementById("input-r").value);
          const a_val = (parseFloat(document.getElementById("input-alpha").value) * Math.PI) / 180;
          const VF_p = V_p / Math.sqrt(3);
          const va = VF_p * Math.sin(omega_t);
          const vb = VF_p * Math.sin(omega_t - (2 * Math.PI / 3));
          const vc = VF_p * Math.sin(omega_t - (4 * Math.PI / 3));
          v_a_val = va;
          v_b_val = vb;
          v_c_val = vc;

          const vab = va - vb, vac = va - vc, vbc = vb - vc, vba = vb - va, vca = vc - va, vcb = vc - vb;
          v_ab_val = vab;
          v_bc_val = vbc;
          v_ca_val = vca;
          const th_line = (omega_t + (Math.PI / 6) - a_val + 10 * Math.PI) % (2 * Math.PI);
          const seg = Math.floor(th_line / (Math.PI / 3));
          const th_in_seg = th_line - seg * (Math.PI / 3);
          const delta_cond = (a_val <= Math.PI / 3) ? (Math.PI / 3) : Math.max(0, (2 * Math.PI / 3) - a_val);

          let v_rect = 0;
          if (th_in_seg < delta_cond) {
            if (seg === 0) v_rect = vab;
            else if (seg === 1) v_rect = vac;
            else if (seg === 2) v_rect = vbc;
            else if (seg === 3) v_rect = vba;
            else if (seg === 4) v_rect = vca;
            else v_rect = vcb;
          }

          v_out_val = Math.max(0, v_rect);
          i_out_val = v_out_val / R;
          i_d1_val = (seg === 0 || seg === 1) ? i_out_val : 0;
          i_d2_val = (seg === 2 || seg === 3) ? i_out_val : 0;
          i_d3_val = (seg === 4 || seg === 5) ? i_out_val : 0;
          v_d_val = va - ((seg === 0 || seg === 1) ? v_out_val : (vab > 0 ? vab : 0));
          gate_val = (th_in_seg <= (8 * Math.PI / 180)) ? 5 : 0;
          i_fonte_val = (seg === 0 || seg === 1) ? i_out_val : ((seg === 3 || seg === 4) ? -i_out_val : 0);
        }

        if (!isTrifasico) {
          if (isControlado) {
            if (isOndaCompleta) {
              v_d_val = (v_in_val >= 0) ? (v_in_val - v_out_val) : -v_out_val;
            } else {
              v_d_val = v_in_val - v_out_val;
            }
            const a_deg = parseFloat(document.getElementById("input-alpha").value);
            const a_rad = (a_deg * Math.PI) / 180;
            if (isOndaCompleta) {
              const d_g1 = (theta - a_rad + 2 * Math.PI) % (2 * Math.PI);
              const d_g2 = (theta - (Math.PI + a_rad) + 2 * Math.PI) % (2 * Math.PI);
              gate_val = (d_g1 <= (8 * Math.PI / 180) || d_g2 <= (8 * Math.PI / 180)) ? 5 : 0;
              i_fonte_val = i_d1_val - i_d2_val;
            } else {
              const d_g = (theta - a_rad + 2 * Math.PI) % (2 * Math.PI);
              gate_val = (d_g <= (8 * Math.PI / 180)) ? 5 : 0;
              i_fonte_val = i_d1_val;
            }
          } else if (isOndaCompleta) {
            if (topologia === "mono_onda_completa_tap_r") {
              const N_tap = parseFloat(document.getElementById("input-n").value) || 1;
              v_d_val = (v_in_val / N_tap) - v_out_val;
            } else {
              v_d_val = (v_in_val >= 0) ? 0 : -v_out_val;
            }
            i_fonte_val = i_d1_val - i_d2_val;
          } else {
            v_d_val = v_in_val - v_out_val;
            i_fonte_val = i_d1_val;
          }
        }

        plotData.t.push(t_ms);
        plotData.v_in.push(v_in_val);
        plotData.v_a.push(v_a_val);
        plotData.v_b.push(v_b_val);
        plotData.v_c.push(v_c_val);
        plotData.v_ab.push(v_ab_val);
        plotData.v_bc.push(v_bc_val);
        plotData.v_ca.push(v_ca_val);
        plotData.v_out.push(v_out_val);
        plotData.v_d.push(v_d_val);
        plotData.gate.push(gate_val);
        plotData.gate2.push(gate2_val);
        plotData.gate3.push(gate3_val);
        plotData.i_out.push(i_out_val);
        plotData.i_d1.push(i_d1_val);
        plotData.i_d2.push(i_d2_val);
        plotData.i_d3.push(i_d3_val);
        plotData.i_fonte.push(i_fonte_val);
      }

      document.getElementById("summary-stats").innerHTML = summaryHTML;
      document.getElementById("steps-container").innerHTML = stepsHTML;
      document.getElementById("card-resultados").style.display = "block";
      document.getElementById("card-grafico").style.display = "block";

      if (window.renderMathInElement) {
        renderMathInElement(document.getElementById("steps-container"), {
          delimiters: [
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
          ]
        });
      }

      atualizarGrafico(plotData);
    }

export {
  TABELA_BETA,
  TABELA_IEFP,
  TABELA_IEFP_RODA_LIVRE,
  TABELA_PUCHLOWSKI_IEFP,
  TABELA_PUCHLOWSKI_BETA,
  interpolarBeta,
  interpolarIefp,
  interpolarIefpRodaLivre,
  gerarLinhasTabelaConferencia,
  toggleTabelaBeta,
  obterPuchlowski,
  gerarTabelaPuchlowskiHTML,
  toggleTabelaPuchlowski,
  executarCalculo
};