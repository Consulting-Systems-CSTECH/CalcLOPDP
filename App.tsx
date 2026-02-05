
import React, { useState, useMemo } from 'react';
import { Calculator, Scale, ShieldCheck, AlertCircle, FileText, Download, CheckCircle2, ChevronRight, Info, RotateCcw, ExternalLink } from 'lucide-react';
import { CalculatorState, Category } from './types';
import { SCORING_RULES, DIRECT_QUALIFICATIONS } from './constants';

const LOGO_URL = "https://consulting-systems.tech/wp-content/uploads/2018/09/cropped-CS_LogoNEW-1-300x89.png";

const App: React.FC = () => {
  const initialState: CalculatorState = {
    titulares: 0,
    volumen: 0,
    datos: 0,
    frecuencia: 0,
    permanencia: 0,
    geografia: 0,
    directQualifications: new Set(),
  };

  const [state, setState] = useState<CalculatorState>(initialState);
  const [activeTab, setActiveTab] = useState<'direct' | 'points'>('direct');

  const totalPoints = useMemo(() => {
    return state.titulares + state.volumen + state.datos + state.frecuencia + state.permanencia + state.geografia;
  }, [state]);

  const isLargeScaleByPoints = totalPoints >= 6;
  const isLargeScaleByDirect = state.directQualifications.size > 0;
  const isLargeScale = isLargeScaleByPoints || isLargeScaleByDirect;

  const toggleDirectQualification = (id: string) => {
    const next = new Set(state.directQualifications);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setState(prev => ({ ...prev, directQualifications: next }));
  };

  const setPoints = (category: Category, points: number) => {
    setState(prev => ({ ...prev, [category]: points }));
  };

  const handleReset = () => {
    setState(initialState);
  };

  const handlePrint = () => {
    window.print();
  };

  const getCategoryTitle = (key: string) => {
    switch(key) {
      case 'titulares': return 'Número de Titulares';
      case 'volumen': return 'Volumen de Datos';
      case 'datos': return 'Categorías de Datos';
      case 'frecuencia': return 'Frecuencia del Tratamiento';
      case 'permanencia': return 'Permanencia';
      case 'geografia': return 'Alcance Geográfico';
      default: return key;
    }
  };

  return (
    <div className="min-h-screen pb-40 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a 
            href="https://www.consulting-systems.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 group transition-transform hover:scale-[1.02]"
          >
            <div className="h-12 w-auto flex items-center">
               <img src={LOGO_URL} alt="Consulting Systems Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden md:block border-l border-slate-200 pl-4">
              <h1 className="text-lg font-black text-slate-800 leading-none">Calculadora LOPDP</h1>
              <p className="text-indigo-600 text-[10px] uppercase tracking-widest font-black mt-1">Ecuador · Gran Escala</p>
            </div>
          </a>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Reiniciar"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all text-xs font-bold shadow-lg active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>EXPORTAR REPORTE</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Info Card */}
        <div className="bg-indigo-600 p-6 mb-8 rounded-3xl shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-10 -translate-y-10">
             <Scale className="w-40 h-40" />
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Criterio Técnico LOPDP</h2>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
              Determine si el tratamiento de datos personales en su organización califica como <strong>"a gran escala"</strong> según los parámetros de la Resolución SPDP-SPD-2026-0005-R.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'direct' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            1. RIESGO DIRECTO
            {state.directQualifications.size > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{state.directQualifications.size}</span>}
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'points' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            2. MODELO DE PUNTOS
            {totalPoints > 0 && <span className="bg-indigo-600 text-white text-[10px] px-1.5 rounded-full">{totalPoints.toFixed(1)}</span>}
          </button>
        </div>

        {activeTab === 'direct' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {DIRECT_QUALIFICATIONS.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleDirectQualification(item.id)}
                className={`group p-5 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${
                  state.directQualifications.has(item.id)
                  ? 'border-red-500 bg-red-50 shadow-inner'
                  : 'border-white bg-white hover:border-indigo-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`shrink-0 mt-1 ${state.directQualifications.has(item.id) ? 'text-red-600' : 'text-slate-200 group-hover:text-indigo-300'}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${state.directQualifications.has(item.id) ? 'text-red-900' : 'text-slate-800'}`}>{item.label}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {Object.entries(SCORING_RULES).map(([key, options]) => (
              <div key={key} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    <h3 className="font-black text-slate-800 text-sm tracking-wide uppercase">{getCategoryTitle(key)}</h3>
                  </div>
                  {state[key as Category] > 0 && (
                    <span className="text-[10px] font-black text-white bg-indigo-600 px-2 py-1 rounded-lg">
                      +{state[key as Category]} PTS
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setPoints(key as Category, opt.points)}
                      className={`text-center p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        state[key as Category] === opt.points
                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-50'
                        : 'border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-200'
                      }`}
                    >
                      <span className={`text-[11px] font-bold leading-tight ${state[key as Category] === opt.points ? 'text-indigo-900' : 'text-slate-500'}`}>
                        {opt.label}
                      </span>
                      <div className={`h-1 w-6 rounded-full ${state[key as Category] === opt.points ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Result Area */}
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 print:hidden">
          <div className={`max-w-4xl mx-auto rounded-[2rem] shadow-2xl border-b-8 overflow-hidden bg-white ${
            isLargeScale ? 'border-red-500' : 'border-emerald-500'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
              <div className="flex items-center gap-6">
                <div className={`p-5 rounded-[1.5rem] shadow-xl ${isLargeScale ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                  {isLargeScale ? <AlertCircle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">
                    {isLargeScale ? 'GRAN ESCALA' : 'BAJO IMPACTO'}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Calculator className="w-4 h-4" /> {totalPoints.toFixed(1)} Puntos Totales
                    </span>
                    {isLargeScaleByDirect && (
                      <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded font-black">CRITERIO DE RIESGO</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                 <a 
                   href="https://www.consulting-systems.tech" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-2xl text-xs font-bold transition-all"
                 >
                   Más Info <ExternalLink className="w-3 h-3" />
                 </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pb-10 text-center border-t border-slate-200 pt-10 print:hidden">
          <p className="text-slate-400 text-xs mb-4">Desarrollado para fines de cumplimiento normativo por</p>
          <a href="https://www.consulting-systems.tech" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
            <img src={LOGO_URL} alt="Consulting Systems" className="h-10 mx-auto opacity-60 grayscale hover:grayscale-0 transition-all" />
          </a>
        </footer>
      </main>

      {/* PRINT VIEW ONLY */}
      <div className="hidden print:block max-w-4xl mx-auto px-12 py-10 bg-white">
        <div className="flex items-center justify-between border-b-4 border-slate-900 pb-8 mb-10">
          <div>
            <img src={LOGO_URL} alt="Logo" className="h-16 mb-4" />
            <h1 className="text-2xl font-black uppercase italic">Reporte de Calificación LOPDP</h1>
            <p className="text-slate-500 font-mono">https://www.consulting-systems.tech</p>
          </div>
          <div className="text-right">
             <div className="text-4xl font-black mb-2">{totalPoints.toFixed(1)} <span className="text-sm">PTS</span></div>
             <div className={`text-lg font-bold px-4 py-1 rounded ${isLargeScale ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                {isLargeScale ? 'A GRAN ESCALA' : 'BAJO IMPACTO'}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm mb-12">
          {Object.entries(SCORING_RULES).map(([key, _]) => (
            <div key={key} className="flex justify-between items-end border-b pb-2">
              <span className="font-bold text-slate-500 uppercase text-xs">{getCategoryTitle(key)}</span>
              <span className="font-mono font-bold">{state[key as Category]} pts</span>
            </div>
          ))}
        </div>

        {state.directQualifications.size > 0 && (
          <div className="bg-slate-100 p-6 rounded-2xl mb-12 border-l-8 border-red-500">
             <h3 className="text-sm font-black mb-4 uppercase">Criterios de Riesgo Directo Detectados:</h3>
             <ul className="space-y-2">
                {Array.from(state.directQualifications).map(id => (
                  <li key={id} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    {DIRECT_QUALIFICATIONS.find(q => q.id === id)?.label}
                  </li>
                ))}
             </ul>
          </div>
        )}

        <div className="mt-20 border-t pt-8">
          <p className="text-[10px] text-slate-400 italic text-center leading-relaxed">
            Este reporte es una herramienta técnica de apoyo basada en la Resolución SPDP-SPD-2026-0005-R. 
            Su validez legal final dependerá de la auditoría interna del Responsable de Tratamiento. 
            © 2025 Consulting Systems. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
