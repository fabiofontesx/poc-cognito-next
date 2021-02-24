import { GetServerSideProps } from "next";
import { initializeApollo } from '../config/ApolloConfig';
import { GET_ALL_BOOKS } from "../queries/books";
import { IBook } from "../types";

interface IndexProps {
    books: IBook[]
}

const Index = ({ books }: IndexProps) => {
    return (
        <div style={{padding: '48px'}}>
            <h1>Livros Obtidos</h1>
            {books?.map(book => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = initializeApollo();
    try {
        const { data } = await apolloClient.query({
            query: GET_ALL_BOOKS
        })
        return {
            props: {
                books: data.books
            }
        }
    } catch (err) {
        console.error(err)
        return {
            props: undefined,
            redirect: {
                destination: '/erro'
            }
        }
    }
}

export default Index;