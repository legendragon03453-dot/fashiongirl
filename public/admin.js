// 1. Importando as ferramentas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. COLE AQUI O SEU CÓDIGO (Apague este de exemplo e cole o seu real)
const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

// 3. Inicializando o Firebase e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Lógica para enviar o post pro banco de dados
const form = document.getElementById('form-post');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault(); 

    const tituloPost = document.getElementById('titulo').value;
    const conteudoPost = document.getElementById('conteudo').value;

    try {
        await addDoc(collection(db, "posts"), {
            titulo: tituloPost,
            conteudo: conteudoPost,
            data: new Date() 
        });
        
        document.getElementById('mensagem-sucesso').style.display = 'block';
        form.reset(); 
        
    } catch (e) {
        console.error("Erro ao publicar: ", e);
        alert("Deu erro ao salvar o post.");
    }
});