export const assets = (name: string) => {
  return `/imgs/${name}.png`;
};

export const EditorTabs = [
  {
    name: 'color-picker',
    icon: assets('swatch')
  },
  {
    name: 'file-picker',
    icon: assets('file')
  },
  {
    name: 'download',
    icon: assets('download')
  }
];

export const FilterTabs = [
  {
    name: 'logo-tshirt',
    icon: assets('logo-tshirt')
  },
  {
    name: 'stylish-tshirt',
    icon: assets('stylish-tshirt')
  }
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt'
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt'
  }
};
