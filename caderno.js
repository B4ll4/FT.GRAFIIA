/* CADERNO DE VISITAS - INTEGRAÇÃO SUPABASE FT.GRAFIIA™ */

// Configurações do Supabase
const SUPABASE_URL = 'https://ktmhdxvxwalpnlyfyyva.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bWhkeHZ4d2FscG5seWZ5eXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDIwMTcsImV4cCI6MjEwMTUxODAxN30.MEeUfM5CeWksnpAq0lmWj-fHKgCTH2Og7SjgqczFOyk';

// A inicialização deve ser feita dentro do DOMContentLoaded ou após o carregamento do script CDN
let supabaseClient;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o cliente Supabase usando o objeto global exposto pelo CDN
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.error('Supabase CDN não carregado corretamente.');
    }

    // Lista de palavras bloqueadas (Filtro de Profanidade)
    const forbiddenWords = [
        'porra', 'caralho', 'puta', 'merda', 'vtnc', 'foda', 'desgraça', 
        'filho da puta', 'fdp', 'corno', 'idiota', 'imbecil', 'babaca',
        'pinto', 'buceta', 'cu', 'viado', 'gay', 'lesbica', 'traveco',
        'safado', 'vagabundo', 'piranha', 'vadia', 'cacete'
    ];

    // Seletores
    const trigger = document.getElementById('guestbookTrigger');
    const drawer = document.getElementById('guestbookDrawer');
    const closeBtn = document.getElementById('guestbookClose');
    const overlay = document.getElementById('guestbookOverlay');
    const form = document.getElementById('guestbookForm');
    const messagesContainer = document.getElementById('guestbookMessages');
    const errorMsg = document.getElementById('errorMsg');

    // Funções de Abrir/Fechar
    const toggleDrawer = () => {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (drawer.classList.contains('active')) {
            document.body.style.cursor = 'default';
            loadMessages(); // Carregar mensagens ao abrir
        } else if (document.body.classList.contains('misterios-body')) {
            document.body.style.cursor = 'none';
        }
    };

    trigger.addEventListener('click', toggleDrawer);
    closeBtn.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);

    // Função de Filtro
    const containsForbiddenWords = (text) => {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    };

    // Carregar Mensagens do Supabase
    async function loadMessages() {
        if (!supabaseClient) return;
        
        messagesContainer.innerHTML = '<p style="text-align:center; color:#666; font-size:13px; margin-top:20px;">Conectando ao universo...</p>';
        
        try {
            const { data, error } = await supabaseClient
                .from('caderno_visitas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            messagesContainer.innerHTML = '';
            
            if (!data || data.length === 0) {
                messagesContainer.innerHTML = '<p style="text-align:center; color:#444; font-size:13px; margin-top:20px;">Seja o primeiro a deixar uma marca neste caderno.</p>';
                return;
            }

            data.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'message-card';
                
                let userDisplay = msg.instagram || 'Anônimo';
                if (msg.instagram && msg.instagram.includes('@')) {
                    const handle = msg.instagram.replace('@', '');
                    userDisplay = `<a href="https://instagram.com/${handle}" target="_blank">@${handle}</a>`;
                } else if (msg.instagram) {
                    userDisplay = `<a href="https://instagram.com/${msg.instagram}" target="_blank">@${msg.instagram}</a>`;
                }

                const date = new Date(msg.created_at).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });

                card.innerHTML = `
                    <div class="message-header">
                        <span class="message-user">${userDisplay}</span>
                        <span class="message-date">${date}</span>
                    </div>
                    <p class="message-text">${msg.mensagem}</p>
                `;
                messagesContainer.appendChild(card);
            });
        } catch (err) {
            console.error('Erro ao carregar:', err);
            messagesContainer.innerHTML = '<p style="text-align:center; color:#ff4d4d; font-size:12px; margin-top:20px;">Erro ao carregar mensagens.</p>';
        }
    }

    // Salvar Mensagem no Supabase
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!supabaseClient) return;
        
        const instagramInput = document.getElementById('guestInsta').value.trim();
        const textInput = document.getElementById('guestMsg').value.trim();
        const btn = form.querySelector('.btn-publish');
        
        if (!textInput) return;

        // Filtro de palavrões
        if (containsForbiddenWords(textInput) || containsForbiddenWords(instagramInput)) {
            errorMsg.style.display = 'block';
            setTimeout(() => { errorMsg.style.display = 'none'; }, 5000);
            return;
        }

        btn.disabled = true;
        btn.innerText = 'Publicando...';

        try {
            const { error } = await supabaseClient
                .from('caderno_visitas')
                .insert([
                    { instagram: instagramInput, mensagem: textInput }
                ]);

            if (error) throw error;

            // Sucesso
            form.reset();
            btn.innerText = 'Publicado!';
            btn.style.background = '#2ecc71';
            
            await loadMessages();

            setTimeout(() => {
                btn.innerText = 'Publicar';
                btn.style.background = 'darkgoldenrod';
                btn.disabled = false;
            }, 2000);

        } catch (err) {
            console.error('Erro ao salvar:', err);
            btn.innerText = 'Erro ao enviar';
            btn.style.background = '#ff4d4d';
            btn.disabled = false;
            setTimeout(() => {
                btn.innerText = 'Publicar';
                btn.style.background = 'darkgoldenrod';
            }, 3000);
        }
    });
});
