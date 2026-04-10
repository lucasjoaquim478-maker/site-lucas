const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const musica = document.getElementById("musica");
const status = document.getElementById("status");

// Clique inicial
startScreen.addEventListener("click", () => {
    startScreen.style.display = "none";
    mainContent.style.display = "block";
    musica.play();
});

// 🔥 Status REAL do Discord
const userId = "1109957738387230740";

async function pegarStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();

        if (data.success) {
            const discord = data.data;

            if (discord.activities.length > 0) {
                const atividade = discord.activities[0];
                status.textContent = `🎮 ${atividade.name}`;
            } else {
                status.textContent = "🟢 Online (sem atividade)";
            }
        }
    } catch (e) {
        status.textContent = "Erro ao carregar status";
    }
}

// Atualiza a cada 5 segundos
setInterval(pegarStatus, 5000);
pegarStatus();