// ============================================================================
// MÃ“DULO DE FORMAS DE ONDA E INSTRUMENTAÃ‡ÃƒO VIRTUAL (graficos.js)
// ============================================================================

    // Instâncias independentes para os subplots sincronizados
    let chartVinInst = null;
    let chartVlinhaInst = null;
    let chartVoInst = null;
    let chartGateInst = null;
    let chartVDInst = null;
    let chartID1Inst = null;
    let chartID2Inst = null;
    let chartID3Inst = null;
    let chartIInst = null;
    let chartIgInst = null;
    let chartBothInst = null;
    let chartMeasureCargaInst = null;
    let chartMeasureFonteInst = null;

    function getThemeColors() {
      const isLight = document.body.classList.contains("light-mode") || document.documentElement.getAttribute("data-theme") === "light";
      return {
        isLight,
        gridColor: isLight ? 'rgba(0, 0, 0, 0.08)' : '#21262d',
        zeroLineColor: isLight ? '#d0d7de' : '#383e47',
        boxBorderColor: isLight ? '#d0d7de' : '#30363d',
        tickColor: isLight ? '#57606a' : '#8b949e',
        titleColor: isLight ? '#1f2328' : '#c9d1d9',
        legendColor: isLight ? '#1f2328' : '#f0f6fc',
        voColor: isLight ? '#cf222e' : '#f85149',
        ioColor: isLight ? '#0969da' : '#58a6ff'
      };
    }

    // Plugin 1: Traça linha em y = 0
    const zeroLinePlugin = {
      id: 'zeroLinePlugin',
      afterDraw(chart) {
        const theme = getThemeColors();
        const { ctx, chartArea, scales: { y } } = chart;
        if (!chartArea || !y) return;
        const yZero = y.getPixelForValue(0);
        if (yZero >= chartArea.top && yZero <= chartArea.bottom) {
          ctx.save();
          ctx.strokeStyle = theme.zeroLineColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(chartArea.left, yZero);
          ctx.lineTo(chartArea.right, yZero);
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    // Plugin 2: Desenha moldura em torno de cada gráfico
    const boxBorderPlugin = {
      id: 'boxBorderPlugin',
      afterDraw(chart) {
        const theme = getThemeColors();
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        ctx.save();
        ctx.strokeStyle = theme.boxBorderColor;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        ctx.restore();
      }
    };

    // Plugin 3: Traça cursores verticais X1 e X2 com tags [1] e [2] (Estilo PSIM Measure)
    const psimCursorsPlugin = {
      id: 'psimCursorsPlugin',
      afterDraw(chart, args, options) {
        if (!options || !options.enabled) return;
        const { ctx, chartArea, scales: { x } } = chart;
        if (!chartArea || !x) return;

        const idx1 = options.idx1;
        const idx2 = options.idx2;
        if (idx1 === undefined || idx2 === undefined) return;

        const x1Pixel = x.getPixelForValue(idx1);
        const x2Pixel = x.getPixelForValue(idx2);

        ctx.save();
        ctx.strokeStyle = '#e06c75';
        ctx.lineWidth = 1.2;

        if (x1Pixel >= chartArea.left && x1Pixel <= chartArea.right) {
          ctx.beginPath();
          ctx.moveTo(x1Pixel, chartArea.top);
          ctx.lineTo(x1Pixel, chartArea.bottom);
          ctx.stroke();

          // Cursor tag 1
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(x1Pixel - 7, chartArea.bottom + 2, 14, 14);
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('1', x1Pixel, chartArea.bottom + 9);
        }

        if (x2Pixel >= chartArea.left && x2Pixel <= chartArea.right) {
          ctx.beginPath();
          ctx.moveTo(x2Pixel, chartArea.top);
          ctx.lineTo(x2Pixel, chartArea.bottom);
          ctx.stroke();

          // Cursor tag 2
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(x2Pixel - 7, chartArea.bottom + 2, 14, 14);
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('2', x2Pixel, chartArea.bottom + 9);
        }

        ctx.restore();
      }
    };

    function criarSubplot(canvasId, datasetLabel, dataValues, yTitle, showXAxis, plotData, lineColor) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      const theme = getThemeColors();
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: plotData.t.map(v => v.toFixed(2)),
          datasets: [{
            label: datasetLabel,
            data: dataValues,
            borderColor: lineColor || (theme.isLight ? '#0969da' : '#58a6ff'),
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 22,
                boxHeight: 2,
                color: theme.legendColor,
                font: { size: 12, style: 'italic', weight: 'bold' }
              }
            },
            tooltip: {
              callbacks: {
                title: function(items) { return `Tempo = ${items[0].label} ms`; },
                label: function(item) { return ` ${item.dataset.label}: ${item.parsed.y.toFixed(2)}`; }
              }
            }
          },
          layout: {
            padding: { left: 4, right: 10, top: 2, bottom: 2 }
          },
          scales: {
            x: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1,
                drawTicks: showXAxis
              },
              ticks: {
                display: showXAxis,
                color: theme.tickColor,
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: showXAxis,
                text: 'Tempo (ms)',
                color: theme.titleColor,
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1
              },
              ticks: {
                color: theme.tickColor,
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: yTitle,
                color: theme.titleColor,
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            }
          }
        },
        plugins: [zeroLinePlugin, boxBorderPlugin]
      });
    }

    function criarSubplotMulti(canvasId, datasets, yTitle, showXAxis, plotData) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      const theme = getThemeColors();
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: plotData.t.map(v => v.toFixed(2)),
          datasets: datasets.map(d => ({
            label: d.label,
            data: d.data,
            borderColor: d.color || '#58a6ff',
            borderDash: d.borderDash || [],
            backgroundColor: 'transparent',
            borderWidth: d.borderWidth || 2,
            fill: false,
            pointRadius: 0,
            tension: 0
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 20,
                boxHeight: 2,
                color: theme.legendColor,
                font: { size: 11, weight: 'bold' }
              }
            },
            tooltip: {
              callbacks: {
                title: function(items) { return `Tempo = ${items[0].label} ms`; },
                label: function(item) { return ` ${item.dataset.label}: ${item.parsed.y.toFixed(2)}`; }
              }
            }
          },
          layout: {
            padding: { left: 4, right: 10, top: 2, bottom: 2 }
          },
          scales: {
            x: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1,
                drawTicks: showXAxis
              },
              ticks: {
                display: showXAxis,
                color: theme.tickColor,
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: showXAxis,
                text: 'Tempo (ms)',
                color: theme.titleColor,
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1
              },
              ticks: {
                color: theme.tickColor,
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: yTitle,
                color: theme.titleColor,
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            }
          }
        },
        plugins: [zeroLinePlugin, boxBorderPlugin]
      });
    }

    function criarSubplotCombinado(canvasId, plotData) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      const theme = getThemeColors();
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: plotData.t.map(v => v.toFixed(2)),
          datasets: [
            {
              label: 'vo(t) - Tensão na carga [V]',
              data: plotData.v_out,
              borderColor: theme.voColor,
              backgroundColor: 'transparent',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0,
              yAxisID: 'y'
            },
            {
              label: 'i(t) - Corrente na carga [A]',
              data: plotData.i_out,
              borderColor: '#f0883e',
              backgroundColor: 'transparent',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 20,
                boxHeight: 2,
                color: theme.legendColor,
                font: { size: 12, weight: 'bold' }
              }
            },
            tooltip: {
              callbacks: {
                title: function(items) { return `Tempo = ${items[0].label} ms`; },
                label: function(item) { return ` ${item.dataset.label}: ${item.parsed.y.toFixed(2)}`; }
              }
            }
          },
          layout: {
            padding: { left: 4, right: 10, top: 2, bottom: 2 }
          },
          scales: {
            x: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1,
                drawTicks: true
              },
              ticks: {
                display: true,
                color: theme.tickColor,
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: true,
                text: 'Tempo (ms)',
                color: theme.titleColor,
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                color: theme.gridColor,
                lineWidth: 1
              },
              ticks: {
                color: theme.voColor,
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: 'Tensão vo(t) [V]',
                color: theme.voColor,
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                color: '#f0883e',
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: 'Corrente i(t) [A]',
                color: '#f0883e',
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            }
          }
        },
        plugins: [zeroLinePlugin, boxBorderPlugin]
      });
    }


    // ==========================================================================
    // CÁLCULO E RENDERIZAÇÃO DA JANELA MEASURE (ESTILO PSIM)
    // ==========================================================================
    let formatoMeasureEngenharia = false;

    function calcularMedicoesPSIM(plotData) {
      if (!plotData || !plotData.t || plotData.t.length === 0) return null;
      const freq = plotData.freq || 60;
      const T = 1 / freq;
      const N = plotData.t.length;

      const t_sec = plotData.t.map(ms => ms / 1000);
      const x1_target = T;
      const x2_target = 2 * T;

      let idx1 = 0;
      let idx2 = N - 1;
      let minDiff1 = Infinity;
      let minDiff2 = Infinity;

      for (let i = 0; i < N; i++) {
        const diff1 = Math.abs(t_sec[i] - x1_target);
        if (diff1 < minDiff1) {
          minDiff1 = diff1;
          idx1 = i;
        }
        const diff2 = Math.abs(t_sec[i] - x2_target);
        if (diff2 < minDiff2) {
          minDiff2 = diff2;
          idx2 = i;
        }
      }

      if (idx2 <= idx1) {
        idx1 = 0;
        idx2 = N - 1;
      }

      const numPontosPeriodo = idx2 - idx1;
      const X1 = t_sec[idx1];
      const X2 = t_sec[idx2];
      const DeltaX = X2 - X1;

      function statsSignal(arr) {
        if (!arr || arr.length === 0) {
          return { valX1: 0, valX2: 0, delta: 0, avg: 0, avgAbs: 0, rms: 0 };
        }
        let sum = 0;
        let sumAbs = 0;
        let sumSq = 0;
        for (let i = idx1; i < idx2; i++) {
          const val = arr[i] || 0;
          sum += val;
          sumAbs += Math.abs(val);
          sumSq += val * val;
        }
        const avg = sum / numPontosPeriodo;
        const avgAbs = sumAbs / numPontosPeriodo;
        const rms = Math.sqrt(Math.max(0, sumSq / numPontosPeriodo));
        const valX1 = arr[idx1] || 0;
        const valX2 = arr[idx2] || 0;
        const delta = valX2 - valX1;
        return { valX1, valX2, delta, avg, avgAbs, rms };
      }

      function statsPower(vArr, iArr, vRms, iRms) {
        if (!vArr || !iArr || vArr.length === 0 || iArr.length === 0) {
          return { P: 0, S: 0, PF: 0 };
        }
        let sumP = 0;
        for (let i = idx1; i < idx2; i++) {
          sumP += (vArr[i] || 0) * (iArr[i] || 0);
        }
        const P = sumP / numPontosPeriodo;
        const S = vRms * iRms;
        const PF = S > 1e-4 ? Math.min(1, Math.max(0, Math.abs(P) / S)) : 0;
        return { P, S, PF };
      }

      const vCargaStats = statsSignal(plotData.v_out);
      const iCargaStats = statsSignal(plotData.i_out);
      const pCargaStats = statsPower(plotData.v_out, plotData.i_out, vCargaStats.rms, iCargaStats.rms);

      const vFonteStats = statsSignal(plotData.v_in);
      const iFonteStats = statsSignal(plotData.i_fonte);
      const pFonteStats = statsPower(plotData.v_in, plotData.i_fonte, vFonteStats.rms, iFonteStats.rms);

      return {
        idx1,
        idx2,
        X1,
        X2,
        DeltaX,
        carga: {
          v: vCargaStats,
          i: iCargaStats,
          p: pCargaStats
        },
        fonte: {
          v: vFonteStats,
          i: iFonteStats,
          p: pFonteStats
        }
      };
    }

    function criarSubplotMeasure(canvasId, plotData, tipo, statsMedicoes) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      const theme = getThemeColors();

      const isCarga = (tipo === 'carga');
      const labelV = isCarga ? 'V_Carga1' : 'V_Fonte1';
      const labelI = isCarga ? 'I_Carga1' : 'I_Fonte1';
      const dataV = isCarga ? plotData.v_out : plotData.v_in;
      const dataI = isCarga ? plotData.i_out : plotData.i_fonte;
      const titleV = isCarga ? 'Tensão V_Carga [V]' : 'Tensão V_Fonte [V]';
      const titleI = isCarga ? 'Corrente I_Carga [A]' : 'Corrente I_Fonte [A]';

      const timeLabels = plotData.t.map(ms => (ms / 1000).toFixed(4));

      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [
            {
              label: labelV,
              data: dataV,
              borderColor: '#cf222e',
              backgroundColor: 'transparent',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0,
              yAxisID: 'y'
            },
            {
              label: labelI,
              data: dataI,
              borderColor: '#0969da',
              backgroundColor: 'transparent',
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              tension: 0,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              labels: {
                boxWidth: 14,
                boxHeight: 2,
                color: theme.legendColor,
                font: { size: 12, weight: 'bold', family: 'ui-monospace, Consolas, monospace' }
              }
            },
            tooltip: {
              callbacks: {
                title: function(items) { return `Time = ${items[0].label} s (${(parseFloat(items[0].label)*1000).toFixed(2)} ms)`; },
                label: function(item) {
                  const unit = item.datasetIndex === 0 ? ' V' : ' A';
                  return ` ${item.dataset.label}: ${item.parsed.y.toFixed(3)}${unit}`;
                }
              }
            },
            psimCursorsPlugin: {
              enabled: true,
              idx1: statsMedicoes.idx1,
              idx2: statsMedicoes.idx2
            }
          },
          layout: {
            padding: { left: 4, right: 12, top: 4, bottom: 18 }
          },
          scales: {
            x: {
              grid: {
                color: theme.gridColor,
                lineWidth: 1,
                drawTicks: true
              },
              ticks: {
                color: theme.tickColor,
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  const tSec = plotData.t[idx] / 1000;
                  return tSec.toFixed(3);
                }
              },
              title: {
                display: true,
                text: 'Time (s)',
                color: theme.titleColor,
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                color: theme.gridColor,
                lineWidth: 1
              },
              ticks: {
                color: '#cf222e',
                maxTicksLimit: 6,
                font: { size: 11, weight: '600' }
              },
              title: {
                display: true,
                text: titleV,
                color: '#cf222e',
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                color: '#0969da',
                maxTicksLimit: 6,
                font: { size: 11, weight: '600' }
              },
              title: {
                display: true,
                text: titleI,
                color: '#0969da',
                font: { size: 12, weight: '600' }
              },
              border: { display: false }
            }
          }
        },
        plugins: [zeroLinePlugin, boxBorderPlugin, psimCursorsPlugin]
      });
    }

    function gerarTabelaMeasureHTML(stats, tipo, modoEngenharia) {
      const isCarga = (tipo === 'carga');
      const labelI = isCarga ? 'I_Carga1' : 'I_Fonte1';
      const labelV = isCarga ? 'V_Carga1' : 'V_Fonte1';
      const data = isCarga ? stats.carga : stats.fonte;

      function fmtNum(val, unit = '') {
        if (val === undefined || val === null || isNaN(val)) return '—';
        if (modoEngenharia) {
          if (Math.abs(val) < 0.001 && val !== 0) return (val * 1000).toFixed(2) + ' m' + unit;
          return val.toFixed(2) + (unit ? ' ' + unit : '');
        } else {
          return val.toExponential(5);
        }
      }

      function fmtTime(val) {
        if (modoEngenharia) {
          return (val * 1000).toFixed(2) + ' ms';
        }
        return val.toExponential(5);
      }

      const tituloSecao = isCarga ? 'Medições na Carga' : 'Medições na Fonte';

      return `
        <div class="psim-window">
          <div class="psim-window-header">
            <span class="psim-title">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11zM2.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-11z"/><path d="M3 4h10v1H3V4zm0 3h10v1H3V7zm0 3h10v1H3v-1z"/></svg>
              Measure &bull; ${tituloSecao}
            </span>
            <div class="psim-tools">
              <button type="button" class="btn-psim-mode" onclick="toggleFormatoMeasure('${tipo}')" title="Alternar entre notação científica PSIM e unidades de engenharia">
                ${modoEngenharia ? 'Modo: Engenharia (V, A, W)' : 'Modo: Científico (PSIM)'}
              </button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="psim-table">
              <thead>
                <tr>
                  <th style="min-width: 90px; text-align: left;">Measure</th>
                  <th>X1</th>
                  <th>X2</th>
                  <th>&Delta;</th>
                  <th>Average</th>
                  <th>Average |X|</th>
                  <th>RMS</th>
                  <th>P</th>
                  <th>S</th>
                  <th>PF</th>
                </tr>
              </thead>
              <tbody>
                <tr class="row-time">
                  <td style="font-weight: 700; text-align: left;">Time</td>
                  <td>${fmtTime(stats.X1)}</td>
                  <td>${fmtTime(stats.X2)}</td>
                  <td>${fmtTime(stats.DeltaX)}</td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                </tr>
                <tr class="row-i">
                  <td style="font-weight: 700; text-align: left;">${labelI}</td>
                  <td>${fmtNum(data.i.valX1, 'A')}</td>
                  <td>${fmtNum(data.i.valX2, 'A')}</td>
                  <td>${fmtNum(data.i.delta, 'A')}</td>
                  <td>${fmtNum(data.i.avg, 'A')}</td>
                  <td>${fmtNum(data.i.avgAbs, 'A')}</td>
                  <td>${fmtNum(data.i.rms, 'A')}</td>
                  <td>${fmtNum(data.p.P, 'W')}</td>
                  <td>${fmtNum(data.p.S, 'VA')}</td>
                  <td>${fmtNum(data.p.PF, '')}</td>
                </tr>
                <tr class="row-v">
                  <td style="font-weight: 700; text-align: left;">${labelV}</td>
                  <td>${fmtNum(data.v.valX1, 'V')}</td>
                  <td>${fmtNum(data.v.valX2, 'V')}</td>
                  <td>${fmtNum(data.v.delta, 'V')}</td>
                  <td>${fmtNum(data.v.avg, 'V')}</td>
                  <td>${fmtNum(data.v.avgAbs, 'V')}</td>
                  <td>${fmtNum(data.v.rms, 'V')}</td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                  <td class="empty-cell"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderizarTabelasMeasure(statsMedicoes) {
      if (!statsMedicoes) return;
      window.ultimasMedicoesPSIM = statsMedicoes;

      const contCarga = document.getElementById("container-measure-table-carga");
      const contFonte = document.getElementById("container-measure-table-fonte");

      if (contCarga) {
        contCarga.innerHTML = gerarTabelaMeasureHTML(statsMedicoes, 'carga', formatoMeasureEngenharia);
      }
      if (contFonte) {
        contFonte.innerHTML = gerarTabelaMeasureHTML(statsMedicoes, 'fonte', formatoMeasureEngenharia);
      }
    }

    function toggleFormatoMeasure(tipo) {
      formatoMeasureEngenharia = !formatoMeasureEngenharia;
      if (window.ultimasMedicoesPSIM) {
        renderizarTabelasMeasure(window.ultimasMedicoesPSIM);
      }
    }
    window.toggleFormatoMeasure = toggleFormatoMeasure;

    var ultimoPlotData = null;
    window.ultimoPlotData = null;
    let canalFiltroAtual = "todos";

    function atualizarGrafico(plotData) {
      ultimoPlotData = plotData;
      window.ultimoPlotData = plotData;

      document.getElementById("plot-main-title").innerText = plotData.title;
      document.getElementById("plot-footer-caption").innerText = plotData.caption;

      // Atualiza os badges da bancada de instrumentação
      const badgeTime = document.getElementById("osc-badge-timebase");
      if (badgeTime) {
        const periodMs = (1000 / (plotData.freq || 60)).toFixed(1);
        const doublePeriodMs = (2 * periodMs).toFixed(1);
        badgeTime.innerText = `Base de Tempo: 2 Ciclos (${doublePeriodMs} ms) • 360 Amostras`;
      }

      const badgeMode = document.getElementById("osc-badge-mode");
      if (badgeMode) {
        let modoStr = "Monofásico 1Φ";
        if (plotData.is_inversor) {
          if (plotData.topologia === "inversor_ponte_spwm_bipolar") {
            modoStr = "Inversor SPWM Bipolar (Aula 8)";
          } else if (plotData.topologia === "inversor_ponte_spwm_unipolar") {
            modoStr = "Inversor SPWM Unipolar (Aula 8)";
          } else {
            modoStr = "Inversor CC-CA Monofásico";
          }
        } else if (plotData.is_trifasico) {
          modoStr = plotData.is_controlado ? "Trifásico 3Φ Controlado (SCR)" : "Trifásico 3Φ Não Controlado";
        } else if (plotData.is_controlado) {
          modoStr = "Monofásico 1Φ Controlado (SCR)";
        }
        badgeMode.innerText = modoStr;
      }

      // Reinicia os botões de filtro para 'Todos os Canais'
      const btns = document.querySelectorAll(".btn-ch-filter");
      btns.forEach(b => b.classList.remove("active"));
      const btnTodos = document.querySelector(".btn-ch-filter");
      if (btnTodos) btnTodos.classList.add("active");
      canalFiltroAtual = "todos";

      if (chartVinInst) chartVinInst.destroy();
      if (chartVlinhaInst) chartVlinhaInst.destroy();
      if (chartVoInst) chartVoInst.destroy();
      if (chartGateInst) chartGateInst.destroy();
      if (chartVDInst) chartVDInst.destroy();
      if (chartID1Inst) chartID1Inst.destroy();
      if (chartID2Inst) chartID2Inst.destroy();
      if (chartID3Inst) chartID3Inst.destroy();
      if (chartIInst) chartIInst.destroy();
      if (chartIgInst) chartIgInst.destroy();
      if (chartBothInst) chartBothInst.destroy();
      if (chartMeasureCargaInst) chartMeasureCargaInst.destroy();
      if (chartMeasureFonteInst) chartMeasureFonteInst.destroy();

      if (plotData.is_trifasico) {
        chartVinInst = criarSubplotMulti("chartVin", [
          { label: "va(t) - Fase A (V)", data: plotData.v_a, color: "#ec4899", borderWidth: 2 },
          { label: "vb(t) - Fase B (V)", data: plotData.v_b, color: "#38bdf8", borderWidth: 2 },
          { label: "vc(t) - Fase C (V)", data: plotData.v_c, color: "#fb923c", borderWidth: 2 }
        ], "vfase - Tensões de Fase (V)", false, plotData);
      } else if (plotData.topologia === "mono_onda_completa_tap_r") {
        chartVinInst = criarSubplotMulti("chartVin", [
          { label: "v1(t) - Secundário 1 (V)", data: plotData.v_in, color: "#58a6ff", borderWidth: 2 },
          { label: "v2(t) - Secundário 2 (V)", data: plotData.v_in.map(v => -v), color: "#da3633", borderWidth: 2 }
        ], "Tensão nos Enrolamentos (V)", false, plotData);
      } else if (plotData.is_inversor) {
        if (plotData.topologia.includes("_spwm_") && plotData.v_mod && plotData.v_tri && plotData.v_mod.length > 0) {
          chartVinInst = criarSubplotMulti("chartVin", [
            { label: "vm(t) - Modulante Senoidal (V)", data: plotData.v_mod, color: "#ec4899", borderWidth: 2 },
            { label: "vtri(t) - Portadora Triangular (V)", data: plotData.v_tri, color: "#e3b341", borderWidth: 1.2 }
          ], "Modulação SPWM: vm vs vtri (V)", false, plotData);
        } else {
          chartVinInst = criarSubplot("chartVin", "VCC - Barramento CC (V)", plotData.v_in, "Tensão VCC (V)", false, plotData, "#58a6ff");
        }
      } else {
        chartVinInst = criarSubplot("chartVin", "vi(t)", plotData.v_in, "Tensão de entrada (V)", false, plotData, "#58a6ff");
      }

      const boxVlinha = document.getElementById("box-chartVlinha");
      if (plotData.tem_vlinha) {
        boxVlinha.style.display = "block";
        chartVlinhaInst = criarSubplotMulti("chartVlinha", [
          { label: "vab(t) (V)", data: plotData.v_ab, color: "#2ea043", borderWidth: 1.8 },
          { label: "vbc(t) (V)", data: plotData.v_bc, color: "#38bdf8", borderWidth: 1.8 },
          { label: "vca(t) (V)", data: plotData.v_ca, color: "#d29922", borderWidth: 1.8 }
        ], "vlinha - Tensões de Linha (V)", false, plotData);
      } else {
        boxVlinha.style.display = "none";
      }

      chartVoInst = criarSubplot("chartVo", "vo(t)", plotData.v_out, "Tensão na carga (V)", false, plotData, "#58a6ff");

      const boxGate = document.getElementById("box-chartGate");
      if (plotData.tem_gate) {
        boxGate.style.display = "block";
        if (plotData.topologia === "tri_meia_onda_controlado_r") {
          chartGateInst = criarSubplotMulti("chartGate", [
            { label: "G1 - Fase A (V)", data: plotData.gate, color: "#ec4899", borderWidth: 2 },
            { label: "G2 - Fase B (V)", data: plotData.gate2, color: "#38bdf8", borderWidth: 2 },
            { label: "G3 - Fase C (V)", data: plotData.gate3, color: "#fb923c", borderWidth: 2 }
          ], "Pulsos de Gate G1, G2, G3 (V)", false, plotData);
        } else {
          const labelGate = plotData.topologia.includes("_spwm_") ? "G1(t) - Pulso PWM Chave S1 (V)" : (plotData.is_inversor ? "G1(t) - Sinal de Comando Chave S1 (V)" : "G(t) - Pulso de Disparo / Gate (V)");
          chartGateInst = criarSubplot("chartGate", labelGate, plotData.gate, "Gate G(t) (V)", false, plotData, "#2ea043");
        }
      } else {
        boxGate.style.display = "none";
      }

      const boxVD = document.getElementById("box-chartVD");
      if (plotData.tem_vd) {
        boxVD.style.display = "block";
        let labelVD = "vD(t) - Tensão no Diodo Principal (V)";
        let titleVD = "Tensão vD (V)";
        if (plotData.is_inversor) {
          labelVD = "vS1(t) - Tensão no Interruptor S1 (V)";
          titleVD = "Tensão vS1 (V)";
        } else if (plotData.is_controlado) {
          labelVD = plotData.is_onda_completa ? "vT1(t) - Tensão no Tiristor T1 (V)" : "vT(t) - Tensão no Tiristor Principal (V)";
          titleVD = plotData.is_onda_completa ? "Tensão vT1 (V)" : "Tensão vT (V)";
        } else if (plotData.is_trifasico) {
          labelVD = "vD1(t) - Tensão Reversa Diodo Fase A (V)";
          titleVD = "Tensão vD1 (V)";
        } else if (plotData.topologia === "mono_onda_completa_tap_r") {
          labelVD = "vD1(t) - Tensão Reversa Diodo 1 (V)";
          titleVD = "Tensão vD1 (V)";
        }
        chartVDInst = criarSubplot("chartVD", labelVD, plotData.v_d, titleVD, false, plotData, "#e3b341");
      } else {
        boxVD.style.display = "none";
      }

      const boxID1 = document.getElementById("box-chartID1");
      const boxID2 = document.getElementById("box-chartID2");
      const boxID3 = document.getElementById("box-chartID3");

      if (plotData.tem_diodos) {
        boxID1.style.display = "block";
        let labelD1 = "iD1(t) - Diodo Principal (A)";
        let titleD1 = "Corrente iD1 (A)";
        if (plotData.is_inversor) {
          labelD1 = plotData.topologia.includes("_spwm_") ? "iS1(t) - Chave S1 (Pulsos PWM) (A)" : (plotData.topologia.includes("ponte_completa") ? "iS1,S2(t) - Chaves S1-S2 (A)" : "iS1(t) - Chave S1 (A)");
          titleD1 = plotData.topologia.includes("_spwm_") ? "Corrente iS1 (A)" : (plotData.topologia.includes("ponte_completa") ? "Corrente iS1,S2 (A)" : "Corrente iS1 (A)");
        } else if (plotData.is_controlado) {
          labelD1 = plotData.is_onda_completa ? "iT1,T4(t) - Tiristores T1-T4 (A)" : (plotData.is_trifasico ? "iT1(t) - Tiristor Fase A (A)" : "iT1(t) - Tiristor Principal (A)");
          titleD1 = plotData.is_onda_completa ? "Corrente iT1,T4 (A)" : (plotData.is_trifasico ? "Corrente iT1 (A)" : "Corrente iT1 (A)");
        } else if (plotData.is_trifasico) {
          labelD1 = "iD1(t) - Diodo Fase A (A)";
          titleD1 = "Corrente iD1 (A)";
        } else if (plotData.is_onda_completa) {
          labelD1 = (plotData.topologia === "mono_onda_completa_tap_r")
            ? "iD1(t) - Diodo 1 (Semiciclo +) (A)"
            : "iD1,D4(t) - Diodos D1-D4 (Semiciclo +) (A)";
          titleD1 = (plotData.topologia === "mono_onda_completa_tap_r") ? "Corrente iD1 (A)" : "Corrente iD1,D4 (A)";
        } else if (!plotData.tem_d2) {
          labelD1 = "iD(t) - Diodo Retificador (Pulsos) (A)";
          titleD1 = "Corrente iD (A)";
        }
        chartID1Inst = criarSubplot("chartID1", labelD1, plotData.i_d1, titleD1, false, plotData, "#2ea043");
      } else {
        boxID1.style.display = "none";
      }

      if (plotData.tem_d2) {
        boxID2.style.display = "block";
        let labelD2 = "iD2(t) - Diodo Roda Livre (A)";
        let titleD2 = "Corrente iD2 (A)";
        if (plotData.is_inversor) {
          labelD2 = "iD(t) - Diodos de Retorno (Regeneração) (A)";
          titleD2 = "Corrente iD (A)";
        } else if (plotData.is_controlado) {
          labelD2 = plotData.is_onda_completa ? "iT2,T3(t) - Tiristores T2-T3 (A)" : (plotData.is_trifasico ? "iT2(t) - Tiristor Fase B (A)" : "iD2(t) - Diodo Roda Livre (A)");
          titleD2 = plotData.is_onda_completa ? "Corrente iT2,T3 (A)" : (plotData.is_trifasico ? "Corrente iT2 (A)" : "Corrente iD2 (A)");
        } else if (plotData.is_trifasico) {
          labelD2 = "iD2(t) - Diodo Fase B (A)";
          titleD2 = "Corrente iD2 (A)";
        } else if (plotData.is_onda_completa) {
          labelD2 = (plotData.topologia === "mono_onda_completa_tap_r")
            ? "iD2(t) - Diodo 2 (Semiciclo -) (A)"
            : "iD2,D3(t) - Diodos D2-D3 (Semiciclo -) (A)";
          titleD2 = (plotData.topologia === "mono_onda_completa_tap_r") ? "Corrente iD2 (A)" : "Corrente iD2,D3 (A)";
        }
        chartID2Inst = criarSubplot("chartID2", labelD2, plotData.i_d2, titleD2, false, plotData, "#da3633");
      } else {
        boxID2.style.display = "none";
      }

      if (plotData.tem_d3) {
        boxID3.style.display = "block";
        let labelD3 = "iD3(t) - Diodo Fase C (A)";
        let titleD3 = "Corrente iD3 (A)";
        if (plotData.is_controlado) {
          labelD3 = "iT3(t) - Tiristor Fase C (A)";
          titleD3 = "Corrente iT3 (A)";
        }
        chartID3Inst = criarSubplot("chartID3", labelD3, plotData.i_d3, titleD3, false, plotData, "#a371f7");
      } else {
        boxID3.style.display = "none";
      }

      chartIInst = criarSubplot("chartI", "i(t)", plotData.i_out, "Corrente na carga (A)", false, plotData, "#f0883e");

      const boxIg = document.getElementById("box-chartIg");
      if (plotData.tem_ig && (plotData.is_onda_completa || plotData.topologia === "tri_ponte_completa_r" || plotData.topologia === "tri_ponte_controlado_r" || plotData.is_inversor)) {
        boxIg.style.display = "block";
        const labelIg = plotData.is_inversor ? "iCC(t) - Corrente Fonte CC (A)" : (plotData.is_trifasico ? "ia(t) - Corrente Fase A Fonte CA (A)" : "ig(t) - Corrente Fonte CA (A)");
        const titleIg = plotData.is_inversor ? "Corrente iCC (A)" : "Corrente CA (A)";
        chartIgInst = criarSubplot("chartIg", labelIg, plotData.i_fonte, titleIg, false, plotData, "#db61a2");
      } else {
        boxIg.style.display = "none";
      }

      chartBothInst = criarSubplotCombinado("chartBoth", plotData);

      // Renderização das Janelas e Gráficos de Medição PSIM (A.1 Carga e A.2 Fonte)
      const statsMedicoes = calcularMedicoesPSIM(plotData);
      if (statsMedicoes) {
        chartMeasureCargaInst = criarSubplotMeasure("chartMeasureCarga", plotData, 'carga', statsMedicoes);
        chartMeasureFonteInst = criarSubplotMeasure("chartMeasureFonte", plotData, 'fonte', statsMedicoes);
        renderizarTabelasMeasure(statsMedicoes);

        const titleFonteEl = document.getElementById("title-measure-fonte");
        if (titleFonteEl) {
          titleFonteEl.innerText = plotData.is_inversor
            ? "A.2 Formas de Onda na Fonte CC (Tensão e Corrente com Janela Measure):"
            : (plotData.is_trifasico
                ? "A.2 Formas de Onda na Fonte CA (Tensão e Corrente de Fase A com Janela Measure):"
                : "A.2 Formas de Onda na Fonte CA (Tensão e Corrente com Janela Measure):");
        }
      }
    }

    // Filtragem de canais do osciloscópio
    function filtrarCanais(modo, btnElement) {
      canalFiltroAtual = modo;
      const btns = document.querySelectorAll(".btn-ch-filter");
      btns.forEach(b => b.classList.remove("active"));
      if (btnElement) btnElement.classList.add("active");

      if (!ultimoPlotData) return;

      const boxes = {
        vin: document.getElementById("box-chartVin"),
        vlinha: document.getElementById("box-chartVlinha"),
        vo: document.getElementById("box-chartVo"),
        gate: document.getElementById("box-chartGate"),
        vd: document.getElementById("box-chartVD"),
        id1: document.getElementById("box-chartID1"),
        id2: document.getElementById("box-chartID2"),
        id3: document.getElementById("box-chartID3"),
        i: document.getElementById("box-chartI"),
        ig: document.getElementById("box-chartIg")
      };

      const blockMeasureSection = document.getElementById("section-measure");
      const blockMeasureCarga = document.getElementById("block-measure-carga");
      const blockMeasureFonte = document.getElementById("block-measure-fonte");

      if (modo === "todos") {
        boxes.vin.style.display = "block";
        boxes.vlinha.style.display = ultimoPlotData.tem_vlinha ? "block" : "none";
        boxes.vo.style.display = "block";
        boxes.gate.style.display = ultimoPlotData.tem_gate ? "block" : "none";
        boxes.vd.style.display = ultimoPlotData.tem_vd ? "block" : "none";
        boxes.id1.style.display = ultimoPlotData.tem_diodos ? "block" : "none";
        boxes.id2.style.display = ultimoPlotData.tem_d2 ? "block" : "none";
        boxes.id3.style.display = ultimoPlotData.tem_d3 ? "block" : "none";
        boxes.i.style.display = "block";
        boxes.ig.style.display = (ultimoPlotData.tem_ig && (ultimoPlotData.is_onda_completa || ultimoPlotData.topologia === "tri_ponte_completa_r" || ultimoPlotData.topologia === "tri_ponte_controlado_r" || ultimoPlotData.is_inversor)) ? "block" : "none";
        if (blockMeasureSection) blockMeasureSection.style.display = "flex";
        if (blockMeasureCarga) blockMeasureCarga.style.display = "block";
        if (blockMeasureFonte) blockMeasureFonte.style.display = "block";
      } else if (modo === "carga") {
        boxes.vin.style.display = "none";
        boxes.vlinha.style.display = "none";
        boxes.vo.style.display = "block";
        boxes.gate.style.display = "none";
        boxes.vd.style.display = "none";
        boxes.id1.style.display = "none";
        boxes.id2.style.display = "none";
        boxes.id3.style.display = "none";
        boxes.i.style.display = "block";
        boxes.ig.style.display = "none";
        if (blockMeasureSection) blockMeasureSection.style.display = "flex";
        if (blockMeasureCarga) blockMeasureCarga.style.display = "block";
        if (blockMeasureFonte) blockMeasureFonte.style.display = "none";
      } else if (modo === "semicondutores") {
        boxes.vin.style.display = "none";
        boxes.vlinha.style.display = "none";
        boxes.vo.style.display = "none";
        boxes.gate.style.display = ultimoPlotData.tem_gate ? "block" : "none";
        boxes.vd.style.display = ultimoPlotData.tem_vd ? "block" : "none";
        boxes.id1.style.display = ultimoPlotData.tem_diodos ? "block" : "none";
        boxes.id2.style.display = ultimoPlotData.tem_d2 ? "block" : "none";
        boxes.id3.style.display = ultimoPlotData.tem_d3 ? "block" : "none";
        boxes.i.style.display = "none";
        boxes.ig.style.display = "none";
        if (blockMeasureSection) blockMeasureSection.style.display = "none";
      } else if (modo === "fontes") {
        boxes.vin.style.display = "block";
        boxes.vlinha.style.display = ultimoPlotData.tem_vlinha ? "block" : "none";
        boxes.vo.style.display = "none";
        boxes.gate.style.display = "none";
        boxes.vd.style.display = "none";
        boxes.id1.style.display = "none";
        boxes.id2.style.display = "none";
        boxes.id3.style.display = "none";
        boxes.i.style.display = "none";
        boxes.ig.style.display = (ultimoPlotData.tem_ig && (ultimoPlotData.is_onda_completa || ultimoPlotData.topologia === "tri_ponte_completa_r" || ultimoPlotData.topologia === "tri_ponte_controlado_r" || ultimoPlotData.is_inversor)) ? "block" : "none";
        if (blockMeasureSection) blockMeasureSection.style.display = "flex";
        if (blockMeasureCarga) blockMeasureCarga.style.display = "none";
        if (blockMeasureFonte) blockMeasureFonte.style.display = "block";
      }
    }

    // Exportação dos dados simulados em formato CSV
    function exportarCSV() {
      if (!ultimoPlotData || !ultimoPlotData.t || ultimoPlotData.t.length === 0) return;

      const p = ultimoPlotData;
      let headers = ["tempo_ms"];
      if (p.is_trifasico) {
        headers.push("va_V", "vb_V", "vc_V");
        if (p.tem_vlinha) headers.push("vab_V", "vbc_V", "vca_V");
      } else {
        headers.push("vin_V");
      }
      headers.push("vo_V");
      if (p.tem_gate) headers.push("gate_V");
      if (p.tem_vd) headers.push("vD_V");
      if (p.tem_diodos) headers.push("iD1_A");
      if (p.tem_d2) headers.push("iD2_A");
      if (p.tem_d3) headers.push("iD3_A");
      headers.push("io_A");
      if (p.tem_ig) headers.push("ig_A");

      const rows = [headers.join(",")];
      for (let i = 0; i < p.t.length; i++) {
        const row = [p.t[i].toFixed(3)];
        if (p.is_trifasico) {
          row.push(p.v_a[i].toFixed(2), p.v_b[i].toFixed(2), p.v_c[i].toFixed(2));
          if (p.tem_vlinha) row.push(p.v_ab[i].toFixed(2), p.v_bc[i].toFixed(2), p.v_ca[i].toFixed(2));
        } else {
          row.push(p.v_in[i].toFixed(2));
        }
        row.push(p.v_out[i].toFixed(2));
        if (p.tem_gate) row.push(p.gate[i].toFixed(2));
        if (p.tem_vd) row.push(p.v_d[i].toFixed(2));
        if (p.tem_diodos) row.push(p.i_d1[i].toFixed(2));
        if (p.tem_d2) row.push(p.i_d2[i].toFixed(2));
        if (p.tem_d3) row.push(p.i_d3[i].toFixed(2));
        row.push(p.i_out[i].toFixed(2));
        if (p.tem_ig) row.push(p.i_fonte[i].toFixed(2));
        rows.push(row.join(","));
      }

      const csvContent = rows.join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `dados_temporais_${p.topologia}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // Exportação em alta definição de todos os oscilogramas em imagem PNG
    function salvarOsciloscopioPNG() {
      if (!ultimoPlotData) return;

      const boxesConfig = [
        { id: "box-chartVin", title: ultimoPlotData.is_trifasico ? "Tensões de Fase va(t), vb(t), vc(t)" : (ultimoPlotData.topologia === "mono_onda_completa_tap_r" ? "Tensão nos Enrolamentos Secundários v1(t), v2(t)" : "Tensão de Entrada vi(t)") },
        { id: "box-chartVlinha", title: "Tensões de Linha vab(t), vbc(t), vca(t)" },
        { id: "box-chartVo", title: "Tensão Retificada na Carga vo(t)" },
        { id: "box-chartGate", title: ultimoPlotData.topologia === "tri_meia_onda_controlado_r" ? "Pulsos de Gate G1, G2, G3" : "Pulsos de Gate / Disparo G(t)" },
        { id: "box-chartVD", title: "Tensão Reversa / Bloqueio no Semicondutor vD(t) / vT(t)" },
        { id: "box-chartID1", title: "Corrente no Semicondutor Principal iD1(t) / iT1(t)" },
        { id: "box-chartID2", title: "Corrente no Semicondutor Secundário iD2(t) / iT2(t) / Roda Livre" },
        { id: "box-chartID3", title: "Corrente no Semicondutor Fase C iD3(t) / iT3(t)" },
        { id: "box-chartI", title: "Corrente na Carga io(t)" },
        { id: "box-chartIg", title: ultimoPlotData.is_trifasico ? "Corrente na Fonte CA ia(t)" : "Corrente na Fonte CA ig(t)" },
        { id: "box-chartMeasureCarga", title: "Formas de Onda na Carga: V_Carga e I_Carga" },
        { id: "box-chartMeasureFonte", title: ultimoPlotData.is_inversor ? "Formas de Onda na Fonte CC: V_Fonte e I_Fonte" : "Formas de Onda na Fonte: V_Fonte e I_Fonte" }
      ];

      const visibleItems = [];
      boxesConfig.forEach(b => {
        const el = document.getElementById(b.id);
        if (el && el.style.display !== "none" && window.getComputedStyle(el).display !== "none") {
          const cvs = el.querySelector("canvas");
          if (cvs && cvs.width > 0 && cvs.height > 0) {
            visibleItems.push({ canvas: cvs, title: b.title });
          }
        }
      });

      if (visibleItems.length === 0) return;

      const canvasWidth = 1200;
      const headerHeight = 110;
      const footerHeight = 45;
      const plotSpacing = 16;
      const singlePlotHeight = 220;

      const totalHeight = headerHeight + (visibleItems.length * (singlePlotHeight + plotSpacing)) + footerHeight;

      const masterCanvas = document.createElement("canvas");
      masterCanvas.width = canvasWidth;
      masterCanvas.height = totalHeight;
      const ctx = masterCanvas.getContext("2d");

      // Fundo Escuro Global de Instrumentação
      ctx.fillStyle = "#0a0d12";
      ctx.fillRect(0, 0, canvasWidth, totalHeight);

      // Caixa de Cabeçalho
      ctx.fillStyle = "#161b22";
      ctx.fillRect(0, 0, canvasWidth, headerHeight - 10);
      ctx.strokeStyle = "#30363d";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, 0, canvasWidth, headerHeight - 10);

      // Título e Subtítulo
      ctx.fillStyle = "#58a6ff";
      ctx.font = "bold 20px 'Segoe UI', Arial, sans-serif";
      ctx.fillText("LABORATÓRIO VIRTUAL DE ELETRÔNICA DE POTÊNCIA • OSCILOGRAMA MULTICANAL", 24, 38);

      ctx.fillStyle = "#f0f6fc";
      ctx.font = "600 15px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(ultimoPlotData.title || "Formas de Onda Temporais", 24, 64);

      ctx.fillStyle = "#8b949e";
      ctx.font = "12px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(ultimoPlotData.caption || "", 24, 86);

      // Badge de Status do Osciloscópio
      const timeInfo = `2 Ciclos • 360 Amostras • Canais: ${visibleItems.length}`;
      ctx.fillStyle = "#21262d";
      ctx.fillRect(canvasWidth - 340, 24, 316, 28);
      ctx.strokeStyle = "#30363d";
      ctx.strokeRect(canvasWidth - 340, 24, 316, 28);

      ctx.fillStyle = "#3fb950";
      ctx.beginPath();
      ctx.arc(canvasWidth - 325, 38, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "#c9d1d9";
      ctx.font = "bold 11px monospace";
      ctx.fillText(timeInfo, canvasWidth - 310, 42);

      // Desenha cada subplot
      let currentY = headerHeight;
      visibleItems.forEach((item, index) => {
        // Moldura do Canal
        ctx.fillStyle = "#0d1117";
        ctx.fillRect(20, currentY, canvasWidth - 40, singlePlotHeight);
        ctx.strokeStyle = "#21262d";
        ctx.lineWidth = 1;
        ctx.strokeRect(20, currentY, canvasWidth - 40, singlePlotHeight);

        // Barra de Título do Canal
        ctx.fillStyle = "#161b22";
        ctx.fillRect(20, currentY, canvasWidth - 40, 26);
        ctx.strokeStyle = "#30363d";
        ctx.strokeRect(20, currentY, canvasWidth - 40, 26);

        ctx.fillStyle = "#e6edf3";
        ctx.font = "bold 12px 'Segoe UI', Arial, sans-serif";
        ctx.fillText(`CH${index + 1}: ${item.title}`, 32, currentY + 18);

        // Desenha o gráfico do canvas renderizado
        ctx.drawImage(item.canvas, 24, currentY + 30, canvasWidth - 48, singlePlotHeight - 34);

        currentY += singlePlotHeight + plotSpacing;
      });

      // Rodapé
      ctx.fillStyle = "#8b949e";
      ctx.font = "11px 'Segoe UI', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Calculadora de Eletrônica de Potência • Desenvolvido por Aderson da Cruz Carvalho • Simulação Numérica de Alta Precisão", canvasWidth / 2, totalHeight - 18);
      ctx.textAlign = "start";

      // Download da imagem
      const link = document.createElement("a");
      link.download = `oscilograma_${ultimoPlotData.topologia || 'circuito'}_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = masterCanvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

export {
  criarSubplot,
  criarSubplotMulti,
  criarSubplotCombinado,
  atualizarGrafico,
  filtrarCanais,
  exportarCSV,
  salvarOsciloscopioPNG,
  calcularMedicoesPSIM,
  renderizarTabelasMeasure,
  toggleFormatoMeasure
};