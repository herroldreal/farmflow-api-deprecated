import { AreaMeasurementUnit } from '../../core/enums/area-measurement-unit';
import { MilkMeasuramentUnit } from '../../core/enums/milk-measurament-unit';
import { WeightMeasurementUnit } from '../../core/enums/weight-measurement-unit';

export const areaMeasureUnitTypeResolver: Record<keyof typeof AreaMeasurementUnit, any> = {
  BLOCK: 'Block',
  HECTARE: 'Hectare',
  SQUAREMETERS: 'SquareMeters',
};

export const milkMeasureUnitTypeResolver: Record<keyof typeof MilkMeasuramentUnit, any> = {
  BOTTLES: 'Bottles',
  GALLONS: 'Gallons',
  LITERS: 'Liters',
  PINTS: 'Pints',
};

export const weightMeasurementUnitResolver: Record<keyof typeof WeightMeasurementUnit, any> = {
  KILO: 'Kilo',
  POUNDS: 'Pounds',
};
