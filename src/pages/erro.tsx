import { GetServerSideProps } from "next";

const Erro = () => (
    <div style={{
        display: "flex",
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <h1 style={{
            background: 'red',
            padding: '80px',
            borderRadius: '20px',
            color: '#FAFAFA',
        }}> Erro!</h1>
    </div>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            
        }
    }
}
export default Erro;