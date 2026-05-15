import React, { useState } from "react";
import { Flame, Wind, TrendingDown } from "lucide-react";

const GAS_KWH_PER_M3 = 9.7;
const HR_EFFICIENCY = 0.97;
const GAS_CO2_PER_M3 = 1.788;
const ELEC_CO2_PER_KWH = 0.27;
const HEAT_DEMAND = { "A++":35,"A":50,"B":75,"C":100,"D":140,"E":170,"F":200,"G":230 };
const SCOP_BY_LABEL = { "A++":4.5,"A":4.2,"B":3.8,"C":3.3,"D":2.8,"E":2.7,"F":2.4,"G":2.3 };
const fmt = (n,d=0) => new Intl.NumberFormat("nl-NL",{maximumFractionDigits:d,minimumFractionDigits:d}).format(n);
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

  return React.createElement(React.Fragment, null,
    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
      :root { --bg:#F5F2EB;--bg-card:#fff;--ink:#0E1A14;--ink-soft:#4A5550;--rule:#D9D4C7;--green-deep:#0F3D2E;--green:#1F7A4D;--green-pale:#B7E0C3;--gas:#B6411A;--gas-soft:#E89A7D; }
      .gg-root { background:var(--bg);color:var(--ink);font-family:'IBM Plex Sans',sans-serif; }
      .gg-display { font-family:'Fraunces',serif;letter-spacing:-0.02em; }
      .gg-label { font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.08em;font-weight:600; }
      .gg-mono { font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums; }
      .gg-card { background:var(--bg-card);border:1px solid var(--rule); }
      .gg-input { background:transparent;border:none;border-bottom:2px solid var(--ink);font-family:'JetBrains Mono',monospace;font-size:1.5rem;font-weight:500;color:var(--ink);padding:0.25rem 0;outline:none;width:100%; }
      .gg-input:focus { border-color:var(--green); }
      .gg-input[type="range"] { -webkit-appearance:none;appearance:none;height:4px;background:var(--rule);border:none;padding:0;cursor:pointer; }
      .gg-input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none;width:18px;height:18px;background:var(--green-deep);border-radius:50%;cursor:pointer; }
      .gg-input[type="range"]::-moz-range-thumb { width:18px;height:18px;background:var(--green-deep);border-radius:50%;cursor:pointer;border:none; }
      .gg-label-btn { padding:0.5rem 0.75rem;border:1px solid var(--rule);background:transparent;font-family:'JetBrains Mono',monospace;font-weight:500;cursor:pointer;color:var(--ink-soft); }
      .gg-label-btn.active { background:var(--green-deep);color:white;border-color:var(--green-deep); }
      .section-label { font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;font-size:14px;color:var(--ink-soft);margin-bottom:1rem;display:block; }
    `),
    React.createElement("div", { className:"gg-root min-h-screen p-8 md:p-12" },
      React.createElement("div", { className:"max-w-6xl mx-auto" },

        React.createElement("header", { className:"mb-10 pb-8", style:{borderBottom:"1px solid var(--rule)"} },
          React.createElement("h1", { className:"gg-display text-5xl md:text-6xl font-semibold leading-tight" },
            "Warmtepomp ", React.createElement("em", { style:{color:"var(--green)"} }, "vs."), " Gasketel"
          ),
          React.createElement("p", { className:"mt-3 text-base leading-7 max-w-2xl", style:{color:"var(--ink-soft)"} },
            "De business case van het draaien van een warmtepomp versus gasketel."
          )
        ),

        React.createElement("section", { className:"mb-10" },
          React.createElement("span", { className:"section-label" }, "01 - Het verschil in een plaatje"),
          React.createElement("div", { style:{background:"#0B1F14", borderRadius:"4px", overflow:"hidden"} },
            React.createElement(SideBySideDiagram, null)
          )
        ),

        React.createElement("section", { className:"mb-10", style:{marginTop:"3rem"} },
          React.createElement("span", { className:"section-label" }, "02 - Dashboard kosten per kWh warmte"),
          React.createElement("div", { className:"gg-card p-8 md:p-10" },
            React.createElement("div", { className:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" },
              React.createElement(InputField, { label:"Gasprijs (all-in)", unit:"EUR/m3", value:gasPrice, min:0.5, max:3, step:0.01, onChange:setGasPrice, hint:"Inclusief energiebelasting, ODE, netbeheer" }),
              React.createElement(InputField, { label:"Elektraprijs (all-in)", unit:"EUR/kWh", value:elecPrice, min:0.05, max:0.6, step:0.005, onChange:setElecPrice, hint:"Zakelijk grootverbruik inclusief belastingen" }),
              React.createElement("div", null,
                React.createElement("div", { className:"gg-label text-xs mb-3", style:{color:"var(--ink-soft)"} }, "Energielabel gebouw"),
                React.createElement("div", { className:"flex flex-wrap gap-1 mb-3" },
                  Object.keys(HEAT_DEMAND).map(l =>
                    React.createElement("button", { key:l, onClick:()=>setLabel(l), className:"gg-label-btn "+(label===l?"active":"") }, l)
                  )
                ),
                React.createElement("div", { className:"text-xs gg-mono", style:{color:"var(--ink-soft)"} }, "SCOP "+fmt(scop,1)+" - "+heatDemand+" kWh/m2/jr")
              )
            ),
            React.createElement("div", { className:"grid grid-cols-1 md:grid-cols-2 gap-6" },
              React.createElement(OutputBar, { title:"Gasketel", value:eurKwhGas, unit:"EUR / kWh warmte", color:"var(--gas)", bgColor:"var(--gas-soft)", formula:fmt(gasPrice,2)+" / (9,7 x 0,97)" }),
              React.createElement(OutputBar, { title:"Warmtepomp", value:eurKwhHP, unit:"EUR / kWh warmte", color:"var(--green-deep)", bgColor:"var(--green-pale)", formula:fmt(elecPrice,2)+" / SCOP "+fmt(scop,1) })
            ),
            React.createElement("div", { className:"mt-6 p-5 flex items-center gap-4", style:{background:eurDelta>0?"var(--green-deep)":"var(--gas)",color:"white"} },
              React.createElement("div", null,
                React.createElement("div", { className:"gg-label text-xs opacity-80" }, "Verschil per kWh warmte"),
                React.createElement("div", { className:"gg-display text-3xl font-semibold" },
                  eurDelta>0 ? fmt(eurDelta,0)+"% goedkoper" : fmt(Math.abs(eurDelta),0)+"% duurder",
                  React.createElement("span", { className:"text-base font-normal opacity-80 ml-2" }, "met warmtepomp")
                )
              )
            )
          )
        ),

        React.createElement("section", { className:"mb-10", style:{marginTop:"3rem"} },
          React.createElement("span", { className:"section-label" }, "03 - Jaaropex per gebouw kantoor"),
          React.createElement("div", { className:"gg-card p-8 md:p-10" },
            React.createElement("div", { className:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" },
              React.createElement("div", { className:"md:col-span-1" },
                React.createElement(InputField, { label:"Vloeroppervlak", unit:"m2", value:floorArea, min:200, max:3000, step:50, onChange:setFloorArea, hint:"Verwarmd vloeroppervlak (BVO)" }),
                React.createElement("div", { className:"mt-6 p-4", style:{background:"var(--bg)",border:"1px solid var(--rule)"} },
                  React.createElement("div", { className:"gg-label text-xs mb-3", style:{color:"var(--ink-soft)"} }, "Aannames"),
                  React.createElement("div", { className:"text-sm gg-mono" },
                    React.createElement("div", null, "Label: ", React.createElement("strong", null, label)),
                    React.createElement("div", null, "Warmtevraag: ", React.createElement("strong", null, heatDemand+" kWh/m2/jr")),
                    React.createElement("div", null, "Jaarvraag: ", React.createElement("strong", null, fmt(annualHeat/1000,1)+" MWh"))
                  )
                )
              ),
              React.createElement("div", { className:"md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4" },
                React.createElement(ResultCard, { title:"Gasketel", primaryLabel:"Jaaropex", primaryValue:fmtEur(gasOpex), rows:[["Gasverbruik",fmt(gasConsumption)+" m3"],["CO2-uitstoot",fmt(gasCO2/1000,1)+" ton"]], color:"var(--gas)" }),
                React.createElement(ResultCard, { title:"Warmtepomp", primaryLabel:"Jaaropex", primaryValue:fmtEur(hpOpex), rows:[["Elektraverbruik",fmt(elecConsumption)+" kWh"],["CO2-uitstoot",fmt(hpCO2/1000,1)+" ton"]], color:"var(--green-deep)" })
              )
            ),
            React.createElement("div", { className:"grid grid-cols-1 md:grid-cols-3 gap-0", style:{borderTop:"1px solid var(--rule)"} },
              React.createElement(SavingsCell, { label:"Besparing per jaar", value:fmtEur(savings), sub:fmt(savingsPct,0)+"% lagere energierekening", positive:savings>0 }),
              React.createElement(SavingsCell, { label:"CO2-reductie per jaar", value:fmt(co2Savings/1000,1)+" ton", sub:fmt((co2Savings/gasCO2)*100,0)+"% minder uitstoot", positive:co2Savings>0 }),
              React.createElement(SavingsCell, { label:"10-jaars cumulatief", value:fmtEur(savings*10), sub:"excl. inflatie en prijsstijging gas", positive:savings>0 })
            )
          ),
          React.createElement("p", { className:"mt-4 text-xs leading-relaxed", style:{color:"var(--ink-soft)"} },
            React.createElement("strong", null, "Calibratie:"), " warmtevraag-kentallen zijn indicatief voor kantoor in NL."
          )
        ),

        React.createElement("footer", { className:"pt-6 text-xs", style:{borderTop:"1px solid var(--rule)",color:"var(--ink-soft)",marginTop:"3rem"} },
          React.createElement("div", { className:"flex flex-wrap justify-between gap-4" },
            React.createElement("span", null, "HP_Building - Interne tool - Cijfers indicatief"),
            React.createElement("span", { className:"gg-mono" }, "v1.2 - 2026")
          )
        )
      )
    )
  );
}

function SideBySideDiagram() {
  return React.createElement("svg", { width:"100%", viewBox:"0 0 680 400", role:"img" },
    React.createElement("rect", { x:"0", y:"0", width:"680", height:"400", fill:"#0B1F14" }),
    React.createElement("text", { x:"170", y:"32", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"11", fontWeight:"700", fill:"#6B7D74", letterSpacing:"0.18em" }, "GASKETEL"),
    React.createElement("text", { x:"510", y:"32", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"11", fontWeight:"700", fill:"#4DB87A", letterSpacing:"0.18em" }, "WARMTEPOMP"),
    React.createElement("line", { x1:"340", y1:"14", x2:"340", y2:"390", stroke:"#1E3526", strokeWidth:"1" }),
    React.createElement("rect", { x:"24", y:"46", width:"148", height:"174", rx:"4", fill:"#4A4A4A" }),
    React.createElement("text", { x:"98", y:"136", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"18", fontWeight:"600", fill:"white" }, "Gas"),
    React.createElement("path", { d:"M 172 46 L 286 46 L 294 64 L 286 82 L 172 82 Z", fill:"#C23535" }),
    React.createElement("text", { x:"228", y:"68", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"11", fontWeight:"600", fill:"white", letterSpacing:"0.05em" }, "VERLIES"),
    React.createElement("path", { d:"M 172 82 L 286 82 L 304 133 L 286 220 L 172 220 Z", fill:"#1DAF56" }),
    React.createElement("text", { x:"228", y:"156", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"18", fontWeight:"600", fill:"white" }, "Warmte"),
    React.createElement("line", { x1:"36", y1:"244", x2:"300", y2:"244", stroke:"#1E3526", strokeWidth:"0.5" }),
    React.createElement("text", { x:"170", y:"292", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"52", fontWeight:"700", fill:"#C23535" }, "90%"),
    React.createElement("text", { x:"170", y:"318", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"11", fontWeight:"600", fill:"#7A3535", letterSpacing:"0.16em" }, "EFFICIENTIE"),
    React.createElement("text", { x:"170", y:"358", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"11", fill:"#4A6055" }, "Per kWh gas 0,9 kWh warmte"),
    React.createElement("rect", { x:"362", y:"46", width:"148", height:"116", rx:"4", fill:"#5BBF88" }),
    React.createElement("text", { x:"436", y:"97", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"14", fontWeight:"500", fill:"#0A2A1A" }, "Omgevings-"),
    React.createElement("text", { x:"436", y:"116", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"14", fontWeight:"500", fill:"#0A2A1A" }, "warmte"),
    React.createElement("rect", { x:"362", y:"162", width:"148", height:"58", rx:"4", fill:"#1A7A45" }),
    React.createElement("text", { x:"436", y:"186", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"12", fontWeight:"600", fill:"#A8E8C0" }, "Groene"),
    React.createElement("text", { x:"436", y:"204", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"12", fontWeight:"600", fill:"#A8E8C0" }, "elektriciteit"),
    React.createElement("path", { d:"M 510 46 L 624 46 L 632 64 L 624 82 L 510 82 Z", fill:"#C23535" }),
    React.createElement("text", { x:"566", y:"68", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"11", fontWeight:"600", fill:"white", letterSpacing:"0.05em" }, "VERLIES"),
    React.createElement("path", { d:"M 510 82 L 624 82 L 644 133 L 624 220 L 510 220 Z", fill:"#1DAF56" }),
    React.createElement("text", { x:"566", y:"156", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"18", fontWeight:"600", fill:"white" }, "Warmte"),
    React.createElement("line", { x1:"362", y1:"244", x2:"655", y2:"244", stroke:"#1E3526", strokeWidth:"0.5" }),
    React.createElement("text", { x:"510", y:"292", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"52", fontWeight:"700", fill:"#1DAF56" }, "300-450%"),
    React.createElement("text", { x:"510", y:"318", textAnchor:"middle", fontFamily:"Bricolage Grotesque, sans-serif", fontSize:"11", fontWeight:"600", fill:"#1A6B3A", letterSpacing:"0.16em" }, "EFFICIENTIE"),
    React.createElement("text", { x:"510", y:"358", textAnchor:"middle", fontFamily:"IBM Plex Sans, sans-serif", fontSize:"11", fill:"#3A7055" }, "Per kWh stroom 3-4,5 kWh warmte")
  );
}

function InputField({ label, unit, value, min, max, step, onChange, hint }) {
  return React.createElement("div", null,
    React.createElement("div", { className:"gg-label text-xs mb-3", style:{color:"var(--ink-soft)"} }, label),
    React.createElement("div", { className:"flex items-baseline gap-2" },
      React.createElement("input", { type:"number", className:"gg-input", value:value, min:min, max:max, step:step, onChange:(e)=>onChange(parseFloat(e.target.value)||0), style:{maxWidth:140} }),
      React.createElement("span", { className:"text-sm gg-mono", style:{color:"var(--ink-soft)"} }, unit)
    ),
    React.createElement("input", { type:"range", className:"gg-input mt-4", value:value, min:min, max:max, step:step, onChange:(e)=>onChange(parseFloat(e.target.value)) }),
    hint && React.createElement("div", { className:"text-xs mt-4", style:{color:"var(--ink-soft)"} }, hint)
  );
}

function OutputBar({ title, value, unit, color, bgColor, formula }) {
  return React.createElement("div", { className:"p-6", style:{background:bgColor, borderLeft:"4px solid "+color} },
    React.createElement("div", { className:"gg-label text-xs mb-3", style:{color:color} }, title),
    React.createElement("div", { className:"gg-display text-5xl font-semibold leading-none", style:{color:"var(--ink)"} }, "EUR "+fmt(value,3)),
    React.createElement("div", { className:"text-sm mt-1", style:{color:"var(--ink-soft)"} }, unit),
    React.createElement("div", { className:"text-xs gg-mono mt-4 pt-3", style:{color:"var(--ink-soft)"} }, "= "+formula)
  );
}

function ResultCard({ title, primaryLabel, primaryValue, rows, color }) {
  return React.createElement("div", { className:"p-6", style:{background:"var(--bg)", borderLeft:"4px solid "+color} },
    React.createElement("div", { className:"gg-label text-xs mb-1", style:{color:color} }, title),
    React.createElement("div", { className:"gg-label text-xs mb-1", style:{color:"var(--ink-soft)"} }, primaryLabel),
    React.createElement("div", { className:"gg-display text-4xl font-semibold leading-none mb-4", style:{color:"var(--ink)"} }, primaryValue),
    React.createElement("div", { className:"space-y-1.5 pt-3", style:{borderTop:"1px solid var(--rule)"} },
      rows.map(([k,v]) => React.createElement("div", { key:k, className:"flex justify-between text-sm" },
        React.createElement("span", { style:{color:"var(--ink-soft)"} }, k),
        React.createElement("span", { className:"gg-mono font-medium" }, v)
      ))
    )
  );
}

function SavingsCell({ label, value, sub, positive }) {
  return React.createElement("div", { className:"p-6", style:{borderRight:"1px solid var(--rule)"} },
    React.createElement("div", { className:"gg-label text-xs mb-3", style:{color:"var(--ink-soft)"} }, label),
    React.createElement("div", { className:"gg-display text-3xl font-semibold leading-tight", style:{color:positive?"var(--green-deep)":"var(--gas)"} }, value),
    React.createElement("div", { className:"text-xs mt-1", style:{color:"var(--ink-soft)"} }, sub)
  );
}
