import React from 'react';
import { RuralProperty } from '../../types';
import { ShieldCheck, MapPin, Sparkles, AlertCircle, FileCheck2, Video } from 'lucide-react';

interface RuralCardProps {
  property: RuralProperty;
  onSelectProperty: (property: RuralProperty) => void;
}

export const RuralCard: React.FC<RuralCardProps> = ({ property, onSelectProperty }) => {
  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
    >
      {/* Image Thumbnail & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

        {/* Aptitude Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{property.aptitude}</span>
        </div>

        {/* Liquidity Score ALS Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 px-2.5 py-1 text-xs font-extrabold text-slate-950 shadow-lg">
          <span>ALS {property.liquidityScore}</span>
          <span className="text-[10px] font-normal opacity-80">/100</span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="text-xs font-semibold text-slate-400">Valor Solicitado</div>
          <div className="text-xl font-extrabold text-white tracking-tight">{property.price}</div>
        </div>

        {property.droneVideoUrl && (
          <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/90 text-slate-950 shadow-lg backdrop-blur-md">
            <Video className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Property Information */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{property.city}/{property.state} • {property.region}</span>
          </div>

          <h3 className="mt-1.5 text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {property.title}
          </h3>
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Área Total</div>
            <div className="text-xs font-bold text-slate-200">
              {property.areaAlqueires} Alq <span className="text-[10px] font-normal text-slate-400">({property.areaHectares} ha)</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Status CAR</div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="truncate">{property.carStatus}</span>
            </div>
          </div>
        </div>

        {/* Claim Status Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Ficha IOT: <strong className="text-slate-200">{property.provenanceClaims.length} Claims Validados</strong></span>
          </div>

          {property.missingData && property.missingData.length > 0 && (
            <div className="flex items-center gap-1 text-amber-400 text-[11px]" title={`Pendente: ${property.missingData.join(', ')}`}>
              <AlertCircle className="h-3 w-3" />
              <span>{property.missingData.length} Lacunas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
