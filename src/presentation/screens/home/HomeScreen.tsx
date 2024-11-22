import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../store/auth/useAuthStore";

type HomeScreenProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const { logout } = useAuthStore();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text category="h1" style={{ marginBottom: 20 }}>Punto de Venta</Text>

      <Layout style={{ width: '100%', marginBottom: 20 }}>
        <Button
          style={{ marginVertical: 10 }}
          size="large"
          onPress={() => navigation.navigate('CategoryScreen')}
        >
          Categorías
        </Button>
        <Button
          style={{ marginVertical: 10 }}
          size="large"
          onPress={() => navigation.navigate('ProductScreen', { productId: '1' })}
        >
          Productos
        </Button>
      </Layout>

      <Button
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={logout}
        status="danger"
        style={{ marginTop: 20 }}
      >
        Cerrar Sesión
      </Button>
    </Layout>
  );
};
