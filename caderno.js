/* CADERNO DE VISITAS - LÓGICA FT.GRAFIIA™ */

document.addEventListener('DOMContentLoaded', () => {
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
        
        // Se estiver abrindo em dispositivos com efeito lanterna, garantir que o cursor volte se necessário
        if (drawer.classList.contains('active')) {
            document.body.style.cursor = 'default';
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

    // Gerenciar Mensagens (LocalStorage para persistência básica)
    const loadMessages = () => {
        const saved = localStorage.getItem('ft_grafiia_messages');
        const messages = saved ? JSON.parse(saved) : [];
        
        messagesContainer.innerHTML = '';
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = '<p style="text-align:center; color:#444; font-size:13px; margin-top:20px;">Seja o primeiro a deixar uma marca neste caderno.</p>';
            return;
        }

        messages.reverse().forEach(msg => {
            const card = document.createElement('div');
            card.className = 'message-card';
            
            let userDisplay = msg.user;
            if (msg.instagram) {
                const handle = msg.instagram.replace('@', '');
                userDisplay = `<a href="https://instagram.com/${handle}" target="_blank">@${handle}</a>`;
            }

            card.innerHTML = `
                <div class="message-header">
                    <span class="message-user">${userDisplay}</span>
                    <span class="message-date">${msg.date}</span>
                </div>
                <p class="message-text">${msg.text}</p>
            `;
            messagesContainer.appendChild(card);
        });
    };

    // Salvar Mensagem
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const instagramInput = document.getElementById('guestInsta').value.trim();
        const textInput = document.getElementById('guestMsg').value.trim();
        
        // Validar texto
        if (!textInput) return;

        // Filtro de palavrões
        if (containsForbiddenWords(textInput) || containsForbiddenWords(instagramInput)) {
            errorMsg.style.display = 'block';
            setTimeout(() => { errorMsg.style.display = 'none'; }, 5000);
            return;
        }

        const newMessage = {
            user: instagramInput ? instagramInput : 'Anônimo',
            instagram: instagramInput.startsWith('@') || instagramInput ? instagramInput : null,
            text: textInput,
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
        };

        // Persistência
        const saved = localStorage.getItem('ft_grafiia_messages');
        const messages = saved ? JSON.parse(saved) : [];
        messages.push(newMessage);
        localStorage.setItem('ft_grafiia_messages', JSON.stringify(messages));

        // Feedback e Limpeza
        form.reset();
        loadMessages();
        
        // Efeito de sucesso no botão
        const btn = form.querySelector('.btn-publish');
        const originalText = btn.innerText;
        btn.innerText = 'Publicado!';
        btn.style.background = '#2ecc71';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = 'darkgoldenrod';
        }, 2000);
    });

    // Inicialização
    loadMessages();
});
