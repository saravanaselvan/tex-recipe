// Placeholder for mix and cost calculations
export const calculateMix = (chemicals: any[], quantity: number) => {
  let totalPercentage = chemicals.reduce((sum, chem) => sum + parseFloat(chem.percentage) , 0);
    
  if (totalPercentage !== 100) {
      throw new Error("Total percentage must equal 100%");
  }
  
  let totalCostPerKG = chemicals.filter(val => val.name !== "Water").reduce((sum, chem) => {
      return sum + (parseFloat(chem.percentage) / 100) * parseFloat(chem.cost!);
  }, 0);
  
  return (totalCostPerKG * quantity).toFixed(2); // Format to 2 decimal places
};

export const calculateCost = (_chemicals: any[]) => {
  // Add your calculation logic here
};
