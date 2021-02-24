import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../queries/books';
import { IBook } from "../types";

interface IBooksData {
    books: IBook[]
}
const Books = () => {
    const { data, error } = useQuery<IBooksData>(GET_ALL_BOOKS);
    return (
        <div style={{ padding: '48px' }}>
            <h1>Livros Obtidos</h1>
            {data?.books.map(book => (
                <div key={book.author} style={{
                    background: '#ebe9e6',
                    maxWidth: '240px',
                    maxHeight: '240px',
                    marginBottom: '16px',
                    borderRadius: '10px',
                    padding: '40px'
                }}>
                    <h2>{book.author}</h2>
                    <h3>{book.title}</h3>
                </div>
            ))}
        </div>
    )
}

export default Books;