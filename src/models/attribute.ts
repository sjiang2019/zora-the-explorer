export interface Attribute {
  traitType?: string;
  value?: string;
  displayType?: string;
}

export const decodeAttribute = (attribute: any): Attribute => ({
  traitType: attribute.traitType,
  value: attribute.value,
  displayType: attribute.displayType,
});
