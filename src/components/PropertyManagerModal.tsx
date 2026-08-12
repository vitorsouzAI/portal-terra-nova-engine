import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Layers, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Bed, 
  Car, 
  FileCheck, 
  Droplets,
  Upload,
  Plus
} from 'lucide-react';
import { Property, PropertyType } from '../types';

interface PropertyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (newProp: Property) => void;
}

export const PropertyManagerModal: React.FC<PropertyManagerModalProps> = ({
  isOpen,
  onClose,
  onAddProperty
}) => {
  const [propertyType, setPropertyType] = useState<PropertyType>('urban');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Urban Fields
  const [urbanCategory, setUrbanCategory] = useState<'Apartamento' | 'Penthouse' | 'Casa em Condomínio'>('Apartamento');
  const [bedrooms, setBedrooms] = useState(3);
  const [suites, setSuites] = useState(3);
  const [parkingSpaces, setParkingSpaces] = useState(3);
  const [condoFee, setCondoFee] = useState('');
  
  // Rural Fields
  const [farmType, setFarmType] = useState<'Grãos/Soja' | 'Pecuária' | 'Haras'>('Grãos/Soja');
  const [carStatus, setCarStatus] = useState('100% Regular (SIGEF / GEO OK)');
  const [clayContent, setClayContent] = useState('35% Média');
  const [waterPermit, setWaterPermit] = useState(true);

  const [detailText, setDetailText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const detailsArray = detailText
      ? detailText.split('\n').filter((d) => d.trim().length > 0)
      : [
          propertyType === 'urban'
            ? `${suites} suítes com acabamento de alto padrão`
            : `${area} com aptidão consolidada`,
          propertyType === 'urban'
            ? `${parkingSpaces} vagas de garagem privativas`
            : `Teor de argila: ${clayContent}`
        ];

    const defaultImage = propertyType === 'urban'
      ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: title || (propertyType === 'urban' ? 'Apartamento Luxo Jardins' : 'Fazenda Produtiva 1.200 ha'),
      type: propertyType,
      price: price || 'R$ 6.500.000',
      location: location || 'São Paulo - SP',
      area: area || (propertyType === 'urban' ? '280 m²' : '1.200 Hectares'),
      imageUrl: imageUrl || defaultImage,
      details: detailsArray,
      ...(propertyType === 'urban'
        ? {
            urbanType: urbanCategory,
            bedrooms,
            suites,
            parkingSpaces,
            condoFee: condoFee || 'R$ 2.500 / mês',
            amenities: ['Automação residencial', 'Piscina aquecida', 'Segurança 24h']
          }
        : {
            farmType,
            carStatus,
            clayContent,
            waterPermit
          })
    };

    onAddProperty(newProperty);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-3xl border border-slate-800 bg-[#0C121E] p-6 shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" /> Vetorizador de Imóveis `pgvector`
          </div>
          <h2 className="text-xl font-extrabold text-white">Cadastrar & Vetorizar Novo Imóvel</h2>
          <p className="text-xs text-slate-400">
            Cadastre propriedades urbanas ou rurais. A IA gera os embeddings automaticamente para o SDR Agent.
          </p>
        </div>

        {/* Form */}
        {!isSaved ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Property Type Selector Pills */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setPropertyType('urban')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  propertyType === 'urban'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>🏙️ Urbano (Apartamentos / Casas)</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPropertyType('rural')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  propertyType === 'rural'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>🚜 Rural / Agro (Fazendas / Haras)</span>
              </button>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400">Título do Imóvel</label>
                <input
                  type="text"
                  required
                  placeholder={propertyType === 'urban' ? 'Ex: Penthouse Mansão Jardins' : 'Ex: Fazenda Vale do Sol - 1.500ha'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Valor de Venda</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: R$ 8.500.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 py-2 px-3 text-xs text-emerald-400 font-bold placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Localização (Cidade/Estado)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jardins, São Paulo - SP ou Cocalinho - MT"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Área Total</label>
                <input
                  type="text"
                  required
                  placeholder={propertyType === 'urban' ? 'Ex: 350 m² privativos' : 'Ex: 2.400 Hectares (1.600ha lavoura)'}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>
            </div>

            {/* CATEGORY SPECIFIC FIELDS */}
            {propertyType === 'urban' ? (
              <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-3.5 space-y-3">
                <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> Atributos Específicos de Imóveis Urbanos
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Tipo</label>
                    <select
                      value={urbanCategory}
                      onChange={(e) => setUrbanCategory(e.target.value as any)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    >
                      <option value="Apartamento">Apartamento</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Casa em Condomínio">Casa em Condomínio</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Suítes</label>
                    <input
                      type="number"
                      value={suites}
                      onChange={(e) => setSuites(parseInt(e.target.value) || 1)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Vagas Garagem</label>
                    <input
                      type="number"
                      value={parkingSpaces}
                      onChange={(e) => setParkingSpaces(parseInt(e.target.value) || 1)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Condomínio /mês</label>
                    <input
                      type="text"
                      placeholder="R$ 3.500"
                      value={condoFee}
                      onChange={(e) => setCondoFee(e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-3">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Layers className="h-4 w-4" /> Atributos Técnicos do Agronegócio / Rural
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Aptidão / Vocação</label>
                    <select
                      value={farmType}
                      onChange={(e) => setFarmType(e.target.value as any)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    >
                      <option value="Grãos/Soja">Grãos / Soja / Milho</option>
                      <option value="Pecuária">Pecuária / Nelore</option>
                      <option value="Haras">Haras / Equinocultura</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Teor de Argila (%)</label>
                    <input
                      type="text"
                      value={clayContent}
                      onChange={(e) => setClayContent(e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold">Situação CAR / GEO</label>
                    <input
                      type="text"
                      value={carStatus}
                      onChange={(e) => setCarStatus(e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Details Bullet Points */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400">
                Destaques da Ficha (Uma linha por diferencial para a IA entender)
              </label>
              <textarea
                rows={3}
                placeholder="Piscina aquecida com borda infinita&#10;Projeto assinado por arquiteto renomado&#10;Vista 360 graus para o parque"
                value={detailText}
                onChange={(e) => setDetailText(e.target.value)}
                className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 py-2 px-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>Salvar & Vetorizar no `pgvector`</span>
              </button>
            </div>

          </form>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 animate-fadeIn">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-white">Imóvel Vetorizado com Sucesso!</h3>
            <p className="text-xs text-slate-400">
              Os embeddings foram gerados no `pgvector`. O SDR Agent já pode apresentar este imóvel aos novos leads.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
