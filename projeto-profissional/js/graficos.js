// ============================================================================
// MÃ“DULO DE FORMAS DE ONDA E INSTRUMENTAÃ‡ÃƒO VIRTUAL (graficos.js)
// Gerencia a renderizaÃ§Ã£o em Chart.js, filtros multicanal e exportaÃ§Ã£o
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

    // Plugin 1: Traça linha em y = 0
    const zeroLinePlugin = {
      id: 'zeroLinePlugin',
      afterDraw(chart) {
        const { ctx, chartArea, scales: { y } } = chart;
        if (!chartArea || !y) return;
        const yZero = y.getPixelForValue(0);
        if (yZero >= chartArea.top && yZero <= chartArea.bottom) {
          ctx.save();
          ctx.strokeStyle = '#383e47';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(chartArea.left, yZero);
          ctx.lineTo(chartArea.right, yZero);
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    // Plugin 2: Desenha moldura em torno de cada gráfico (estilo Matplotlib/Dark Theme)
    const boxBorderPlugin = {
      id: 'boxBorderPlugin',
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        ctx.save();
        ctx.strokeStyle = '#30363d';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        ctx.restore();
      }
    };

    function criarSubplot(canvasId, datasetLabel, dataValues, yTitle, showXAxis, plotData, lineColor) {
      const ctx = document.getElementById(canvasId).getContext("2d");
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: plotData.t.map(v => v.toFixed(2)),
          datasets: [{
            label: datasetLabel,
            data: dataValues,
            borderColor: lineColor || '#58a6ff',
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
                color: '#f0f6fc',
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
                color: '#21262d',
                lineWidth: 1,
                drawTicks: showXAxis
              },
              ticks: {
                display: showXAxis,
                color: '#8b949e',
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: showXAxis,
                text: 'Tempo (ms)',
                color: '#c9d1d9',
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              grid: {
                color: '#21262d',
                lineWidth: 1
              },
              ticks: {
                color: '#8b949e',
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: yTitle,
                color: '#c9d1d9',
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
      const ctx = document.getElementById(canvasId).getContext("2d");
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
                color: '#f0f6fc',
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
                color: '#21262d',
                lineWidth: 1,
                drawTicks: showXAxis
              },
              ticks: {
                display: showXAxis,
                color: '#8b949e',
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: showXAxis,
                text: 'Tempo (ms)',
                color: '#c9d1d9',
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              grid: {
                color: '#21262d',
                lineWidth: 1
              },
              ticks: {
                color: '#8b949e',
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: yTitle,
                color: '#c9d1d9',
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
      const ctx = document.getElementById(canvasId).getContext("2d");
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: plotData.t.map(v => v.toFixed(2)),
          datasets: [
            {
              label: 'vo(t) - Tensão na carga [V]',
              data: plotData.v_out,
              borderColor: '#58a6ff',
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
                color: '#f0f6fc',
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
                color: '#21262d',
                lineWidth: 1,
                drawTicks: true
              },
              ticks: {
                display: true,
                color: '#8b949e',
                maxTicksLimit: 9,
                callback: function(val, idx) {
                  return Math.round(plotData.t[idx]);
                }
              },
              title: {
                display: true,
                text: 'Tempo (ms)',
                color: '#c9d1d9',
                font: { size: 13, weight: '600' }
              },
              border: { display: false }
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                color: '#21262d',
                lineWidth: 1
              },
              ticks: {
                color: '#58a6ff',
                maxTicksLimit: 5,
                font: { size: 11 }
              },
              title: {
                display: true,
                text: 'Tensão vo(t) [V]',
                color: '#58a6ff',
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
        if (plotData.is_trifasico) {
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
          chartGateInst = criarSubplot("chartGate", "G(t) - Pulso de Disparo / Gate (V)", plotData.gate, "Gate G(t) (V)", false, plotData, "#2ea043");
        }
      } else {
        boxGate.style.display = "none";
      }

      const boxVD = document.getElementById("box-chartVD");
      if (plotData.tem_vd) {
        boxVD.style.display = "block";
        let labelVD = "vD(t) - Tensão no Diodo Principal (V)";
        let titleVD = "Tensão vD (V)";
        if (plotData.is_controlado) {
          labelVD = "vT(t) - Tensão no Tiristor Principal (V)";
          titleVD = "Tensão vT (V)";
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
        if (plotData.is_controlado) {
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
        if (plotData.is_controlado) {
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
      if (plotData.tem_ig && (plotData.is_onda_completa || plotData.topologia === "tri_ponte_completa_r" || plotData.topologia === "tri_ponte_controlado_r")) {
        boxIg.style.display = "block";
        const labelIg = plotData.is_trifasico ? "ia(t) - Corrente Fase A Fonte CA (A)" : "ig(t) - Corrente Fonte CA (A)";
        chartIgInst = criarSubplot("chartIg", labelIg, plotData.i_fonte, "Corrente CA (A)", false, plotData, "#db61a2");
      } else {
        boxIg.style.display = "none";
      }

      chartBothInst = criarSubplotCombinado("chartBoth", plotData);
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
        ig: document.getElementById("box-chartIg"),
        both: document.getElementById("box-chartBoth")
      };

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
        boxes.ig.style.display = (ultimoPlotData.tem_ig && (ultimoPlotData.is_onda_completa || ultimoPlotData.topologia === "tri_ponte_completa_r" || ultimoPlotData.topologia === "tri_ponte_controlado_r")) ? "block" : "none";
        boxes.both.style.display = "block";
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
        boxes.both.style.display = "block";
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
        boxes.both.style.display = "none";
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
        boxes.ig.style.display = (ultimoPlotData.tem_ig && (ultimoPlotData.is_onda_completa || ultimoPlotData.topologia === "tri_ponte_completa_r" || ultimoPlotData.topologia === "tri_ponte_controlado_r")) ? "block" : "none";
        boxes.both.style.display = "none";
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
        { id: "box-chartBoth", title: "Formas de Onda Sobrepostas (Escala Dupla: vo e io)" }
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


// Compatibilidade Universal (DOM + MÃ³dulos)
if (typeof window !== "undefined") {
  window.atualizarGrafico = atualizarGrafico;
  window.filtrarCanais = filtrarCanais;
  window.exportarCSV = exportarCSV;
  window.salvarOsciloscopioPNG = salvarOsciloscopioPNG;
}

export {
  atualizarGrafico,
  filtrarCanais,
  exportarCSV,
  salvarOsciloscopioPNG
};