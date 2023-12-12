/* eslint-disable @typescript-eslint/no-explicit-any */

import { AreaMeasurementUnit } from '../../core/enums/area-measurement.unit';
import { FarmPurpose } from '../../core/enums/farm-purpose.enum';
import { MilkMeasurementUnit } from '../../core/enums/milk-measurement.unit';
import { WeightMeasurementUnit } from '../../core/enums/weight-measurement.unit';

export const areaMeasureUnitTypeResolver: Record<keyof typeof AreaMeasurementUnit, any> = {
  BLOCK: 'Manzana',
  HECTARE: 'Hectarea',
  SQUAREMETERS: 'Metros Cuadrados',
};

export const milkMeasureUnitTypeResolver: Record<keyof typeof MilkMeasurementUnit, any> = {
  BOTTLES: 'Botellas',
  GALLONS: 'Galones',
  LITERS: 'Litros',
  PINTS: 'Pinta',
};

export const weightMeasurementUnitResolver: Record<keyof typeof WeightMeasurementUnit, any> = {
  KILO: 'Kilo',
  POUNDS: 'Libras',
};

export const farmPurposeResolver: Record<keyof typeof FarmPurpose, any> = {
  DOUBLEPURPOSE: 'Doble Proposito',
  DAIRYPRODUCTION: 'Produccion Lechera',
  MEATPRODUCTION: 'Produccion Carnica',
};
