import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
}

const BookListScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token ? `Bearer ${token}` : '';
    } catch (error) {
      console.error('Error getting token:', error);
      return '';
    }
  };

  const fetchBooks = async () => {
    const token = await getAuthToken();
    try {
      const response = await fetch('https://backendbooktrack-production.up.railway.app/api/books', {
        headers: {
          Authorization: token,
        },
      });
      const result = await response.json();
      if (result.data) {
        setBooks(result.data);
      } else {
        Alert.alert('Failed to fetch books');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetching books');
    }
  };

  const handleAddOrUpdateBook = async () => {
    if (!bookTitle || !bookAuthor || !bookGenre || !bookDescription) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const token = await getAuthToken();
    const url = editingBook
      ? `https://backendbooktrack-production.up.railway.app/api/books/${editingBook._id}`
      : 'https://backendbooktrack-production.up.railway.app/api/books';

    try {
      const response = await fetch(url, {
        method: editingBook ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          title: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
          description: bookDescription,
        }),
      });

      const newBook = await response.json();
      if (newBook && newBook.data && newBook.data._id) {
        if (editingBook) {
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book._id === newBook.data._id ? newBook.data : book))
          );
        } else {
          setBooks((prevBooks) => [...prevBooks, newBook.data]);
        }
        resetForm();
        Alert.alert(
          editingBook ? 'Updated' : 'Added',
          `Book ${editingBook ? 'updated' : 'added'} successfully!`
        );
      } else {
        Alert.alert('Failed to add or update book. Please try again.');
      }
    } catch (error) {
      console.error('Error adding/updating book:', error);
      Alert.alert('An error occurred while adding/updating the book.');
    }
  };

  const handleDeleteBook = async (_id: string) => {
    const token = await getAuthToken();
    try {
      await fetch(`https://backendbooktrack-production.up.railway.app/api/books/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== _id));
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while deleting the book.');
    }
  };

  const resetForm = () => {
    setEditingBook(null);
    setBookTitle('');
    setBookAuthor('');
    setBookGenre('');
    setBookDescription('');
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookGenre(book.genre);
    setBookDescription(book.description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book List</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Book Title"
          value={bookTitle}
          onChangeText={setBookTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={bookAuthor}
          onChangeText={setBookAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={bookGenre}
          onChangeText={setBookGenre}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={bookDescription}
          onChangeText={setBookDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateBook}>
          <Text style={styles.buttonText}>{editingBook ? 'Update Book' : 'Add Book'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>
              {item.title} by {item.author} ({item.genre})
            </Text>
            <Text style={styles.bookDescription}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonEdit} onPress={() => handleEditBook(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDeleteBook(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Soft green background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#388E3C', // Dark green
  },
  form: {
    marginBottom: 20,
    backgroundColor: '#C8E6C9', // Light green form background
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 45,
    borderColor: '#81C784', // Soft green border
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#66BB6A', // Fresh green button
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bookItem: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C', // Dark green
  },
  bookDescription: {
    fontSize: 14,
    color: '#4CAF50', // Medium green
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonEdit: {
    backgroundColor: '#81C784',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});

export default BookListScreen;
