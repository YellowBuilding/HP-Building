import React, { useState } from "react";
import { Flame, Wind, TrendingDown } from "lucide-react";

const GAS_KWH_PER_M3 = 9.7;
const HR_EFFICIENCY = 0.97;
const GAS_CO2_PER_M3 = 1.788;
const ELEC_CO2_PER_KWH = 0.27;

const HEAT_DEMAND = {
  "A++": 35, "A": 50, "B": 75, "C": 100, "D": 140, "E": 170, "F": 200, "G": 230,
};
const SCOP_BY_LABEL = {
  "A++": 4.5, "A": 4.2, "B": 3.8, "C": 3.3, "D": 2.8, "E": 2.7, "F": 2.4, "G": 2.3,
};

const fmt = (n, d = 0) => new Intl.NumberFormat("nl-NL", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
const fmtEur = (n) => "EUR " + fmt(Math.round(n));

export default function HPBuildingSalesTool() {
  const [gasPrice, setGasPrice] = useState(1.12);
  const [elecPrice, setElecPrice] = useState(0.135);
  const [label, setLabel] = useState("C");
  const [floorArea, setFloorArea] = useState(1000);

  const scop = SCOP_BY_LABEL[label];
  const heatDemand = HEAT_DEMAND[label];
  const eurKwhGas = gasPrice / (GAS_KWH_PER_M3 * HR_EFFICIENCY);
  const eurKwhHP = elecPrice / scop;
  const eurDelta = ((eurKwhGas - eurKwhHP) / eurKwhGas) * 100;
  const annualHeat = floorArea * heatDemand;
  const gasConsumption = annualHeat / (GAS_KWH_PER_M3 * HR_EFFICIENCY);
  const elecConsumption = annualHeat / scop;
  const gasOpex = gasConsumption * gasPrice;
  const hpOpex = elecConsumption * elecPrice;
  const savings = ga
$dest = "C:\Users\demia\Documents\DDeveloper\HP_Building\src\App.jsx"
Set-Content -Path $dest -Encoding UTF8 -Value @'
import React, { useState } from "react";
import { Flame, Wind, TrendingDown } from "lucide-react";

const GAS_KWH_PER_M3 = 9.7;
const HR_EFFICIENCY = 0.97;
const GAS_CO2_PER_M3 = 1.788;
const ELEC_CO2_PER_KWH = 0.27;

const HEAT_DEMAND = {
  "A++": 35, "A": 50, "B": 75, "C": 100, "D": 140, "E": 170, "F": 200, "G": 230,
};
const SCOP_BY_LABEL = {
  "A++": 4.5, "A": 4.2, "B": 3.8, "C": 3.3, "D": 2.8, "E": 2.7, "F": 2.4, "G": 2.3,
};

const fmt = (n, d = 0) => new Intl.NumberFormat("nl-NL", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
const fmtEur = (n) => "EUR " + fmt(Math.round(n));

export default function HPBuildingSalesTool() {
  const [gasPrice, setGasPrice] = useState(1.12);
  const [elecPrice, setElecPrice] = useState(0.135);
  const [label, setLabel] = useState("C");
  const [floorArea, setFloorArea] = useState(1000);

  const scop = SCOP_BY_LABEL[label];
  const heatDemand = HEAT_DEMAND[label];
  const eurKwhGas = gasPrice / (GAS_KWH_PER_M3 * HR_EFFICIENCY);
  const eurKwhHP = elecPrice / scop;
  const eurDelta = ((eurKwhGas - eurKwhHP) / eurKwhGas) * 100;
  const annualHeat = floorArea * heatDemand;
  const gasConsumption = annualHeat / (GAS_KWH_PER_M3 * HR_EFFICIENCY);
  const elecConsumption = annualHeat / scop;
  const gasOpex = gasConsumption * gasPrice;
  const hpOpex = elecConsumption * elecPrice;
  const savings = gasOpex - hpOpex;
  const savingsPct = (savings / gasOpex) * 100;
  const gasCO2 = gasConsumption * GAS_CO2_PER_M3;
  const hpCO2 = elecConsumption * ELEC_CO2_PER_KWH;
  const co2Savings = gasCO2 - hpCO2;

  return (
    React.createElement(React.Fragment, null,
      React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        :root {
          --bg: #F5F2EB; --bg-card: #FFFFFF; --ink: #0E1A14; --ink-soft: #4A5550;
          --rule: #D9D4C7; --green-deep: #0F3D2E; --green: #1F7A4D;
          --green-pale: #B7E0C3; --gas: #B6411A; --gas-soft: #E89A7D;
        }
        .gg-root { background: var(--bg); color: var(--ink); font-family: 'IBM Plex Sans', sans-serif; }
        .gg-display { font-family: 'Fraunces', serif; letter-spacing: -0.02em; }
        .gg-label { font-family: 'Bricolage Grotesque', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .gg-mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        .gg-card { background: var(--bg-card); border: 1px solid var(--rule); }
        .gg-input { background: transparent; border: none; border-bottom: 2px solid var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 500; color: var(--ink); padding: 0.25rem 0; outline: none; width: 100%; }
        .gg-input:focus { border-color: var(--green); }
        .gg-input[type="range"] { -webkit-appearance: none; appearance: none; height: 4px; background: var(--rule); border: none; padding: 0; cursor: pointer; }
        .gg-input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--green-deep); border-radius: 50%; cursor: pointer; }
        .gg-input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: var(--green-deep); border-radius: 50%; cursor: pointer; border: none; }
        .gg-label-btn { padding: 0.5rem 0.75rem; border: 1px solid var(--rule); background: transparent; font-family: 'JetBrains Mono', monospace; font-weight: 500; cursor: pointer; color: var(--ink-soft); }
        .gg-label-btn.active { background: var(--green-deep); color: white; border-color: var(--green-deep); }
        .section-label { font-family: 'Bricolage Grotesque', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; font-size: 14px; color: var(--ink-soft); margin-bottom: 1rem; display: block; }
      `),
      React.createElement("div", { className: "gg-root min-h-screen p-8 md:p-12" },
        React.createElement("div", { className: "max-w-6xl mx-auto" },

          React.createElement("header", { className: "mb-12 pb-8", style: { borderBottom: "1px solid var(--rule)" } },
            React.createElement("h1", { className: "gg-display text-5xl md:text-6xl font-semibold leading-tight" },
              "Warmtepomp ", React.createElement("em", { style: { color: "var(--green)" } }, "vs."), " Gasketel"
            ),
            React.createElement("p", { className: "mt-4 text-base leading-7 max-w-2xl", style: { color: "var(--ink-soft)" } },
              "De business case van het draaien van een warmtepomp versus gasketel."
            )
          ),

          React.createElement("section", { className: "mb-12" },
            React.createElement("span", { className: "section-label" }, "01 \u00b7 Het verschil in \u00e9\u00e9n plaatje"),
            React.createElement("div", { className: "p-8 md:p-12", style: { background: "#0E1A14" } },
              React.createElement(SideBySideDiagram, null),
              React.createElement("div", { className: "mt-8 pt-6", style: { borderTop: "1px solid #2A3530" } },
                React.createElement("p", { className: "text-base leading-7 max-w-3xl", style: { color: "#C9D1CD" } },
                  React.createElement("strong", { style: { color: "white" } }, "Beide systemen leveren dezelfde warmte."),
                  " Bij de warmtepomp betaal je alleen voor de dunne donkergroene strook \u2014 groene elektriciteit. De rest komt gratis uit de omgeving. Daarom: 3-4\u00d7 zo effici\u00ebnt op de energierekening."
                )
              )
            )
          ),

          React.createElement("section", { className: "mb-12", style: { marginTop: "4rem" } },
            React.createElement("span", { className: "section-label" }, "02 \u00b7 Dashboard \u2014 kosten per kWh warmte"),
            React.createElement("div", { className: "gg-card p-8 md:p-12" },
              React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 mb-10" },
                React.createElement(InputField, { label: "Gasprijs (all-in)", unit: "EUR/m3", value: gasPrice, min: 0.5, max: 3, step: 0.01, onChange: setGasPrice, hint: "Inclusief energiebelasting, ODE, netbeheer" }),
                React.createElement(InputField, { label: "Elektraprijs (all-in)", unit: "EUR/kWh", value: elecPrice, min: 0.05, max: 0.6, step: 0.005, onChange: setElecPrice, hint: "Zakelijk grootverbruik inclusief belastingen" }),
                React.createElement("div", null,
                  React.createElement("div", { className: "gg-label text-xs mb-3", style: { color: "var(--ink-soft)" } }, "Energielabel gebouw"),
                  React.createElement("div", { className: "flex flex-wrap gap-1 mb-3" },
                    Object.keys(HEAT_DEMAND).map(l =>
                      React.createElement("button", { key: l, onClick: () => setLabel(l), className: "gg-label-btn " + (label === l ? "active" : "") }, l)
                    )
                  ),
                  React.createElement("div", { className: "text-xs gg-mono", style: { color: "var(--ink-soft)" } }, "SCOP " + fmt(scop, 1) + " - " + heatDemand + " kWh/m2/jr")
                )
              ),
              React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                React.createElement(OutputBar, { title: "Gasketel", value: eurKwhGas, unit: "EUR / kWh warmte", color: "var(--gas)", bgColor: "var(--gas-soft)", formula: fmt(gasPrice, 2) + " / (9,7 x 0,97)" }),
                React.createElement(OutputBar, { title: "Warmtepomp", value: eurKwhHP, unit: "EUR / kWh warmte", color: "var(--green-deep)", bgColor: "var(--green-pale)", formula: fmt(elecPrice, 2) + " / SCOP " + fmt(scop, 1) })
              ),
              React.createElement("div", { className: "mt-6 p-6 flex items-center gap-4", style: { background: eurDelta > 0 ? "var(--green-deep)" : "var(--gas)", color: "white" } },
                React.createElement("div", null,
                  React.createElement("div", { className: "gg-label text-xs opacity-80" }, "Verschil per kWh warmte"),
                  React.createElement("div", { className: "gg-display text-3xl font-semibold" },
                    eurDelta > 0 ? fmt(eurDelta, 0) + "% goedkoper" : fmt(Math.abs(eurDelta), 0) + "% duurder",
                    React.createElement("span", { className: "text-base font-normal opacity-80 ml-2" }, "met warmtepomp")
                  )
                )
              )
            )
          ),

          React.createElement("section", { className: "mb-12", style: { marginTop: "4rem" } },
            React.createElement("span", { className: "section-label" }, "03 \u00b7 Jaaropex per gebouw \u2014 kantoor"),
            React.createElement("div", { className: "gg-card p-8 md:p-12" },
              React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 mb-12" },
                React.createElement("div", { className: "md:col-span-1" },
                  React.createElement(InputField, { label: "Vloeroppervlak", unit: "m2", value: floorArea, min: 200, max: 3000, step: 50, onChange: setFloorArea, hint: "Verwarmd vloeroppervlak (BVO)" }),
                  React.createElement("div", { className: "mt-6 p-4", style: { background: "var(--bg)", border: "1px solid var(--rule)" } },
                    React.createElement("div", { className: "gg-label text-xs mb-3", style: { color: "var(--ink-soft)" } }, "Aannames"),
                    React.createElement("div", { className: "text-sm gg-mono" },
                      React.createElement("div", null, "Label: ", React.createElement("strong", null, label)),
                      React.createElement("div", null, "Warmtevraag: ", React.createElement("strong", null, heatDemand + " kWh/m2/jr")),
                      React.createElement("div", null, "Jaarvraag: ", React.createElement("strong", null, fmt(annualHeat / 1000, 1) + " MWh"))
                    )
                  )
                ),
                React.createElement("div", { className: "md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4" },
                  React.createElement(ResultCard, { title: "Gasketel", primaryLabel: "Jaaropex", primaryValue: fmtEur(gasOpex), rows: [["Gasverbruik", fmt(gasConsumption) + " m3"], ["CO2-uitstoot", fmt(gasCO2 / 1000, 1) + " ton"]], color: "var(--gas)" }),
                  React.createElement(ResultCard, { title: "Warmtepomp", primaryLabel: "Jaaropex", primaryValue: fmtEur(hpOpex), rows: [["Elektraverbruik", fmt(elecConsumption) + " kWh"], ["CO2-uitstoot", fmt(hpCO2 / 1000, 1) + " ton"]], color: "var(--green-deep)" })
                )
              ),
              React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-0", style: { borderTop: "1px solid var(--rule)" } },
                React.createElement(SavingsCell, { label: "Besparing per jaar", value: fmtEur(savings), sub: fmt(savingsPct, 0) + "% lagere energierekening", positive: savings > 0 }),
                React.createElement(SavingsCell, { label: "CO2-reductie per jaar", value: fmt(co2Savings / 1000, 1) + " ton", sub: fmt((co2Savings / gasCO2) * 100, 0) + "% minder uitstoot", positive: co2Savings > 0 }),
                React.createElement(SavingsCell, { label: "10-jaars cumulatief", value: fmtEur(savings * 10), sub: "excl. inflatie en prijsstijging gas", positive: savings > 0 })
              )
            ),
            React.createElement("p", { className: "mt-4 text-xs leading-relaxed", style: { color: "var(--ink-soft)" } },
              React.createElement("strong", null, "Calibratie:"), " warmtevraag-kentallen zijn indicatief voor kantoor in NL."
            )
          ),

          React.createElement("footer", { className: "pt-6 text-xs", style: { borderTop: "1px solid var(--rule)", color: "var(--ink-soft)", marginTop: "4rem" } },
            React.createElement("div", { className: "flex flex-wrap justify-between gap-4" },
              React.createElement("span", null, "HP_Building - Interne tool - Cijfers indicatief"),
              React.createElement("span", { className: "gg-mono" }, "v1.2 - 2026")
            )
          )
        )
      )
    )
  );
}

function SideBySideDiagram() {
  const Y0=30,H=180,LOSS_H=22,Y_SPLIT=52,Y1=210,MID_W=120;
  const GAS_CX=112,HP_CX=602;
  return React.createElement("svg", { viewBox: "0 0 960 400", style: { width: "100%", height: "auto" } },
    React.createElement("text", { x: "215", y: "18", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "18", fontWeight: "700", fill: "#AAAAAA", letterSpacing: "0.10em" }, "GASKETEL"),
    React.createElement("text", { x: "705", y: "18", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "18", fontWeight: "700", fill: "#8FD8A1", letterSpacing: "0.10em" }, "WARMTEPOMP"),
    React.createElement("rect", { x: "15", y: "30", width: "195", height: "180", fill: "#888888" }),
    React.createElement("text", { x: String(GAS_CX), y: "127", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "20", fontWeight: "500", fill: "white" }, "Gas"),
    React.createElement("path", { d: "M 210 30 L 395 30 L 403 41 L 395 52 L 210 52 Z", fill: "#E84545" }),
    React.createElement("text", { x: "302", y: "46", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "13", fontWeight: "500", fill: "white" }, "Verlies"),
    React.createElement("path", { d: "M 210 52 L 395 52 L 415 120 L 395 210 L 210 210 Z", fill: "#2DBA5C" }),
    React.createElement("text", { x: "302", y: "134", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "20", fontWeight: "500", fill: "white" }, "Warmte"),
    React.createElement("rect", { x: "505", y: "30", width: "195", height: "120", fill: "#8FD8A1" }),
    React.createElement("text", { x: String(HP_CX), y: "82", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "16", fontWeight: "500", fill: "#0E1A14" }, "Omgevings-"),
    React.createElement("text", { x: String(HP_CX), y: "102", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "16", fontWeight: "500", fill: "#0E1A14" }, "warmte"),
    React.createElement("rect", { x: "505", y: "150", width: "195", height: "60", fill: "#2E8055" }),
    React.createElement("text", { x: String(HP_CX), y: "173", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "15", fontWeight: "500", fill: "white" }, "Groene"),
    React.createElement("text", { x: String(HP_CX), y: "191", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "15", fontWeight: "500", fill: "white" }, "elektriciteit"),
    React.createElement("path", { d: "M 700 30 L 885 30 L 893 41 L 885 52 L 700 52 Z", fill: "#E84545" }),
    React.createElement("text", { x: "792", y: "46", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "13", fontWeight: "500", fill: "white" }, "Verlies"),
    React.createElement("path", { d: "M 700 52 L 885 52 L 905 120 L 885 210 L 700 210 Z", fill: "#2DBA5C" }),
    React.createElement("text", { x: "792", y: "134", textAnchor: "middle", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "20", fontWeight: "500", fill: "white" }, "Warmte"),
    React.createElement("text", { x: "215", y: "275", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "72", fontWeight: "700", fill: "#E84545" }, "85-95%"),
    React.createElement("text", { x: "215", y: "345", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "28", fontWeight: "700", fill: "#E84545" }, "EFFICIENTIE"),
    React.createElement("text", { x: "705", y: "275", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "72", fontWeight: "700", fill: "#2DBA5C" }, "280-450%"),
    React.createElement("text", { x: "705", y: "345", textAnchor: "middle", fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "28", fontWeight: "700", fill: "#2DBA5C" }, "EFFICIENTIE")
  );
}

function InputField({ label, unit, value, min, max, step, onChange, hint }) {
  return React.createElement("div", null,
    React.createElement("div", { className: "gg-label text-xs mb-3", style: { color: "var(--ink-soft)" } }, label),
    React.createElement("div", { className: "flex items-baseline gap-2" },
      React.createElement("input", { type: "number", className: "gg-input", value: value, min: min, max: max, step: step, onChange: (e) => onChange(parseFloat(e.target.value) || 0), style: { maxWidth: 140 } }),
      React.createElement("span", { className: "text-sm gg-mono", style: { color: "var(--ink-soft)" } }, unit)
    ),
    React.createElement("input", { type: "range", className: "gg-input mt-4", value: value, min: min, max: max, step: step, onChange: (e) => onChange(parseFloat(e.target.value)) }),
    hint && React.createElement("div", { className: "text-xs mt-4", style: { color: "var(--ink-soft)" } }, hint)
  );
}

function OutputBar({ title, value, unit, color, bgColor, formula }) {
  return React.createElement("div", { className: "p-6", style: { background: bgColor, borderLeft: "4px solid " + color } },
    React.createElement("div", { className: "gg-label text-xs mb-3", style: { color: color } }, title),
    React.createElement("div", { className: "gg-display text-5xl font-semibold leading-none", style: { color: "var(--ink)" } }, "EUR " + fmt(value, 3)),
    React.createElement("div", { className: "text-sm mt-1", style: { color: "var(--ink-soft)" } }, unit),
    React.createElement("div", { className: "text-xs gg-mono mt-4 pt-3", style: { color: "var(--ink-soft)" } }, "= " + formula)
  );
}

function ResultCard({ title, primaryLabel, primaryValue, rows, color }) {
  return React.createElement("div", { className: "p-6", style: { background: "var(--bg)", borderLeft: "4px solid " + color } },
    React.createElement("div", { className: "gg-label text-xs mb-1", style: { color: color } }, title),
    React.createElement("div", { className: "gg-label text-xs mb-1", style: { color: "var(--ink-soft)" } }, primaryLabel),
    React.createElement("div", { className: "gg-display text-4xl font-semibold leading-none mb-4", style: { color: "var(--ink)" } }, primaryValue),
    React.createElement("div", { className: "space-y-1.5 pt-3", style: { borderTop: "1px solid var(--rule)" } },
      rows.map(([k, v]) => React.createElement("div", { key: k, className: "flex justify-between text-sm" },
        React.createElement("span", { style: { color: "var(--ink-soft)" } }, k),
        React.createElement("span", { className: "gg-mono font-medium" }, v)
      ))
    )
  );
}

function SavingsCell({ label, value, sub, positive }) {
  return React.createElement("div", { className: "p-6", style: { borderRight: "1px solid var(--rule)" } },
    React.createElement("div", { className: "gg-label text-xs mb-3", style: { color: "var(--ink-soft)" } }, label),
    React.createElement("div", { className: "gg-display text-3xl font-semibold leading-tight", style: { color: positive ? "var(--green-deep)" : "var(--gas)" } }, value),
    React.createElement("div", { className: "text-xs mt-1", style: { color: "var(--ink-soft)" } }, sub)
  );
}
