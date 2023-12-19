/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/ban-ts-comment */

import { FieldPath, WhereFilterOp } from '@firebase/firestore-types';
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
  property: string | FieldPath;
  rule: WhereFilterOp;
  value: string;
}

// valid filter rules
export enum FilterRule {
  LESS_THAN = '<',
  LESS_THAN_OR_EQUALS = '<=',
  EQUALS = '==',
  NOT_EQUALS = '!=',
  GREATER_THAN_OR_EQUALS = '>=',
  GREATER_THAN = '>',
  ARRAY_CONTAINS = 'array-contains',
  IN = 'in',
  NOT_IN = 'not-in',
  ARRAY_CONTAINS_ANY = 'array-contains-any',
}

/* export const getWhere = (filter: Filtering): { property: string; rule: string; value: string } => {
  if (!filter) return {};

  if (filter.rule === FilterRule.EQUALS) return { property: filter.property, value: filter.value, rule: filter.rule };
  if (filter.rule === FilterRule.NOT_EQUALS) return { [filter.property]: Not(filter.value) };
  if (filter.rule === FilterRule.GREATER_THAN) return { [filter.property]: MoreThan(filter.value) };
  if (filter.rule === FilterRule.GREATER_THAN_OR_EQUALS) return { [filter.property]: MoreThanOrEqual(filter.value) };
  if (filter.rule === FilterRule.LESS_THAN) return { [filter.property]: LessThan(filter.value) };
  if (filter.rule === FilterRule.LESS_THAN_OR_EQUALS) return { [filter.property]: LessThanOrEqual(filter.value) };
  if (filter.rule === FilterRule.ARRAY_CONTAINS_ANY) return { [filter.property]: ILike(`%${filter.value}%`) };
  if (filter.rule === FilterRule.ARRAY_CONTAINS) return { [filter.property]: Not(ILike(`%${filter.value}%`)) };
  if (filter.rule === FilterRule.IN) return { [filter.property]: In(filter.value.split(',')) };
  if (filter.rule === FilterRule.NOT_IN) return { [filter.property]: Not(In(filter.value.split(','))) };
};*/

export const FilteringParams = createParamDecorator((data: string[], ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const filter = <string>req.query['filter'];
  if (!filter) return null;

  console.log('<=======================================>');
  console.log(`Data => ${JSON.stringify(data, null, 2)}`);
  console.log('<=======================================>');
  // check if the valid params sent is an array
  if (!Array.isArray(data)) throw new BadRequestException('Filter parameter must be a Array');

  console.log('<=======================================>');
  console.log(`Filter => ${JSON.stringify(filter, null, 2)}`);
  console.log('<=======================================>');
  // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
  if (
    !filter.match(/^[a-zA-Z0-9_]+:(<|<=|==|!=|>=|>|array-contains|in|not-in|array-contains-any):[a-zA-Z0-9_,]+$/) &&
    !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
  ) {
    throw new BadRequestException('Pattern of filter are invalid');
  }

  const filters = filter.split(':');
  const property = filters[0];
  const rule = <WhereFilterOp>filters[1];
  const value = filters[2];

  if (!data.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
  if (!Object.values(FilterRule).includes(<FilterRule>rule))
    throw new BadRequestException(`Invalid filter rule: ${rule}`);

  const filtering: Filtering = {
    property,
    rule,
    value,
  };
  return filtering;
});
