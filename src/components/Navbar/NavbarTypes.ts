export interface NavbarProps {
  title: string;
  showBackButton?: boolean;
  onMenuPress: () => void;
  isMenuOpen: boolean;
  onBackPress?: () => void;
}