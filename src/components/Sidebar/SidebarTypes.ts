import { RootStackParamList } from '../../navigation/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SidebarProps = {
  isVisible: boolean;
  onClose: () => void;
  // No necesitas pasar navigation como prop si usas useNavigation()
};