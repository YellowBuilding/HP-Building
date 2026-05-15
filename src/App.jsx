import React, { useState } from 'react';
import { Flame, Wind, TrendingDown } from 'lucide-react';

const GAS_KWH_PER_M3 = 9.7;
const HR_EFFICIENCY = 0.97;
const GAS_CO2_PER_M3 = 1.788;
const ELEC_CO2_PER_KWH = 0.27;

const HEAT_DEMAND = {
  'A++': 35, 'A': 50, 'B': 75, 'C': 100, 'D': 140, 'E': 170, 'F': 200, 'G': 230,
};

const SCOP_BY_LABEL = {
  'A++': 4.5, 'A': 4.2, 'B': 3.8, 'C': 3.3, 'D': 2.8, 'E': 2.7, 'F': 2.4, 'G': 2.3,
};

const fmt = (n, d = 0) => new Intl.NumberFormat('nl-NL', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
const fmtEur = (n) => '€ ' + fmt(Math.round(n));

export default function HPBuildingSalesTool() {
  const [gasPrice, setGasPrice] = useState(1.12);
  const [elecPrice, setElecPrice] = useState(0.135);
  const [label, setLabel] = useState('C');
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        :root {
          --bg: #F5F2EB; --bg-card: #FFFFFF; --ink: #0E1A14; --ink-soft: #4A5550;
          --rule: #D9D4C7; --green-deep: #0F3D2E; --green: #1F7A4D;
          --green-pale: #B7E0C3; --gas: #B6411A; --gas-soft: #E89A7D; --accent: #C2410C;
        }
        .gg-root { background: var(--bg); color: var(--ink); font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        .gg-display { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.02em; }
        .gg-label { font-family: 'Bricolage Grotesque', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .gg-mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        .gg-card { background: var(--bg-card); border: 1px solid var(--rule); }
        .gg-input { background: transparent; border: none; border-bottom: 2px solid var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 500; color: var(--ink); padding: 0.25rem 0; outline: none; width: 100%; }
        .gg-input:focus { border-color: var(--green); }
        .gg-input[type="range"] { -webkit-appearance: none; appearance: none; height: 4px; background: var(--rule); border: none; padding: 0; cursor: pointer; }
        .gg-input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: var(--green-deep); border-radius: 50%; cursor: pointer; }
        .gg-input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; background: var(--green-deep); border-radius: 50%; cursor: pointer; border: none; }
        .gg-label-btn { padding: 0.5rem 0.75rem; border: 1px solid var(--rule); background: transparent; font-family: 'JetBrains Mono', monospace; font-weight: 500; cursor: pointer; transition: all 0.15s ease; color: var(--ink-soft); }
        .gg-label-btn:hover { border-color: var(--ink); }
        .gg-label-btn.active { background: var(--green-deep); color: white; border-color: var(--green-deep); }
        .section-label { font-family: 'Bricolage Grotesque', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; font-size: 14px; color: var(--ink-soft); margin-bottom: 1rem; display: block; }
      `}</style>

      <div className="gg-root min-h-screen p-8 md:p-12">
        <div className="max-w-6xl mx-auto">

          <header className="mb-12 pb-8" style={{ borderBottom: '1px solid var(--rule)' }}>
            <h1 className="gg-display text-5xl md:text-6xl font-semibold leading-tight">
              Warmtepomp <em style={{ color: 'var(--green)' }}>vs.</em> Gasketel
            </h1>
            <p className="mt-4 text-base leading-7 max-w-2xl" style={{ color: 'var(--ink-soft)' }}>
              De business case van het draaien van een warmtepomp versus gasketel.
            </p>
          </header>

          <section className="mb-12">
            <span className="section-label">01 · Het verschil in één plaatje</span>
            <div className="p-8 md:p-12" style={{ background: '#0E1A14' }}>
              <SideBySideDiagram />
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #2A3530' }}>
                <p className="text-base leading-7 max-w-3xl" style={{ color: '#C9D1CD' }}>
                  <strong style={{ color: 'white' }}>Beide systemen leveren dezelfde warmte.</strong> Bij de warmtepomp betaal je alleen voor de dunne donkergroene strook — groene elektriciteit. De rest komt gratis uit de omgeving. Daarom: 3-4× zo efficiënt op de energierekening.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12" style={{ marginTop: '4rem' }}>
            <span className="section-label">02 · Dashboard — kosten per kWh warmte</span>
            <div className="gg-card p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                <InputField label="Gasprijs (all-in)" unit="€/m³" value={gasPrice} min={0.5} max={3} step={0.01} onChange={setGasPrice} hint="Inclusief energiebelasting, ODE, netbeheer" />
                <InputField label="Elektraprijs (all-in)" unit="€/kWh" value={elecPrice} min={0.05} max={0.6} step={0.005} onChange={setElecPrice} hint="Zakelijk grootverbruik inclusief belastingen" />
                <div>
                  <div className="gg-label text-xs mb-3" style={{ color: 'var(--ink-soft)' }}>Energielabel gebouw</div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {Object.keys(HEAT_DEMAND).map(l => (
                      <button key={l} onClick={() => setLabel(l)} className={`gg-label-btn ${label === l ? 'active' : ''}`}>{l}</button>
                    ))}
                  </div>
                  <div className="text-xs gg-mono" style={{ color: 'var(--ink-soft)' }}>SCOP {fmt(scop, 1)} · {heatDemand} kWh/m²/jr</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OutputBar title="Gasketel" icon={<Flame size={20} />} value={eurKwhGas} unit="€ / kWh warmte" color="var(--gas)" bgColor="var(--gas-soft)" formula={`${fmt(gasPrice, 2)} / (9,7 × 0,97)`} />
                <OutputBar title="Warmtepomp" icon={<Wind size={20} />} value={eurKwhHP} unit="€ / kWh warmte" color="var(--green-deep)" bgColor="var(--green-pale)" formula={`${fmt(elecPrice, 2)} / SCOP ${fmt(scop, 1)}`} />
              </div>
              <div className="mt-6 p-6 flex items-center gap-4" style={{ background: eurDelta > 0 ? 'var(--green-deep)' : 'var(--gas)', color: 'white' }}>
                <TrendingDown size={24} />
                <div>
                  <div className="gg-label text-xs opacity-80">Verschil per kWh warmte</div>
                  <div className="gg-display text-3xl font-semibold">
                    {eurDelta > 0 ? `${fmt(eurDelta, 0)}% goedkoper` : `${fmt(Math.abs(eurDelta), 0)}% duurder`}
                    <span className="text-base font-normal opacity-80 ml-2">met warmtepomp</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12" style={{ marginTop: '4rem' }}>
            <span className="section-label">03 · Jaaropex per gebouw — kantoor</span>
            <div className="gg-card p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                <div className="md:col-span-1">
                  <InputField label="Vloeroppervlak" unit="m²" value={floorArea} min={200} max={3000} step={50} onChange={setFloorArea} hint="Verwarmd vloeroppervlak (BVO)" />
                  <div className="mt-6 p-4" style={{ background: 'var(--bg)', border: '1px solid var(--rule)' }}>
                    <div className="gg-label text-xs mb-3" style={{ color: 'var(--ink-soft)' }}>Aannames uit dashboard</div>
                    <div className="text-sm gg-mono space-y-1">
                      <div>Label: <strong>{label}</strong></div>
                      <div>Warmtevraag: <strong>{heatDemand} kWh/m²/jr</strong></div>
                      <div>Jaarvraag: <strong>{fmt(annualHeat / 1000, 1)} MWh</strong></div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultCard title="Gasketel" icon={<Flame size={18} />} primaryLabel="Jaaropex" primaryValue={fmtEur(gasOpex)} rows={[['Gasverbruik', `${fmt(gasConsumption)} m³`], ['CO₂-uitstoot', `${fmt(gasCO2 / 1000, 1)} ton`]]} color="var(--gas)" />
                  <ResultCard title="Warmtepomp" icon={<Wind size={18} />} primaryLabel="Jaaropex" primaryValue={fmtEur(hpOpex)} rows={[['Elektraverbruik', `${fmt(elecConsumption)} kWh`], ['CO₂-uitstoot', `${fmt(hpCO2 / 1000, 1)} ton`]]} color="var(--green-deep)" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
                <SavingsCell label="Besparing per jaar" value={fmtEur(savings)} sub={`${fmt(savingsPct, 0)}% lagere energierekening`} positive={savings > 0} />
                <SavingsCell label="CO₂-reductie per jaar" value={`${fmt(co2Savings / 1000, 1)} ton`} sub={`${fmt((co2Savings / gasCO2) * 100, 0)}% minder uitstoot`} positive={co2Savings > 0} />
                <SavingsCell label="10-jaars cumulatief" value={fmtEur(savings * 10)} sub="excl. inflatie en prijsstijging gas" positive={savings > 0} />
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              <strong>Calibratie:</strong> warmtevraag-kentallen zijn indicatief voor kantoor in NL. Werkelijke vraag varieert sterk met gebruik, openingstijden, isolatie en ventilatiestrategie. Voor offerte: altijd een energiescan of meterdata gebruiken.
            </p>
          </section>

          <footer className="pt-6 text-xs" style={{ borderTop: '1px solid var(--rule)', color: 'var(--ink-soft)', marginTop: '4rem' }}>
            <div className="flex flex-wrap justify-between gap-4">
              <span>HP_Building · Interne tool · Cijfers indicatief, altijd valideren met gebouwgegevens.</span>
              <span className="gg-mono">v1.1 · 2026</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}

function SideBySideDiagram() {
  const Y0 = 30, H = 180, LOSS_H = 22;
  const Y_SPLIT = Y0 + LOSS_H, Y1 = Y0 + H, MID_W = Y0 + H / 2;
  const GAS_SQ_X = 15, GAS_SQ_W = 195, GAS_ARROW_X = 210;
  const GAS_ARROW_END = 395, GAS_LOSS_TIP = 403, GAS_WARMTE_TIP = 415;
  const HP_SQ_X = 505, HP_SQ_W = 195, HP_ARROW_X = 700;
  const HP_ARROW_END = 885, HP_LOSS_TIP = 893, HP_WARMTE_TIP = 905;
  const ENV_H = 120, ELEC_H = 60, HP_SPLIT_Y = Y0 + ENV_H;

  return (
    <svg viewBox="0 0 960 360" className="w-full h-auto" style={{ maxHeight: 380 }}>
      <text x="215" y="18" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="18" fontWeight="700" fill="#AAAAAA" letterSpacing="0.10em">GASKETEL</text>
      <text x="705" y="18" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="18" fontWeight="700" fill="#8FD8A1" letterSpacing="0.10em">WARMTEPOMP</text>
      <rect x={GAS_SQ_X} y={Y0} width={GAS_SQ_W} height={H} fill="#888888" />
      <text x={GAS_SQ_X + GAS_SQ_W / 2} y={MID_W + 7} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="20" fontWeight="500" fill="white">Gas</text>
      <path d={`M ${GAS_ARROW_X} ${Y0} L ${GAS_ARROW_END} ${Y0} L ${GAS_LOSS_TIP} ${Y0 + LOSS_H / 2} L ${GAS_ARROW_END} ${Y_SPLIT} L ${GAS_ARROW_X} ${Y_SPLIT} Z`} fill="#E84545" />
      <text x={(GAS_ARROW_X + GAS_ARROW_END) / 2} y={Y0 + LOSS_H / 2 + 5} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fontWeight="500" fill="white">Verlies</text>
      <path d={`M ${GAS_ARROW_X} ${Y_SPLIT} L ${GAS_ARROW_END} ${Y_SPLIT} L ${GAS_WARMTE_TIP} ${MID_W} L ${GAS_ARROW_END} ${Y1} L ${GAS_ARROW_X} ${Y1} Z`} fill="#2DBA5C" />
      <text x={(GAS_ARROW_X + GAS_ARROW_END) / 2} y={MID_W + 7} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="20" fontWeight="500" fill="white">Warmte</text>

      <rect x={HP_SQ_X} y={Y0} width={HP_SQ_W} height={ENV_H} fill="#8FD8A1" />
      <text x={HP_SQ_X + HP_SQ_W / 2} y={Y0 + ENV_H / 2 - 8} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="16" fontWeight="500" fill="#0E1A14">Omgevings-</text>
      <text x={HP_SQ_X + HP_SQ_W / 2} y={Y0 + ENV_H / 2 + 12} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="16" fontWeight="500" fill="#0E1A14">warmte</text>
      <rect x={HP_SQ_X} y={HP_SPLIT_Y} width={HP_SQ_W} height={ELEC_H} fill="#2E8055" />
      <text x={HP_SQ_X + HP_SQ_W / 2} y={HP_SPLIT_Y + ELEC_H / 2 - 7} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="15" fontWeight="500" fill="white">Groene</text>
      <text x={HP_SQ_X + HP_SQ_W / 2} y={HP_SPLIT_Y + ELEC_H / 2 + 11} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="15" fontWeight="500" fill="white">elektriciteit</text>
      <path d={`M ${HP_ARROW_X} ${Y0} L ${HP_ARROW_END} ${Y0} L ${HP_LOSS_TIP} ${Y0 + LOSS_H / 2} L ${HP_ARROW_END} ${Y_SPLIT} L ${HP_ARROW_X} ${Y_SPLIT} Z`} fill="#E84545" />
      <text x={(HP_ARROW_X + HP_ARROW_END) / 2} y={Y0 + LOSS_H / 2 + 5} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fontWeight="500" fill="white">Verlies</text>
      <path d={`M ${HP_ARROW_X} ${Y_SPLIT} L ${HP_ARROW_END} ${Y_SPLIT} L ${HP_WARMTE_TIP} ${MID_W} L ${HP_ARROW_END} ${Y1} L ${HP_ARROW_X} ${Y1} Z`} fill="#2DBA5C" />
      <text x={(HP_ARROW_X + HP_ARROW_END) / 2} y={MID_W + 7} textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="20" fontWeight="500" fill="white">Warmte</text>
      <text x={(GAS_SQ_X + GAS_WARMTE_TIP) / 2} y={Y1 + 48} textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="11" fontWeight="500" fill="#AAAAAA" letterSpacing="0.12em" opacity="0.75">85%–95% EFFICIËNTIE</text>
      <text x={(HP_SQ_X + HP_WARMTE_TIP) / 2} y={Y1 + 48} textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="11" fontWeight="500" fill="#8FD8A1" letterSpacing="0.12em" opacity="0.75">280%–450% EFFICIËNTIE</text>
    </svg>
  );
}

function InputField({ label, unit, value, min, max, step, onChange, hint }) {
  return (
    <div>
      <div className="gg-label text-xs mb-3" style={{ color: 'var(--ink-soft)' }}>{label}</div>
      <div className="flex items-baseline gap-2">
        <input type="number" className="gg-input" value={value} min={min} max={max} step={step} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} style={{ maxWidth: 140 }} />
        <span className="text-sm gg-mono" style={{ color: 'var(--ink-soft)' }}>{unit}</span>
      </div>
      <input type="range" className="gg-input mt-4" value={value} min={min} max={max} step={step} onChange={(e) => onChange(parseFloat(e.target.value))} />
      {hint && <div className="text-xs mt-4" style={{ color: 'var(--ink-soft)' }}>{hint}</div>}
    </div>
  );
}

function OutputBar({ title, icon, value, unit, color, bgColor, formula }) {
  return (
    <div className="p-6" style={{ background: bgColor, borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center gap-2 mb-3" style={{ color }}>{icon}<span className="gg-label text-xs">{title}</span></div>
      <div className="gg-display text-5xl font-semibold leading-none" style={{ color: 'var(--ink)' }}>€ {fmt(value, 3)}</div>
      <div className="text-sm mt-1" style={{ color: 'var(--ink-soft)' }}>{unit}</div>
      <div className="text-xs gg-mono mt-4 pt-3" style={{ color: 'var(--ink-soft)', borderTop: `1px dashed ${color}40` }}>= {formula}</div>
    </div>
  );
}

function ResultCard({ title, icon, primaryLabel, primaryValue, rows, color }) {
  return (
    <div className="p-6" style={{ background: 'var(--bg)', borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center gap-2 mb-3" style={{ color }}>{icon}<span className="gg-label text-xs">{title}</span></div>
      <div className="gg-label text-xs mb-1" style={{ color: 'var(--ink-soft)' }}>{primaryLabel}</div>
      <div className="gg-display text-4xl font-semibold leading-none mb-4" style={{ color: 'var(--ink)' }}>{primaryValue}</div>
      <div className="space-y-1.5 pt-3" style={{ borderTop: '1px solid var(--rule)' }}>
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span style={{ color: 'var(--ink-soft)' }}>{k}</span>
            <span className="gg-mono font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavingsCell({ label, value, sub, positive }) {
  return (
    <div className="p-6" style={{ borderRight: '1px solid var(--rule)' }}>
      <div className="gg-label text-xs mb-3" style={{ color: 'var(--ink-soft)' }}>{label}</div>
      <div className="gg-display text-3xl font-semibold leading-tight" style={{ color: positive ? 'var(--green-deep)' : 'var(--gas)' }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>{sub}</div>
    </div>
  );
}
