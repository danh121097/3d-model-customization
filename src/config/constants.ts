export const assets = (name: string) => {
  return `/imgs/${name}.png`;
};

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: assets('swatch')
  },
  {
    name: 'filepicker',
    icon: assets('fileIcon')
  },
  {
    name: 'aipicker',
    icon: assets('ai')
  }
];

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: assets('logoShirt')
  },
  {
    name: 'stylishShirt',
    icon: assets('stylishShirt')
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
