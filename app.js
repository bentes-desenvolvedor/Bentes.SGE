const API_BASE = (window.API_BASE || `${window.location.protocol}//${window.location.host}`) + "/api";

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

document.getElementById("transformBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const output = document.getElementById("transformOutput");

  try {
    const data = await postJson("transform", { text });
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Erro: " + err.message;
  }
});


document.getElementById("aiBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptText").value;
  const output = document.getElementById("aiOutput");

  try {
    const data = await postJson("ai", { prompt });
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Erro: " + err.message;
  }
});
