export type MenuTreeNode = {
  title: string;
  hasDivider: boolean;
  command?: string;
  subSubtree?: MenuTreeNode[];
  action: () => void;
  isQuitAction?: boolean;
};

export type MenuTreeBranch = {
  title: string;
  type: 'main' | 'normal';
  items: Record<string, MenuTreeNode>;
};

export type TopAppMenuTreeStructure = {
  id: string;
  menuTree: MenuTreeBranch[];
};
