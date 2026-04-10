const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const musica = document.getElementById("musica");
const status = document.getElementById("status");
const avatar = document.getElementById("avatar");

const userId = "1109957738387230740";

let musicas = [
    "audio/musica.mp3",
    "audio/musica2.mp3"
];

let musicaAtual = 0;

// Entrar no site
startScreen.addEventListener("click", () => {
    startScreen.style.display = "none";
    mainContent.style.display = "block";
    musica.play();
});

// Play / Pause
function toggleMusica() {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}

// Volume
function mudarVolume(valor) {
    musica.volume = valor;
}

// Trocar música
function trocarMusica() {
    musicaAtual = (musicaAtual + 1) % musicas.length;
    musica.src = musicas[musicaAtual];
    musica.play();
}

// 🔥 Formatar tempo jogando
function formatarTempo(ms) {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${horas}h ${minutos}m ${segundos}s`;
}

// Discord status + tempo
async function pegarStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();

        if (data.success) {
            const discord = data.data;

            // Avatar
            const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${discord.discord_user.avatar}.png`;
            avatar.src = avatarUrl;

            if (discord.activities.length > 0) {
                const atividade = discord.activities[0];

                let texto = `🎮 ${atividade.name}`;

                // Se tiver tempo (timestamps)
                if (atividade.timestamps && atividade.timestamps.start) {
                    const inicio = atividade.timestamps.start;
                    const agora = Date.now();
                    const tempo = formatarTempo(agora - inicio);

                    texto += ` | ⏱️ ${tempo}`;
                }

                status.textContent = texto;
            } else {
                status.textContent = "🟢 Online";
            }
        }
    } catch {
        status.textContent = "Erro ao carregar";
    }
}

// Atualiza sempre
setInterval(pegarStatus, 5000);
pegarStatus();
