import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text, Button, Layout, Card} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {
  getCategories,
  deleteCategory,
} from '../../../../actions/pages/category/category';

interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

export const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.results);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(prevCategories =>
          prevCategories.filter(category => category.id !== id),
        );
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Categorías
      </Text>
    
  <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Text category="h6">{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Button
              style={styles.deleteButton}
              status="danger"
              onPress={() => handleDelete(item.id)}>
              Eliminar
            </Button>
          </Card>
        )}
        ListEmptyComponent={
          <Text category="p1" style={styles.emptyText}>
            No hay categorías disponibles.
          </Text>
        }
      />

      {/* Botón para agregar nueva categoría */}
      {/* <Button
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCategoryScreen')}
      >
        Agregar Categoría
      </Button> 

      {/* Botón para volver */}
      <Button style={styles.backButton} onPress={() => navigation.goBack()}>
        Volver
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
  addButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: '60%',
  },
  backButton: {
    marginTop: 10,
    alignSelf: 'center',
    width: '60%',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6e6e6e',
  },
});
