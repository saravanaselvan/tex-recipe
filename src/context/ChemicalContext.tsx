import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Chemical {
  brand: string;
  name: string;
  percentage: string;
  cost?: string;
}

interface ChemicalContextProps {
  chemicals: Chemical[];
  addChemical: (chemical: Chemical) => void;
  addWater: () => void;
  totalCostText: string | undefined;
  setTotalCostText: (text: string) => void;
  setChemicals: (chemicals: Chemical[]) => void;
  updateChemicals: (chemicals: Chemical[]) => void;
}

const ChemicalContext = createContext<ChemicalContextProps | undefined>(undefined);

export const useChemicalContext = () => {
  const context = useContext(ChemicalContext);
  if (!context) {
    throw new Error('useChemicalContext must be used within a ChemicalProvider');
  }
  return context;
};

export const ChemicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chemicals, setChemicals] = useState<Chemical[]>([]);
  const [totalCostText, setTotalCostText] = useState<string | undefined>(undefined);
  const [recalculateWater, setRecalculateWater] = useState(false);

  const addChemical = (chemical: Chemical) => {
    setChemicals([...chemicals, chemical]);
    setRecalculateWater(!recalculateWater);
  };

  const updateChemicals = (chemicals: Chemical[]) => {
    setChemicals(chemicals);
    setRecalculateWater(!recalculateWater);
  }

  const addWater = () => {
    const totalPercentage = chemicals.reduce(
      (sum, chem) => sum + parseFloat(chem.percentage || '0'),
      0
    );
    if (totalPercentage < 100) {
      setChemicals([
        ...chemicals,
        {
          brand: '',
          name: 'Water',
          percentage: `${100 - totalPercentage}`,
          cost: '',
        },
      ]);
    }
  };

  React.useEffect(() => {
    if (!recalculateWater) return;
    const totalPercentage = chemicals
      .filter((chem) => chem.name !== 'Water')
      .reduce((sum, chem) => sum + parseFloat(chem.percentage || '0'), 0);

    const isWaterAdded = chemicals.some((chem) => chem.name === 'Water');
    if (isWaterAdded) {
      const newChemicals = chemicals.filter((chem) => chem.name !== 'Water');
      setChemicals([
        ...newChemicals,
        {
          brand: '',
          name: 'Water',
          percentage: `${100 - totalPercentage}`,
          cost: '',
        },
      ]);
    }
    setRecalculateWater(false);
  }, [recalculateWater]);

  return (
    <ChemicalContext.Provider
      value={{ chemicals, addChemical, addWater, totalCostText, setTotalCostText, setChemicals, updateChemicals }}
    >
      {children}
    </ChemicalContext.Provider>
  );
};