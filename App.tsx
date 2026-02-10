import { useState } from "react";

export function App() {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [activeCalc, setActiveCalc] = useState<string>("voltage");

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    switch (activeCalc) {
      case "voltage":
        if (!isNaN(i) && !isNaN(r) && i > 0 && r > 0) {
          const newVoltage = (i * r).toFixed(2);
          setVoltage(newVoltage);
          const newPower = (i * i * r).toFixed(2);
          setPower(newPower);
        }
        break;
      case "current":
        if (!isNaN(v) && !isNaN(r) && v > 0 && r > 0) {
          const newCurrent = (v / r).toFixed(4);
          setCurrent(newCurrent);
          const newPower = (v * v / r).toFixed(2);
          setPower(newPower);
        }
        break;
      case "resistance":
        if (!isNaN(v) && !isNaN(i) && v > 0 && i > 0) {
          const newResistance = (v / i).toFixed(2);
          setResistance(newResistance);
          const newPower = (v * i).toFixed(2);
          setPower(newPower);
        }
        break;
      case "power":
        if (!isNaN(v) && !isNaN(i) && v > 0 && i > 0) {
          const newPower = (v * i).toFixed(2);
          setPower(newPower);
          if (activeCalc === "power" && !isNaN(parseFloat(resistance))) {
            const newResistance = (v / i).toFixed(2);
            setResistance(newResistance);
          }
        }
        break;
    }
  };

  const clear = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">⚡ Ley de Ohm</h1>
          <p className="text-purple-200 text-lg">Calculadora eléctrica: V = I × R</p>
        </header>

        {/* Ohm's Law Triangle */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Triángulo de la Ley de Ohm</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-56">
              <svg viewBox="0 0 200 160" className="w-full h-full">
                <polygon points="100,10 190,150 10,150" fill="none" stroke="#8b5cf6" strokeWidth="4" />
                <line x1="100" y1="10" x2="100" y2="150" stroke="#8b5cf6" strokeWidth="2" />
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">V</text>
                <text x="50" y="120" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">I</text>
                <text x="150" y="120" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">R</text>
                <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14">×</text>
                <text x="140" y="85" textAnchor="middle" fill="white" fontSize="14">=</text>
                <text x="100" y="170" textAnchor="middle" fill="white" fontSize="12">V = I × R</text>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <p className="text-purple-200">Fórmula fundamental: <span className="font-mono text-white">V (Voltaje) = I (Corriente) × R (Resistencia)</span></p>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Calculadora</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Voltage */}
            <div className="bg-white/5 rounded-xl p-4">
              <label className="block text-purple-200 mb-2 font-medium">Voltaje (V)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="Ingrese voltaje"
                className="w-full px-4 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Current */}
            <div className="bg-white/5 rounded-xl p-4">
              <label className="block text-purple-200 mb-2 font-medium">Corriente (A)</label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Ingrese corriente"
                className="w-full px-4 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Resistance */}
            <div className="bg-white/5 rounded-xl p-4">
              <label className="block text-purple-200 mb-2 font-medium">Resistencia (Ω)</label>
              <input
                type="number"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                placeholder="Ingrese resistencia"
                className="w-full px-4 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Power */}
            <div className="bg-white/5 rounded-xl p-4">
              <label className="block text-purple-200 mb-2 font-medium">Potencia (W)</label>
              <input
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="Ingrese potencia"
                className="w-full px-4 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-purple-200 font-medium">Calcular:</span>
            <button
              onClick={() => setActiveCalc("voltage")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeCalc === "voltage" ? "bg-purple-600 text-white" : "bg-white/10 text-purple-200 hover:bg-white/20"}`}
            >
              Voltaje
            </button>
            <button
              onClick={() => setActiveCalc("current")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeCalc === "current" ? "bg-purple-600 text-white" : "bg-white/10 text-purple-200 hover:bg-white/20"}`}
            >
              Corriente
            </button>
            <button
              onClick={() => setActiveCalc("resistance")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeCalc === "resistance" ? "bg-purple-600 text-white" : "bg-white/10 text-purple-200 hover:bg-white/20"}`}
            >
              Resistencia
            </button>
            <button
              onClick={() => setActiveCalc("power")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeCalc === "power" ? "bg-purple-600 text-white" : "bg-white/10 text-purple-200 hover:bg-white/20"}`}
            >
              Potencia
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              Calcular
            </button>
            <button
              onClick={clear}
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Formulas */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Formulas Útiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold mb-2">Voltaje</h3>
              <p className="text-purple-200">V = I × R</p>
              <p className="text-purple-300 text-sm mt-1">V = √(P × R)</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔋</div>
              <h3 className="text-white font-bold mb-2">Corriente</h3>
              <p className="text-purple-200">I = V / R</p>
              <p className="text-purple-300 text-sm mt-1">I = P / V</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔌</div>
              <h3 className="text-white font-bold mb-2">Resistencia</h3>
              <p className="text-purple-200">R = V / I</p>
              <p className="text-purple-300 text-sm mt-1">R = V² / P</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="text-white font-bold mb-2">Potencia</h3>
              <p className="text-purple-200">P = V × I</p>
              <p className="text-purple-300 text-sm mt-1">P = I² × R</p>
            </div>
          </div>
        </div>

        {/* Units */}
        <div className="mt-8 text-center">
          <p className="text-purple-300 text-sm">
            <span className="font-medium">Unidades:</span> V = Voltios (V) | I = Amperios (A) | R = Ohmios (Ω) | P = Vatios (W)
          </p>
        </div>
      </div>
    </div>
  );
}
